import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MdWeb, MdPhoneIphone, MdDesktopWindows, MdBrush, MdSmartToy, MdPeople,
  MdArrowForward, MdCheckCircle, MdClose, MdAccessTime, MdCurrencyRupee
} from 'react-icons/md'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateServiceSchema } from '../config/seo'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
  })
}

const services = [
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
    id: 'ai',
    icon: MdSmartToy,
    title: 'AI Integration & Automation',
    tagline: 'Practical AI — not buzzwords, actual time saved.',
    description: 'We integrate AI and automation into your existing systems in ways that actually make a difference. Automated customer responses, document processing, internal search, workflow automation — built and tested to work reliably in your environment.',
    includes: [
      'Workflow and process automation',
      'AI-powered chatbots and assistants',
      'Document and data extraction',
      'Integration with existing tools and APIs',
      'Custom LLM-based features',
      'Monitoring, logging, and ongoing tuning',
    ],
    startingPrice: '₹50,000',
    timeline: '4–10 weeks',
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const openQuote = (service) => {
    setSelectedService(service)
    setForm(f => ({ ...f, message: `I'm interested in ${service.title}. Please get in touch.` }))
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Service Enquiry — ${selectedService?.title}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nService: ${selectedService?.title}\n\n${form.message}`
    )
    window.location.href = `mailto:contact@waglogy.in?subject=${subject}&body=${body}`
    setShowModal(false)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const serviceSchemas = services.slice(0, 3).map(s =>
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
              Services
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6"
            >
              What we build and how we can help.
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl mb-10"
            >
              Every service we offer is built around a single goal: delivering something that works — for your business, your users, and your budget. We don't oversell scope, and we don't undersell effort.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <a href="/contact" className="btn-primary text-base px-7 py-3.5">
                Discuss your project
                <MdArrowForward size={18} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto space-y-6">
            {services.map((service, idx) => (
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
                Prices shown are starting points, not quotes. Every project is scoped individually
                because every business is different. We give you a fixed price before any work begins —
                so you know exactly what you're committing to.
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
                Not sure which service fits?
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                That's a perfectly normal starting point. Tell us what you're trying to achieve and we'll tell you what makes sense — honestly, even if the answer is "you don't need us for that."
              </p>
              <a href="/contact" className="btn-primary px-8 py-4 text-base justify-center">
                Let's talk it through
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
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#E5E2DC] overflow-hidden"
            >
              <div className="flex items-start justify-between p-6 border-b border-[#E5E2DC]">
                <div>
                  <h3 className="text-lg font-bold text-[#0C0C0C]">Request a Quote</h3>
                  {selectedService && (
                    <p className="text-sm text-blue-600 font-medium mt-0.5">{selectedService.title}</p>
                  )}
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-lg hover:bg-[#F0EDE8] text-[#6E6B67] transition-colors"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Name</label>
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
                    <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Email</label>
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
                    <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Phone</label>
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
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">What do you need?</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe what you're looking to build or solve..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3.5 text-sm">
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Services
