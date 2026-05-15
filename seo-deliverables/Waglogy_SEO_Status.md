# Waglogy SEO — Live Status Tracker

> Single source of truth for the 90-day SEO action plan. Update this file as you complete items. Last updated: **2026-05-15**.

---

## At a glance

| Phase | What | Status | Progress |
|---|---|---|---|
| 1 | Technical Foundation | **Mostly done** | 4/5 |
| 2 | Local SEO Dominance | **Doc ready, awaiting execution** | 0/3 (setup pack shipped) |
| 3 | On-Page & Keyword Strategy | **Done** | 4/4 |
| 4 | Content Strategy (Blog) | **Not started** | 0/26 posts |
| 5 | Backlinks & Authority | **Not started** | 0/9 |
| 6 | Track, Measure, Iterate | **Doc ready, awaiting execution** | 0/8 (setup pack shipped) |

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

> 📄 **Setup pack shipped:** `Waglogy_Phase2_GBP_Setup.md` (claim guide, 745-char description, 10 services with copy, photo checklist, NAP doc, review templates) and `Waglogy_GBP_Posts.md` (4 ready-to-post Google Business Posts).

| Item | Status | Notes |
|---|---|---|
| Google Business Profile claimed + every field complete | 📄 Doc ready | Run through `Waglogy_Phase2_GBP_Setup.md` sections 1–4. ~2 hours. |
| NAP consistency doc | ✅ Done | Canonical NAP defined in GBP setup section 2. Use everywhere. |
| 20+ photos uploaded to GBP | 📄 Doc ready | Section 5 of GBP setup pack — exact mix of 21 photos by category. |
| First Google Business Post | 📄 Doc ready | Post 1 in `Waglogy_GBP_Posts.md` ready to publish today. |
| Weekly Google Business Posts cadence | 📄 Doc ready | Posts 2–4 scheduled for weeks 2–4. Continue with the evergreen template. |
| 20+ Google reviews in 60 days | 📄 Templates ready | Section 6 of GBP setup pack — review request + 3 reply templates. |
| Bing Places, Apple Business Connect | ⬜ Pending | Free, ~30 min total. (Bing Webmaster covered in Phase 6 doc.) |
| JustDial, Sulekha, IndiaMART, Yellow Pages, AskLaila | ⬜ Pending | High-DA India directories. NAP doc in GBP setup ensures consistency. |
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

> 📄 **Setup pack shipped:** `Waglogy_Phase6_Tracking_Setup.md` (GSC domain property + DNS verify, GA4 setup with 3 conversion events wired into your contact form / phone / WhatsApp links, Bing import, manual rank-tracking workflow, monthly KPI scorecard).

| Tool | Status | Notes |
|---|---|---|
| Google Search Console | 📄 Doc ready | Section 1 of tracking pack. ~20 min including DNS verify + sitemap submit. |
| Google Analytics 4 | 📄 Doc ready | Section 2 — includes copy-paste code for `useGTagPageview` hook + contact form `generate_lead` event + `phone_call_click` / `whatsapp_click` utilities. |
| Bing Webmaster Tools | 📄 Doc ready | Section 3 — 5 min, imports from GSC. |
| Google Business Profile Insights | ⬜ Auto | Activates automatically once GBP is verified (Phase 2). |
| PageSpeed Insights monitoring | 📄 Doc ready | Section 5 — weekly Monday check on top 3 URLs. |
| Ubersuggest free tier / Keyword Planner | ✅ Done | Used for Phase 3 keyword spreadsheet. |
| AnswerThePublic | ⬜ Pending | Use for Phase 4 blog post research when you start writing. |
| Manual rank tracking sheet | ✅ Done | `Tracking Sheet` tab pre-populated in `Waglogy_Phase3_Keyword_Map.xlsx`. Workflow in tracking pack section 6. |
| Monthly KPI scorecard | 📄 Doc ready | Section 7 of tracking pack — 14-row template with sources for each KPI. |

**KPIs to log monthly (per the SEO doc):**
- Organic traffic (GA4)
- Keyword positions for top 30 (Tracking Sheet)
- GBP impressions, calls, direction requests
- Backlinks gained (count + DA-weighted)
- Reviews count + avg star rating
- Conversions (contact form + phone clicks)

---

## What I'd recommend tackling next

1. **Phase 1 cleanup** (10 min) — strip `#1` and meta-keywords typo from `index.html` and `src/config/seo.js > PAGE_SEO.home.title`
2. **Phase 2 GBP claim** (2 hours) — execute `Waglogy_Phase2_GBP_Setup.md` end-to-end. Postcard takes 5–14 days but you can complete every other field today
3. **Phase 6 GSC + GA4 setup** (2 hours) — execute `Waglogy_Phase6_Tracking_Setup.md`. Required before any phase 4 / 5 work because you need to see what's working
4. **Phase 4 first 3 blog posts** (next 2 weeks) — long-tail traffic + conversion
5. **Phase 5 outreach toolkit** (week 4)

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
