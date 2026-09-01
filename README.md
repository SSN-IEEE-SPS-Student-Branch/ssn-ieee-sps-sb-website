# SSN IEEE Signal Processing Society website

The official website for the IEEE Signal Processing Society Student Branch Chapter at SSN
College of Engineering. It presents the chapter team, events, achievements, funding and mentoring
resources, annual magazines, photo galleries, and contact information.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Chapter introduction and membership call to action |
| `/team` | Current and past chapter leadership |
| `/student-achievements` | Student awards and recognitions |
| `/events/upcoming` | Upcoming chapter programming |
| `/events/past` | Past-event archive and photos |
| `/funding` | Funding opportunities and eligibility details |
| `/mentoring` | Mentoring resources and membership guidance |
| `/magazine` | Annual magazine reader and downloads |
| `/gallery` | Chapter photo galleries |
| `/contact` | Contact details, membership guide, map, and FAQ |

## Local development

Requirements: Node.js 22 or newer and npm.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open <http://localhost:3000>. Set `NEXT_PUBLIC_SITE_URL` to the public origin before a production
build so canonical URLs, social metadata, `robots.txt`, and `sitemap.xml` use the correct domain.

## Quality gate

```bash
npm run check
npm audit
```

`npm run check` runs strict ESLint, TypeScript, repository tests, both production build targets,
and HTTP smoke tests against every public route. The GitHub Actions workflow runs the same gate
for pushes and pull requests.

## Content maintenance

- Route content and route metadata live in `src/app`.
- Shared navigation and footer content live in `src/components`.
- Public photos, magazines, logos, and the membership guide live in `public`.
- Add new public routes to `src/app/sitemap.ts`, the smoke-test route list, and the navigation when
  appropriate.
- Optimize large photos before committing. Keep display images at or below 1920 pixels on their
  longest side unless the content has a specific archival requirement.

## Production

Build and run the optimized server locally with:

```bash
npm run build
npm start
```

The application includes per-route metadata, canonical URLs, a sitemap, crawler rules, a web-app
manifest, a custom 404 page, keyboard-accessible interactive controls, responsive navigation,
optimized Next.js images, security headers, and reduced-motion support.
