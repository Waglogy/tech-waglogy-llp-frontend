import { insightRow } from './buildArticleHtml'

export const batch5 = [
  insightRow(
    {
      slug: 'cro-without-full-redesign',
      title: 'Conversion Rate Optimization Without Redesigning Everything',
      excerpt:
        'Small experiments on copy, proof, and speed often beat expensive visual overhauls.',
      tags: ['CRO', 'Experimentation', 'Growth'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-09-22'
    },
    [
      {
        h: 'Baseline the funnel',
        p: [
          'Instrument each step with event quality checks. Broken tracking wastes experiments.',
          'Segment by traffic source; partners and ads behave differently.'
        ]
      },
      {
        h: 'High-leverage levers',
        p: [
          'Headlines that clarify value, social proof near CTAs, risk reversal near pricing, and form friction cuts.',
          'Page speed fixes are experiments too—measure bounce changes.'
        ]
      },
      {
        h: 'Culture',
        p: [
          'Document hypotheses and learnings; failed tests are valuable data.',
          'Avoid peeking without statistics discipline on high-stakes flows.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'international-customers-currency-tax-shipping',
      title: 'Serving International Customers: Currency, Tax, and Shipping Basics',
      excerpt:
        'Cross-border commerce needs explicit duties messaging, payment methods, and support hours.',
      tags: ['E-commerce', 'International', 'Operations'],
      readTime: 8,
      image: null,
      date: '2025-09-26'
    },
    [
      {
        h: 'Pricing presentation',
        p: [
          'Local currency display reduces cognitive load even if settlement converts later.',
          'State whether duties are included or collected on delivery—surprise COD kills trust.'
        ]
      },
      {
        h: 'Tax complexity',
        p: [
          'Digital services taxes vary; involve advisors for thresholds and registrations.',
          'Automate invoice fields customers need for reimbursement.'
        ]
      },
      {
        h: 'Logistics and support',
        p: [
          'Publish realistic delivery ranges by region. Offer tracked options when margins allow.',
          'Staff async-friendly support or set clear SLA windows.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'legacy-system-migration-planning',
      title: 'Legacy System Migration: Planning Lift-and-Shift vs Refactor',
      excerpt:
        'Big bang cutovers fail quietly until payroll breaks. Sequence risk and validate in slices.',
      tags: ['Migration', 'Architecture', 'Risk'],
      readTime: 7,
      image: '/banner.png',
      date: '2025-09-30'
    },
    [
      {
        h: 'Understand the real dependencies',
        p: [
          'Map data owners, nightly jobs, and hidden Excel bridges. Interview ops, not only IT.',
          'Classify workloads: read-heavy reporting vs transactional core.'
        ]
      },
      {
        h: 'Patterns',
        p: [
          'Strangler fig: route slices of traffic to new services while old paths remain.',
          'Parallel runs compare outputs before switching author writes.'
        ],
        bullets: [
          'Rollback plans per phase',
          'Freeze windows communicated early',
          'Training before go-live, not after'
        ]
      },
      {
        h: 'Post-migration',
        p: [
          'Monitor error budgets and customer support spikes.',
          'Retire old UIs to prevent shadow usage.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'real-time-features-websockets-when-needed',
      title: 'Real-Time Features: WebSockets and When You Actually Need Them',
      excerpt:
        'Polling is fine for many dashboards. Real-time adds operational complexity—justify it with UX or safety.',
      tags: ['Engineering', 'Real-time', 'Architecture'],
      readTime: 6,
      image: null,
      date: '2025-10-04'
    },
    [
      {
        h: 'Signals for real-time',
        p: [
          'Collaborative editing, live ops consoles, fraud alerts, or chat justify persistent connections.',
          'If data updates minutely, cron and caching likely suffice.'
        ]
      },
      {
        h: 'Operational concerns',
        p: [
          'Sticky sessions, autoscaling connection pools, and backpressure handling matter.',
          'Plan reconnection, idempotent message handling, and mobile background limits.'
        ]
      },
      {
        h: 'Alternatives',
        p: [
          'SSE for server-to-client streams, short polling with ETags, or message queues for fan-out.',
          'Match the protocol to directionality and browser support.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'fintech-adjacent-sme-website-compliance-notes',
      title: 'Compliance Notes for Fintech-Adjacent SME Websites',
      excerpt:
        'Even marketing sites must avoid misleading rate claims and mishandling sensitive data.',
      tags: ['Compliance', 'Fintech', 'Legal'],
      readTime: 7,
      image: '/banner.png',
      date: '2025-10-08'
    },
    [
      {
        h: 'Regulated language',
        p: [
          'Coordinate copy with legal for APR/APY, guarantees, and testimonials.',
          'Regional rules differ; localize disclaimers thoughtfully.'
        ]
      },
      {
        h: 'Data minimization',
        p: [
          'Collect only necessary KYC fields; protect uploads with encryption and access logs.',
          'Retention schedules should be operationalized, not policy-only.'
        ]
      },
      {
        h: 'Third parties',
        p: [
          'Vet analytics and chat tools for data flows to unintended jurisdictions.',
          'Subprocessor lists must stay current for enterprise customers.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'community-member-portals-product',
      title: 'Building Community Through Member Portals',
      excerpt:
        'Portals work when they reduce friction for repeat actions and surface belonging—not only login walls.',
      tags: ['Product', 'Community', 'UX'],
      readTime: 6,
      image: null,
      date: '2025-10-12'
    },
    [
      {
        h: 'Jobs the portal must do',
        p: [
          'Renewals, resource downloads, support history, or cohort content—pick a spine.',
          'Avoid dumping every feature behind a gate without onboarding.'
        ]
      },
      {
        h: 'Moderation and safety',
        p: [
          'Report flows, blocking, and clear community guidelines reduce toxicity.',
          'Log moderation actions for appeals.'
        ]
      },
      {
        h: 'Growth loops',
        p: [
          'Referral tools, badges, and curated introductions can deepen engagement—measure quality, not vanity counts.',
          'Sync with email and events for people who rarely visit daily.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'ab-testing-ethics-small-teams',
      title: 'A/B Testing Ethics and Statistical Honesty for Small Teams',
      excerpt:
        'Stopping early on noise, or testing dark patterns, erodes trust and skews decisions.',
      tags: ['Experimentation', 'Ethics', 'Data'],
      readTime: 5,
      image: '/banner.png',
      date: '2025-10-16'
    },
    [
      {
        h: 'Design principled experiments',
        p: [
          'Hypothesize customer benefit, not only revenue extraction. Avoid deceptive UI patterns even if they “win.”',
          'Document audience exclusions and novelty effects.'
        ]
      },
      {
        h: 'Statistics basics',
        p: [
          'Predefine sample size and duration where feasible. Sequential peeking inflates false positives.',
          'Repeat experiments when external conditions change materially.'
        ]
      },
      {
        h: 'Culture',
        p: [
          'Celebrate learning over vanity wins. Share negative results internally.',
          'Pair quantitative readouts with qualitative session replays or interviews.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'seo-for-react-spas-ssr-meta-tags',
      title: 'SEO for React Apps: SSR, Meta Tags, and Crawl Budget',
      excerpt:
        'Client-only rendering leaves crawlers guessing. Server render critical HTML or prerender strategically.',
      tags: ['SEO', 'React', 'Next.js'],
      readTime: 8,
      image: null,
      date: '2025-10-20'
    },
    [
      {
        h: 'Rendering strategy',
        p: [
          'Server-side rendering or static generation ensures titles and body copy exist on first response.',
          'Hydration mismatches hurt UX and can confuse debugging—test with JS disabled on key templates.'
        ]
      },
      {
        h: 'Meta and sharing',
        p: [
          'Dynamic Open Graph tags need the same rendering path bots hit.',
          'Canonical tags prevent duplicate parameterized URLs from splitting equity.'
        ]
      },
      {
        h: 'Crawl hygiene',
        p: [
          'XML sitemaps, sensible robots rules, and internal linking help discovery.',
          'Fix soft 404s and infinite faceted URL traps—they waste crawl budget.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'agency-retainer-vs-project-engagements',
      title: 'Agency Retainers vs Project Engagements: Picking a Partnership Model',
      excerpt:
        'Projects ship defined scopes; retainers protect roadmaps and incident response. Match billing to uncertainty.',
      tags: ['Agency', 'Procurement', 'Leadership'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-10-24'
    },
    [
      {
        h: 'Projects',
        p: [
          'Clear deliverables, timelines, and change-order processes fit well-bounded launches.',
          'Risk: knowledge walks away unless documentation and handoff are contractual.'
        ]
      },
      {
        h: 'Retainers',
        p: [
          'Ongoing roadmaps, growth experiments, and production support benefit from predictable capacity.',
          'Define SLAs, meeting cadence, and how backlog priority is decided.'
        ]
      },
      {
        h: 'Hybrid',
        p: [
          'Project for major release plus small retainer for maintenance smooths transitions.',
          'Measure outcomes jointly: uptime, velocity, and customer metrics—not vanity hours.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'prepare-team-ai-augmented-workflow',
      title: 'Preparing Your Team for an AI-Augmented Workflow',
      excerpt:
        'Tools change weekly; principles endure: verification, privacy, and skill growth.',
      tags: ['AI', 'Team', 'Future of Work'],
      readTime: 7,
      image: null,
      date: '2025-10-28'
    },
    [
      {
        h: 'Policies first',
        p: [
          'Classify data that must never enter public models. Provide approved tools and audit trails.',
          'Train staff on prompt hygiene and output verification.'
        ]
      },
      {
        h: 'Pair AI with expertise',
        p: [
          'Use assistants for drafts, summaries, and exploration—human review for customer-facing or regulated content.',
          'Measure time saved and error rates, not only novelty.'
        ]
      },
      {
        h: 'Upskilling',
        p: [
          'Reward learning system design and problem framing; prompting alone is brittle.',
          'Rotate “tool stewards” who evaluate new vendors without blocking everyone.'
        ]
      }
    ]
  )
]
