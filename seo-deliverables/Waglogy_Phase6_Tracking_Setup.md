# Phase 6 — Tracking Setup Pack

> If you don't measure, you can't improve. Everything below is free. Total setup time: ~2 hours. After that, ~30 minutes per week.

---

## What you're setting up

| Tool | Purpose | Setup time | Check frequency |
|---|---|---|---|
| Google Search Console (GSC) | Keyword rankings, indexing health, click-through | 20 min | Weekly |
| Google Analytics 4 (GA4) | Traffic, conversions, sources | 30 min | Weekly |
| Bing Webmaster Tools | Same as GSC, for Bing | 5 min (import from GSC) | Monthly |
| GBP Insights | How users find your listing | 0 (auto, once GBP claimed) | Weekly |
| PageSpeed Insights | Core Web Vitals | 0 (web tool) | Weekly |
| Manual rank tracking sheet | Position-tracking for top 30 keywords | 10 min initial | Weekly |

---

## 1. Google Search Console — Domain property setup (20 min)

A **Domain property** tracks both `www.waglogy.in` and `waglogy.in` and all subdomains in one report. This is preferred over URL-prefix properties.

### Steps

1. Go to **search.google.com/search-console**
2. Click **+ Add property → Domain**
3. Enter `waglogy.in` (no `https://`, no `www.`)
4. GSC asks you to verify by adding a TXT record to your DNS.
5. Log in to your domain registrar (likely GoDaddy, Hostinger, Cloudflare, or similar)
6. Find the DNS settings for `waglogy.in`
7. Add a new record:
   - **Type:** `TXT`
   - **Host / Name:** `@` (or leave blank, depending on registrar)
   - **Value:** [the long string GSC gives you, starts with `google-site-verification=...`]
   - **TTL:** Default (3600 or 1 hour)
8. Save. Wait 5–15 minutes for DNS propagation.
9. Back in GSC, click **Verify**.

### Submit your sitemap

1. In GSC, left sidebar → **Sitemaps**
2. In the "Add a new sitemap" field, type: `sitemap.xml`
3. Click **Submit**
4. Status should turn to **Success** within 24 hours. If it shows "Couldn't fetch", verify `https://waglogy.in/sitemap.xml` returns a 200.

### What to check weekly in GSC

- **Performance → Search results** → which queries you ranked for. Sort by impressions descending.
- **Coverage → Indexed pages** → confirm all 11 city pages + 5 service pages + blog posts are indexed.
- **Experience → Core Web Vitals** → fix anything in the "Poor" or "Needs improvement" buckets.
- **Enhancements** → check that LocalBusiness, FAQPage, BreadcrumbList structured data are detected without errors.

---

## 2. Google Analytics 4 — Setup with conversion goals (30 min)

### Step A: Create the GA4 property

1. Go to **analytics.google.com**
2. **Admin → Create → Property**
3. Property name: `Waglogy.in (Production)`
4. Time zone: `India (GMT+05:30)`
5. Currency: `Indian Rupee (INR)`
6. **Business details:** Industry = "Professional services", Size = small
7. **Business objectives:** select "Generate leads" + "Examine user behavior"
8. **Data stream:** Web → enter `https://waglogy.in` and stream name `Waglogy Web`
9. GA4 gives you a **Measurement ID** in the format `G-XXXXXXXXXX`. Copy it.

### Step B: Install the gtag.js snippet

Add to your `index.html` `<head>`. Replace `G-XXXXXXXXXX` with your actual Measurement ID:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    // SPA-aware: send page_view manually on route changes (see Step D)
    send_page_view: false
  });
</script>
```

### Step C: Define conversion events in GA4

In GA4: **Admin → Events → Create event**. Create three custom events that mark high-value actions:

| Event name | When it fires | Mark as conversion? |
|---|---|---|
| `generate_lead` | Contact form submit success | ✅ Yes |
| `phone_call_click` | User clicks any `tel:+91...` link | ✅ Yes |
| `whatsapp_click` | User clicks any `wa.me/...` link | ✅ Yes |

After creating each event, toggle **Mark as conversion** ON in the conversions list.

### Step D: Wire the events into the React code

Three small code edits to capture the conversions you defined.

#### Edit 1 — Track route changes (SPA page_view)

Create a tiny hook `src/hooks/useGTagPageview.js`:

```js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = 'G-XXXXXXXXXX' // ← replace

