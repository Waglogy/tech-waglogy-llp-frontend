import { withRichContent } from './citiesRichContent.js'

const baseCities = [
  {
    slug: 'gangtok',
    name: 'Gangtok',
    state: 'Sikkim',
    badge: 'IT Company · Gangtok, Sikkim',
    h1: 'Web & App Development Company in Gangtok',
    heroPara:
      'We build websites, mobile apps, and software for Gangtok businesses — hotels, tour operators, schools, restaurants, and retailers. Based here in the city, involved at every step.',
    localHeading: 'We know Gangtok business.',
    localPara:
      'Gangtok is where we started. We understand the seasonality of tourism-dependent businesses, the infrastructure reality of building in a hill city, and what local customers actually look for online. That context is baked into every project.',
    localPoints: [
      'Tourist-season planning factored into project timelines',
      'Sites tested on slow mobile connections common in the hills',
      'Local payment gateways and booking integrations',
      'In-person meetings available at our Tadong office',
    ],
    industriesHeading: 'Businesses we work with in Gangtok',
    industries: [
      'Hotels & Homestays',
      'Tour Operators',
      'Schools & Colleges',
      'Restaurants & Cafés',
      'Retail & Local Shops',
      'Government & NGOs',
    ],
    faq: [
      {
        q: 'Can you visit us in Gangtok for a meeting?',
        a: 'Yes — we are based in Tadong, Gangtok. We are happy to meet in person, visit your premises, or collaborate over a call. Whatever suits you.',
      },
      {
        q: 'Do you build websites for hotels and homestays?',
        a: 'We do. We have built booking-capable websites for accommodation businesses in Sikkim, including direct booking integrations that reduce third-party commission dependency.',
      },
      {
        q: 'How much does a website cost in Gangtok?',
        a: 'Most business websites fall between ₹25,000 and ₹75,000 depending on scope. We give you a fixed written quote before any work begins — no surprises at the end.',
      },
      {
        q: 'Will the website load properly with slow internet connectivity?',
        a: 'Yes. We build lightweight, speed-optimised websites that perform well even on slower 3G/4G connections common in hill stations and off-season months.',
      },
    ],
    seo: {
      title: 'Web Development Company in Gangtok, Sikkim | Waglogy',
      description:
        'Tech Waglogy is a web development company in Gangtok, Sikkim. Websites, apps & AI for hotels, schools, tour operators. Local team. Fixed pricing.',
      canonical: '/web-development/gangtok',
    },
    geo: { lat: '27.3389', lng: '88.6065' },
  },

  {
    slug: 'sikkim',
    name: 'Sikkim',
    state: 'Sikkim',
    badge: 'IT Company · Sikkim, Northeast India',
    h1: 'Web & App Development Company in Sikkim',
    heroPara:
      "Sikkim's businesses are growing — tourism, organic farming, homestays, schools, and startups. We build the digital infrastructure that lets them compete nationally and globally.",
    localHeading: "Built for Sikkim's unique business environment.",
    localPara:
      "Sikkim operates differently — 100% organic certification, limited land area, geography-driven logistics, and one of India's most tourism-dependent economies. We build websites and software that fit that reality, not a generic India template.",
    localPoints: [
      "Deep experience with Sikkim's tourism and hospitality sector",
      'Sites optimised for poor connectivity in remote district areas',
      'Organic produce and agri-business e-commerce experience',
      'Serving clients across all four districts — Gangtok, Namchi, Mangan, Gyalshing',
    ],
    industriesHeading: 'Businesses we work with across Sikkim',
    industries: [
      'Tourism & Hospitality',
      'Organic Farming & Agri',
      'Schools & Colleges',
      'Government & Departments',
      'Real Estate',
      'Healthcare & Clinics',
    ],
    faq: [
      {
        q: 'Do you serve businesses outside Gangtok within Sikkim?',
        a: 'Yes. We work with clients in Namchi, Jorethang, Mangan, Gyalshing, and rural areas across all four districts of Sikkim. All coordination can happen remotely or over phone and WhatsApp.',
      },
      {
        q: 'Can you build e-commerce for Sikkim organic products?',
        a: 'Yes — we have experience building e-commerce for agricultural and specialty food businesses, including shipping integrations and payment gateways that work across India.',
      },
      {
        q: 'Do you help with Google My Business and local SEO for Sikkim businesses?',
        a: 'Yes. We set up and optimise Google Business Profiles, local schema markup, and on-page SEO to help your business appear in local search results.',
      },
      {
        q: 'I am a startup in Sikkim. Do you work with early-stage businesses?',
        a: 'Absolutely. We offer staged project delivery so early-stage businesses can start with what they need and expand over time. Some of our best long-term clients started with us at the idea stage.',
      },
    ],
    seo: {
      title: 'Web Development Company in Sikkim | Tech Waglogy LLP',
      description:
        "Sikkim's trusted web and app development company. We serve businesses across all four districts — Gangtok, Namchi, Mangan, Gyalshing. Free consultation.",
      canonical: '/web-development/sikkim',
    },
    geo: { lat: '27.5330', lng: '88.5122' },
  },

  {
    slug: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    badge: 'IT Company · Guwahati, Assam',
    h1: 'Web & App Development Company in Guwahati',
    heroPara:
      'Guwahati is the commercial capital of Northeast India. We help its businesses — from startups to established firms — build the digital presence and tools to compete at a national level.',
    localHeading: 'Guwahati is the gateway to Northeast India.',
    localPara:
      "As the region's largest city, Guwahati hosts banks, hospitals, education institutions, logistics companies, and fast-growing startups. We build digital infrastructure that matches the scale and ambition of Guwahati's business community.",
    localPoints: [
      "Experience with Assam's oil, education, and logistics sectors",
      'Fast turnaround with remote-first, async-capable collaboration',
      'E-commerce integrations for pan-NE retail and wholesale',
      'High-traffic site architecture for regional scale',
    ],
    industriesHeading: 'Businesses we work with in Guwahati',
    industries: [
      'Education & Coaching Centres',
      'Oil & Energy',
      'Logistics & Transport',
      'Healthcare & Hospitals',
      'Real Estate & Construction',
      'Retail & E-commerce',
    ],
    faq: [
      {
        q: 'Can you work with a Guwahati business fully remotely?',
        a: 'Yes — the majority of our clients outside Sikkim work with us fully remotely. We use video calls, shared documents, and WhatsApp to keep communication smooth at every stage.',
      },
      {
        q: 'Do you build websites for coaching centres and schools in Guwahati?',
        a: 'We do. Education is one of our most common project categories in Assam — from simple school websites with fee portals to full LMS-integrated platforms for coaching institutes.',
      },
      {
        q: 'How long does a website project take if I am in Guwahati?',
        a: 'The same as any other project — standard business websites take 3–5 weeks. We adapt our process to work effectively across distances with no drop in communication quality.',
      },
      {
        q: 'Do you provide ongoing SEO services for Guwahati businesses?',
        a: 'We provide technical SEO setup during delivery and can extend to ongoing local SEO support — Google Business Profile management, content updates, and ranking reports — as an add-on service.',
      },
    ],
    seo: {
      title: 'Web Development Company in Guwahati, Assam | Waglogy',
      description:
        'Web and app development company serving Guwahati and Assam. Websites for coaching centres, hospitals, retail. Remote-friendly, fixed pricing.',
      canonical: '/web-development/guwahati',
    },
    geo: { lat: '26.1445', lng: '91.7362' },
  },

  {
    slug: 'shillong',
    name: 'Shillong',
    state: 'Meghalaya',
    badge: 'IT Company · Shillong, Meghalaya',
    h1: 'Web & App Development Company in Shillong',
    heroPara:
      "Shillong has one of Northeast India's most active startup and creative communities. We build websites, apps, and software that match that ambition — clean, modern, and built to scale.",
    localHeading: 'Shillong is building something different.',
    localPara:
      "The Scotland of the East has a distinct character — educated workforce, strong tourism, a thriving music and arts scene, and growing tech interest. We appreciate what makes Shillong businesses distinctive and build digital tools that reflect that.",
    localPoints: [
      'Experience with tourism, education, and creative industry clients',
      "Modern design standards that match Shillong's cosmopolitan identity",
      'Startup-friendly pricing with modular delivery',
      'Remote-first collaboration with regular structured check-ins',
    ],
    industriesHeading: 'Businesses we work with in Shillong',
    industries: [
      'Tourism & Hospitality',
      'Education & Colleges',
      'Music & Creative Arts',
      'Retail & Boutiques',
      'Healthcare & Clinics',
      'Government & NGOs',
    ],
    faq: [
      {
        q: 'Do you work with startups based in Shillong?',
        a: 'Yes — startups are one of our most common client types. We offer modular delivery so you can start with a lean MVP and add features as your business grows.',
      },
      {
        q: 'Can you build a website for a tourism business in Meghalaya?',
        a: "Absolutely. We have experience building tourism-focused websites including itinerary showcases, booking inquiry forms, photo galleries, and SEO content targeted at domestic and international travellers visiting Meghalaya.",
      },
      {
        q: "I need a website that reflects Shillong's creative identity — can you design for that?",
        a: 'Yes. We do not use generic templates. Every website is custom-designed, and we take brand identity seriously — starting with understanding what makes your business distinctive.',
      },
      {
        q: 'How do projects work remotely from Shillong?',
        a: 'Entirely smoothly. We collaborate over video calls, WhatsApp, and shared tools. Most of our client meetings outside Sikkim are remote, and the workflow is the same quality as on-site.',
      },
    ],
    seo: {
      title: 'Web Development Company in Shillong, Meghalaya | Waglogy',
      description:
        'Tech Waglogy builds websites, apps, and AI tools for Shillong businesses — tourism, education, hospitality, creative. Northeast experts. Fixed quotes.',
      canonical: '/web-development/shillong',
    },
    geo: { lat: '25.5788', lng: '91.8933' },
  },

  {
    slug: 'itanagar',
    name: 'Itanagar',
    state: 'Arunachal Pradesh',
    badge: 'IT Company · Itanagar, Arunachal Pradesh',
    h1: 'Web & App Development Company in Itanagar',
    heroPara:
      "Itanagar is Arunachal Pradesh's growing capital — home to government bodies, educational institutions, tourism businesses, and new enterprises. We build technology that works for this market.",
    localHeading: "Technology built for Arunachal's growing economy.",
    localPara:
      "Arunachal Pradesh is opening up — tourism is booming, educational institutions are expanding, and entrepreneurship is growing. We help Itanagar businesses establish a credible, functional digital presence that works for both local and out-of-state audiences.",
    localPoints: [
      'Experience with government-adjacent and institutional clients',
      'Tourism and adventure travel website expertise',
      'Connectivity-aware development for remote network conditions',
      'Straightforward remote collaboration with regular progress updates',
    ],
    industriesHeading: 'Businesses we work with in Itanagar',
    industries: [
      'Government & Departments',
      'Tourism & Adventure Travel',
      'Schools & Colleges',
      'Agriculture & Trade',
      'Small Business & Retail',
      'NGOs & Community Organisations',
    ],
    faq: [
      {
        q: 'Can you build websites for tourism operators in Arunachal Pradesh?',
        a: "Yes — adventure travel and eco-tourism are project types we handle well. We build sites with permit information, itinerary showcases, and inquiry systems tailored to Arunachal's tourism context.",
      },
      {
        q: 'Do you handle government or institutional website projects?',
        a: 'We work with government-adjacent and institutional clients. For formal government procurement projects, we can support vendors or agencies with development and technical delivery.',
      },
      {
        q: 'What is your turnaround time for projects in Itanagar?',
        a: 'The same as for any location — standard websites in 3–5 weeks, apps in 8–16 weeks. Distance does not affect our timelines. We work fully remote with regular progress updates.',
      },
      {
        q: 'How does billing and payment work for clients in Arunachal Pradesh?',
        a: 'We accept bank transfer, UPI, and online payment. Work is milestone-based — you pay in stages as defined deliverables are completed, not in a single upfront amount.',
      },
    ],
    seo: {
      title: 'Web Development Company in Itanagar, Arunachal | Waglogy',
      description:
        'Web and app development for Itanagar and Arunachal Pradesh. Government, tourism, education, and small business sites. Connectivity-aware engineering.',
      canonical: '/web-development/itanagar',
    },
    geo: { lat: '27.0844', lng: '93.6053' },
  },

  {
    slug: 'imphal',
    name: 'Imphal',
    state: 'Manipur',
    badge: 'IT Company · Imphal, Manipur',
    h1: 'Web & App Development Company in Imphal',
    heroPara:
      "Manipur's businesses — from weavers selling Meitei handloom to tour operators running valley treks — deserve a digital presence that matches their quality. We build it.",
    localHeading: "We understand Manipur's distinct business identity.",
    localPara:
      "Manipur has a rich commercial identity — textiles, agriculture, sports, and tourism are all growing sectors. We build websites and apps that help Imphal businesses reach customers beyond state borders without losing the local authenticity that makes them unique.",
    localPoints: [
      'E-commerce experience for handloom and artisan product sellers',
      'Tourism and cultural travel website expertise',
      'Mobile-first design for primarily mobile-browsing audience',
      'Remote collaboration with zero friction — fully async-capable',
    ],
    industriesHeading: 'Businesses we work with in Imphal',
    industries: [
      'Handloom & Textiles',
      'Tourism & Cultural Travel',
      'Agriculture & Organic Produce',
      'Education & Coaching',
      'Sports & Fitness',
      'Retail & Small Business',
    ],
    faq: [
      {
        q: 'Can you build an online store for handloom and textile products from Manipur?',
        a: 'Yes — this is a project type we are experienced with. We build e-commerce stores with proper product layout, size/variant selectors, and payment gateways that work across India and internationally.',
      },
      {
        q: 'Do you help Imphal businesses rank on Google?',
        a: 'Yes. Every website we build is technically SEO-optimised from the start — proper meta tags, structured data, page speed, and schema markup. We also offer ongoing local SEO support separately.',
      },
      {
        q: 'What kind of businesses from Manipur do you typically work with?',
        a: 'We work with tourism operators, retail businesses, schools, artisan product sellers, and service businesses. If you have a business and need a digital presence or tool, we are equipped to help.',
      },
      {
        q: 'How do we communicate and manage the project remotely?',
        a: 'We use WhatsApp for day-to-day updates, video calls for briefings and reviews, and shared folders for content. Most clients find the remote process easier than expected — we keep it simple.',
      },
    ],
    seo: {
      title: 'Web Development Company in Imphal, Manipur | Waglogy',
      description:
        'Mobile-first websites, ecommerce, and apps for Imphal businesses — handloom, tourism, education, retail. Built for Manipur audiences. Fixed pricing.',
      canonical: '/web-development/imphal',
    },
    geo: { lat: '24.8170', lng: '93.9368' },
  },

  {
    slug: 'aizawl',
    name: 'Aizawl',
    state: 'Mizoram',
    badge: 'IT Company · Aizawl, Mizoram',
    h1: 'Web & App Development Company in Aizawl',
    heroPara:
      "Mizoram's businesses are increasingly connected to national and global markets. We build the websites, apps, and tools that make that connection real — starting with Aizawl.",
    localHeading: "A digital partner that understands Mizoram's market.",
    localPara:
      "Aizawl is a city with high smartphone penetration, a growing youth-led business scene, and significant NGO and community organisation activity. We build lean, mobile-first digital products that fit the Mizoram context without overbuilding.",
    localPoints: [
      'Mobile-first development for high smartphone usage audience',
      'Lightweight sites optimised for variable 4G coverage',
      'NGO and community organisation website experience',
      'Tourism and bamboo industry digital presence expertise',
    ],
    industriesHeading: 'Businesses we work with in Aizawl',
    industries: [
      'Tourism & Eco-Travel',
      'Bamboo & Handicrafts',
      'NGOs & Community Orgs',
      'Education & Schools',
      'Retail & Commerce',
      'Agriculture & Produce',
    ],
    faq: [
      {
        q: 'Do you work with NGOs and community organisations in Mizoram?',
        a: 'Yes — we regularly work with nonprofits and community organisations. We offer charitable rates for registered NGOs and have experience with donor-facing content, impact reporting pages, and volunteer portals.',
      },
      {
        q: 'Can you build an e-commerce site for bamboo or handicraft products?',
        a: 'Yes. We build product-focused e-commerce stores with a clean catalogue structure, product images, and payment and shipping integrations for domestic and international orders.',
      },
      {
        q: 'Is the website going to look good on phones? Most users in Aizawl browse on mobile.',
        a: 'Every website we build is mobile-first — designed for phones first, then scaled up to desktop. Performance on 4G and weaker connections is tested as part of our delivery checklist.',
      },
      {
        q: 'How much does a website cost for a small business in Aizawl?',
        a: 'Small business websites start from ₹25,000 for a professional, fully functional site. We give you a fixed quote — you know the exact amount before we start any work.',
      },
    ],
    seo: {
      title: 'Web Development Company in Aizawl, Mizoram | Waglogy',
      description:
        'Websites and apps for Aizawl businesses, NGOs, and bamboo brands. Mobile-first, charitable rates for NGOs, ecommerce-ready. Northeast specialists.',
      canonical: '/web-development/aizawl',
    },
    geo: { lat: '23.7271', lng: '92.7176' },
  },

  {
    slug: 'kohima',
    name: 'Kohima',
    state: 'Nagaland',
    badge: 'IT Company · Kohima, Nagaland',
    h1: 'Web & App Development Company in Kohima',
    heroPara:
      "Nagaland's vibrant culture, festivals, and growing business community deserve a strong digital presence. We build websites and apps for Kohima businesses ready to be discovered beyond state borders.",
    localHeading: 'Kohima is more than the Hornbill Festival.',
    localPara:
      "Year-round, Kohima's businesses — from local retail to government institutions to agricultural cooperatives — need digital tools that work. We build for the full year, not just the tourist season. Real business utility, reliably delivered.",
    localPoints: [
      'Tourism and festival-oriented website experience',
      'Agricultural and cooperative sector knowledge',
      'Government and institutional project experience',
      'Mobile-first, low-bandwidth-ready development',
    ],
    industriesHeading: 'Businesses we work with in Kohima',
    industries: [
      'Tourism & Cultural Events',
      'Agriculture & Cooperatives',
      'Education & Schools',
      'Government & Departments',
      'Retail & Trade',
      'Handicrafts & Local Produce',
    ],
    faq: [
      {
        q: "Can you build a website that showcases Nagaland's culture and tourism?",
        a: 'Yes — we have experience building visually rich, content-heavy tourism and cultural websites. Photo galleries, event calendars, travel guides, and inquiry systems are all part of our standard delivery.',
      },
      {
        q: "Do you work with agricultural cooperatives or farmers' groups?",
        a: 'Yes. We have built websites and simple platforms for cooperatives — product catalogues, bulk order inquiry forms, and pages that build trust with wholesale and retail buyers.',
      },
      {
        q: 'Can you help Kohima businesses get found on Google?',
        a: 'Absolutely. Every site we build includes proper technical SEO. We also offer Google Business Profile setup and local SEO support to help your business appear in "near me" and city-specific searches.',
      },
      {
        q: 'What is the minimum budget for a website for a Kohima business?',
        a: 'Business websites start from ₹25,000. That gets you a professionally designed, mobile-ready, SEO-optimised website — not a page builder template. We tell you the exact cost upfront.',
      },
    ],
    seo: {
      title: 'Web Development Company in Kohima, Nagaland | Waglogy',
      description:
        'Websites and apps for Kohima and Nagaland — tourism, cooperatives, education, government. Year-round content strategy beyond Hornbill Festival.',
      canonical: '/web-development/kohima',
    },
    geo: { lat: '25.6751', lng: '94.1086' },
  },

  {
    slug: 'agartala',
    name: 'Agartala',
    state: 'Tripura',
    badge: 'IT Company · Agartala, Tripura',
    h1: 'Web & App Development Company in Agartala',
    heroPara:
      "Agartala sits at the crossroads of India and Bangladesh — a strategic commercial location with growing trade, tourism, and enterprise activity. We build the digital presence that matches that opportunity.",
    localHeading: "Agartala's commercial position is an advantage.",
    localPara:
      "As the second-largest city in Northeast India and a gateway to Bangladesh trade, Agartala businesses have regional reach that demands a professional digital presence. We build for that scale — clean, credible, and ready for cross-border visibility.",
    localPoints: [
      'Experience with cross-border trade and bilateral commerce context',
      'Bilingual website capability (English + Bengali)',
      'Rubber, bamboo, and agricultural sector website experience',
      'Tourism and pilgrimage site digital marketing experience',
    ],
    industriesHeading: 'Businesses we work with in Agartala',
    industries: [
      'Trade & Commerce',
      'Tourism & Pilgrimage',
      'Rubber & Agriculture',
      'Bamboo & Handicrafts',
      'Education & Schools',
      'Government & Institutions',
    ],
    faq: [
      {
        q: 'Can you build a bilingual website in English and Bengali for our Agartala business?',
        a: 'Yes — we build multilingual websites and can deliver a Bengali + English version with proper font support, layout, and SEO configured for both languages.',
      },
      {
        q: 'Do you build websites for businesses that deal with Bangladesh trade?',
        a: 'Yes. We build business websites and B2B portals that present your company credibly to both Indian and Bangladeshi partners — with product catalogues, contact systems, and export documentation sections.',
      },
      {
        q: 'How do I get a quote for a website project in Agartala?',
        a: 'Fill in our contact form or message us on WhatsApp with a brief description of what you need. We typically respond within one business day with a clear, itemised quote at no obligation.',
      },
      {
        q: 'Do you offer website maintenance after delivery?',
        a: 'Yes. We offer monthly maintenance packages that cover content updates, security patches, hosting management, and small feature additions — so your website stays current without you managing it.',
      },
    ],
    seo: {
      title: 'Web Development Company in Agartala, Tripura | Waglogy',
      description:
        'Bilingual English + Bengali websites and apps for Agartala businesses. Cross-border trade, tourism, agriculture, government. Northeast specialists.',
      canonical: '/web-development/agartala',
    },
    geo: { lat: '23.8315', lng: '91.2868' },
  },

  {
    slug: 'siliguri',
    name: 'Siliguri',
    state: 'West Bengal',
    badge: 'IT Company · Siliguri, West Bengal',
    h1: 'Web & App Development Company in Siliguri',
    heroPara:
      'Siliguri is the logistics capital and commercial gateway of Northeast India — and a business hub in its own right. We build digital infrastructure for the city\'s fast-moving enterprises.',
    localHeading: 'Siliguri businesses need to move fast.',
    localPara:
      "As the entry point for goods, services, and people into Northeast India, Siliguri's businesses operate at pace. Tea traders, logistics companies, retailers, and healthcare providers here need websites and software that are efficient, reliable, and professional — not just pretty.",
    localPoints: [
      'Logistics, transport, and supply chain website experience',
      'Tea trade and export-related digital presence expertise',
      'Healthcare and hospital website development experience',
      'High-traffic, high-reliability site architecture',
    ],
    industriesHeading: 'Businesses we work with in Siliguri',
    industries: [
      'Logistics & Transport',
      'Tea Trade & Export',
      'Healthcare & Hospitals',
      'Retail & Wholesale',
      'Real Estate & Construction',
      'Education & Coaching',
    ],
    faq: [
      {
        q: 'Do you build websites for tea businesses and exporters in Siliguri?',
        a: 'Yes — we have built websites for tea traders and agri-exporters, including product catalogue pages, export inquiry forms, certifications display, and B2B contact systems.',
      },
      {
        q: 'Can you build a website or app for a logistics or transport company?',
        a: 'Absolutely. We build logistics company websites and transport management tools — fleet tracking integrations, booking portals, rate calculators, and customer dashboards.',
      },
      {
        q: 'How quickly can a project be completed for a business in Siliguri?',
        a: 'Standard business websites take 3–5 weeks from approved brief to delivery. For simpler requirements we can move faster. We set a clear milestone schedule before work begins.',
      },
      {
        q: 'Do you provide hosting for websites built for Siliguri businesses?',
        a: 'Yes — we offer managed hosting on reliable cloud infrastructure with 99.9% uptime, SSL certificates, daily backups, and performance monitoring included.',
      },
    ],
    seo: {
      title: 'Web Development Company in Siliguri, West Bengal | Waglogy',
      description:
        'Logistics software, tea trade B2B portals, hospital sites, and apps for Siliguri businesses. High-traffic architecture, Northeast gateway specialists.',
      canonical: '/web-development/siliguri',
    },
    geo: { lat: '26.7271', lng: '88.3953' },
  },

  {
    slug: 'darjeeling',
    name: 'Darjeeling',
    state: 'West Bengal',
    badge: 'IT Company · Darjeeling, West Bengal',
    h1: 'Web & App Development Company in Darjeeling',
    heroPara:
      "Darjeeling's tea estates, hill stations, and boarding schools are world-renowned. We build websites and apps that give those businesses the online presence they deserve — at local rates.",
    localHeading: 'Darjeeling has a global audience. Your website should too.',
    localPara:
      'Darjeeling attracts visitors and buyers from around the world — tea connoisseurs, tourists, boarding school parents, and trekkers. A website that reaches that audience needs to be fast, credible, and optimised for international search. We build exactly that.',
    localPoints: [
      'Tourism and hospitality website experience (hotels, resorts, homestays)',
      'Tea estate and direct-to-consumer e-commerce experience',
      'School and educational institution website development',
      'Sites optimised for international as well as domestic search traffic',
    ],
    industriesHeading: 'Businesses we work with in Darjeeling',
    industries: [
      'Tea Estates & Direct Sales',
      'Hotels, Resorts & Homestays',
      'Schools & Boarding Institutions',
      'Trekking & Adventure Tourism',
      'Retail & Boutiques',
      'Tour Operators',
    ],
    faq: [
      {
        q: 'Can you build a direct-to-consumer website for my Darjeeling tea estate?',
        a: 'Yes — this is one of our specialist project types. We build tea estate websites with product catalogues by flush and grade, subscription options, secure checkout, and international shipping integrations.',
      },
      {
        q: 'Do you build websites for hotels and homestays in Darjeeling?',
        a: 'We do. We build accommodation websites with photo galleries, room showcases, availability calendars, and direct booking inquiry forms — designed to convert tourists researching Darjeeling online.',
      },
      {
        q: 'Can you build a school website for a boarding school in Darjeeling?',
        a: 'Yes. We have educational institution experience — admissions information, campus tours, faculty pages, news sections, fee structures, and parent portal integrations.',
      },
      {
        q: 'Will my Darjeeling business website rank well on Google?',
        a: 'We build every site with on-page SEO from day one — proper title tags, schema markup, mobile performance, and structured content. Local and international keyword optimisation is part of the delivery.',
      },
    ],
    seo: {
      title: 'Web Development Company in Darjeeling | Tech Waglogy',
      description:
        'Tea estate D2C, hotel booking sites, boarding school portals, and tourism websites for Darjeeling businesses. International-standard, Sikkim-based team.',
      canonical: '/web-development/darjeeling',
    },
    geo: { lat: '27.0360', lng: '88.2627' },
  },
]

// Merge optional rich content (Phase 3 priority pages) into the base entries.
// Cities without an entry in citiesRichContent.js continue to render with
// just the base fields — no breaking changes.
export const cities = baseCities.map(withRichContent)

export const getCityBySlug = (slug) => cities.find((c) => c.slug === slug)

