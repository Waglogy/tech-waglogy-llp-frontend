import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MdWeb, MdPhoneIphone, MdDesktopWindows, MdBrush, MdSmartToy, MdPeople,
  MdArrowForward, MdCheckCircle, MdClose, MdAccessTime, MdCurrencyRupee,
  MdSupportAgent, MdInsights
} from 'react-icons/md'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateServiceSchema } from '../config/seo'
import { submitContactForm } from '../services/contactService'
import { convertBudgetRangeToUSD } from '../utils/currencyConverter'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
  })
}

const flagshipSystems = [
  {
    id: 'lead-capture',
    icon: MdSmartToy,
    title: 'Lead Capture System',
    tagline: 'Every inquiry caught, qualified, and replied to in under a minute.',
    description: 'One funnel that captures every WhatsApp message, website form, booking.com query, and Instagram DM — qualifies each one with an AI agent that knows your rooms, rates, and seasons — and responds in under 60 seconds, so you never lose a guest to a faster operator.',
    includes: [
      'Conversion-optimised landing page with embedded inquiry capture',
      'WhatsApp Business API integration with auto-greeting',
      'AI agent trained on your inventory, rates, and policies',
      'Unified inbox — WhatsApp, email, Instagram, web forms — in one place',
      'Smart qualification (dates, group size, intent)',
      'Clean human handoff for complex inquiries',
    ],
    startingPrice: '₹75,000',
    timeline: '3–4 weeks',
  },
  {
    id: 'follow-up',
    icon: MdSupportAgent,
    title: 'Automated Follow-Up Engine',
    tagline: 'Sequences that recover the leads your team forgets to chase.',
    description: 'Most properties lose 60–70% of inquiries not to a competitor — but to silence. The Follow-Up Engine sends timed, personalised WhatsApp, email, and SMS sequences that nurture cold leads, recover abandoned bookings, and bring past guests back in your off-season. Written and tuned specifically for hospitality.',
    includes: [
      'WhatsApp + email + SMS multi-channel sequences',
      'Abandoned-inquiry recovery flows (24h, 72h, 7-day)',
      'Off-season nurture campaigns (festival, season opening)',
      'Past-guest re-engagement and referral asks',
      'A/B testing on subject lines, copy, and timing',
      'Full WhatsApp Business API compliance',
    ],
    startingPrice: '₹50,000',
    timeline: '2–3 weeks',
  },
  {
    id: 'analytics',
    icon: MdInsights,
    title: 'Revenue Analytics Dashboard',
    tagline: 'The numbers your team has been guessing at, on one screen.',
    description: 'A custom dashboard you open on your phone every morning. Leads this week vs last week. Average response time. Conversion rate by source. Revenue attribution per channel. The data your business has always generated but never seen — turned into decisions you can act on before lunch.',
    includes: [
      'Daily lead, response, and booking metrics',
      'Source attribution — which channel actually drives revenue',
      'Conversion funnel breakdown by stage',
      'Off-season vs peak season comparisons',
      'Mobile-first dashboard built for owners, not analysts',
      'Weekly summary delivered straight to WhatsApp',
    ],
    startingPrice: '₹40,000',
    timeline: '2–3 weeks',
  },
]