export default function useGTagPageview() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', GA_ID, {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])
}
```

Then in `src/App.jsx`, call it once at the top of the `App()` function (before `return`):

```js
import useGTagPageview from './hooks/useGTagPageview'

function App() {
  useGTagPageview()
  return (
    <Routes>
      ...
    </Routes>
  )
}
```

#### Edit 2 — Contact form submit (generate_lead conversion)

In `src/pages/Contact.jsx`, find the success block (around line 75–80, right after `await submitContactForm(apiData)`):

```jsx
await submitContactForm(apiData)

// ── GA4 conversion ────────────────────────────────
if (typeof window.gtag === 'function') {
  window.gtag('event', 'generate_lead', {
    form_location: 'contact_page',
    service: formData.service || 'unspecified',
    budget_range: formData.budget || 'unspecified',
    value: 1,
    currency: 'INR',
  })
}
// ──────────────────────────────────────────────────

setSubmitStatus('success')
setShowSuccessModal(true)
```

The same pattern applies to the inline query form on the city landing pages (`src/pages/CityLanding.jsx`, after the `await submitQuery(...)` call) — fire `generate_lead` with `form_location: 'city_landing_${citySlug}'` so you can attribute leads to specific city pages in GA4.

#### Edit 3 — Phone & WhatsApp clicks

The cleanest pattern is a small click-tracking utility. Create `src/utils/track.js`:

```js
export function trackPhoneClick(location = 'unknown') {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'phone_call_click', { location })
  }
}

export function trackWhatsappClick(location = 'unknown') {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', { location })
  }
}
```

Then in `src/components/Header.jsx` and `src/components/Footer.jsx`, add `onClick` handlers to the existing tel/WhatsApp links:

```jsx
import { trackPhoneClick, trackWhatsappClick } from '../utils/track'

<a
  href="tel:+919733814168"
  onClick={() => trackPhoneClick('header')}
>
  …
</a>

<a
  href="https://wa.me/919733814168"
  onClick={() => trackWhatsappClick('header')}
  target="_blank" rel="noopener noreferrer"
>
  …
</a>
```

Repeat in `src/components/Footer.jsx` (with `'footer'` location) and `src/components/ServiceArea.jsx` (with `'service_area'` location).

### Step E: Verify the events fire

1. Open `https://waglogy.in/` in a fresh browser tab
2. In GA4, go to **Reports → Realtime**
3. Click around: the page_view count should rise. Click the WhatsApp link — `whatsapp_click` should appear in the **Event count by Event name** card within ~30 seconds.
4. Submit the contact form (use a test email) — `generate_lead` should appear.

If nothing fires, open browser DevTools → Console. Type `window.dataLayer` — it should be a populated array. If undefined, the gtag snippet didn't load (check `index.html`).

---

## 3. Bing Webmaster Tools (5 min — import from GSC)

1. Go to **bing.com/webmasters**
2. Sign in with the same Google account or a Microsoft account
3. **Add your site → Import from Google Search Console**
4. Select `waglogy.in`
5. Done. Bing inherits your verification + sitemap.

Why it matters for you: Northeast users running Microsoft Edge default to Bing. Real percentage: typically 8–12% of NE search traffic, not negligible.

---

## 4. GBP Insights (free, automatic once GBP is claimed)

Once your GBP listing is verified:
- Open `business.google.com`
- **Performance** tab shows: searches that surfaced your listing, calls, direction requests, website clicks, message requests
- **Photos → Performance** shows views per photo (use this to figure out which kinds of photos to upload more of)

Log these monthly in your tracking sheet:
- Total profile views (search + map combined)
- Calls
- Direction requests
- Website clicks
- Top search queries

---

## 5. PageSpeed Insights — Core Web Vitals (5 min/week)

1. Go to **pagespeed.web.dev**
2. Test these 3 URLs every Monday morning:
   - `https://waglogy.in/`
   - `https://waglogy.in/web-development/gangtok`
   - `https://waglogy.in/services` (or your top trafficking service page)
3. Targets (mobile, the column that matters):
   - **LCP (Largest Contentful Paint)** < 2.5s
   - **INP (Interaction to Next Paint)** < 200ms
   - **CLS (Cumulative Layout Shift)** < 0.1
   - **Performance score** > 90
