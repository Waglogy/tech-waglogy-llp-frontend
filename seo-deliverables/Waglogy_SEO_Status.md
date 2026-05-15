# Waglogy SEO — Live Status Tracker

> Single source of truth for the 90-day SEO action plan. Update this file as you complete items. Last updated: **2026-05-15**.

---

## At a glance

| Phase | What | Status | Progress |
|---|---|---|---|
| 1 | Technical Foundation | **Mostly done** | 4/5 |
| 2 | Local SEO Dominance | **Not started** | 0/3 |
| 3 | On-Page & Keyword Strategy | **Done** | 4/4 |
| 4 | Content Strategy (Blog) | **Not started** | 0/26 posts |
| 5 | Backlinks & Authority | **Not started** | 0/9 |
| 6 | Track, Measure, Iterate | **Not started** | 0/8 |

---

## Phase 1 — Technical Foundation ⚙️

| Item | Status | Notes |
|---|---|---|
| Fix JavaScript rendering (P0) | ✅ Done | Vite SSR + custom `prerender.js` produces static HTML for every route in `sitemap.xml`. No Next.js migration needed. |
| Google Search Console (domain property + DNS verify) | ⬜ Pending | Phase 6 dependency. |
| Bing Webmaster Tools (import from GSC) | ⬜ Pending | Phase 6 dependency. |
| XML sitemap submitted | ⬜ Pending | `public/sitemap.xml` exists; needs to be submitted in GSC. |
| robots.txt published | ✅ Done | Confirmed in `public/`. |
| Schema.org JSON-LD (LocalBusiness, Organization, Website, Breadcrumb, FAQ, Service) | ✅ Done | Global + per-city schemas live via `<StructuredData />`. |
| Core Web Vitals (LCP/INP/CLS green) | ⬜ Pending | Run pagespeed.web.dev once GSC is set up. |
| Title rewrites (no `#1` superlative) | ⬜ Pending | Homepage title still says "#1 Web & App Development Company". Fix in `index.html` and `src/config/seo.js > PAGE_SEO.home.title`. |
| Remove meta keywords with typos | ⬜ Pending | `index.html` keyword meta still present. Delete it. |

**This week's P0:**
1. Submit sitemap to GSC + Bing.
2. Remove `#1` superlative from homepage title.
3. Delete meta keywords tag from `index.html`.

---

## Phase 2 — Local SEO Dominance 🗺️

| Item | Status | Notes |
|---|---|---|
| Google Business Profile claimed + every field complete | ⬜ Pending | Single biggest local SEO lever. ~2 hours of work. Do this week. |
| 20+ photos uploaded to GBP | ⬜ Pending | Office, team, work samples. |
| Weekly Google Business Posts | ⬜ Pending | Set as a recurring task. |
| 20+ Google reviews in 60 days | ⬜ Pending | Ask every past client. Aim for reviews mentioning service + city. |
| NAP consistency doc | ⬜ Pending | Decide canonical format and use it everywhere. |
| Bing Places, Apple Business Connect | ⬜ Pending | Free, ~30 min total. |
| JustDial, Sulekha, IndiaMART, Yellow Pages, AskLaila | ⬜ Pending | High-DA India directories. |
| Clutch, GoodFirms, DesignRush, TechBehemoths | ⬜ Pending | B2B credibility. |
| LinkedIn, Facebook, Instagram, YouTube — fully complete | ⬜ Pending | Brand-search support. |

---

## Phase 3 — On-Page & Keyword Strategy ✅

| Item | Status | Notes |
|---|---|---|
| Site architecture (services + 11 location pages) | ✅ Done | URL pattern `/web-development/:city` is live with all 11 NE cities prerendered. |
| Location page template with all required sections | ✅ Done | Hero, intro, why-choose, services, case studies, industries, FAQ, nearby areas, schema, CTA. |
| Long-form copy on all 11 location pages (≥800 words each) | ✅ Done | All 11 cities at 1,016–1,344 words. |
| Keyword research spreadsheet | ✅ Done | `Waglogy_Phase3_Keyword_Map.xlsx` — 7 sheets, 60 formulas, zero errors. |
| On-page rules (one H1, title ≤60 chars, meta 140-160, kw in first 100 words) | ✅ Done | All 11 cities verified. |
| Per-city LocalBusiness + Service schema | ✅ Done | Plus FAQPage and BreadcrumbList. |
| Internal linking (3-5 links per page) | ✅ Done | Each city page links to 10 sibling city pages + service pages. |

**Word counts (verified):**

```
gangtok:    1,298  shillong:   1,265  itanagar:   1,016
sikkim:     1,332  siliguri:   1,193  imphal:     1,063
guwahati:   1,344  darjeeling: 1,237  aizawl:     1,061
                                      kohima:     1,023
                                      agartala:   1,044
```

