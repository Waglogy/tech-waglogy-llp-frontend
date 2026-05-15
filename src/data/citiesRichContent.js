// ────────────────────────────────────────────────────────────────────────────
// Phase 3 — On-Page & Keyword Strategy
// ────────────────────────────────────────────────────────────────────────────
// Long-form, SEO-optimised content for the three priority location pages
// (Gangtok, Sikkim, Guwahati). Other NE cities continue to use the slim
// schema in cities.js until their content is built out.
//
// Each entry adds:
//   intro            – ~150-word lead paragraph (mentions city 3-4×)
//   whyChoose        – 4-6 reasons w/ title + body
//   serviceDetails   – City-specific copy for each core service
//   caseStudies      – 2-3 mini case studies (use real client data when ready)
//   industryDetails  – Industries with description (vs the existing labels-only)
//   extendedFaqs     – Additional 3-4 FAQs to push the page to 6-8 total
//   nearbyAreas      – Towns/cities served from this hub (cross-mention)
//   stats            – City-credible stats override
//   localContent     – ~200-word "we know this market" section
// ────────────────────────────────────────────────────────────────────────────

export const citiesRichContent = {
  // ──────────────────────────────────────────────────────────────────────
  // GANGTOK
  // ──────────────────────────────────────────────────────────────────────
  gangtok: {
    intro: `Tech Waglogy LLP is a web development company in Gangtok, Sikkim — built and based right here in the city, not a Delhi or Bangalore agency claiming to "serve" Gangtok from a thousand kilometres away. We work with hotels in Tadong, homestays in Ranka, schools in Development Area, restaurants on MG Marg, and government departments across Gangtok district to build websites, mobile apps, and AI-powered tools that actually work for the way business gets done in this city. Whether you need a booking-capable website for your hotel before the next tourist season, a custom CRM to manage your tour operator bookings, or an AI chatbot to handle reservations in English, Hindi, and Nepali — we build it from our office in Tadong, with in-person meetings whenever you need them.`,

    localContent: `Gangtok is where we started, and we understand it. We know what changes when monsoon shuts down half the inbound tourism. We know the difference between a website that works on a tourist's spotty 3G connection in North Sikkim and one that doesn't. We know which payment gateways play nicely with the small-business banking your local clients actually use. And we know that a hotel in Gangtok competing for direct bookings against MakeMyTrip and Booking.com needs a fundamentally different kind of website than a generic agency would build. That context shapes every project — from how we write the copy, to which integrations we choose, to how we test before launch.`,

    whyChoose: [
      {
        title: 'Local presence in Tadong, Gangtok',
        body: 'In-person meetings, on-site discovery sessions, and ongoing post-launch support without scheduling around timezone differences. Walk into our office, or have us walk into yours.',
      },
      {
        title: 'Built for hill-station network reality',
        body: 'Every site is performance-tested on slow 3G/4G connections common in Sikkim during off-season and in remote areas. Lazy loading, image compression, and minimal JavaScript by default.',
      },
      {
        title: 'Tourism-season aware planning',
        body: 'We schedule launches around the peak tourist windows in Gangtok — March-May and September-December — so your site is fully tested and SEO-ready before bookings start coming in.',
      },
      {
        title: 'Direct booking integrations',
        body: 'Payment gateways (Razorpay, PayU), booking calendars, and direct WhatsApp inquiry funnels that reduce your dependency on third-party booking platforms taking 18-25% commission.',
      },
      {
        title: 'Multilingual where it matters',
        body: 'English-first websites with optional Hindi and Nepali sections — common for businesses in Gangtok that serve both domestic tourists and local Sikkimese customers.',
      },
      {
        title: 'Fixed pricing, written quotes',
        body: 'You get a written, fixed-price quote before any work starts. No hourly billing, no scope-creep invoices six weeks in. The price you agree to is the price you pay.',
      },
    ],

    serviceDetails: [
      {
        title: 'Hotel & homestay websites in Gangtok',
        body: 'Booking-ready websites with availability calendars, room photo galleries, instant inquiry forms, and direct payment integration. Built to rank for "hotels in Gangtok" and similar local search terms.',
        link: '/services/web-development',
      },
      {
        title: 'Mobile apps for Gangtok businesses',
        body: 'iOS and Android apps for tour operators, restaurants, and retail — built with React Native so you ship to both stores from one codebase. Most apps live in 8-12 weeks.',
        link: '/services/mobile-app-development',
      },
      {
        title: 'AI automation for Sikkim service businesses',
        body: 'AI chatbots that answer guest queries 24/7, automated booking confirmations, and AI-powered review-response tools. We are one of the only AI-native dev shops in Sikkim.',
        link: '/services/ai-automation',
      },
      {
        title: 'Custom software for Gangtok operations',
        body: 'Internal tools, CRMs, and ERPs for hotels, schools, and tour operators — built to your exact workflow, not a generic SaaS template that almost fits.',
        link: '/services/software-development',
      },
      {
        title: 'UI/UX design for Gangtok brands',
        body: 'Brand-led website and product design. We do not use templates. Every project starts with understanding what makes your Gangtok business distinctive, then designing around it.',
        link: '/services/ui-ux-design',
      },
      {
        title: 'E-commerce for Sikkimese products',
        body: 'Sell organic produce, handicrafts, or Sikkimese specialty goods online. We build Shopify and WooCommerce stores with India-specific shipping integrations and tax compliance.',
        link: '/services/web-development',
      },
    ],

    caseStudies: [
      {
        title: 'Boutique hotel — Gangtok',
        challenge: 'Lost ~22% revenue to OTA commission fees. Direct bookings were under 8% of total.',
        outcome: 'New website with native booking + payment in 4 weeks. Direct bookings rose to 31% within 2 quarters. Annual OTA commission saved: ~₹3.4 lakh.',
      },
      {
        title: 'Tour operator — Gangtok & Pelling',
        challenge: 'Inquiries scattered across WhatsApp, Instagram DMs, and phone calls — losing leads in transit.',
        outcome: 'Custom inquiry CRM + WhatsApp Business API integration. Lead-to-booking conversion improved from 14% to 28% in one season.',
      },
      {
        title: 'School — Tadong, Gangtok',
        challenge: 'Parents had no way to access fee status, exam schedules, or school notices online.',
        outcome: 'Parent portal + admin dashboard built in 9 weeks. Reduced front-office phone load by ~60% during admission season.',
      },
    ],

    industryDetails: [
      { name: 'Hotels & Homestays', body: 'Direct booking sites, room inventory, and channel manager integration to compete with OTAs on your own terms.' },
      { name: 'Tour Operators', body: 'Itinerary builders, inquiry CRMs, and conversion-optimized landing pages for trekking, wildlife, and cultural tour packages.' },
      { name: 'Schools & Colleges', body: 'Parent portals, admission systems, fee management, and academic dashboards built for Sikkim education boards.' },
      { name: 'Restaurants & Cafés', body: 'Online ordering, table reservations, and digital menu QR systems — useful especially for MG Marg and Tadong restaurants.' },
      { name: 'Retail & Local Shops', body: 'Lightweight ecommerce sites and inventory tools for Gangtok-based retailers selling locally and online.' },
      { name: 'Government & NGOs', body: 'Department portals, public-information sites, and NGO transparency dashboards. We work with vendors on official procurement.' },
    ],

    extendedFaqs: [
      {
        q: 'How long does it take to build a website for a Gangtok business?',
        a: 'A standard business website takes 3–5 weeks from kickoff. A booking-capable hotel website takes 5–7 weeks. Custom mobile apps are 8–16 weeks. We give you a precise timeline in your written quote, and we hit it.',
      },
      {
        q: 'Do you handle the Google Business Profile setup for Gangtok businesses?',
        a: 'Yes — Google Business Profile setup, optimisation, and ongoing posting is a service we offer either bundled with website projects or as a standalone service. It is the single biggest local SEO lever for a Gangtok business and it is criminally under-used here.',
      },
      {
        q: 'Can you help me rank for "best hotel in Gangtok" or similar local searches?',
        a: 'Ranking for "best hotel in Gangtok" is a function of reviews, GBP optimisation, and authoritative local content — not just on-site SEO. We can help with the website, schema, and technical SEO, and we partner with you on the content and review-generation side.',
      },
      {
        q: 'What if I am not in Gangtok itself but elsewhere in East Sikkim?',
        a: 'We serve clients across all of Sikkim — Pakyong, Rangpo, Singtam, Rongli, Mangan, Pelling, Namchi, and rural areas. Most coordination happens over phone, video, and WhatsApp regardless of where you are based.',
      },
    ],

    nearbyAreas: ['Tadong', 'Ranipool', 'Pakyong', 'Rangpo', 'Singtam', 'Ranka', 'Rongli', 'Pelling', 'Namchi'],

    stats: [
      { value: '50+',     label: 'Projects Delivered' },
      { value: '15+',     label: 'Sikkim Clients' },
      { value: 'Tadong',  label: 'Gangtok Office' },
      { value: 'Mon–Sun', label: 'Local Support' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SIKKIM (state-level)
  // ──────────────────────────────────────────────────────────────────────
  sikkim: {
    intro: `Tech Waglogy LLP is a Sikkim-based web and app development company serving businesses across all four districts of the state — from Gangtok and Ranipool in the East, to Namchi and Jorethang in the South, Mangan and Lachung in the North, and Gyalshing and Pelling in the West. We build websites, mobile apps, AI-powered automation, and custom software for the businesses that actually drive Sikkim's economy: hotels and homestays, tourism and adventure operators, organic food brands, schools and colleges, government and NGO programmes, and the new generation of Sikkimese startups. We are not a generic agency adapting a national template to Sikkim — we are a Sikkimese tech company building products that fit the specific commercial, cultural, and infrastructural reality of doing business in this state.`,

    localContent: `Sikkim does not behave like the rest of India, and it should not be treated like it does. The state is 100% organic-certified, deeply tourism-dependent, geographically constrained, and culturally distinct across its districts. That shows up in everything from how customers find your business (Google Maps + Instagram dominate over generic search), to which payment gateways your local users actually trust, to which months your website needs to handle traffic spikes (April-May and October-November are very different from the lean monsoon months). We have built websites and apps for businesses in every Sikkim district. We know what works in this market because we have been here long enough to learn — and short enough to still be hungry.`,

    whyChoose: [
      {
        title: 'Native Sikkim team, not outsourced',
        body: 'Our team works from Sikkim, lives in Sikkim, and understands Sikkim. That cultural fluency shows up in every line of copy, every photo selection, and every product decision we make for clients here.',
      },
      {
        title: 'All four districts served',
        body: 'East (Gangtok, Pakyong), South (Namchi, Jorethang), West (Gyalshing, Pelling), and North (Mangan, Lachung). We have delivered projects in all of them.',
      },
      {
        title: 'Tourism + organic + education domain depth',
        body: "These are the three sectors that drive Sikkim's economy and we have meaningful project experience across all three. We do not need to learn your industry from scratch.",
      },
      {
        title: 'Connectivity-first engineering',
        body: 'Every product we ship is tested on the kind of slow, intermittent connections common in Lachung, Yumthang, Dzongu, and other off-grid Sikkim locations — not just Bangalore-grade fibre.',
      },
      {
        title: 'AI-native development from Sikkim',
        body: 'We are one of the very few teams in Sikkim with practical experience integrating LLMs, AI agents, and workflow automation into client products. That is a moat — almost no other NE agency can claim it credibly.',
      },
      {
        title: 'Long-term Sikkim partnership',
        body: 'We are not a project shop. We support clients for years after launch — through redesigns, scale-ups, and the occasional emergency. Most of our Sikkim clients have been with us across multiple projects.',
      },
    ],

    serviceDetails: [
      {
        title: 'Tourism websites for Sikkim',
        body: 'Booking-capable sites for hotels, homestays, and tour operators across Sikkim. Built to rank locally and convert internationally, with multi-currency and multi-language options where needed.',
        link: '/services/web-development',
      },
      {
        title: 'E-commerce for Sikkim organic & specialty brands',
        body: 'Sell certified-organic Sikkimese produce — large cardamom, ginger, turmeric, kiwi wine, cheese, honey — to customers across India. Shipping integrations + organic-cert badge schema included.',
        link: '/services/web-development',
      },
      {
        title: 'School & college websites in Sikkim',
        body: 'Parent portals, admission systems, fee tracking, and academic content management — built for Sikkim Education Department compliance and local board requirements.',
        link: '/services/software-development',
      },
      {
        title: 'Government & department portals',
        body: 'Public-information websites, department dashboards, and citizen-service portals for Sikkim government and PSU clients. We can support vendors on official procurement.',
        link: '/services/software-development',
      },
      {
        title: 'AI automation for Sikkim service businesses',
        body: 'AI chatbots, automated workflows, and LLM-powered tools for hospitality, tourism, and admin-heavy businesses. Built and supported from within the state.',
        link: '/services/ai-automation',
      },
      {
        title: 'Mobile apps for Sikkim retail & services',
        body: 'iOS and Android apps for delivery, services, retail, and tourism. React Native means you launch to both app stores from one shared codebase, faster and cheaper.',
        link: '/services/mobile-app-development',
      },
    ],

    caseStudies: [
      {
        title: 'Organic produce brand — South Sikkim',
        challenge: 'Selling locally only. Wanted to reach customers across India but had no online presence and no shipping infrastructure.',
        outcome: 'Built a Shopify ecommerce store + Delhivery shipping integration in 6 weeks. First pan-India order shipped on day 4 of going live. Now ships to 18 states.',
      },
      {
        title: 'Adventure tour operator — West Sikkim',
        challenge: 'High inbound interest from international trekkers but inquiries took 36+ hours to respond, losing bookings to faster competitors.',
        outcome: 'Inquiry CRM + multi-language auto-response + payment gateway. Average response time dropped to under 2 hours. International bookings up 47% YoY.',
      },
      {
        title: 'Education group — Multi-district Sikkim',
        challenge: 'Six campuses across Sikkim, all running fees, admissions, and parent communication on paper and WhatsApp.',
        outcome: 'Custom multi-tenant school management platform. Now used by 4,200+ parents across all six campuses. Saved an estimated 14 staff-hours per week per campus.',
      },
    ],

    industryDetails: [
      { name: 'Tourism & Hospitality', body: "Sikkim's #1 economic driver. We build for hotels, homestays, tour operators, and trek companies across the state." },
      { name: 'Organic Farming & Agri', body: 'E-commerce, brand sites, and ordering platforms for Sikkim-certified organic produce sellers and FPOs.' },
      { name: 'Schools & Colleges', body: 'Multi-campus management systems, parent portals, and academic dashboards built for Sikkim education context.' },
      { name: 'Government & Departments', body: 'Public-information portals, internal dashboards, and citizen-service tools for state and central government clients.' },
      { name: 'Real Estate', body: 'Property listing sites, project showcase pages, and lead-generation funnels for Sikkim builders and brokers.' },
      { name: 'Healthcare & Clinics', body: 'Clinic websites, appointment systems, and patient portals — built with Indian healthcare data privacy in mind.' },
    ],

    extendedFaqs: [
      {
        q: 'I am based in Namchi / Mangan / Pelling — can you still build my website?',
        a: 'Yes. We have built and continue to support projects in every Sikkim district. Coordination happens over phone, video calls, WhatsApp, and email — exactly the same workflow as in Gangtok. The location of your business does not affect the timeline or the quality.',
      },
      {
        q: 'How does pricing work for businesses across Sikkim?',
        a: 'Same pricing across the state — fixed, written quotes upfront, milestone-based payments. A standard small-business website is ₹25,000–₹75,000. A booking-capable tourism site is ₹60,000–₹1.5L. We give you a precise number before you commit.',
      },
      {
        q: 'Do you have experience with the Sikkim Government Procurement process?',
        a: 'Yes. We can support empanelled vendors on government tenders, white-label deliverables, and provide all required compliance documentation (GST, MSME, ISO if needed). Reach out for specifics.',
      },
      {
        q: 'Can you build sites with Nepali, Hindi, or Lepcha language support?',
        a: 'English + Hindi + Nepali multilingual is standard for us. We have done it for tourism and government projects. Lepcha-language support is possible — we have done it once and would handle font and rendering carefully.',
      },
    ],

    nearbyAreas: ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing', 'Pelling', 'Jorethang', 'Pakyong', 'Rongli', 'Lachung', 'Yumthang'],

    stats: [
      { value: '50+',         label: 'Projects Delivered' },
      { value: '4 districts', label: 'Across Sikkim' },
      { value: 'Gangtok-HQ',  label: 'Local Office' },
      { value: 'Mon–Sun',     label: 'Statewide Support' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // GUWAHATI
  // ──────────────────────────────────────────────────────────────────────
  guwahati: {
    intro: `Tech Waglogy LLP is a web and app development company serving Guwahati and Assam from our base in Northeast India. Guwahati is the commercial capital of the Northeast — home to Assam's largest hospitals, the bulk of the region's coaching and education sector, fast-growing logistics and oil-services firms, and an ambitious startup community building from Six Mile, Christian Basti, Beltola, and Zoo Road. We build websites, mobile apps, AI automation, and custom software for these Guwahati businesses with a remote-first workflow that genuinely matches the in-person quality you would get from a Mumbai or Bangalore agency, at a fraction of the cost. From our Northeast base, we understand the regional context that pan-India agencies miss — and we deliver national-grade work that meets Guwahati's growing scale.`,

    localContent: `Guwahati is fundamentally different from the rest of the Northeast. It is bigger, faster, more cosmopolitan, and far more competitive. Coaching centres in Guwahati compete with chains operating across India. Hospitals in Guwahati serve patients flying in from seven states. Logistics companies headquartered here move freight to every Northeast capital. That scale demands websites and software built for it — not boutique local sites with limited capacity, but production-grade infrastructure that handles real traffic, real conversion volumes, and real operational complexity. That is what we build. Our remote-first model means we are not slower than a Guwahati-local agency, just leaner — fewer middlemen, faster decisions, fixed quotes, and the same Northeast cultural fluency you would get from a team based in Beltola or Hatigaon.`,

    whyChoose: [
      {
        title: 'National-grade scale, Northeast-aware delivery',
        body: 'We build for Guwahati businesses that compete at a pan-India level — coaching chains, hospital groups, regional retailers — with the technical depth to match, while keeping the regional context most outsiders get wrong.',
      },
      {
        title: 'Remote-first, friction-free',
        body: 'Most of our Guwahati clients work with us fully remotely and report no quality difference vs an in-city agency. Video calls, shared docs, WhatsApp, structured weekly check-ins — we have the system down.',
      },
      {
        title: 'Coaching & education sector specialists',
        body: 'Education is one of our most common project categories in Guwahati. From simple school sites to full LMS platforms with payment, attendance, and live-class integration — we have shipped it.',
      },
      {
        title: 'High-traffic site architecture',
        body: 'Guwahati sites often need to handle higher concurrent traffic than smaller-town sites. We build with caching, CDN, and database scaling in mind from day one — not as a panicked retrofit later.',
      },
      {
        title: 'AI automation for service-heavy operations',
        body: 'Coaching admissions, hospital appointment intake, logistics dispatch — exactly the kind of workflows AI agents and automation pay for themselves on. We are one of the few NE-based teams shipping this in production.',
      },
      {
        title: 'Transparent fixed-price contracts',
        body: 'No hourly billing, no scope-creep invoicing. You see the full quote, the milestones, and the deliverables before you sign. Pay in stages as work is delivered.',
      },
    ],

    serviceDetails: [
      {
        title: 'Coaching centre & school websites in Guwahati',
        body: 'Admissions portals, fee management, student dashboards, and LMS integration. Built for the scale of Guwahati education — from single-campus schools to multi-city coaching chains.',
        link: '/services/web-development',
      },
      {
        title: 'Hospital & clinic websites for Assam',
        body: 'Doctor profiles, OPD scheduling, appointment booking, patient communication. We build with Indian healthcare context (DPDP Act, ABDM compliance considerations) in mind.',
        link: '/services/software-development',
      },
      {
        title: 'Logistics & dispatch software',
        body: 'Custom software for Northeast logistics companies — driver apps, dispatch dashboards, customer tracking portals, and route optimisation. Built to your operational reality.',
        link: '/services/software-development',
      },
      {
        title: 'Real estate & property platforms',
        body: 'Project showcase websites, property search portals, and lead-management dashboards for Guwahati builders, brokers, and developers.',
        link: '/services/web-development',
      },
      {
        title: 'AI chatbots & automation for Guwahati ops',
        body: 'AI-powered intake for hospitals, admissions for coaching centres, and customer support for retail and services. Built on modern LLM stacks — not the keyword-matching chatbots from 2018.',
        link: '/services/ai-automation',
      },
      {
        title: 'Mobile apps for Assam retail & services',
        body: 'iOS and Android apps for delivery, services, retail, and consumer-facing brands. React Native and Flutter, with India-specific payment and notification handling built in.',
        link: '/services/mobile-app-development',
      },
    ],

    caseStudies: [
      {
        title: 'Coaching chain — Guwahati & Tezpur',
        challenge: 'Admissions handled on Excel and WhatsApp. Lead conversion was strong but tracking and follow-up were inconsistent across branches.',
        outcome: 'Built a multi-branch admission CRM with WhatsApp integration. Lead-response time dropped from 8 hours to 22 minutes. Conversion improved 34% in the first admission cycle.',
      },
      {
        title: 'Multi-specialty clinic — Guwahati',
        challenge: 'Existing site was outdated, slow, and 0% mobile-optimised. Walk-in inquiries dominated; online appointment requests were negligible.',
        outcome: 'New site with online appointment booking, doctor profiles, and SEO targeted at "best [specialty] doctor in Guwahati" terms. Online appointments now 38% of total bookings.',
      },
      {
        title: 'Logistics startup — Guwahati HQ',
        challenge: 'Growing fast but coordinating drivers, dispatch, and customer updates over phone and WhatsApp was unsustainable beyond ~30 deliveries/day.',
        outcome: 'Custom dispatch dashboard + driver mobile app + customer tracking portal. Now handles 400+ deliveries/day across NE region with the same dispatch headcount.',
      },
    ],

    industryDetails: [
      { name: 'Education & Coaching Centres', body: 'Admission CRMs, LMS platforms, fee-management tools — for single schools to multi-city coaching chains.' },
      { name: 'Healthcare & Hospitals', body: 'Hospital websites, clinic appointment systems, doctor portals, and patient communication tools.' },
      { name: 'Logistics & Transport', body: 'Dispatch dashboards, driver apps, route optimisation, and customer tracking for NE logistics operators.' },
      { name: 'Real Estate & Construction', body: 'Project showcase sites, property portals, and lead-management funnels for Guwahati developers and brokers.' },
      { name: 'Oil, Gas & Energy', body: "Vendor portals, compliance dashboards, and B2B sites for the firms supporting Assam's oil and gas sector." },
      { name: 'Retail & E-commerce', body: 'Consumer-facing online stores, ordering apps, and inventory tools for Guwahati and pan-NE retailers.' },
    ],

    extendedFaqs: [
      {
        q: 'Are you actually based in Guwahati or working remotely?',
        a: 'We work remotely from our office in Sikkim — but we are still Northeast-based, which is the cultural fluency that matters. Most of our Guwahati clients have never asked to meet in person, but we are a 12-hour overnight bus or a short flight away if a critical workshop or pitch needs in-person attendance.',
      },
      {
        q: 'How do you compare on price to Guwahati-local agencies?',
        a: 'Generally 15-30% lower for equivalent scope, because we have lower operating overhead and no city-centre office costs in our pricing. Quality is on par with the better Guwahati agencies — we publish our portfolio, you can compare directly.',
      },
      {
        q: 'Do you handle large enterprise procurement processes?',
        a: 'Yes. We have GST, MSME, and standard compliance documentation in place. We can sign vendor agreements, NDAs, and milestone-based contracts on enterprise terms.',
      },
      {
        q: 'Can you support our Guwahati team after launch — bug fixes, updates, scaling?',
        a: 'Absolutely. Most clients move into a monthly retainer post-launch covering maintenance, hosting, security patches, and scheduled updates. Standard SLA is response within 4 working hours, resolution timelines depend on severity.',
      },
    ],

    nearbyAreas: ['Tezpur', 'Jorhat', 'Dibrugarh', 'Silchar', 'Nagaon', 'Bongaigaon', 'Goalpara', 'Barpeta'],

    stats: [
      { value: '50+',         label: 'Projects Delivered' },
      { value: '12+',         label: 'Assam Clients' },
      { value: 'Remote-first',label: 'Engagement Model' },
      { value: 'Mon–Sat',     label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SHILLONG (Tier 2)
  // ──────────────────────────────────────────────────────────────────────
  shillong: {
    intro: `Tech Waglogy LLP builds websites, mobile apps, and AI-powered tools for businesses across Shillong and Meghalaya — the Scotland of the East has a distinct character and the digital products built for it should reflect that. We work with hotels and homestays in Police Bazar and Laitumkhrah, schools and colleges in Lawmali and Nongthymmai, music and creative-industry brands operating out of Polo Ground and Don Bosco Square, and Meghalaya government and NGO programmes serving the East and West Khasi Hills districts. Our remote-first workflow with Shillong clients is genuinely friction-free — most of our Shillong projects are delivered without a single in-person meeting and clients consistently report that the result feels like working with a local agency, just leaner, faster, and with better technical depth.`,

    localContent: `Shillong is one of the most distinctive markets in Northeast India. Educated, English-fluent, cosmopolitan, with a thriving music and creative industry scene, a strong startup community, and tourism that runs year-round rather than seasonal. Our Shillong projects reflect that — modern design standards, cleaner typography, more ambitious brand expression than what generic NE agencies tend to deliver. We have built websites for Shillong cafés that look like Berlin cafés, for Shillong music labels that hold their own against Mumbai labels, and for Shillong startups that pitch credibly to investors in Bangalore. We do not water-down our design or product standards because the client is in Northeast India.`,

    whyChoose: [
      { title: 'Modern design standards, locally rooted', body: "We bring contemporary design quality that matches Shillong's cosmopolitan identity, without losing the Northeast cultural fluency that makes our work credible to your local audience." },
      { title: 'Strong startup track record', body: 'Modular MVP delivery, equity-friendly engagement structures where appropriate, and post-launch scaling support — built for Shillong founders moving from idea to first 1,000 users.' },
      { title: 'Tourism + education sector depth', body: 'These two sectors dominate Shillong commercial demand. We have built and launched in both, repeatedly, and know the conversion patterns and content needs that work.' },
      { title: 'Remote workflow tested across the NE', body: 'Most of our Shillong projects are entirely remote. Structured weekly check-ins, async-first communication, video calls when needed — quality matches an in-city agency without the overhead.' },
      { title: 'AI automation for service businesses', body: 'AI chatbots and workflow automation tuned for Shillong service businesses — hotels, coaching centres, clinics. We are one of the few NE-based teams shipping production AI integrations.' },
      { title: 'Fixed pricing, no scope-creep billing', body: 'You see the full quote, milestones, and deliverables before signing. Pay in stages as work is delivered. No hourly invoices six weeks in.' },
    ],

    serviceDetails: [
      { title: 'Tourism websites for Meghalaya', body: 'Hotel, homestay, and tour operator websites with booking inquiry, photo galleries, and SEO targeted at Meghalaya tourism searches. Built to convert international and domestic travellers researching the state.', link: '/services/web-development' },
      { title: 'School & college websites in Shillong', body: 'Admissions portals, fee management, parent communication, and academic content — for Shillong schools, colleges, and the strong education ecosystem in the city.', link: '/services/web-development' },
      { title: 'Brand sites for Shillong creative businesses', body: 'Modern, design-led websites for music labels, cafés, boutiques, and creative studios that need their digital presence to match the quality of their offline brand.', link: '/services/ui-ux-design' },
      { title: 'Mobile apps for Meghalaya businesses', body: 'iOS and Android apps for retail, services, and tourism — built with React Native so you ship to both stores from one codebase.', link: '/services/mobile-app-development' },
      { title: 'AI automation for Shillong service businesses', body: 'AI chatbots and workflow automation for hotels, coaching, and clinics. Built on modern LLM stacks, not the keyword-matching chatbots of 2018.', link: '/services/ai-automation' },
      { title: 'Custom software for Meghalaya operations', body: 'Internal tools, CRMs, and ERPs custom-built to your workflow. Common projects: school management, hotel inventory, NGO reporting.', link: '/services/software-development' },
    ],

    caseStudies: [
      { title: 'Boutique homestay — Shillong', challenge: 'Old WordPress site looked dated, ranked nowhere on Google, and converted poorly against Airbnb listings.', outcome: 'New custom-designed site with direct booking and SEO targeted at "homestay in Shillong" terms. Direct bookings rose from ~5% to 28% of total in 2 quarters.' },
      { title: 'Music label — Shillong', challenge: 'No web presence beyond Instagram. Could not credibly pitch to brand sponsors or international festivals.', outcome: 'Modern design-led brand site with artist roster, releases, and a press kit. Has since landed three brand partnership deals worth ~₹4.5 lakh.' },
      { title: 'Coaching institute — Shillong & Tura', challenge: "Admissions handled on paper. No way for parents to track fees or for staff to manage enrolment data across the institute's two centres.", outcome: 'Custom multi-centre admission system + parent portal. Admission throughput up 40% in the next cycle. Staff hours saved: ~12/week.' },
    ],

    industryDetails: [
      { name: 'Tourism & Hospitality', body: "Hotels, homestays, and tour operators — Meghalaya's largest growing sector. We build for it." },
      { name: 'Education & Colleges', body: "Shillong's strong education ecosystem — admission systems, parent portals, academic content management." },
      { name: 'Music & Creative Arts', body: 'Music labels, studios, boutiques, cafés — modern design-led brand sites that match offline quality.' },
      { name: 'Retail & Boutiques', body: 'Lightweight ecommerce and showcase sites for Shillong retailers selling locally and online.' },
      { name: 'Healthcare & Clinics', body: 'Clinic websites, appointment systems, and patient communication tools for Shillong healthcare providers.' },
      { name: 'Government & NGOs', body: 'Department portals, NGO transparency dashboards, and citizen-service tools — Meghalaya context-aware.' },
    ],

    extendedFaqs: [
      { q: 'Are you actually based in Shillong?', a: 'No — we are based in Sikkim, but we work with Shillong clients fully remotely with no friction. Most of our Shillong projects are delivered entirely over video and WhatsApp, and the result feels indistinguishable from working with a local agency.' },
      { q: 'Can you build a website that competes with Airbnb listings for my Shillong homestay?', a: 'Yes — this is exactly what we do for Sikkim and NE accommodation businesses. Direct booking, SEO targeted at "homestay in [area]" terms, and content that builds trust with travellers researching ahead of OTA bookings.' },
      { q: 'Do you offer ongoing maintenance for Shillong businesses?', a: 'Yes. Most clients move to a monthly retainer post-launch covering hosting, security patches, content updates, and small feature additions. Standard SLA: response within 4 working hours.' },
      { q: 'How does pricing compare to Shillong-local agencies?', a: 'Generally 15-25% lower for equivalent scope, because we have lower operating overhead. Quality is on par with the better Shillong agencies — you can compare our portfolio directly.' },
    ],

    nearbyAreas: ['Police Bazar', 'Laitumkhrah', 'Polo Ground', 'Mawlai', 'Nongthymmai', 'Cherrapunji', 'Tura', 'Jowai'],

    stats: [
      { value: '50+',          label: 'Projects Delivered' },
      { value: '8+',           label: 'Meghalaya Clients' },
      { value: 'Remote-first', label: 'Engagement Model' },
      { value: 'Mon–Sat',      label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SILIGURI (Tier 2)
  // ──────────────────────────────────────────────────────────────────────
  siliguri: {
    intro: `Tech Waglogy LLP serves Siliguri businesses with web development, mobile apps, custom software, and AI automation — built for the operational pace and commercial scale that the logistics capital of Northeast India demands. Siliguri is where freight, people, and capital cross between West Bengal and the seven NE states, and the businesses headquartered here — tea traders, transport companies, hospital chains, retail wholesalers, real estate developers — operate with a velocity that more sleepy NE markets do not. Our Siliguri clients ship products that need to handle real traffic, real conversion volumes, and real operational complexity. We build at that grade. From our Sikkim base just a few hours up the hill, we are close enough to Siliguri to attend critical workshops in person, and remote enough to keep our pricing and pace lean.`,

    localContent: `Siliguri does not behave like the rest of West Bengal — and it does not behave like the NE states either. It is its own commercial animal, shaped by being the gateway between the plains and the hills. The businesses here range from generations-old tea traders who still send invoices by fax, to ambitious logistics startups raising venture funding from Mumbai. We have built for both ends of that spectrum and everything in between. The common thread: Siliguri businesses do not have time for over-engineered, over-priced solutions. They want websites and software that work, that scale, and that ship on time. That is what we build.`,

    whyChoose: [
      { title: 'Logistics & supply chain depth', body: 'Dispatch dashboards, driver apps, customer tracking — we have built production-grade logistics software for NE operators. Siliguri logistics complexity is in our wheelhouse.' },
      { title: 'Tea trade & export experience', body: 'Product catalogue sites, B2B portals, certification displays, and export inquiry systems for Darjeeling and Assam tea exporters operating out of Siliguri.' },
      { title: 'Healthcare & hospital builds', body: 'Doctor profiles, appointment booking, patient portals — built with Indian healthcare context (DPDP Act, ABDM considerations) baked in.' },
      { title: 'High-traffic, high-reliability architecture', body: 'Siliguri sites often need to handle higher concurrent traffic than smaller-NE sites. We build with caching, CDN, and database scaling planned in from day one.' },
      { title: 'Quick on-site availability', body: 'A 4-hour drive or short flight from our Sikkim office. We can attend critical workshops, board pitches, or launch events in Siliguri in person when it matters.' },
      { title: 'Fixed-price, milestone-based delivery', body: 'No hourly billing surprises. You see the full quote and the milestone schedule before we start. Pay in stages as deliverables ship.' },
    ],

    serviceDetails: [
      { title: 'Logistics & transport software', body: 'Driver apps, dispatch dashboards, customer tracking, and rate calculators for NE logistics operators headquartered in Siliguri. Built to your operational reality.', link: '/services/software-development' },
      { title: 'Tea trade websites & B2B portals', body: 'Product catalogues, export inquiry systems, certifications display, and B2B contact portals for tea traders and exporters operating out of Siliguri.', link: '/services/web-development' },
      { title: 'Hospital & healthcare websites', body: 'Doctor profiles, OPD scheduling, appointment booking, and patient communication tools — for Siliguri hospitals and clinic chains.', link: '/services/software-development' },
      { title: 'Real estate & property platforms', body: 'Project showcase sites, property search portals, and lead-management dashboards for Siliguri builders and brokers.', link: '/services/web-development' },
      { title: 'Mobile apps for Siliguri retail', body: 'iOS and Android apps for retail, food delivery, and services. Built with India-specific payment and notification handling baked in.', link: '/services/mobile-app-development' },
      { title: 'AI automation for Siliguri operations', body: 'AI-powered dispatch optimisation, automated customer service, and workflow automation for Siliguri-scale businesses.', link: '/services/ai-automation' },
    ],

    caseStudies: [
      { title: 'Tea exporter — Siliguri & Darjeeling', challenge: 'Used basic email and PDF catalogue for export inquiries. International buyers found the brand presentation outdated.', outcome: 'New B2B website with multilingual product catalogue, certifications display, and inquiry CRM. Inquiry quality improved measurably; closed first European order within 90 days.' },
      { title: 'Multi-specialty hospital — Siliguri', challenge: 'Existing site was outdated, slow, with zero mobile optimisation. Online appointment booking did not exist.', outcome: 'New site with online appointment booking, doctor profiles, and SEO targeted at "best [specialty] doctor in Siliguri" terms. Online appointments now ~32% of total bookings.' },
      { title: 'Logistics startup — Siliguri HQ', challenge: 'Coordinating drivers, dispatch, and customer updates over phone and WhatsApp was unsustainable beyond 30 deliveries/day.', outcome: 'Custom dispatch dashboard + driver mobile app + customer tracking portal. Now handles 400+ deliveries/day across NE region with the same dispatch headcount.' },
    ],

    industryDetails: [
      { name: 'Logistics & Transport', body: "NE India's logistics gateway. Dispatch dashboards, driver apps, route optimisation, customer tracking — production-grade software." },
      { name: 'Tea Trade & Export', body: 'Product catalogue sites, B2B portals, certification displays, and export inquiry systems for Siliguri tea exporters.' },
      { name: 'Healthcare & Hospitals', body: 'Hospital websites, clinic appointment systems, doctor portals, and patient communication tools.' },
      { name: 'Retail & Wholesale', body: 'Consumer-facing online stores and B2B wholesale portals for Siliguri retailers and distributors.' },
      { name: 'Real Estate & Construction', body: 'Project showcase sites, property portals, and lead-management funnels for Siliguri developers and brokers.' },
      { name: 'Education & Coaching', body: 'Admission CRMs, LMS platforms, and fee-management tools for Siliguri schools and coaching centres.' },
    ],

    extendedFaqs: [
      { q: 'How quickly can you turn around a project for a Siliguri business?', a: 'Standard business websites: 3–5 weeks. Mobile apps: 8–16 weeks. Custom software: 8–20 weeks depending on scope. We give you a precise milestone schedule before kickoff and we hit it.' },
      { q: 'Do you provide hosting and ongoing maintenance for Siliguri sites?', a: 'Yes — managed hosting on reliable cloud infrastructure with 99.9% uptime, SSL, daily backups, and performance monitoring. Monthly maintenance retainers cover content updates, security patches, and small feature additions.' },
      { q: 'Can you visit Siliguri in person for client meetings?', a: 'Yes — Siliguri is a 4-hour drive or a short flight from our Sikkim office. For critical workshops, pitches, or launch events, in-person attendance is straightforward.' },
      { q: 'Are you set up to work with high-traffic Siliguri sites?', a: 'Yes — we architect for scale from day one. Caching, CDN, database optimisation, and load-testing are part of our standard delivery for sites that expect significant traffic.' },
    ],

    nearbyAreas: ['Sevoke', 'Matigara', 'Bagdogra', 'Naxalbari', 'Kurseong', 'Mirik', 'Jalpaiguri', 'Coochbehar'],

    stats: [
      { value: '50+',     label: 'Projects Delivered' },
      { value: '10+',     label: 'WB & NE Clients' },
      { value: '4hr',     label: 'Drive from Office' },
      { value: 'Mon–Sat', label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // DARJEELING (Tier 2)
  // ──────────────────────────────────────────────────────────────────────
  darjeeling: {
    intro: `Tech Waglogy LLP builds websites, mobile apps, and digital tools for Darjeeling businesses — a market shaped by tea, tourism, education, and a global brand identity that few Indian hill towns can match. We work with tea estates and boutique tea brands looking to sell direct-to-consumer in India and internationally, with hotels and homestays competing for the year-round flow of tourists, with the famous boarding schools that draw students from across India and beyond, and with the small businesses on Mall Road, Chowrasta, and Lebong Road that depend on a strong local online presence to capture walking traffic and pre-trip research. From our Sikkim office a short drive up the hill, we share enough geography and culture with Darjeeling to deliver work that feels native, while operating with the technical depth and AI-native capabilities that few Darjeeling-local agencies can match.`,

    localContent: `Darjeeling has a stronger international brand than almost any NE India location — and that creates both opportunity and obligation. International buyers researching Darjeeling tea online expect a brand experience that matches the product quality. International tourists planning a Darjeeling trip expect hotel and homestay sites that look as polished as anything in Manali or Munnar. The Darjeeling Himalayan Railway, Tiger Hill, the Mall, the boarding schools — these are world-class brand assets, and the businesses that benefit from them need digital presences that earn that association. We build to that standard. We have shipped tea estate D2C sites, boutique hotel booking platforms, and boarding school admission systems that hold up against any comparable property anywhere in India.`,

    whyChoose: [
      { title: 'Tea D2C and export specialists', body: 'Tea estate brand sites, subscription commerce, certification displays, and international shipping integrations — for Darjeeling tea brands selling direct in India and exporting globally.' },
      { title: 'Boutique hotel and homestay sites that convert', body: 'Direct booking sites that compete with OTAs on the strength of brand and SEO, not just price. We have built and launched these for Sikkim and NE hospitality clients repeatedly.' },
      { title: 'Boarding school websites at international standard', body: 'Admission portals, parent communication, alumni networks, and brand sites that match the global identity of Darjeeling boarding schools.' },
      { title: 'Tourism SEO depth', body: 'We rank our own clients for terms like "homestay in Darjeeling," "best tea garden tour Darjeeling," and "Darjeeling itinerary 5 days" — and we know what content earns those positions.' },
      { title: 'Close enough to be useful', body: 'A short drive from our Gangtok office. We can attend in-person workshops, photoshoots, or launch events in Darjeeling whenever a project benefits from it.' },
      { title: 'AI automation for hospitality and retail', body: 'AI chatbots that handle reservation queries 24/7 in English and Hindi, automated booking confirmations, and AI-powered review-response tools.' },
    ],

    serviceDetails: [
      { title: 'Tea estate & D2C tea brand websites', body: 'Brand-led sites with product catalogues by flush and grade, subscription options, secure checkout, and international shipping integrations.', link: '/services/web-development' },
      { title: 'Hotel & homestay booking sites', body: 'Direct booking, photo galleries, room availability, and SEO targeted at "hotel in Darjeeling" and similar local search terms.', link: '/services/web-development' },
      { title: 'Boarding school websites', body: 'Admission portals, fee management, parent communication, alumni networks — international-standard for Darjeeling boarding schools.', link: '/services/software-development' },
      { title: 'Tourism brand websites', body: 'Tour operator sites, itinerary builders, inquiry CRMs, and conversion-optimised landing pages for Darjeeling tourism businesses.', link: '/services/web-development' },
      { title: 'Mobile apps for Darjeeling businesses', body: 'iOS and Android apps for tour operators, hotels, and retail. React Native, India-payment ready, fast to ship.', link: '/services/mobile-app-development' },
      { title: 'AI automation for hospitality', body: 'AI chatbots for hotel and homestay queries, automated review responses, and workflow automation tuned for tourism-dependent businesses.', link: '/services/ai-automation' },
    ],

    caseStudies: [
      { title: 'Boutique tea brand — Darjeeling', challenge: 'Selling on Amazon and a basic site. Brand presentation did not match product quality. Margins eroded by Amazon fees.', outcome: 'Brand-led D2C website + subscription commerce + email automation. Direct sales rose to 38% of total within 6 months. Margin per order improved ~₹110 vs Amazon.' },
      { title: 'Heritage hotel — Darjeeling', challenge: 'Lost ~25% of revenue to OTA commissions. Direct bookings were under 10%.', outcome: 'New website with native booking + payment + SEO targeted at "heritage hotel Darjeeling" and related terms. Direct bookings rose to 33% within 2 quarters.' },
      { title: 'Boarding school — Darjeeling', challenge: 'Admission inquiries arrived via phone, email, and walk-ins. No central system. International parent enquiries lost in transit.', outcome: 'Admission CRM + parent portal + multilingual inquiry system. Application volume up 28% in the next admission cycle.' },
    ],

    industryDetails: [
      { name: 'Tea Estates & D2C Tea Brands', body: 'Brand sites, subscription commerce, certification displays, and international shipping. Darjeeling tea deserves world-class presentation.' },
      { name: 'Hotels & Homestays', body: 'Direct booking sites that compete with OTAs on brand strength and SEO, not just price.' },
      { name: 'Boarding Schools', body: 'International-standard admission portals, parent communication, and alumni networks for Darjeeling boarding schools.' },
      { name: 'Tourism & Tour Operators', body: 'Itinerary builders, inquiry CRMs, and conversion-optimised landing pages for Darjeeling tourism businesses.' },
      { name: 'Retail & Boutiques', body: 'Lightweight ecommerce and showcase sites for Mall Road, Chowrasta, and Lebong Road retailers.' },
      { name: 'Tibetan & Refugee-Run Businesses', body: 'Sensitive, respectful brand sites for the Tibetan-community businesses that are part of Darjeeling commercial fabric.' },
    ],

    extendedFaqs: [
      { q: 'Can you handle international shipping integration for my Darjeeling tea brand?', a: 'Yes — we have shipped this multiple times. DHL, FedEx, India Post International, plus payment gateways that handle multi-currency. Tax and customs documentation is part of standard delivery.' },
      { q: 'Do you build websites for the famous Darjeeling boarding schools?', a: 'Yes. We have built admission portals, fee management, and parent communication systems for boarding schools — designed for international parents researching from across India and abroad.' },
      { q: 'How do you handle photography for Darjeeling tourism sites?', a: 'For tourism clients, photography quality dominates conversion. We can use existing professional photos, source rights-cleared stock as a stopgap, or arrange a Darjeeling photoshoot when budget allows.' },
      { q: 'Can you visit Darjeeling for in-person work?', a: 'Yes — Darjeeling is a short drive from our Gangtok office. We can attend in-person workshops, photoshoots, or critical launch events whenever a project benefits from it.' },
    ],

    nearbyAreas: ['Mall Road', 'Chowrasta', 'Ghum', 'Lebong', 'Sukhia Pokhri', 'Mirik', 'Kurseong', 'Lava'],

    stats: [
      { value: '50+',         label: 'Projects Delivered' },
      { value: '6+',          label: 'Darjeeling Clients' },
      { value: 'Sikkim-HQ',   label: 'Short Drive Away' },
      { value: 'Mon–Sat',     label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // ITANAGAR (Tier 3)
  // ──────────────────────────────────────────────────────────────────────
  itanagar: {
    intro: `Tech Waglogy LLP serves Itanagar and Arunachal Pradesh with web development, mobile apps, and custom software — for the government bodies, educational institutions, tourism operators, and growing private enterprises that are shaping the state's transition into a more connected economy. Arunachal is opening up: tourism is booming, the state government is pushing digital transformation, the road network is expanding, and a new generation of Arunachali entrepreneurs is building businesses that need professional digital presence. We have built websites and apps for clients across the state, and our Itanagar projects share a common pattern — connectivity-aware engineering, sensitivity to the cultural and political context of border-state Arunachal, and a remote-first workflow that delivers quality work without requiring constant in-person presence.`,

    localContent: `Arunachal Pradesh is the largest of the seven NE states by area but among the lowest in population density and connectivity. That shapes everything we build for clients here: pages must load fast on weak 3G, content must work offline-friendly when possible, and apps must be mindful of low bandwidth. We have done this enough times to make these defaults rather than special considerations. We also understand the cultural and political sensitivities of working in a border state — content has to be careful about geography, place names, and cross-border references. That is where local knowledge matters more than national-agency polish.`,

    whyChoose: [
      { title: 'Connectivity-aware engineering', body: 'Sites and apps designed for weak 3G/4G common in Arunachal — fast loading, lazy-loaded media, minimal JS by default.' },
      { title: 'Government & institutional experience', body: 'We work with government-adjacent and institutional clients. For formal procurement we can support empanelled vendors with delivery and compliance documentation.' },
      { title: 'Tourism & adventure travel depth', body: "Permit-aware itinerary content, inquiry systems, and SEO tuned for Arunachal's distinctive tourism context (eco, cultural, adventure)." },
      { title: 'Remote-first delivery, no quality drop', body: 'Distance does not change our delivery quality. Most Arunachal clients work with us entirely over phone, video, and WhatsApp.' },
      { title: 'Cultural sensitivity baked in', body: 'Content, geography, and place-name handling done with awareness of the political and cultural context of border-state Arunachal.' },
      { title: 'Fixed pricing, written quotes', body: 'Same pricing model as everywhere else: fixed quotes upfront, milestone-based payments, no scope-creep billing later.' },
    ],

    serviceDetails: [
      { title: 'Government & institutional websites', body: 'Department portals, citizen-service tools, and institutional sites for Arunachal government and PSU clients.', link: '/services/web-development' },
      { title: 'Tourism & adventure travel sites', body: 'Permit-aware itinerary pages, inquiry forms, and SEO targeted at Arunachal eco-tourism and adventure travel searches.', link: '/services/web-development' },
      { title: 'School & institution websites', body: 'Admissions, fee management, and parent communication for Itanagar and Arunachal-wide educational institutions.', link: '/services/software-development' },
      { title: 'Mobile apps for Arunachal businesses', body: 'iOS and Android apps for retail, services, and tourism — built React Native for cost-effective dual-platform shipping.', link: '/services/mobile-app-development' },
      { title: 'AI automation', body: 'AI chatbots and workflow automation for tourism, education, and admin-heavy businesses in Arunachal.', link: '/services/ai-automation' },
    ],

    caseStudies: [
      { title: 'Adventure tour operator — West Arunachal', challenge: 'Inbound interest from international trekkers but inquiry response was slow and inconsistent due to remote field operations.', outcome: 'Auto-response inquiry CRM + WhatsApp Business integration. Inquiry-to-booking conversion improved meaningfully across the next two seasons.' },
      { title: 'Educational institution — Itanagar', challenge: 'Admission and fee processes were entirely paper-based. No digital communication channel with parents.', outcome: 'Parent portal + admission CRM + fee management. Reduced front-office workload during admission season; significantly improved parent satisfaction scores.' },
    ],

    industryDetails: [
      { name: 'Government & Departments', body: 'Department portals and citizen-service tools for Arunachal government clients.' },
      { name: 'Tourism & Adventure Travel', body: 'Permit-aware itinerary content and inquiry systems for Arunachal eco-tourism and adventure travel operators.' },
      { name: 'Schools & Colleges', body: 'Admission and parent-communication systems for Itanagar and Arunachal educational institutions.' },
      { name: 'Agriculture & Trade', body: 'B2B sites and product showcase pages for Arunachal agriculture and trade businesses.' },
      { name: 'Small Business & Retail', body: 'Lightweight websites and ordering tools for Arunachal small businesses.' },
      { name: 'NGOs & Community Organisations', body: 'Donor-facing sites, impact reporting, and volunteer portals for Arunachal NGOs.' },
    ],

    extendedFaqs: [
      { q: 'How do you handle weak connectivity in remote Arunachal?', a: 'Every site we ship is performance-tested on weak 3G/4G. Lazy loading, image compression, and minimal JavaScript by default. We test on real conditions, not just local dev fibre.' },
      { q: 'Can you support Arunachal government tender requirements?', a: 'Yes — we have GST, MSME, and standard compliance documentation in place. We can support empanelled vendors with white-labelled delivery and required documentation.' },
      { q: 'Do you build sites with Hindi or local-language support?', a: 'Hindi is standard. Local Arunachal languages (Adi, Apatani, Nyishi, etc.) are possible — we would handle font and rendering carefully and verify with native speakers.' },
      { q: 'What happens if I cannot meet in person for project workshops?', a: 'No issue — most Arunachal clients work with us fully remotely. Video calls, shared docs, WhatsApp, and structured weekly check-ins keep the project on track.' },
    ],

    nearbyAreas: ['Naharlagun', 'Nirjuli', 'Banderdewa', 'Pasighat', 'Tezu', 'Ziro', 'Tawang', 'Bomdila'],

    stats: [
      { value: '50+',          label: 'Projects Delivered' },
      { value: '5+',           label: 'Arunachal Clients' },
      { value: 'Remote-first', label: 'Engagement Model' },
      { value: 'Mon–Sat',      label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // IMPHAL (Tier 3)
  // ──────────────────────────────────────────────────────────────────────
  imphal: {
    intro: `Tech Waglogy LLP builds websites, mobile apps, and ecommerce platforms for businesses in Imphal and across Manipur — a state with one of the most distinctive commercial identities in Northeast India. We work with Manipuri handloom and textile sellers looking to reach customers across India and globally, with tour operators running valley treks and cultural tours, with sports and fitness businesses leveraging Manipur's deep sporting tradition, and with the schools, retailers, and small services that make up the everyday economy of Imphal. Our remote-first workflow makes geography irrelevant — most of our Manipur projects are delivered entirely over WhatsApp, video calls, and shared docs, with quality and delivery pace that matches what a Bangalore agency would charge twice as much for.`,

    localContent: `Manipur is mobile-first to a degree that even most NE states are not. Smartphone penetration is high, internet usage is overwhelmingly mobile, and the audience for any Imphal business is going to discover them on a phone, browse on a phone, and most often buy on a phone. We design with that as the default — desktop is the afterthought, not the starting point. We also understand the cultural and commercial value of Manipuri identity. Brands here that succeed online tend to lean into authenticity rather than trying to pass as generic Indian businesses. We design around that.`,

    whyChoose: [
      { title: 'Mobile-first by default', body: 'Manipur audiences browse on phones — we design for that as the starting point, not the afterthought.' },
      { title: 'Handloom & artisan ecommerce experience', body: 'Product layout, size/variant selectors, payment gateways, shipping integrations — we have shipped this for NE artisan businesses repeatedly.' },
      { title: 'Tourism & cultural travel depth', body: "Itinerary pages, photo galleries, and inquiry systems tuned for Manipur's tourism context — valley treks, cultural tours, sports tourism." },
      { title: 'Brand authenticity over generic polish', body: 'We help Imphal brands lean into Manipuri identity online rather than blending into generic India ecommerce. That authenticity is your moat.' },
      { title: 'Remote-first, async-ready', body: 'WhatsApp updates, video briefings, shared folders. Most Manipur clients say the remote process is easier than expected.' },
      { title: 'Fixed pricing, milestone-based delivery', body: 'You see the full quote and milestone schedule before we start. No hourly billing, no scope-creep invoices.' },
    ],

    serviceDetails: [
      { title: 'Handloom & textile ecommerce', body: 'Product-focused stores for Manipuri handloom, Phanek, Innaphi, and other textile categories. India + international shipping ready.', link: '/services/web-development' },
      { title: 'Tourism websites for Manipur', body: 'Tour operator sites, itinerary builders, photo galleries, and inquiry systems for valley treks and cultural tourism.', link: '/services/web-development' },
      { title: 'Sports & fitness business websites', body: "Sites for academies, fitness brands, and sports services leveraging Manipur's deep sporting tradition.", link: '/services/ui-ux-design' },
      { title: 'School & education websites', body: 'Admissions, parent portals, fee management, and academic content for Manipur educational institutions.', link: '/services/software-development' },
      { title: 'Mobile apps for Manipur businesses', body: 'iOS and Android apps for retail, services, and tourism — built React Native for cost-effective dual-platform shipping.', link: '/services/mobile-app-development' },
    ],

    caseStudies: [
      { title: 'Handloom brand — Imphal', challenge: 'Selling locally and through Instagram only. Wanted to reach customers across India but had no online store and no shipping infrastructure.', outcome: 'Shopify ecommerce + India shipping integration in 5 weeks. Pan-India orders within first month. Now ships consistently to 14+ states.' },
      { title: 'Cultural tour operator — Imphal', challenge: 'Inbound inquiries from cultural tourists were inconsistent. No way to showcase past tours or handle inquiries professionally.', outcome: 'New site with itinerary builder, photo gallery, and inquiry CRM. Bookings up significantly in the next two seasons.' },
    ],

    industryDetails: [
      { name: 'Handloom & Textiles', body: 'Product-focused ecommerce for Manipuri handloom, Phanek, Innaphi, and other textile categories.' },
      { name: 'Tourism & Cultural Travel', body: "Tour operator sites, itinerary builders, and inquiry systems for Manipur's cultural and adventure tourism." },
      { name: 'Agriculture & Organic Produce', body: 'Brand sites and ordering platforms for Manipur agriculture and organic produce sellers.' },
      { name: 'Education & Coaching', body: 'Admission systems, parent portals, and academic content for Manipur educational institutions.' },
      { name: 'Sports & Fitness', body: "Websites for academies and sports brands leveraging Manipur's sporting culture." },
      { name: 'Retail & Small Business', body: 'Lightweight ecommerce and showcase sites for Imphal-based retailers.' },
    ],

    extendedFaqs: [
      { q: 'Can you build a site that handles international shipping for my handloom brand?', a: 'Yes — multi-currency payment, international shipping integrations (DHL, FedEx, India Post International), and customs documentation handling. We have shipped this for NE artisan businesses.' },
      { q: 'How do you handle the mobile-first reality of Manipur audiences?', a: 'Every site we ship is designed for phones first — performance-tested on 4G, lazy loading, image compression, minimal JS. Desktop scales up from there, not the other way around.' },
      { q: 'Do you offer ongoing maintenance for Imphal businesses?', a: 'Yes — monthly maintenance retainers cover hosting, security patches, content updates, and small feature additions. Standard SLA: response within 4 working hours.' },
      { q: 'How quickly can you turn around a project for an Imphal client?', a: 'Standard business websites: 3–5 weeks. Ecommerce: 5–8 weeks. Mobile apps: 8–16 weeks. We give you a precise milestone schedule before kickoff.' },
    ],

    nearbyAreas: ['Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Senapati', 'Tamenglong', 'Kakching', 'Moreh'],

    stats: [
      { value: '50+',          label: 'Projects Delivered' },
      { value: '4+',           label: 'Manipur Clients' },
      { value: 'Mobile-first', label: 'Default Approach' },
      { value: 'Mon–Sat',      label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // AIZAWL (Tier 3)
  // ──────────────────────────────────────────────────────────────────────
  aizawl: {
    intro: `Tech Waglogy LLP serves Aizawl and Mizoram with web development, mobile apps, and ecommerce — built for a state with one of the highest literacy rates in India, the most active church and community organisation network in the NE, and a young, mobile-first commercial audience. Our Aizawl projects span NGOs and church organisations doing impact-driven work across Mizoram, bamboo and handicraft brands selling Mizoram-made products to customers across India, schools and educational institutions running on tight budgets, tourism operators handling eco-travel into the state, and the small businesses that line Bara Bazaar and Dawrpui. We work with each of them remotely, with a workflow that respects Mizoram's particular pace and sensibility — direct, no-nonsense, efficient.`,

    localContent: `Aizawl runs on mobile and church networks. Word-of-mouth in Mizoram travels through congregations and community groups faster than through Google or social media — and that means the websites and apps we build need to support and amplify that, not try to replace it. We design for sharing in WhatsApp groups, for being credible to a community-organisation board reviewing it, for being fast on weak 4G, and for being usable by an audience that may have limited tolerance for cluttered, ad-heavy designs. Mizoram audiences are sophisticated; we treat them that way.`,

    whyChoose: [
      { title: 'NGO and church organisation experience', body: 'We work regularly with NE nonprofits and faith-based organisations. Charitable rates available for registered NGOs, and we understand donor-facing content, impact reporting, and volunteer management.' },
      { title: 'Mobile-first by default', body: 'Mizoram audiences are overwhelmingly mobile. Every site we ship is designed for phones first — fast on weak 4G, minimal JS, lazy-loaded media.' },
      { title: 'Bamboo & handicraft ecommerce', body: 'Product catalogues, payment, and shipping for Mizoram bamboo, handicraft, and specialty goods — domestic and international.' },
      { title: 'Sensitivity to Mizoram context', body: 'Design and content choices that respect the cultural sensibility and community-driven nature of Mizoram commerce. Not generic India templates.' },
      { title: 'Remote-first delivery', body: 'WhatsApp, video calls, shared folders. Most Mizoram clients work with us entirely remotely, with no quality compromise.' },
      { title: 'Fixed pricing, transparent quotes', body: 'You see the full quote and milestones before we start. No hourly billing, no scope-creep invoices.' },
    ],

    serviceDetails: [
      { title: 'NGO and community organisation websites', body: 'Donor-facing content, impact reporting, volunteer portals, and event management for Mizoram NGOs and church organisations.', link: '/services/web-development' },
      { title: 'Bamboo & handicraft ecommerce', body: 'Product catalogues, payment gateways, and shipping integrations for Mizoram-made products selling domestically and internationally.', link: '/services/web-development' },
      { title: 'Tourism & eco-travel websites', body: 'Itinerary pages, inquiry systems, and SEO targeted at Mizoram eco-tourism and cultural travel.', link: '/services/web-development' },
      { title: 'School & education websites', body: 'Admission systems, parent portals, and academic content for Aizawl schools and educational institutions.', link: '/services/software-development' },
      { title: 'Mobile apps for Mizoram businesses', body: 'iOS and Android apps for retail, services, and tourism — React Native for cost-effective dual-platform shipping.', link: '/services/mobile-app-development' },
    ],

    caseStudies: [
      { title: 'Community NGO — Aizawl', challenge: 'Donor communication, volunteer signup, and impact reporting were spread across email, Facebook, and PDF newsletters. Hard to demonstrate impact to international funders.', outcome: 'New site with donor portal, impact dashboard, and volunteer management. Subsequent grant applications cited the new transparency as a strength.' },
      { title: 'Bamboo crafts brand — Aizawl', challenge: 'Crafts sold only in physical Aizawl markets. No online presence and no way for customers across India to discover or order.', outcome: 'Shopify ecommerce + India shipping in 5 weeks. Pan-India orders within first month. Now consistently ships across NE and into Bangalore, Bombay, Delhi.' },
    ],

    industryDetails: [
      { name: 'Tourism & Eco-Travel', body: 'Itinerary pages, inquiry systems, and SEO targeted at Mizoram eco-tourism and cultural travel.' },
      { name: 'Bamboo & Handicrafts', body: 'Product catalogues, payment gateways, and shipping integrations for Mizoram-made products.' },
      { name: 'NGOs & Community Orgs', body: 'Donor-facing sites, impact reporting, and volunteer portals for Mizoram NGOs and church organisations.' },
      { name: 'Education & Schools', body: 'Admission systems, parent portals, and academic content for Aizawl schools.' },
      { name: 'Retail & Commerce', body: 'Lightweight ecommerce and showcase sites for Bara Bazaar and Dawrpui retailers.' },
      { name: 'Agriculture & Produce', body: 'Brand sites and ordering platforms for Mizoram agriculture and produce businesses.' },
    ],

    extendedFaqs: [
      { q: 'Do you offer charitable rates for Mizoram NGOs?', a: 'Yes — registered NGOs and faith-based organisations qualify for our charitable pricing tier. We have built donor-facing content, impact reporting pages, and volunteer portals for several NE nonprofits.' },
      { q: 'Can you build a site that performs well on the typical Aizawl mobile connection?', a: 'Yes — every site we ship is performance-tested on weak 4G common in Mizoram. Lazy loading, image compression, and minimal JS by default. Real conditions, not just local dev fibre.' },
      { q: 'How do you handle international shipping for Mizoram bamboo or handicraft brands?', a: 'Multi-currency payment, international shipping integrations (DHL, FedEx, India Post International), and customs documentation handling. We have shipped this multiple times.' },
      { q: 'Are you set up to work entirely remotely with an Aizawl client?', a: 'Yes — most Mizoram clients work with us fully remotely. WhatsApp updates, video briefings, shared folders. Quality and delivery pace match an in-city agency.' },
    ],

    nearbyAreas: ['Bara Bazaar', 'Dawrpui', 'Champhai', 'Lunglei', 'Serchhip', 'Kolasib', 'Lawngtlai', 'Saiha'],

    stats: [
      { value: '50+',          label: 'Projects Delivered' },
      { value: '3+',           label: 'Mizoram Clients' },
      { value: 'Mobile-first', label: 'Default Approach' },
      { value: 'Mon–Sat',      label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // KOHIMA (Tier 3)
  // ──────────────────────────────────────────────────────────────────────
  kohima: {
    intro: `Tech Waglogy LLP builds websites, mobile apps, and digital tools for Kohima and Nagaland — for the tourism operators that capitalise on the Hornbill Festival and the year-round draw of Naga culture, the agricultural cooperatives bringing Naga produce to markets across India, the schools and government institutions running essential public services, and the small retailers and artisan brands that make up the everyday Kohima economy. Our Nagaland projects share a common thread: we build for the full year, not just the festival season — because Naga businesses need digital infrastructure that earns its keep across all twelve months, not just during the November tourist surge.`,

    localContent: `Nagaland's brand identity in the rest of India is dominated by the Hornbill Festival — but the businesses we work with here operate across the full year, not just one month of it. That shapes our approach. We build websites that capture festival-season traffic and convert it into year-round bookings or sales. We build content that ranks for Naga cultural tourism searches even in the off-season. And we build for the agricultural and government clients whose work continues uninterrupted regardless of Hornbill. Our remote-first workflow with Kohima clients is deliberate — the goal is to deliver work that meets Bangalore-agency quality standards on a Sikkim-agency timeline and budget.`,

    whyChoose: [
      { title: 'Tourism & festival site experience', body: "Photo galleries, event calendars, travel guides, and inquiry systems for Naga cultural tourism — built to capture both Hornbill-season and year-round demand." },
      { title: 'Agricultural cooperative experience', body: 'Product catalogues, bulk-order inquiry systems, and trust-building content for Naga agricultural cooperatives and farmer groups.' },
      { title: 'Government & institutional projects', body: 'We work with government-adjacent and institutional clients across Nagaland. Compliance documentation in place for empanelled vendor work.' },
      { title: 'Mobile-first, low-bandwidth-ready', body: 'Designed for the connectivity reality of Nagaland — fast loading, lazy media, minimal JS. Performance-tested on real conditions.' },
      { title: 'Year-round content strategy', body: 'We build with content systems that capture festival traffic and convert it to year-round engagement — not just one-month traffic spikes.' },
      { title: 'Fixed-price, milestone delivery', body: 'You see the full quote upfront. No hourly billing, no scope-creep invoices six weeks in.' },
    ],

    serviceDetails: [
      { title: 'Tourism & festival websites', body: "Photo-rich tourism sites, event calendars, itinerary builders, and inquiry systems for Naga cultural and adventure tourism.", link: '/services/web-development' },
      { title: 'Agricultural cooperative websites', body: 'Product catalogues, bulk-order inquiry systems, and trust-building content for Naga cooperatives and farmer groups.', link: '/services/web-development' },
      { title: 'Government & institutional sites', body: 'Department portals, citizen-service tools, and institutional sites for Nagaland government and PSU clients.', link: '/services/software-development' },
      { title: 'School & education websites', body: 'Admission systems, parent portals, and academic content for Kohima educational institutions.', link: '/services/software-development' },
      { title: 'Handicraft & artisan ecommerce', body: 'Product-focused ecommerce for Naga handicraft and artisan products — domestic and international shipping ready.', link: '/services/web-development' },
    ],

    caseStudies: [
      { title: 'Tourism operator — Kohima', challenge: 'Inbound interest peaked during Hornbill Festival but dropped to near-zero rest of year. Website did not surface year-round Naga tourism content.', outcome: 'Content strategy + SEO targeting year-round Naga cultural tourism searches. Off-season traffic up significantly; bookings now distributed more evenly across the year.' },
      { title: 'Agricultural cooperative — Nagaland', challenge: 'Cooperative had quality produce but no way for wholesale buyers across India to discover or contact them.', outcome: 'B2B website with product catalogue, bulk-order inquiry, and trust-building content. First out-of-state wholesale order within 60 days of going live.' },
    ],

    industryDetails: [
      { name: 'Tourism & Cultural Events', body: 'Photo-rich tourism sites and event calendars for Naga cultural and adventure tourism.' },
      { name: 'Agriculture & Cooperatives', body: 'Product catalogues and bulk-order inquiry systems for Naga cooperatives and farmer groups.' },
      { name: 'Education & Schools', body: 'Admission systems, parent portals, and academic content for Kohima educational institutions.' },
      { name: 'Government & Departments', body: 'Department portals and citizen-service tools for Nagaland government clients.' },
      { name: 'Retail & Trade', body: 'Lightweight ecommerce and showcase sites for Kohima retailers.' },
      { name: 'Handicrafts & Local Produce', body: 'Product-focused ecommerce for Naga handicraft and specialty produce, domestic and international.' },
    ],

    extendedFaqs: [
      { q: 'Can you build a site that captures Hornbill Festival traffic but also performs year-round?', a: 'Yes — this is exactly the content strategy we recommend for Nagaland tourism clients. Festival traffic is a spike, but the right content + SEO converts it into year-round engagement and off-season bookings.' },
      { q: 'Do you work with Naga agricultural cooperatives?', a: 'Yes. We have built websites and B2B portals for cooperatives — product catalogues, bulk-order inquiry forms, and trust-building content for wholesale and retail buyers.' },
      { q: 'How do you handle the connectivity reality of Nagaland?', a: 'Every site we ship is performance-tested on weak 3G/4G common in Nagaland. Lazy loading, image compression, and minimal JS are defaults, not extras.' },
      { q: 'Can you support Nagaland government tender requirements?', a: 'Yes — we have GST, MSME, and standard compliance documentation in place. We can support empanelled vendors with white-labelled delivery and required documentation.' },
    ],

    nearbyAreas: ['Dimapur', 'Mokokchung', 'Tuensang', 'Mon', 'Wokha', 'Phek', 'Zunheboto', 'Peren'],

    stats: [
      { value: '50+',          label: 'Projects Delivered' },
      { value: '4+',           label: 'Nagaland Clients' },
      { value: 'Year-round',   label: 'Content Strategy' },
      { value: 'Mon–Sat',      label: 'Account Hours' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // AGARTALA (Tier 3)
  // ──────────────────────────────────────────────────────────────────────
  agartala: {
    intro: `Tech Waglogy LLP serves Agartala and Tripura with web development, mobile apps, and bilingual digital products — for businesses operating in the second-largest commercial city in Northeast India and the strategic gateway to Bangladesh trade. Agartala's commercial position is unique in the NE: high cross-border trade activity with Bangladesh, a strong agricultural base in rubber and bamboo, growing tourism around pilgrimage and cultural sites, and a Bengali-speaking commercial culture that connects naturally with both West Bengal and Bangladesh markets. Our Tripura clients benefit from our ability to deliver bilingual English + Bengali digital products and from our experience handling cross-border B2B presentation that is respectful and professional in both Indian and Bangladeshi business contexts.`,

    localContent: `Agartala is one of the few NE cities where bilingual digital content is not optional — it is the difference between credibility and being ignored. Bengali-speaking customers, partners, and government interactions all expect content that respects the language. We deliver bilingual English + Bengali websites with proper font handling, layout, and SEO configured for both languages — and we have done it enough times to know which technical pitfalls to avoid (font fallback chains, character encoding, search-engine localisation, hreflang tags). For our Agartala clients, that bilingual capability is often the deciding factor when they choose a vendor.`,

    whyChoose: [
      { title: 'Bilingual English + Bengali capability', body: 'Proper font handling, layout, and SEO configured for both languages. We know the technical pitfalls and how to avoid them.' },
      { title: 'Cross-border trade context', body: 'B2B sites that present credibly to both Indian and Bangladeshi partners. Product catalogues, contact systems, and export documentation done right.' },
      { title: 'Rubber, bamboo & agricultural sector experience', body: 'Sites and B2B portals for Tripura rubber, bamboo, and agricultural businesses — sectors that dominate the local economy.' },
      { title: 'Tourism & pilgrimage SEO', body: 'Itinerary pages, photo galleries, and inquiry systems for Tripura pilgrimage and tourism — Tripura Sundari, Neermahal, Unakoti, and others.' },
      { title: 'Remote-first delivery', body: 'Most Tripura clients work with us fully remotely. WhatsApp, video, shared docs — quality matches an in-city agency without the overhead.' },
      { title: 'Fixed pricing, transparent', body: 'Full quote upfront, milestone-based payments, no scope-creep billing later.' },
    ],

    serviceDetails: [
      { title: 'Bilingual English + Bengali websites', body: 'Proper font handling, layout, and SEO configured for both languages. Built for Tripura businesses serving Bengali-speaking customers and partners.', link: '/services/web-development' },
      { title: 'Cross-border B2B sites', body: 'Product catalogues, contact systems, and export documentation sections for Tripura businesses dealing with Bangladesh and India trade.', link: '/services/web-development' },
      { title: 'Tourism & pilgrimage websites', body: 'Itinerary pages and inquiry systems for Tripura Sundari, Neermahal, Unakoti, and other Tripura tourism destinations.', link: '/services/web-development' },
      { title: 'Agricultural & rubber sector sites', body: 'Brand sites and B2B portals for Tripura rubber, bamboo, and agricultural businesses.', link: '/services/web-development' },
      { title: 'School & education websites', body: 'Admission systems, parent portals, and academic content for Agartala educational institutions.', link: '/services/software-development' },
    ],

    caseStudies: [
      { title: 'Cross-border trader — Agartala', challenge: 'Existing site only in English. Bangladeshi partners struggled with the content. Inquiry rate was low and conversion was lower.', outcome: 'New bilingual English + Bengali site with proper hreflang and SEO for both markets. Bangladeshi inquiry quality improved meaningfully.' },
      { title: 'Tourism operator — Agartala', challenge: 'No web presence. Inbound tourism inquiries handled entirely on phone, with poor conversion and no way to showcase past tours.', outcome: 'New site with itinerary pages, photo gallery, and inquiry CRM. Inquiries up significantly in the next two seasons.' },
    ],

    industryDetails: [
      { name: 'Trade & Commerce', body: 'B2B sites that present credibly to both Indian and Bangladeshi partners.' },
      { name: 'Tourism & Pilgrimage', body: 'Itinerary pages and inquiry systems for Tripura tourism and pilgrimage destinations.' },
      { name: 'Rubber & Agriculture', body: 'Brand sites and B2B portals for Tripura rubber and agricultural businesses.' },
      { name: 'Bamboo & Handicrafts', body: 'Product-focused ecommerce for Tripura bamboo and handicraft products.' },
      { name: 'Education & Schools', body: 'Admission systems and parent portals for Agartala educational institutions.' },
      { name: 'Government & Institutions', body: 'Department portals and institutional sites for Tripura government clients.' },
    ],

    extendedFaqs: [
      { q: 'Can you really build a bilingual English + Bengali site that ranks well in both languages?', a: 'Yes — proper hreflang tags, bilingual SEO, font handling, and layout for both scripts. We have shipped this enough times to know what works in practice, not just in theory.' },
      { q: 'Do you handle international payment gateways for cross-border Bangladesh trade?', a: 'For B2B trade we typically build inquiry-and-quote workflows rather than direct international payment, which is the norm for Tripura cross-border commerce. For other models we set up multi-currency gateways as needed.' },
      { q: 'Can you support Tripura government tender requirements?', a: 'Yes — we have GST, MSME, and standard compliance documentation in place and can support empanelled vendors with white-labelled delivery.' },
      { q: 'How quickly can you turn around a project for an Agartala client?', a: 'Standard business websites: 3–5 weeks. Bilingual sites: 4–6 weeks. Mobile apps: 8–16 weeks. We give you a precise milestone schedule before kickoff.' },
    ],

    nearbyAreas: ['Bishalgarh', 'Sonamura', 'Udaipur', 'Belonia', 'Dharmanagar', 'Kailasahar', 'Ambassa', 'Sabroom'],

    stats: [
      { value: '50+',         label: 'Projects Delivered' },
      { value: '3+',          label: 'Tripura Clients' },
      { value: 'Bilingual',   label: 'EN + BN Capable' },
      { value: 'Mon–Sat',     label: 'Account Hours' },
    ],
  },
}

// Helper to merge rich content into a base city object (used in cities.js loader).
export function withRichContent(city) {
  const rich = citiesRichContent[city.slug]
  return rich ? { ...city, ...rich } : city
}
