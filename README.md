# K-Design Pictures SARL

A premium, cinematic website for K-Design Pictures, an audiovisual production studio in Soa, Yaoundé, Cameroon. Built with React, React Router, Tailwind CSS, GSAP, and Supabase, deployable to Vercel.

The design language is deep black and luxury gold with a glassmorphic, floating-bento UI, pill navigation, and circular gold action buttons. Motion is handled with GSAP and IntersectionObserver reveals, and respects `prefers-reduced-motion`.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

The site runs immediately in demo mode using bundled sample content. No backend is required to preview it.

### Production build

```bash
npm run build        # outputs to dist/
npm run preview      # serve the build locally
```

---

## Brand assets

The KD monogram, favicon, app icons, and the social share image are generated from SVG sources.

- `public/favicon.svg` and `brand/og-image.svg` are the editable sources.
- Run `npm run gen:assets` to rasterize the PNGs (favicon, apple-touch-icon, android-chrome, `og-image.png`) used by `index.html` and `site.webmanifest`.

Open Graph and Twitter card tags are set in `index.html` (and per-page via `src/components/seo/Seo.jsx`), so sharing the URL on WhatsApp, LinkedIn, Facebook, Telegram, or X shows the branded 1200x630 thumbnail.

---

## Connecting Supabase (auth, database, storage)

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql). This creates all tables, row-level-security policies, the auto-profile trigger, and the public `media` storage bucket.
3. Copy `.env.example` to `.env` and fill in your project URL and anon key:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

4. Restart the dev server. Accounts, the contact form, saved projects, media upload, and user management now persist.

### Making yourself an admin

Admins and users sign in from the same `/login` page. Role-based routing sends users to `/dashboard` and admins to `/admin`. There is no separate admin login button.

After signing up, find your user id in **Authentication > Users**, then run:

```sql
update public.profiles set role = 'admin' where id = 'YOUR-USER-UUID';
```

Sign in again and you land on the admin console.

---

## Adding real content

- **Photos**: every project, team member, and post has an image field (`cover`, `photo`, etc.). Paste an image URL, or upload in the admin **Media** library (stored in Supabase Storage) and copy the public URL. Until then, on-brand cinematic gradient posters render automatically so nothing looks broken.
- **Hero video**: drop a file at `public/hero.mp4` and uncomment the `<video>` block in `src/pages/Home.jsx`.
- **Sample copy**: lives in `src/data/content.js`. Business and contact details are in `src/data/site.js` (phone, email, WhatsApp number, and social links are placeholders to replace).

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
3. Add the two `VITE_SUPABASE_*` environment variables.
4. Deploy. `vercel.json` already handles SPA routing and long-term caching of hashed assets.

Update the production domain in `index.html` (canonical, OG URLs), `public/robots.txt`, and `public/sitemap.xml` once your domain is live.

---

## Project structure

```
src/
  components/
    admin/        AdminCollection (CRUD engine), Drawer
    auth/         AuthLayout, ProtectedRoute
    brand/        Logo + Monogram
    dashboard/    DashboardShell (shared user + admin chrome)
    layout/       Navbar, Footer, PublicLayout, WhatsAppButton
    seo/          Seo (per-page meta)
    ui/           Avatar, Poster, cards, Counter, inputs, etc.
  context/        AuthContext (Supabase auth + roles)
  data/           site.js, content.js  (sample content)
  hooks/          useReveal
  lib/            supabase.js, utils.js
  pages/          public pages, auth/, dashboard/, admin/
supabase/         schema.sql
brand/            og-image.svg source
scripts/          generate-assets.mjs
```

---

## Pages

Public: Home, About, Services, Portfolio (filter + search), Project detail, Testimonials, Journal (blog) + post, Contact.
Auth: Login, Register, Forgot password, Reset password.
User dashboard: Profile, Saved projects, Notifications, Security.
Admin console: Overview, Projects, Media, Testimonials, Team, Services, Journal, Users.

---

## Notes

- Avatars are generated from initials (Durell Njie becomes DN). No stock profile icons are used.
- All iconography is Lucide. There are no emojis in the product.
- Admin modules persist in-session out of the box; the Supabase tables already exist, so wiring each module to live data is a matter of swapping the local state handlers in `AdminCollection` for Supabase queries.
```
