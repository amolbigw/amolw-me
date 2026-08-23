"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/lib/site";

const MAX_CHARS = 1000;
const MAX_USER_TURNS = 8;
/** Only used if a 429 somehow arrives without the server's own figure. */
const MAX_PER_HOUR_FALLBACK = 10;

const SUGGESTED = [
  "What's your take on the post-cookie web?",
  "Why household instead of cookie?",
  "What should a mid-market agency CFO expect from an AdTech platform?",
  "Where is AI actually working in marketing?",
];

type Turn = { role: "user" | "assistant"; content: string };

/**
 * Renders the [title](url) citations the model is instructed to emit, and
 * nothing else. Deliberately not react-markdown: a parser in the client bundle
 * would put weight in the critical path for one syntax form we fully control.
 *
 * Only https links render as anchors. Model output is untrusted by default, so
 * any other scheme (javascript:, data:) falls through to plain text.
 */
function renderProse(text: string) {
  const pattern = /\[([^\]\n]+)\]\((https:\/\/[^\s)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        className="text-[var(--accent)] underline-offset-4 hover:underline"
      >
        {match[1]}
      </a>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function Answer({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim());
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-[var(--foreground)]">
          {renderProse(p)}
        </p>
      ))}
    </div>
  );
}

export function AskAmol() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /**
   * Hitting the hourly cap is a conversion point, not a failure: the reader is
   * clearly engaged. It gets its own state so the answer can be an invitation
   * to email rather than a red error line, and so the input can step aside
   * instead of inviting a request that is guaranteed to 429.
   */
  const [limitedAt, setLimitedAt] = useState<number | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  const userTurns = turns.filter((t) => t.role === "user").length;
  const atTurnCap = userTurns >= MAX_USER_TURNS;
  const rateLimited = limitedAt !== null;
  const busy = streaming;

  // Keep the newest answer in view as it streams, without yanking the whole page.
  useEffect(() => {
    if (streaming && liveRef.current) {
      liveRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [turns, streaming]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy || atTurnCap || rateLimited) return;

    setError(null);
    setInput("");

    const next: Turn[] = [...turns, { role: "user", content: trimmed }];
    setTurns([...next, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const payload = await res.json().catch(() => null);
        setTurns(next);
        if (payload?.code === "rate_limited") {
          // The server owns the number, so the copy cannot drift from it.
          setLimitedAt(typeof payload.limit === "number" ? payload.limit : MAX_PER_HOUR_FALLBACK);
          return;
        }
        setError(
          payload?.error ??
            "Something went wrong reaching the model. Try again in a moment.",
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setTurns([...next, { role: "assistant", content: answer }]);
      }

      if (!answer.trim()) {
        setTurns(next);
        setError("That came back empty. Try rephrasing the question.");
      }
    } catch {
      setTurns(next);
      setError("Lost the connection mid-answer. Try again in a moment.");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="border border-[var(--border-strong)]">
      <div className="border-b border-[var(--border)] px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          <span className="text-[var(--accent)]">●</span>
          <span>Ask Amol</span>
        </div>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          Ask about anything Amol has published. Answers are drawn from his
          essays and press coverage, with links back to the source.
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {turns.length === 0 ? (
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Start with
            </div>
            {/* Full-width rows on mobile, where these are the likeliest entry
                point and a wrapped pill row is hard to parse. The fill and the
                leading arrow are what separate a tappable suggestion from the
                empty input below it; without them all six boxes on a phone
                read as the same kind of hairline rectangle. */}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={busy}
                  className="flex min-h-11 w-full items-start gap-3 border border-[var(--border)] bg-white/[0.03] px-4 py-2.5 text-left text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-white/[0.06] disabled:opacity-50 sm:w-auto"
                >
                  <span aria-hidden className="flex-none text-[var(--accent)]">
                    &rarr;
                  </span>
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {turns.map((t, i) =>
              t.role === "user" ? (
                <div key={i}>
                  <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
                    You asked
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-[var(--foreground)]">
                    {t.content}
                  </p>
                </div>
              ) : (
                <div key={i} ref={i === turns.length - 1 ? liveRef : undefined}>
                  <div className="text-xs uppercase tracking-widest text-[var(--accent)]">
                    From the writing
                  </div>
                  <div className="mt-2" aria-live="polite" aria-busy={streaming}>
                    {t.content ? (
                      <Answer text={t.content} />
                    ) : (
                      <p className="text-base text-[var(--muted)]">Reading…</p>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {error && (
          <p
            role="status"
            className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-base leading-relaxed text-[var(--muted)]"
          >
            {error}
          </p>
        )}

        {rateLimited ? (
          <p className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-base leading-relaxed text-[var(--muted)]">
            That&apos;s {limitedAt} questions in an hour, which is the limit. If
            you want to keep going, the better next step is a real conversation:
            email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        ) : atTurnCap ? (
          <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">
            That&apos;s as far as one conversation goes. Reload to start fresh,
            or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {site.email}
            </a>{" "}
            to pick it up properly.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mt-6 flex items-stretch gap-2"
          >
            <label htmlFor="ask-amol-input" className="sr-only">
              Ask a question about Amol&apos;s writing
            </label>
            {/* min-w-0 so the field can shrink inside the flex row instead of
                its placeholder forcing an overflow and clipping mid-word. */}
            <input
              id="ask-amol-input"
              type="text"
              value={input}
              maxLength={MAX_CHARS}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              placeholder="Ask a question…"
              className="min-h-11 min-w-0 flex-1 border border-[var(--border-strong)] bg-transparent px-4 py-2 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)] disabled:opacity-50"
            />
            {/* Lights up in accent the moment there is something to send, so at
                rest it reads as waiting rather than as a greyed-out control. */}
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className={`inline-flex min-h-11 flex-none items-center justify-center border px-3 text-xs uppercase tracking-widest transition-colors sm:px-4 ${
                busy || !input.trim()
                  ? "border-[var(--border)] text-[var(--muted)]"
                  : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]"
              }`}
            >
              {busy ? "Reading…" : "Ask"}
            </button>
          </form>
        )}
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4 sm:px-8">
        <p className="text-xs leading-relaxed text-[var(--muted)]">
          AI-generated from Amol&apos;s published writing. For anything official,{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--accent)] underline-offset-4 hover:underline"
          >
            email him
          </a>
          .
        </p>
      </div>
    </div>
  );
}
