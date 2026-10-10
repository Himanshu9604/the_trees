# The Tree Hotels & Resorts — Next.js website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · motion

## Run
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Structure
- `src/app` — routes (home, properties, destinations, gallery, about, contact), sitemap, robots
- `src/components` — layout, home sections, property, ui, chat widget
- `src/data` — properties and destinations content
- `src/lib` — site config, SEO schema, chatbot engine
- `public/images` — brand and property photos

Edit phone, URL and name in `src/lib/site.ts`; content in `src/data/*`.
