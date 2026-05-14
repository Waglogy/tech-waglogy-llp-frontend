# SEO Fix Plan — Phase 1 Readiness for waglogy.in

**Status:** Site is **not** ready to submit to Google Search Console or Bing Webmaster yet.
**Estimated effort to fix:** 2–4 focused hours of development + 1 deploy.
**Owner:** Dev / engineering.

This document covers ONLY what must change before Phase 1 (search engine submission). It does not duplicate `SEO_GUIDE.md` or `SEO_QUICK_START.md` — those cover ongoing strategy.

---

## TL;DR — the three blockers

| # | Blocker | Effect on SEO | Fix |
|---|---|---|---|
| 1 | `vercel.json` rewrites every URL to `/` | Every prerendered page is hidden; crawlers see homepage HTML for every URL → duplicate content penalty | Replace catch-all rewrite (Section 1) |
| 2 | `dist/` build did not run the prerender step | `#root` is empty in deployed HTML; crawlers see only the noscript fallback | Run full `npm run build` and verify (Section 3) |
| 3 | `prerender.js` only handles 9 of 62 sitemap routes | City + insights pages serve empty SPA shells to bots | Make prerender route list dynamic (Section 2) |

Fix all three, redeploy, verify with `curl`, then submit.

---

## What's already correct — DO NOT TOUCH

- `public/robots.txt` — well-formed, references the sitemap, allows main bots, disallows `/admin`.
- `public/sitemap.xml` — 62 URLs including home, services, pricing, projects, 10 city pages, 49 insights, legal pages.
- `index.html` source — meta tags, OG, Twitter card, geo tags, full JSON-LD `@graph` (Organization + ProfessionalService + WebSite).
- Per-page `<SEO />` wrapper component using `react-helmet-async` — 12 of 13 pages already wired up.
- `prerender.js` infrastructure — works correctly for the routes it knows about; only the route list is incomplete.
- Google Analytics tag (G-64PPXWEEJ4).

---

## Section 1 — Fix `vercel.json` (Blocker 1)

### Current state — WRONG

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  ...
}
```

This serves `dist/index.html` for **every** request, even when a prerendered `dist/about/index.html` exists. Crawlers therefore see identical HTML on every URL and treat the entire site as duplicate content.

### Target state — CORRECT

Vercel's default static behavior is to serve `dist/<route>/index.html` automatically when the URL matches. We only need a fallback for truly unknown routes (the SPA `<NotFound />`).

Replace `vercel.json` with:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/((?!.*\\.).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/robots.txt",
      "headers": [{ "key": "Content-Type", "value": "text/plain" }]
    },
    {
      "source": "/sitemap.xml",
      "headers": [{ "key": "Content-Type", "value": "application/xml" }]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

**What changes:**

- The rewrite source `/((?!.*\.).*)` matches only paths with **no dot** (i.e., not `/assets/index-abc.js`, not `/banner.png`), so Vercel still resolves static files normally.
- For paths like `/about`, Vercel looks for `dist/about/index.html` first (because of `cleanUrls: true`) and only falls back to `/index.html` if nothing matches — which is what we want for unknown routes hitting the React `<NotFound />` page.
- Added Referrer-Policy and Permissions-Policy headers (small bonus, no SEO change).
- Added long-lived cache headers for `/assets/*` (these are hashed filenames, safe to cache forever).

**Important note on the `NotFound` route:** When the fallback hits `/index.html`, React Router will render the catch-all `<NotFound />` component client-side. Make sure `NotFound.jsx` returns a `<meta name="robots" content="noindex">` via the `SEO` component (it currently doesn't — verify and add if missing).

### Verify NotFound has noindex

Open `src/pages/NotFound.jsx` and confirm it includes:

```jsx
<SEO
  title="Page Not Found | Tech Waglogy LLP"
  description="The page you are looking for could not be found."
  page="notfound"
  robots="noindex, follow"
/>
```

If your `SEO` component doesn't yet accept a `robots` prop, add one to `src/components/SEO.jsx`:

```jsx
const SEO = ({ ..., robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }) => {
  // ...
  return (
    <Helmet>
      {/* ... */}
      <meta name="robots" content={robots} />
      {/* ... */}
    </Helmet>
  )
}
```

---

## Section 2 — Expand `prerender.js` to cover all 62 routes (Blocker 3)

### Current state

`prerender.js` hard-codes 9 routes:

```js
const routes = [
  '/', '/about', '/services', '/contact', '/pricing',
  '/projects', '/insights', '/privacy-policy', '/terms-conditions',
]
```

But the sitemap advertises 62 URLs. The missing 53 (10 cities + 49 insights articles + a couple of misc) currently serve the SPA shell to crawlers — even after we fix Blocker 1, because their HTML simply doesn't exist on disk.

### Target state

Make the route list dynamic by reading from the same data sources the React app uses. Replace the top of `prerender.js`:

```js
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Static routes (Layout-wrapped public pages)
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/pricing',
  '/projects',
  '/insights',
  '/privacy-policy',
  '/terms-conditions',
]

