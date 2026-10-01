# AgricX

Marketing and e-commerce site for AgricX, which sells agricultural drones and precision farming equipment. It's a static multi-page site built with plain HTML, CSS and JavaScript. A small dependency-free Node build script renders the pages.

## Pages
- `/`: Home
- `/drones`: product catalogue with category filters and search
- `/products/<slug>`: product detail pages, generated from `src/data.js`
- `/how-it-works`, `/services`, `/about`, `/contact`
- `/blog` and `/blog/<slug>`: articles, generated from `src/data.js`
- `404`

## Develop
```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally
```

## Editing content
- Products, blog posts and contact details live in `src/data.js`.
- Page templates live in `src/pages/`. The shared header, footer and cards live in `src/layout.js`.
- Images live in `public/images/`. To swap a photo, replace the file and keep the same name.

## Deploy
Vercel reads `vercel.json`, which sets the build command to `npm run build` and the output directory to `dist`, with clean URLs.
