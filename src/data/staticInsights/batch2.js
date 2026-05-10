import { insightRow } from './buildArticleHtml'

export const batch2 = [
  insightRow(
    {
      slug: 'mobile-first-design-majority-traffic',
      title: 'Mobile-First Design: Your Customers Are Already There',
      excerpt:
        'Most discovery, chat, and checkout starts on a phone. Designing desktop-first and “shrinking” guarantees friction where it hurts most.',
      tags: ['UX', 'Mobile', 'Design'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-05-25'
    },
    [
      {
        h: 'Read the analytics honestly',
        p: [
          'Segment traffic and conversions by device and network. If mobile underperforms desktop, the issue is rarely “mobile users don’t buy”—it is usually forms, speed, or trust cues.',
          'Test on real hardware your audience uses, not only the latest flagship.'
        ]
      },
      {
        h: 'Layout and interaction patterns',
        p: [
          'Thumb zones matter for primary actions. Sticky CTAs can help—or annoy—depending on context; usability test checkout flows.',
          'Avoid hover-only interactions; provide visible affordances for taps.'
        ],
        bullets: [
          'Large tap targets and readable type without zoom',
          'Minimize steps to contact, book, or pay',
          'Inline validation on long forms'
        ]
      },
      {
        h: 'Performance as UX',
        p: [
          'Defer non-critical images, prioritize text and primary CTA paint, and compress video backgrounds that dominate LCP.',
          'Treat offline or flaky connectivity as normal for parts of your audience.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'security-basics-small-business-websites',
      title: 'Security Basics Every Small Business Website Should Implement',
      excerpt:
        'You do not need a red-team exercise to cover fundamentals: HTTPS, updates, backups, and least-privilege access stop most opportunistic attacks.',
      tags: ['Security', 'DevOps', 'SME'],
      readTime: 7,
      image: null,
      date: '2025-05-28'
    },
    [
      {
        h: 'Transport and certificates',
        p: [
          'Enforce HTTPS everywhere, including APIs and staging. Automate certificate renewal and monitor expiry.',
          'Use HSTS once you are confident all subdomains are covered.'
        ]
      },
      {
        h: 'Dependencies and admin surfaces',
        p: [
          'Patch frameworks, plugins, and server packages on a schedule. Require MFA for CMS and hosting accounts.',
          'Restrict admin URLs, rate-limit login attempts, and alert on unusual admin activity.'
        ]
      },
      {
        h: 'Backups and incident response',
        p: [
          'Automate encrypted backups with tested restores—an untested backup is wishful thinking.',
          'Document who to call, how to rotate secrets, and how to communicate with customers if data is at risk.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'performance-budgets-how-fast-enough',
      title: 'Performance Budgets: How Fast Is Fast Enough?',
      excerpt:
        'A performance budget turns opinions into constraints your team can ship against—before launch, not after complaints.',
      tags: ['Performance', 'Engineering', 'Leadership'],
      readTime: 5,
      image: '/banner.png',
      date: '2025-06-02'
    },
    [
      {
        h: 'Define budgets from business goals',
        p: [
          'Tie targets to conversion data where possible. If shaving 300ms on checkout lifts completion, that is your north star for that funnel.',
          'Budgets can cover JS bundle size, image bytes, third-party count, and Core Web Vitals thresholds.'
        ]
      },
      {
        h: 'Enforce in CI',
        p: [
          'Lighthouse CI or similar checks on pull requests catch regressions early.',
          'Allow exceptions with documented owners and expiry dates—otherwise budgets erode.'
        ]
      },
      {
        h: 'Communicate tradeoffs',
        p: [
          'Marketing may want another pixel; product wants a carousel. Make the byte cost visible so decisions are conscious.',
          'Revisit budgets quarterly as devices and networks evolve.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'content-strategy-technical-b2b',
      title: 'Content Strategy for Technical B2B Companies',
      excerpt:
        'Engineering buyers skim for proof. Depth, clarity, and evidence beat vague thought leadership.',
      tags: ['Content', 'B2B', 'Marketing'],
      readTime: 8,
      image: null,
      date: '2025-06-06'
    },
    [
      {
        h: 'Answer jobs-to-be-done',
        p: [
          'Map buying questions: integration requirements, uptime expectations, data residency, implementation timelines, and pricing models.',
          'Publish architecture notes, security FAQs, and API limits where relevant—sanitized but specific.'
        ]
      },
      {
        h: 'Formats that convert',
        p: [
          'Comparison pages, migration checklists, and annotated diagrams outperform generic “5 tips” posts for late-stage research.',
          'Case studies should quantify before/after and name the constraints you solved.'
        ],
        bullets: [
          'Peer validation with logos and quotes',
          'Clear next step: demo, trial, or technical workshop',
          'Gated deep dives only when value is obvious'
        ]
      },
      {
        h: 'Editorial cadence',
        p: [
          'Fewer, deeper pieces often beat daily fluff. Update cornerstone content as products change.',
          'Internally link related docs to help humans and crawlers understand topical clusters.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'ga4-setup-owners-without-noise',
      title: 'GA4 Setup for Owners Who Want Signal, Not Dashboard Noise',
      excerpt:
        'Google Analytics 4 is powerful and easy to misconfigure. Focus on events that map to money and quality.',
      tags: ['Analytics', 'GA4', 'Growth'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-06-10'
    },
    [
      {
        h: 'Define conversions early',
        p: [
          'Track qualified leads, purchases, and key micro-conversions like “pricing calculator submitted.” Avoid vanity pageview goals.',
          'Use enhanced measurement thoughtfully; spam events clutter exploration reports.'
        ]
      },
      {
        h: 'Audiences and attribution patience',
        p: [
          'Build audiences for remarketing and email sync only after consent policies are clear.',
          'Attribution models are imperfect—pair analytics with CRM outcomes for true ROI.'
        ]
      },
      {
        h: 'Governance',
        p: [
          'Exclude internal IPs, document naming conventions, and limit who can create custom definitions.',
          'Export BigQuery if you need SQL-level answers at scale.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'progressive-web-apps-customer-engagement',
      title: 'Progressive Web Apps: Quietly Useful Customer Engagement',
      excerpt:
        'PWAs can offer offline shells, install prompts, and push notifications—when your use case actually benefits.',
      tags: ['PWA', 'Mobile', 'Product'],
      readTime: 7,
      image: null,
      date: '2025-06-14'
    },
    [
      {
        h: 'When a PWA helps',
        p: [
          'Field teams, event check-ins, or retail assistants on flaky Wi-Fi benefit from cached shells and resilient forms.',
          'Consumer brands may prefer install prompts only if repeat usage is high enough to justify it.'
        ]
      },
      {
        h: 'Platform realities',
        p: [
          'iOS supports a subset of PWA capabilities; test notifications and storage limits per Safari version.',
          'Do not promise “app-like” experiences without measuring install rates and retention.'
        ]
      },
      {
        h: 'Implementation notes',
        p: [
          'Service workers need update strategies to avoid stale content bugs.',
          'Pair with solid HTTPS, responsive layouts, and meaningful offline messaging.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'email-capture-consent-india',
      title: 'Email Capture and Consent: Practical Notes for Indian Audiences',
      excerpt:
        'Clear consent, honest frequency, and easy unsubscribe build lists that actually perform.',
      tags: ['Email', 'Compliance', 'Marketing'],
      readTime: 5,
      image: '/banner.png',
      date: '2025-06-18'
    },
    [
      {
        h: 'Transparency beats tricks',
        p: [
          'Pre-checked boxes and hidden terms erode trust and can invite complaints. Say what you will send and how often.',
          'Double opt-in remains a quality filter for many B2B lists.'
        ]
      },
      {
        h: 'Data handling',
        p: [
          'Store consent timestamps, source URLs, and policy version. Encrypt lists at rest where possible.',
          'Honor deletion requests promptly and propagate to integrations.'
        ]
      },
      {
        h: 'Deliverability',
        p: [
          'Authenticate with SPF, DKIM, and DMARC. Warm new domains and monitor bounce rates.',
          'Segment by engagement; blasting cold lists hurts domain reputation.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'multilingual-websites-indian-regional-audiences',
      title: 'Multilingual Websites for Indian Regional Audiences',
      excerpt:
        'Language switches are not enough—date formats, currency, and cultural nuance matter for trust.',
      tags: ['Localization', 'Content', 'India'],
      readTime: 8,
      image: null,
      date: '2025-06-22'
    },
    [
      {
        h: 'Choose languages with data',
        p: [
          'Survey customers, review support transcripts, and check Search Console queries by region before translating everything.',
          'Start with high-traffic pages: home, pricing, support, and top blog posts.'
        ]
      },
      {
        h: 'Hreflang and URL strategy',
        p: [
          'Use consistent URL patterns (/hi/, subdomains, or parameters) and implement hreflang carefully to avoid duplicate issues.',
          'Machine translation without human review can damage brand trust—budget editing.'
        ]
      },
      {
        h: 'Operational load',
        p: [
          'Workflows for reviewers, glossaries for product terms, and CMS fields per locale prevent drift.',
          'Plan how legal and policy pages stay synchronized across languages.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'technical-debt-web-projects-avoid-rebuilds',
      title: 'Technical Debt in Web Projects: How to Avoid Constant Rebuilds',
      excerpt:
        'Debt is normal; unplanned debt is expensive. Naming, testing, and boundaries keep incremental change possible.',
      tags: ['Engineering', 'Leadership', 'Architecture'],
      readTime: 7,
      image: '/banner.png',
      date: '2025-06-26'
    },
    [
      {
        h: 'Recognize debt types',
        p: [
          'Shortcuts taken under deadline, outdated dependencies, missing tests, and unclear ownership all compound.',
          'Track debt items like product backlog with impact and cost estimates.'
        ]
      },
      {
        h: 'Prevention habits',
        p: [
          'Code review, linting, design docs for risky changes, and feature flags reduce surprise breakages.',
          'Modularize by business capability—not only by technical layer.'
        ],
        bullets: [
          'Document assumptions in README or ADRs',
          'Automate smoke tests on critical paths',
          'Schedule dependency upgrades quarterly'
        ]
      },
      {
        h: 'Paying debt down',
        p: [
          'Allocate a steady capacity percentage or rotate “quality sprints” after major launches.',
          'Refactor when touching an area—boy scout rule—rather than big-bang rewrites unless necessary.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'outsourcing-vs-inhouse-digital-partner',
      title: 'Outsourcing vs In-House: When to Hire a Digital Partner',
      excerpt:
        'Partners accelerate specialized work; in-house hires anchor continuity. Most scaling companies blend both intentionally.',
      tags: ['Leadership', 'Agency', 'Hiring'],
      readTime: 6,
      image: null,
      date: '2025-06-30'
    },
    [
      {
        h: 'Outsource for speed and rarity',
        p: [
          'Greenfield builds, specialized performance tuning, or short security reviews often fit agencies or contractors.',
          'Document repositories, access, and runbooks so knowledge does not vanish when the contract ends.'
        ]
      },
      {
        h: 'Hire in-house for core differentiators',
        p: [
          'If digital is your product, you need permanent owners for roadmap, on-call, and customer-impacting changes.',
          'Avoid outsourcing your only architect without internal shadowing.'
        ]
      },
      {
        h: 'Hybrid models',
        p: [
          'Embedded contractors, retainers with SLAs, and train-the-team handoffs can bridge gaps.',
          'Measure outcomes—ship cadence, incident rate, and customer satisfaction—not hours alone.'
        ]
      }
    ]
  )
]
