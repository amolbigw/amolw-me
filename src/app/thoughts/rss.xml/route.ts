import { site, absoluteUrl } from "@/lib/site";
import { thoughts } from "@/lib/thoughts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Content is compiled in, so prerender the feed at build time and serve it
// from the CDN rather than invoking a function per request.
export const dynamic = "force-static";

export function GET() {
  const items = thoughts
    .map((t) => {
      const url = absoluteUrl(`/thoughts/${t.slug}`);
      return `    <item>
      <title>${escapeXml(t.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(t.date).toUTCString()}</pubDate>
      <description>${escapeXml(t.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} · Thoughts</title>
    <link>${absoluteUrl("/thoughts")}</link>
    <description>Essays on AI, identity, first-party data, and the next era of marketing.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(thoughts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/thoughts/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