const legacyServices = [
  {
    id: 'website',
    icon: MdWeb,
    title: 'Website Design & Development',
    tagline: 'Your website should work as hard as you do.',
    description: 'We build websites that are fast, secure, and designed to convert — not just look good in a screenshot. Whether you need a simple business presence or a complex multi-page platform, we build it properly from the ground up.',
    includes: [
      'Custom design — no templates',
      'Mobile-first, fully responsive',
      'SEO-ready structure and metadata',
      'Contact forms and lead capture',
      'CMS so you can manage your own content',
      'Speed optimisation and security hardening',
    ],
    startingPrice: '₹25,000',
    timeline: '3–5 weeks',
  },
  {
    id: 'mobile',
    icon: MdPhoneIphone,
    title: 'Mobile App Development',
    tagline: 'An app built around how your business actually works.',
    description: 'We build iOS and Android applications — and cross-platform apps that work on both. We do not just take a brief and disappear. We involve you at every stage so the app we deliver makes sense for your team and your customers.',
    includes: [
      'iOS and Android (native or cross-platform)',
      'Custom UI designed for your users',
      'Back-end API and database',
      'Push notifications and user authentication',
      'App Store and Play Store submission',
      'Post-launch support and updates',
    ],
    startingPrice: '₹1,50,000',
    timeline: '8–16 weeks',
  },
  {
    id: 'software',
    icon: MdDesktopWindows,
    title: 'Custom Software Development',
    tagline: 'Software that fits your workflow — not the other way around.',
    description: 'Off-the-shelf software rarely fits exactly. We build custom systems — internal tools, dashboards, inventory systems, booking platforms, ERPs — that are designed specifically for how your business operates.',
    includes: [
      'Full requirement discovery and scoping',
      'Web-based or desktop application',
      'Custom database design',
      'Role-based access and permissions',
      'Integration with your existing tools',
      'Documentation and team training',
    ],
    startingPrice: '₹75,000',
    timeline: '6–16 weeks',
  },
  {
    id: 'design',
    icon: MdBrush,
    title: 'UI / UX Design',
    tagline: 'Good design is invisible. Bad design costs you customers.',
    description: 'We design interfaces that are easy to use, clear to navigate, and honest about what they are. We work through wireframes, prototypes, and testing before anything gets built — so there are no expensive surprises in development.',
    includes: [
      'User research and journey mapping',
      'Wireframes and interactive prototypes',
      'Full visual design in Figma',
      'Design system and component library',
      'Usability testing before handoff',
      'Developer-ready specifications',
    ],
    startingPrice: '₹20,000',
    timeline: '2–4 weeks',
  },
  {
    id: 'consulting',
    icon: MdPeople,
    title: 'IT Consulting',
    tagline: 'Honest advice before you spend a rupee.',
    description: 'Sometimes you just need someone to tell you what is actually needed, what to avoid, and what a realistic budget looks like. We offer consulting for technology strategy, vendor selection, architecture decisions, and project audits — with no agenda other than getting you the right answer.',
    includes: [
      'Technology needs assessment',
      'Vendor and platform evaluation',
      'Project scoping and cost estimation',
      'Architecture and stack recommendations',
      'Audit of existing systems',
      'Roadmap planning',
    ],
    startingPrice: '₹2,500/hr',
    timeline: 'Flexible',
  },
]

