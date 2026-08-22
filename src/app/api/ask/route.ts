import OpenAI from "openai";

import { SYSTEM_PROMPT } from "@/lib/ask-prompt";
import { CORPUS_TOKENS_APPROX, PROMPT_CACHE_KEY, corpusStats } from "@/lib/corpus";
import { checkRateLimit } from "@/lib/rate-limit";

/** node:crypto in the corpus module, and streaming needs a real Node runtime. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pinned to an explicit capability tier, never the bare `gpt-5.6` alias (which
 * points at Sol) and never a Daybreak alias (which gets repointed to newer
 * models with pricing adjusted to match).
 *
 * Terra, not Luna: this task is grounded summarization, but its entire value
 * rests on strict instruction-following (refuse outside the corpus, never
 * fabricate a position, never issue a quote for publication), and that is
 * exactly what degrades first on a budget tier. A/B Luna only after the
 * refusal behavior is verified in production.
 */
const MODEL = "gpt-5.6-terra";

const MAX_OUTPUT_TOKENS = 1024;
const MAX_MESSAGE_CHARS = 1000;
const MAX_USER_TURNS = 8;

/** Latency-sensitive chat surface, and the task does not reward deliberation. */
const REASONING_EFFORT = "low" as const;

/**
 * Built lazily on first use, never at module scope.
 *
 * The OpenAI constructor throws when no key is present. At module scope that
 * throw happens during route evaluation, so the handler never runs at all and
 * every request, valid or not, gets a raw framework 500 instead of the checks
 * below. Deferring it keeps the guards reachable.
 */
let cachedClient: OpenAI | null = null;
function getClient(apiKey: string): OpenAI {
  if (!cachedClient) cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

type Turn = { role: "user" | "assistant"; content: string };

function bad(status: number, error: string, extra?: Record<string, unknown>) {
  return Response.json({ error, ...extra }, { status });
}

/**
 * Rebuilds the conversation from scratch rather than trusting the client's
 * shape. Anything that is not a plain user/assistant turn with string content
 * is dropped, so a crafted payload cannot smuggle in a system role.
 */
function parseTurns(input: unknown): Turn[] | null {
  if (!Array.isArray(input)) return null;

  const turns: Turn[] = [];
  for (const raw of input) {
    if (typeof raw !== "object" || raw === null) return null;
    const { role, content } = raw as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const trimmed = content.trim();
    if (!trimmed) continue;
    turns.push({ role, content: trimmed });
  }
  return turns;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[ask] OPENAI_API_KEY is not set");
    return bad(503, "Ask Amol is not configured right now.");
  }

  const gate = await checkRateLimit(request.headers);
  if (!gate.ok) {
    if (gate.reason === "unconfigured") {
      // Fail closed: never serve a key-backed endpoint without metering.
      console.error("[ask] rate limiter unconfigured in production; refusing");
      return bad(503, "Ask Amol is not configured right now.");
    }
    return bad(
      429,
      "That's a lot of questions in one hour. Give it a little time, or email Amol directly.",
      { retryAfterSeconds: gate.retryAfterSeconds },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad(400, "Malformed request.");
  }

  const turns = parseTurns((body as { messages?: unknown })?.messages);
  if (!turns || turns.length === 0) {
    return bad(400, "Ask a question to get started.");
  }

  const last = turns[turns.length - 1];
  if (last.role !== "user") {
    return bad(400, "Ask a question to get started.");
  }

  // Server-side length cap. The client enforces this too, for the counter in
  // the UI; this is the one that actually holds.
  const tooLong = turns.find((t) => t.role === "user" && t.content.length > MAX_MESSAGE_CHARS);
  if (tooLong) {
    return bad(400, `Keep questions under ${MAX_MESSAGE_CHARS} characters.`);
  }

  // Turn cap keeps context growth bounded, which is also what keeps this well
  // clear of the ~272k long-context threshold where input bills at 2x.
  const userTurns = turns.filter((t) => t.role === "user").length;
  if (userTurns > MAX_USER_TURNS) {
    return bad(
      409,
      "This conversation has run its course. Start a fresh one, or email Amol to go deeper.",
    );
  }

  const question = last.content;

  try {
    const stream = await getClient(apiKey).responses.create({
      model: MODEL,
      // Order is load-bearing. Everything static comes first so the cached
      // prefix covers the whole ~20k-token corpus; only the tail varies.
      input: [
        { role: "developer", content: SYSTEM_PROMPT },
        ...turns.map((t) => ({ role: t.role, content: t.content })),
      ],
      max_output_tokens: MAX_OUTPUT_TOKENS,
      reasoning: { effort: REASONING_EFFORT },
      // Routes to a machine holding this prefix. Stable across all visitors, so
      // any request warms the cache for the next one.
      prompt_cache_key: PROMPT_CACHE_KEY,
      prompt_cache_options: { ttl: "30m" },
      // Pinned explicitly so an account-level Fast/priority setting can never
      // silently double the per-token rate for latency this feature does not need.
      service_tier: "default",
      store: false,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
              controller.enqueue(encoder.encode(event.delta));
            } else if (event.type === "response.completed") {
              const usage = event.response.usage;
              const cached = usage?.input_tokens_details?.cached_tokens ?? 0;
              const input = usage?.input_tokens ?? 0;
              // No IP, no session, no identifiers. What people ask is an input
              // to the editorial calendar; who asked it is not needed for that.
              console.log(
                JSON.stringify({
                  tag: "ask",
                  question,
                  inputTokens: input,
                  cachedTokens: cached,
                  cacheHitRatio: input > 0 ? +(cached / input).toFixed(3) : 0,
                  outputTokens: usage?.output_tokens ?? 0,
                  corpusTokensApprox: CORPUS_TOKENS_APPROX,
                  corpusHash: corpusStats.hash.slice(0, 12),
                }),
              );
            } else if (event.type === "response.failed") {
              console.error("[ask] response.failed", event.response.error);
              controller.enqueue(
                encoder.encode("\n\nSomething went wrong on my end. Try again in a moment."),
              );
            }
          }
          controller.close();
        } catch (err) {
          console.error("[ask] stream aborted", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[ask] request failed", err);
    return bad(502, "Couldn't reach the model just now. Try again in a moment.");
  }
}
