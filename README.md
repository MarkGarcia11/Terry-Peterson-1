# Terry Petterson Coatings Consultant

Independent powder-coating troubleshooting, training, and process improvement website. Built with React, TypeScript, Vite, React Router, Framer Motion, and Tailwind CSS v4.

## Local development

```bash
npm install
npm run dev
```

Create a local `.env` from `.env.example` only if you need to configure a canonical site origin or an inquiry endpoint. The site has no required environment variables and no secrets should be placed in `VITE_*` variables.

## Production build

```bash
npm run build
npm run preview
```

## Vercel and GitHub

Import the GitHub repository into Vercel and use the detected Vite defaults: `npm run build` with `dist` as the output directory. `vercel.json` rewrites application routes to the React entry point so direct visits to pages such as `/contact` work.

Optional Vercel environment variables:

- `VITE_SITE_URL`: the verified production origin, such as `https://your-domain.example`. This is used for canonical URLs and structured data. If it is unset, the current browser origin is used.
- `VITE_INQUIRY_ENDPOINT`: a trusted endpoint that accepts `multipart/form-data`, including an optional image. If unset, the form opens a prefilled email draft to `tepowder@msn.com`.

After choosing the public domain, replace `YOUR_DOMAIN_HERE` in `public/sitemap.xml` and `public/robots.txt`. The domain was intentionally not guessed. Review the privacy policy before enabling a form provider, and review the terms and privacy wording before launch.

## Content and images

Most page copy and image references are in `src/data/content.ts`. Replace photo sources with approved shop photography when available. The generated finish comparison files are in `public/images/`. Case note placeholders are marked in the case notes page and should only be replaced with verified, approved details.

## Contact form

With no endpoint configured, required fields are validated by the browser and a `mailto:` draft is prepared. For direct delivery, configure an endpoint that accepts multipart form data and add its URL as `VITE_INQUIRY_ENDPOINT` in Vercel. The browser-side endpoint URL is public; do not put private credentials in it or in any `VITE_*` variable. Configure spam protection, retention, and privacy terms with the chosen provider.