async function buildRouteList() {
  // Cities: import the ESM data module after the SSR build exists
  const citiesUrl = pathToFileURL(
    join(__dirname, 'src', 'data', 'cities.js')
  ).href
  const { cities } = await import(citiesUrl)
  const cityRoutes = cities.map((c) => `/web-development/${c.slug}`)

  // Insights: import the aggregated static insights list
  const insightsUrl = pathToFileURL(
    join(__dirname, 'src', 'data', 'staticInsights', 'index.js')
  ).href
  const { STATIC_INSIGHTS } = await import(insightsUrl)
  const insightRoutes = STATIC_INSIGHTS.map((i) => `/insights/${i.slug}`)

  return [...staticRoutes, ...cityRoutes, ...insightRoutes]
}

async function prerender() {
  console.log('🚀 Starting SSR pre-rendering...')

  const routes = await buildRouteList()
  console.log(`📋 Prerendering ${routes.length} routes`)

  const distDir = join(__dirname, 'dist')
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

  const serverEntryUrl = pathToFileURL(
    join(distDir, 'server', 'entry-server.js')
  ).href
  const { render } = await import(serverEntryUrl)

  // ... rest of the function stays the same
}
```

### Things to verify before this works

1. **`cities.js` and `staticInsights/index.js` must be pure ESM with no JSX imports.** A quick check:
   ```bash
   grep -E "import .*\.jsx" src/data/cities.js src/data/staticInsights/index.js
   ```
   should return nothing. If there are JSX imports, move them out — the data files should be plain data.

2. **`BlogDetail.jsx` and `CityLanding.jsx` must read their data deterministically from the same source in SSR.** Confirm `useParams()` works inside `<StaticRouter>` — it does in `react-router-dom` v7. Both pages already use it, so this is fine.

3. **`prerender.js` build step may take longer.** With 62 routes instead of 9, expect 30–90 seconds. That's fine for production deploys.

### Update `package.json` if Vercel uses a different build command

If your Vercel project settings have a custom build command, make sure it runs the FULL build, not `build:no-prerender`. In Vercel dashboard → Project Settings → Build & Development Settings, the build command should be:

```
npm run build
```

(Not `npm run build:no-prerender`.) This is the most common cause of Blocker 2.

---

## Section 3 — Build, deploy, and verify (Blocker 2)

### Step-by-step

```bash
# 1. Clean build
rm -rf dist
npm run build

# 2. Verify the static files exist
ls dist/about/index.html dist/services/index.html dist/contact/index.html
ls dist/web-development/gangtok/index.html
ls dist/insights/nextjs-business-websites-speed-seo/index.html

# 3. Spot-check that prerendered HTML actually contains content
grep -c "<h1" dist/about/index.html              # should be >= 1
grep -c "web-development" dist/web-development/gangtok/index.html   # should be > 0
wc -c dist/about/index.html                       # should be > 50,000 bytes (not the 6.3 KB SPA shell)

# 4. Confirm no empty #root
grep -A1 'id="root"' dist/about/index.html | head -5
# Should show actual HTML, not "<!-- Noscript fallback ..."
```

If any of those fail, prerender silently errored out — re-run with `node --trace-warnings prerender.js` to surface stack traces.

### After deploy — verify production

```bash
# Should return city-specific H1, not homepage H1
curl -sL https://waglogy.in/web-development/gangtok | grep -i "<h1"

# Should return services-specific title, not homepage title
curl -sL https://waglogy.in/services | grep -i "<title"

# Should return 200, not 404 or 301
curl -sI https://waglogy.in/insights/core-web-vitals-google-rankings-2025
```

If `curl` shows the homepage H1 / homepage title regardless of URL, vercel.json is still rewriting — go back to Section 1.

---

## Section 4 — Submit to search engines (only after Sections 1–3 pass)

### Google Search Console

1. Go to <https://search.google.com/search-console>.
2. Add Property → **Domain** property → enter `waglogy.in` (not `https://waglogy.in/`).
3. Verify via DNS TXT record at your domain registrar (e.g., GoDaddy, BigRock, Namecheap):
   - Type: `TXT`
   - Host: `@`
   - Value: `google-site-verification=<token Google gives you>`
   - TTL: default
4. Wait 5–60 minutes; click Verify.
5. In GSC → Sitemaps → submit `https://waglogy.in/sitemap.xml`.
6. URL Inspection → test the homepage and `/web-development/gangtok` → Request Indexing for each.

### Bing Webmaster Tools

