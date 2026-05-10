import { insightRow } from './buildArticleHtml'

export const batch4 = [
  insightRow(
    {
      slug: 'internal-admin-panels-save-money',
      title: 'Internal Tools: When a Custom Admin Panel Saves Money',
      excerpt:
        'Spreadsheets and DMs do not scale. Targeted internal apps reduce errors and free senior people from data entry.',
      tags: ['Internal Tools', 'Productivity', 'Engineering'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-08-13'
    },
    [
      {
        h: 'Find the expensive workaround',
        p: [
          'Shadow IT in spreadsheets, manual CSV uploads, and “ask engineering” tasks are signals.',
          'Quantify hours per week and error rates to justify build vs buy.'
        ]
      },
      {
        h: 'Scope ruthlessly',
        p: [
          'Ship the smallest workflow that removes pain: approve, reconcile, or configure—one at a time.',
          'Reuse auth, audit logs, and UI kit from customer-facing apps when possible.'
        ]
      },
      {
        h: 'Adoption',
        p: [
          'Train champions in ops, gather feedback weekly early on, and instrument usage.',
          'Deprecate old paths only when metrics show migration.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'documentation-habits-faster-development',
      title: 'Documentation Habits That Speed Up Future Development',
      excerpt:
        'Future you is also a stakeholder. Lightweight docs beat heroic memory.',
      tags: ['Engineering', 'Process', 'Team'],
      readTime: 5,
      image: null,
      date: '2025-08-17'
    },
    [
      {
        h: 'Just enough architecture',
        p: [
          'ADRs for significant decisions, diagrams for boundaries, and runbooks for on-call.',
          'Avoid wiki graveyards—link docs from the repo README.'
        ]
      },
      {
        h: 'Living API contracts',
        p: [
          'OpenAPI or typed clients reduce integration surprises.',
          'Version breaking changes and provide migration notes.'
        ]
      },
      {
        h: 'Onboarding path',
        p: [
          'A single “day one” doc: setup, test commands, deploy checklist, and who to ask.',
          'Update it when onboarding surfaces confusion.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'staging-environments-safe-deployments',
      title: 'Staging Environments and Safe Deployments for Growing Teams',
      excerpt:
        'Production-like data policies, feature flags, and automated smoke tests reduce Friday-night fear.',
      tags: ['DevOps', 'Quality', 'Process'],
      readTime: 7,
      image: '/banner.png',
      date: '2025-08-21'
    },
    [
      {
        h: 'Staging fidelity',
        p: [
          'Mirror infrastructure topology even if you downsize capacity. Anonymize production data or synthesize fixtures.',
          'Seed realistic edge cases—long names, unicode, and payment failures.'
        ]
      },
      {
        h: 'Release trains vs continuous',
        p: [
          'Pick a cadence your team can sustain; document rollback and hotfix paths.',
          'Feature flags decouple deploy from exposure.'
        ]
      },
      {
        h: 'Observability',
        p: [
          'Log correlation IDs through staging to catch integration gaps early.',
          'Alert on staging errors for critical paths, not only production.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'open-source-vs-proprietary-stack-choices',
      title: 'Open Source vs Proprietary in Your Stack: A Pragmatic View',
      excerpt:
        'Licenses, support, and hiring pools matter as much as feature checklists.',
      tags: ['Architecture', 'Engineering', 'Strategy'],
      readTime: 6,
      image: null,
      date: '2025-08-25'
    },
    [
      {
        h: 'Open source advantages',
        p: [
          'Inspectability, community plugins, and easier hiring when skills are common.',
          'You own the upgrade schedule—also the security patch burden.'
        ]
      },
      {
        h: 'Proprietary advantages',
        p: [
          'Vendor SLAs, integrated support, and faster time-to-value for niche domains.',
          'Watch lock-in: export paths, contract terms, and price escalators.'
        ]
      },
      {
        h: 'Hybrid reality',
        p: [
          'Most products mix OSS runtimes with managed services. Document why each dependency exists.',
          'Revisit annually as usage grows; a “cheap” tool can dominate COGS.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'remote-collaboration-dev-team-async',
      title: 'Remote Collaboration with Your Dev Team: Async-First Practices',
      excerpt:
        'Clear written specs, timezone empathy, and visible progress reduce meeting load.',
      tags: ['Remote', 'Process', 'Collaboration'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-08-29'
    },
    [
      {
        h: 'Write decisions',
        p: [
          'Summarize goals, non-goals, acceptance criteria, and risks in tickets or docs before standups.',
          'Prefer threads with links over verbal drift.'
        ]
      },
      {
        h: 'Overlap windows',
        p: [
          'Protect a few hours of synchronous time for complex design spikes across zones.',
          'Record demos for stakeholders who cannot attend live.'
        ]
      },
      {
        h: 'Trust metrics',
        p: [
          'Lead with shipped outcomes and incident trends, not keystroke surveillance.',
          'Psychological safety speeds defect reporting.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'brand-identity-vs-ui-trends',
      title: 'Brand Identity vs UI Trends: Designing for the Long Web',
      excerpt:
        'Trendy gradients date quickly; systems rooted in your story age better.',
      tags: ['Branding', 'Design', 'Strategy'],
      readTime: 5,
      image: null,
      date: '2025-09-02'
    },
    [
      {
        h: 'Anchor to strategy',
        p: [
          'Positioning, voice, and proof points should drive visuals—not Dribbble references alone.',
          'Document brand principles to resolve subjective debates.'
        ]
      },
      {
        h: 'Trends as seasoning',
        p: [
          'Adopt motion, glassmorphism, or maximalism sparingly where it aids comprehension.',
          'Budget periodic refreshes without full rebrands.'
        ]
      },
      {
        h: 'Consistency compounds',
        p: [
          'Repeated patterns build recognition across ads, site, and product.',
          'Audit off-brand assets quarterly, especially after campaigns.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'microservices-vs-monolith-startups-pragmatic',
      title: 'Microservices vs Monolith for Growing Startups: A Pragmatic View',
      excerpt:
        'Microservices solve organizational scale more often than technical scale early on.',
      tags: ['Architecture', 'Startups', 'Engineering'],
      readTime: 8,
      image: '/banner.png',
      date: '2025-09-06'
    },
    [
      {
        h: 'Monolith first is still sane',
        p: [
          'A well-modular monolith ships faster with fewer network failures and simpler debugging.',
          'Extract services when teams truly conflict on deploy cadence or scaling hotspots prove isolated.'
        ]
      },
      {
        h: 'If you split anyway',
        p: [
          'Invest in observability, contract tests, and local dev ergonomics early—pain shows up in integration, not hello-world.',
          'Define ownership boundaries and SLOs per service.'
        ]
      },
      {
        h: 'Migration path',
        p: [
          'Strangle features out gradually with facades, not big-bang rewrites.',
          'Measure latency budgets end-to-end after each extraction.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'data-backups-disaster-recovery-web-apps',
      title: 'Data Backups and Disaster Recovery for Web Applications',
      excerpt:
        'Backups you have not restored are fiction. Practice restores and document RTO/RPO.',
      tags: ['DevOps', 'Security', 'Reliability'],
      readTime: 7,
      image: null,
      date: '2025-09-10'
    },
    [
      {
        h: 'Classify data',
        p: [
          'Customer PII, financial records, and operational configs need different retention and encryption.',
          'Immutable backups protect against ransomware-style corruption.'
        ]
      },
      {
        h: 'Test restores',
        p: [
          'Quarterly game days: restore to a clean environment and validate checksums.',
          'Automate verification where possible.'
        ],
        bullets: [
          'Off-site or cross-region copies',
          'Access controls and audit logs for backup access',
          'Runbook for partial vs full failures'
        ]
      },
      {
        h: 'Communicate',
        p: [
          'Pre-draft customer messaging for data incidents; speed and honesty matter.',
          'Post-incident reviews fix systemic gaps, not only symptoms.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'hiring-first-developer-after-agency-build',
      title: 'Hiring Your First Developer After an Agency Build',
      excerpt:
        'Handoffs fail without repos, environments, and honest backlog context. Plan overlap.',
      tags: ['Hiring', 'Engineering', 'Leadership'],
      readTime: 6,
      image: '/banner.png',
      date: '2025-09-14'
    },
    [
      {
        h: 'Inventory the system',
        p: [
          'Accounts, DNS, CI/CD, secrets, third-party keys, and data stores should be enumerated and transferred securely.',
          'Confirm licenses and IP assignment in contracts.'
        ]
      },
      {
        h: 'Profile the role',
        p: [
          'Generalists who debug production and talk to stakeholders often fit first hires better than narrow specialists.',
          'Set expectations on on-call and maintenance vs greenfield features.'
        ]
      },
      {
        h: 'Overlap window',
        p: [
          'Short retainers or paired weeks with the agency prevent knowledge cliffs.',
          'Document “how we deploy” and “how we roll back” on day one.'
        ]
      }
    ]
  ),
  insightRow(
    {
      slug: 'green-hosting-sustainability-marketing-reality',
      title: 'Green Hosting and Sustainability Claims: A Marketing Reality Check',
      excerpt:
        'Efficiency and honest reporting beat greenwashing. Start with measurable reductions.',
      tags: ['Sustainability', 'Hosting', 'Ethics'],
      readTime: 5,
      image: null,
      date: '2025-09-18'
    },
    [
      {
        h: 'Efficiency first',
        p: [
          'Right-size servers, cache aggressively, and delete unused assets—carbon and cost correlate.',
          'Carbon-aware scheduling suits batch jobs, not user-facing latency.'
        ]
      },
      {
        h: 'Scrutinize vendor claims',
        p: [
          'Ask how renewable matching is calculated and whether offsets are additional and verified.',
          'Publish your methodology if you market green credentials.'
        ]
      },
      {
        h: 'Narrative',
        p: [
          'Customers increasingly value substance: accessibility, longevity of hardware, and repairability stories.',
          'Tie sustainability to product quality, not only badges.'
        ]
      }
    ]
  )
]