**Files shipped:**
- `src/data/citiesRichContent.js` — all 11 cities of rich content
- `src/data/cities.js` — wired via `withRichContent()` + tightened SEO meta
- `src/config/seo.js` — `generateCityLocalBusinessSchema()` + `generateCityServiceSchema()`
- `src/pages/CityLanding.jsx` — renders intro, why-choose, case studies, industry details, nearby areas
- `seo-deliverables/Waglogy_Phase3_Keyword_Map.xlsx`
- `seo-deliverables/_verify.mjs` — re-runnable verification script

---

## Phase 4 — Content Strategy (Blog) 📝

26 blog posts planned (see Long-tail sheet in keyword spreadsheet for the full list, ranked P0–P2).

**P0 to ship in next 30 days:**
- ⬜ How Much Does It Cost to Build a Website in Sikkim in 2026?
- ⬜ How to Choose a Web Development Company in Gangtok (Red/Green Flags)
- ⬜ Best Hotel Website Designs in Sikkim — and What Makes Them Work
- ⬜ Local SEO for Sikkim Businesses: Rank in Gangtok in 90 Days
- ⬜ How AI is Transforming Small Businesses in Northeast India
- ⬜ Mobile App Development Cost in Sikkim & Northeast India
- ⬜ How to Get Your Sikkim Business on Google Maps (Step-by-Step)

**Cadence target:** 1–2 posts per week, 1,200–2,500 words each, FAQ schema on posts that answer specific questions.

---

## Phase 5 — Backlinks & Authority 🔗

| Item | Status | Notes |
|---|---|---|
| Pitch guest posts to NE news (SikkimExpress, EastMojo, Sikkim Chronicle, Northeast Today, Assam Tribune) | ⬜ Pending | Angle: "Local entrepreneur building AI tools for NE India." |
| HARO / Qwoted / SourceBottle daily monitoring | ⬜ Pending | Set up daily inbox check. |
| Clutch, GoodFirms, DesignRush, TechBehemoths, G2 listings | ⬜ Pending | Free profiles. |
| Local sponsorships in kind (NGO/school audits) | ⬜ Pending | Outreach template needed. |
| Open source contributions | ⬜ Pending | One PR/month to a popular repo. |
| Podcast appearances | ⬜ Pending | Pitch list of Indian tech podcasts. |
| Reddit + Quora (r/india, r/Sikkim, r/webdev) | ⬜ Pending | Genuine answers, occasional links. |
| LinkedIn long-form articles (1/month under founder) | ⬜ Pending | Recurring task. |
| Local college partnerships (Sikkim Univ, SMU, NITs) | ⬜ Pending | Guest lectures, internships. |

**Don't do:** bought backlinks, reciprocal exchanges, PBNs, spam comments, exact-match anchor stuffing.

---

## Phase 6 — Track, Measure, Iterate 📊

| Tool | Status | Notes |
|---|---|---|
| Google Search Console | ⬜ Pending | Domain property, DNS verify. Check weekly. |
| Google Analytics 4 | ⬜ Pending | Conversion goals: contact form + phone-call clicks. |
| Bing Webmaster Tools | ⬜ Pending | Import from GSC. |
| Google Business Profile Insights | ⬜ Pending | Auto once GBP is claimed. |
| PageSpeed Insights monitoring | ⬜ Pending | Weekly check. |
| Ubersuggest free tier / Keyword Planner | ⬜ Pending | Already used for the Phase 3 keyword spreadsheet. |
| AnswerThePublic | ⬜ Pending | Use for Phase 4 blog post research. |
| Manual rank tracking sheet | ⬜ Pending | `Tracking Sheet` tab in keyword spreadsheet pre-populated. Update weekly. |

**KPIs to log monthly (per the SEO doc):**
- Organic traffic (GA4)
- Keyword positions for top 30 (Tracking Sheet)
- GBP impressions, calls, direction requests
- Backlinks gained (count + DA-weighted)
- Reviews count + avg star rating
- Conversions (contact form + phone clicks)

---

## What I'd recommend tackling next

1. **Phase 2 GBP claim** (this week — 2 hours, biggest single local SEO lever)
2. **Phase 1 cleanup** (remove `#1` and meta keywords from `index.html` — 10 mins)
3. **Phase 6 GSC + GA4 setup** (this week — required to measure everything)
4. **Phase 4 first 3 blog posts** (next 2 weeks — start ranking long-tail)
5. **Phase 5 outreach toolkit** (week 4 — pitch templates ready to send)

---

## Re-running verification

To re-verify all 11 city pages after future edits:

```bash
cd seo-deliverables
node _verify.mjs
```

To re-build the static HTML for all routes:

```bash
npm run build
```

That's it. Sikkim is winnable. Northeast is winnable. Keep shipping.