1. Go to <https://www.bing.com/webmasters>.
2. Sign in with the same Google account you used for GSC.
3. Click **Import from Google Search Console** — Bing will pull your verified property + sitemap automatically. No DNS step needed.
4. Confirm `sitemap.xml` is showing in Sitemaps → Submitted.

### Additional submissions (low priority but quick)

- **IndexNow** (Bing + Yandex push API) — Vercel has a native IndexNow integration via the `vercel-plugin-indexnow` package. Optional.
- **Google Business Profile** — separate from GSC but critical for "near me" / map-pack queries. Set this up at <https://business.google.com> with the Tadong, Gangtok address, business hours, and photos. This is mandatory for ranking in the local pack.

---

## Section 5 — Sanity checks before you call it done

Run through this checklist. Every box must be green before submission.

- [ ] `vercel.json` no longer has a catch-all `/(.*) → /` rewrite.
- [ ] `npm run build` completes without errors AND outputs `dist/<route>/index.html` for all 62 sitemap URLs.
- [ ] `dist/about/index.html` is > 50 KB (real prerendered HTML, not 6 KB shell).
- [ ] `curl -sL https://waglogy.in/services | grep -i "<title"` returns "Services" not "#1 Web & App Development".
- [ ] `curl -sL https://waglogy.in/web-development/gangtok | grep -i "<h1"` returns "Gangtok" in the H1.
- [ ] `curl -sI https://waglogy.in/sitemap.xml` returns `Content-Type: application/xml` and `200 OK`.
- [ ] `curl -sI https://waglogy.in/robots.txt` returns `Content-Type: text/plain` and `200 OK`.
- [ ] Test in <https://search.google.com/test/rich-results> with the homepage URL — should show valid Organization + LocalBusiness schemas.
- [ ] Test with <https://validator.schema.org> — no errors.
- [ ] Lighthouse SEO score on the homepage ≥ 95.
- [ ] Lighthouse SEO score on `/web-development/gangtok` ≥ 95.

---

## Section 6 — What this fix unlocks (and what it doesn't)

**Unlocks immediately after deploy + GSC submission:**
- Google can now crawl and index 62 distinct pages instead of seeing 1 page repeated.
- City landing pages become eligible to rank for "web development in Gangtok", "in Sikkim", "in Guwahati" etc.
- 49 insights articles become topical authority signals for "Northeast India" + "web development" + "AI" clusters.
- Rich results eligibility (Organization, LocalBusiness, FAQ where applicable).

**Does NOT unlock (needs separate Phase 2 work):**
- Google Business Profile / map-pack rankings — requires the GBP setup mentioned in Section 4.
- Backlinks — you'll need outreach, directory listings, and PR.
- Reviews — encourage clients to leave Google reviews on the GBP listing.
- Real local case studies with named clients + photos — your strategy doc calls these out as a trust wedge. Worth a dedicated case study page per client.
- AI / Generative Engine Optimization (GEO) — separate workstream: FAQ-rich content, clear entity definitions, citations to authoritative sources, content structured for LLM consumption (clear H2/H3 hierarchy, direct answer paragraphs near top).

---

## Section 7 — Suggested Phase 2 (after Phase 1 is live and crawled)

Don't start these until GSC shows pages being indexed (usually 1–3 weeks post-submission).

1. **Real case studies** — replace stock images with 3–5 named local client case studies (hotel, homestay, government project, NGO, school). Each gets its own page with results, photos, testimonial.
2. **Google Business Profile** — full setup with photos, hours, services list, regular posts.
3. **City page expansion** — write 600–1000 words of unique content per city (currently mostly templated). Each should have a real local FAQ, real client mentions if available, neighborhood-specific signals.
4. **AI / GEO content** — write 5–10 longform pieces with direct-answer paragraphs, FAQ schema, and clear entity references that LLMs (ChatGPT, Perplexity, Gemini) will cite. Topics: "best web development companies in Sikkim", "how much does a website cost in Gangtok", "AI automation for hotels in Northeast India".
5. **Local backlinks** — Sikkim Chamber of Commerce, NE business directories, university partnerships, local press coverage of any client wins.

---

## Quick reference: file paths to edit

| File | Change |
|---|---|
| `vercel.json` | Replace catch-all rewrite (Section 1) |
| `prerender.js` | Make route list dynamic (Section 2) |
| `src/components/SEO.jsx` | Add `robots` prop (Section 1, NotFound subsection) |
| `src/pages/NotFound.jsx` | Pass `robots="noindex, follow"` to `<SEO>` (Section 1) |
| Vercel dashboard | Confirm build command is `npm run build`, not `build:no-prerender` |

---

**Once Sections 1–4 are complete and Section 5 checklist is fully green, you're ready to submit.**
Expected results: pages start appearing in GSC within 3–7 days; first rankings for "web development gangtok" and "website development sikkim" within 30–60 days; top-3 for primary keywords by day 90.
