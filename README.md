# Danyal Khan — Portfolio

A custom editorial portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. The off-white, charcoal, and electric-blue visual system follows the supplied master blueprint. Manrope and Inter are hosted locally, along with Danyal’s portrait and original Behance project artwork.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm start
```

The scripts use Next.js’s supported webpack compiler for compatibility with restricted environments.

## Pages and features

- Home: portrait-led hero, selected work, biography, expertise accordions, process, collaborations, experience, contact.
- `/work`: six original projects with category filtering and shareable filter URLs.
- `/work/[slug]`: individual project pages with locally hosted original artwork, galleries, original Behance links, and next-project navigation.
- `/about`: biography, creative beliefs, full experience timeline.
- `/services`: RevBoost’s nine services across marketing, SEO/AEO, websites, apps, point of sale, product catalogs, and Shopify. The former `/expertise` URL redirects here.
- `/contact`: validated inquiry form, direct email, and supplied social links.
- Per-page metadata, generated Open Graph image, favicon, sitemap, robots, skip link, mobile navigation, and reduced-motion support.

## Contact delivery

The portfolio uses **kdanyal763@gmail.com**. Without mail-service configuration, the form prepares an inquiry in the visitor’s email application and clearly explains that they must send it there. It never claims an unsent message has been delivered.

To enable server-side delivery, copy `.env.example` to `.env.local` and set:

```dotenv
RESEND_API_KEY=your_resend_key
CONTACT_FROM_EMAIL=Danyal Portfolio <portfolio@your-verified-domain.com>
CONTACT_TO_EMAIL=kdanyal763@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-portfolio-domain.com
```

The sender domain must be verified in Resend. Redeploy/restart after adding environment variables. The API includes server-side validation, a bounded request body, a honeypot, submission timing checks, best-effort per-instance rate limiting, same-origin checks, and delivery timeouts. Enable your hosting provider’s shared WAF/rate limiting for production-wide protection.

No live email is sent by the verification checks. An actual delivery test requires a configured mail-service key.

## Content

Edit `src/lib/content.ts` for the biography-related data, capabilities, projects, collaborations, experience, email, and social profiles. Project artwork is in `public/images/`. Fonts are in `public/fonts/`.

Original project sources supplied by Danyal:

- [Fast Food Creatives & Animation](https://www.behance.net/gallery/257696733/Fast-Food-Creatives-and-Animation)
- [Client Showcase 02](https://www.behance.net/gallery/257696637/Client-Showcase-02)
- [Client Work Showcase 01](https://www.behance.net/gallery/257696003/Client-work-showcase-01)
- [Brand Kit](https://www.behance.net/gallery/239348297/Brand-Kit)
- [Product & Marketing Posts](https://www.behance.net/gallery/237590893/Product-Posts-Marketing-Posts)
- [Danyal’s Portfolio](https://www.behance.net/gallery/225103547/Danyals-portfolio)

Client names and experience come from the supplied blueprint. No testimonials, conversion statistics, role-specific case study claims, or fabricated project outcomes have been added. Detailed briefs, responsibilities, and outcomes can be expanded when supplied. The six-step process is personal methodology, not a claim about unverified individual projects. The site contains no autoplay showreel because no source video was supplied.

## Deployment

Import the project into Vercel as a Next.js application. Use `npm run build`, add the environment variables, and set `NEXT_PUBLIC_SITE_URL` to the real production domain for correct metadata and sitemap links. No separate hosting service is required for images or fonts.

## Checks

```bash
npm run typecheck
npm run build
```
