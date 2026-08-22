This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

`.env*` is gitignored, so this is the reference. Set these in Vercel project
settings for production and in a local `.env.local` for development.

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | Yes, for Ask Amol | Server-side only. `/api/ask` returns a friendly 503 without it, so the rest of the site is unaffected. |
| `UPSTASH_REDIS_REST_URL` or `KV_REST_API_URL` | Yes in production | Redis for `/api/ask` IP rate limiting. Either name works: the Vercel Marketplace install injects the `KV_*` pair, a direct Upstash setup uses the `UPSTASH_*` pair. |
| `UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_TOKEN` | Yes in production | Paired with the URL above. |
| `ASK_RATE_LIMIT_SALT` | Recommended | Any long random string. Salts the IP hash used as the rate-limit key so Redis never holds a reversible address. |

`/api/ask` **fails closed**: if the Upstash variables are missing in
production it refuses requests rather than serving an unmetered endpoint
backed by a paid API key. In development it allows requests through so the
feature works offline.

Before Ask Amol goes live, set a hard monthly budget cap and a spend alert in
the OpenAI dashboard. The rate limit bounds one caller; the budget cap is what
bounds the bill.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