const inputClass = 'w-full border border-[#E5E2DC] rounded-lg px-4 py-3 text-[#0C0C0C] placeholder-[#A09A90] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white'

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', budget: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = () => setForm({ name: '', email: '', phone: '', company: '', budget: '', message: '' })

  const closeModal = () => {
    setShowModal(false)
    setSubmitStatus(null)
    setErrorMessage('')
  }

  const openQuote = (service) => {
    setSelectedService(service)
    setForm({
      name: '', email: '', phone: '', company: '', budget: '',
      message: `I'm interested in ${service.title}. Please get in touch.`,
    })
    setSubmitStatus(null)
    setErrorMessage('')
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSubmitStatus(null)

    try {
      const budgetForBackend = convertBudgetRangeToUSD(form.budget)
      const projectDetails = `Service: ${selectedService?.title}\n\n${form.message}`
      await submitContactForm({
        fullName: form.name,
        email: form.email,
        phone: form.phone.trim(),
        organizationName: form.company.trim(),
        budgetRange: budgetForBackend,
        projectDetails,
      })
      setSubmitStatus('success')
      resetForm()
      setTimeout(() => {
        setShowModal(false)
        setSubmitStatus(null)
      }, 2000)
    } catch (error) {
      console.error('Quote request failed:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to send quote request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceSchemas = flagshipSystems.map(s =>
    generateServiceSchema({ name: s.title, description: s.description, features: s.includes })
  )

  return (
    <>
      <SEO page="services" />
      <StructuredData schemas={serviceSchemas} />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="section-label mb-6">
              What We Install
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6"
            >
              Three systems that turn inquiries into revenue.
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl mb-10"
            >
              Built individually or wired together as a complete revenue system. Each one solves a
              specific failure point in the inquiry-to-booking funnel for hotels, homestays, and
              tour operators.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-wrap gap-3">
              <a href="/contact" className="btn-primary text-base px-7 py-3.5">
                Book a 20-min walkthrough
                <MdArrowForward size={18} />
              </a>
              <a href="/pricing" className="btn-outline text-base px-7 py-3.5">
                See pricing
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── FLAGSHIP SYSTEMS ─────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto space-y-6">
            {flagshipSystems.map((service, idx) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="card p-8 lg:p-10"
              >
                <div className="grid lg:grid-cols-12 gap-8">

                  {/* Left */}
                  <div className="lg:col-span-5">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <service.icon size={22} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#0C0C0C]">{service.title}</h2>
                        <p className="text-sm text-blue-600 font-medium mt-0.5">{service.tagline}</p>
                      </div>
                    </div>

                    <p className="text-[#6E6B67] leading-relaxed text-sm mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1.5 text-[#3D3A36]">
                        <MdCurrencyRupee size={15} className="text-blue-500" />
                        <span className="font-semibold">From {service.startingPrice}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#3D3A36]">
                        <MdAccessTime size={15} className="text-blue-500" />
                        <span>{service.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle — includes */}
                  <div className="lg:col-span-5">
                    <p className="text-xs font-semibold text-[#6E6B67] uppercase tracking-widest mb-4">What's included</p>
                    <ul className="space-y-2.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#3D3A36]">
                          <MdCheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right — CTA */}
                  <div className="lg:col-span-2 flex lg:flex-col lg:items-end lg:justify-between gap-4">
                    <button
                      onClick={() => openQuote(service)}
                      className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap"
                    >
                      Get a Quote
                    </button>
                    <a
                      href="/contact"
                      className="text-sm text-[#6E6B67] hover:text-blue-600 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      Ask a question
                      <MdArrowForward size={14} />
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BUNDLED REVENUE SYSTEM ──────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card p-10 lg:p-12"
              style={{ background: '#0A0F1E', borderColor: '#0A0F1E' }}
            >
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6">
                    Bundle
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                    All three, wired together as one revenue system.
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-8 text-base">
                    Most properties install all three at once because the systems work harder
                    together — captured leads feed the follow-up engine, both feed the dashboard,
                    and the dashboard tells us what to tune. Single install, one team, one timeline.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Build fee</div>
                      <div className="text-xl font-bold text-white">₹2L – ₹3L</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Monthly retainer</div>
                      <div className="text-xl font-bold text-white">₹18k – ₹25k</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Time to live</div>
                      <div className="text-xl font-bold text-white">4 – 6 weeks</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">What you get</p>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      'All three flagship systems, fully integrated',
                      'Single discovery and scoping engagement',
                      'One unified dashboard across lead, follow-up, revenue',
                      'Monthly tuning, new campaigns, fresh AI prompts',
                      'You own all accounts, data, and the system itself',
                      '90-day Payback Promise — refund the difference if it doesn\'t pay back',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <MdCheckCircle size={16} className="text-blue-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openQuote({ title: 'Complete Revenue System (Bundle)' })}
                    className="btn-primary text-sm px-6 py-3 whitespace-nowrap"
                  >
                    Get a bundled quote
                    <MdArrowForward size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WE ALSO BUILD ────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 max-w-2xl"
            >
              <div className="section-label mb-4">We Also Build</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C] mb-3">
                One-off projects, when the fit makes sense.
              </h2>
              <p className="text-[#6E6B67] leading-relaxed">
                Sometimes a hotel or operator just needs a website rebuilt, or a tour company needs
                an app. We still take selected projects of this kind — particularly when they
                naturally extend into a revenue system later.
              </p>
            </motion.div>

            <div className="space-y-6">
              {legacyServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-7 lg:p-8"
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                        <service.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0C0C0C] text-base leading-snug">{service.title}</h3>
                        <p className="text-sm text-blue-600 font-medium mt-0.5">{service.tagline}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <p className="text-sm text-[#6E6B67] leading-relaxed">{service.description}</p>
                    </div>

                    <div className="lg:col-span-3 flex lg:flex-col lg:items-end gap-4 lg:gap-2">
                      <div className="text-sm">
                        <div className="text-[#3D3A36] font-semibold">From {service.startingPrice}</div>
                        <div className="text-[#6E6B67] text-xs mt-0.5">{service.timeline}</div>
                      </div>
                      <button
                        onClick={() => openQuote(service)}
                        className="btn-outline text-xs px-4 py-2 whitespace-nowrap"
                      >
                        Get a Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HONEST NOTE ──────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-b border-[#E5E2DC]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xl text-[#3D3A36] leading-relaxed">
                Prices shown are starting points, not quotes. Every install is scoped to your
                property's actual size, channels, and traffic. The monthly retainer is what keeps
                the system improving — and it's discussed openly upfront, never as a surprise.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/pricing" className="btn-outline text-sm px-6 py-3">
                  See full pricing breakdown
                  <MdArrowForward size={16} />
                </a>
                <a href="/projects" className="btn-outline text-sm px-6 py-3">
                  See what we've built
                  <MdArrowForward size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CITIES WE SERVE ──────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="section-label mb-4">Where We Work</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C] mb-3">
                Serving hospitality and service businesses across Northeast India.
              </h2>
              <p className="text-[#6E6B67] max-w-2xl">
                Based in Gangtok, Sikkim — installing revenue systems for hotels, homestays, and
                tour operators in every major city of the region (and beyond, remotely).
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'Gangtok',    state: 'Sikkim',            href: '/web-development/gangtok' },
                { name: 'Sikkim',     state: 'Sikkim',            href: '/web-development/sikkim' },
                { name: 'Guwahati',   state: 'Assam',             href: '/web-development/guwahati' },
                { name: 'Shillong',   state: 'Meghalaya',         href: '/web-development/shillong' },
                { name: 'Itanagar',   state: 'Arunachal Pradesh', href: '/web-development/itanagar' },
                { name: 'Imphal',     state: 'Manipur',           href: '/web-development/imphal' },
                { name: 'Aizawl',    state: 'Mizoram',           href: '/web-development/aizawl' },
                { name: 'Kohima',     state: 'Nagaland',          href: '/web-development/kohima' },
                { name: 'Agartala',   state: 'Tripura',           href: '/web-development/agartala' },
                { name: 'Siliguri',   state: 'West Bengal',       href: '/web-development/siliguri' },
                { name: 'Darjeeling', state: 'West Bengal',       href: '/web-development/darjeeling' },
              ].map((city, idx) => (
                <motion.a
                  key={city.href}
                  href={city.href}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-5 flex flex-col gap-1 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group"
                >
                  <span className="font-semibold text-[#0C0C0C] text-sm group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </span>
                  <span className="text-xs text-[#6E6B67]">{city.state}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Not sure which system fits your property?
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                A 20-minute walkthrough of your current funnel is usually all it takes to see where
                the biggest leak is. We'll tell you which system to install first — honestly, even
                if the answer is "you don't need the full bundle yet."
              </p>
              <a href="/contact" className="btn-primary px-8 py-4 text-base justify-center">
                Book a 20-min walkthrough
                <MdArrowForward size={18} />
              </a>
            </motion.div>
          </div>
        </section>

      </div>

      {/* ── QUOTE MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#E5E2DC] overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between p-6 border-b border-[#E5E2DC]">
                <div>
                  <h3 className="text-lg font-bold text-[#0C0C0C]">Request a Quote</h3>
                  {selectedService && (
                    <p className="text-sm text-blue-600 font-medium mt-0.5">{selectedService.title}</p>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg hover:bg-[#F0EDE8] text-[#6E6B67] transition-colors"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputClass}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      className={inputClass}
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Company / Property name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Himalayan View Resort"
                    className={inputClass}
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Budget for install *</label>
                  <select
                    required
                    className={`${inputClass} text-[#3D3A36]`}
                    value={form.budget}
                    onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  >
                    <option value="">Select budget</option>
                    <option value="under-50k">&lt; ₹50,000</option>
                    <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                    <option value="1l-3l">₹1,00,000 – ₹3,00,000</option>
                    <option value="3l-5l">₹3,00,000 – ₹5,00,000</option>
                    <option value="5l-10l">₹5,00,000 – ₹10,00,000</option>
                    <option value="over-10l">Over ₹10,00,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">What do you need? *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe what you're looking to build or solve..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-center text-sm flex items-center justify-center gap-2">
                    <MdCheckCircle size={16} className="shrink-0" />
                    Thanks — we'll reach out within one business day.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center text-sm">
                    {errorMessage}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Services