4. Anything in the red — fix this week. Common quick wins:
   - Convert PNG/JPG hero images to WebP
   - Add `loading="lazy"` to below-the-fold `<img>` tags
   - Remove unused JS bundles (your current `index-XXX.js` is 1.36 MB — code-split via dynamic imports)

---

## 6. Manual rank tracking sheet (10 min initial, 15 min/week)

Already pre-populated for you in **`Waglogy_Phase3_Keyword_Map.xlsx → Tracking Sheet`**. Each row has a keyword and a target URL.

### Weekly workflow

1. Every Monday morning, open an **Incognito** browser window (regular browsing is personalised and lies to you)
2. For each of the top 20 keywords in the Tracking Sheet, do a Google search
3. Set your location to the target city in the URL (`https://www.google.com/search?q=KEYWORD&gl=in&near=Gangtok`)
4. Find your URL in the results. Note the position (1, 2, 3, …) — if not in top 50, mark `>50`
5. Log in the corresponding month's column

The "Best rank" column auto-calculates the lowest (best) rank seen across all months — that's your high-water mark.

### Tools that can automate this (free tier)

- **Google Search Console → Performance** — gives you average position automatically for queries you've already ranked for
- **Ubersuggest free tier** — 3 free rank-tracking queries per day
- **Serprobot free tier** — limited but functional
- **Manual** — most reliable for exact local rankings (algorithms personalise even logged-out queries)

---

## 7. Monthly KPI scorecard

Create a Google Sheet (or use the keyword spreadsheet) with these columns. Log on the 1st of every month.

| KPI | Source | Target trend |
|---|---|---|
| Organic traffic (sessions) | GA4 → Reports → Acquisition → Traffic acquisition → "Organic Search" | Up MoM |
| Top-30 keyword positions | Tracking Sheet | Up MoM (lower number = better) |
| Total indexed pages | GSC → Pages → Indexed | Up over time |
| Average CTR (top 10 ranking queries) | GSC → Performance | >3% target |
| Conversions (generate_lead) | GA4 → Reports → Engagement → Conversions | Up MoM |
| Conversions (phone_call_click) | GA4 → Conversions | Up MoM |
| Conversions (whatsapp_click) | GA4 → Conversions | Up MoM |
| GBP profile views | GBP Insights | Up MoM |
| GBP calls | GBP Insights | Up MoM |
| GBP direction requests | GBP Insights | Up MoM |
| Total reviews | GBP | +5/month target |
| Avg review rating | GBP | ≥4.7 target |
| Backlinks gained | Ubersuggest free / Ahrefs Webmaster Tools | +2/month target |
| Core Web Vitals score (homepage) | PageSpeed Insights | All green |

---

## 8. What "good" looks like at 90 days

- ✅ All 5 tools above set up and being checked weekly
- ✅ All 16 essential routes (home + 5 services + 11 cities) indexed in GSC
- ✅ Zero structured-data errors in GSC Enhancements
- ✅ Average position improving for at least 10 of your top 30 keywords
- ✅ At least 50 organic search clicks/week (low bar, you'll likely beat this)
- ✅ At least 5 contact-form leads attributable to organic traffic
- ✅ Core Web Vitals all green on mobile

---

## 9. Common pitfalls

- **Forgetting to mark events as conversions in GA4** — they fire but don't appear in the Conversions report until you toggle them ON. Easy to miss.
- **Filtering yourself out of GA4** — set up an internal traffic filter using your office IP so your own visits don't pollute the data.
- **Not testing the conversion events** — write a checklist of "submit form, click WhatsApp, click phone" and run through it after every deploy. Conversions silently broken are worse than no tracking.
- **Personalised rank-checking** — always use Incognito + city-specific location. Your normal browser shows you ranks 5-10 positions better than reality.
- **Looking at GSC data day-by-day** — GSC has 2-3 day reporting lag. Always look at week-over-week or month-over-month, not yesterday-vs-today.

---

## 10. Set-and-forget after this week

After the initial setup, the recurring time commitment is:

| Frequency | Task | Time |
|---|---|---|
| Weekly Monday | GSC + GA4 quick check + rank-tracking | 30 min |
| Weekly Monday | GBP post + check Insights | 15 min |
| Weekly Monday | PageSpeed test on top 3 URLs | 5 min |
| Monthly 1st | Update KPI scorecard, write 200-word internal note | 30 min |

Total: ~50 min/week. The scorecard is what catches problems early — if organic traffic dips two months in a row, that's your early warning.
