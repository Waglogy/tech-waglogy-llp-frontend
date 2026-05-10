import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MdWeb, MdPhoneIphone, MdDesktopWindows, MdBrush, MdSmartToy, MdCode,
  MdArrowForward, MdCheckCircle, MdSupportAgent, MdVerified, MdGroups,
  MdStar
} from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { submitQuery } from '../services/queryService'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateFAQSchema } from '../config/seo'

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
    icon: MdWeb,
    title: 'Website Development',
    desc: 'Professional websites built to perform — fast, secure, and optimized to turn visitors into customers.',
  },
  {
    icon: MdPhoneIphone,
    title: 'Mobile App Development',
    desc: 'iOS and Android applications built around your business workflow, not the other way around.',
  },
  {
    icon: MdCode,
    title: 'Custom Software',
    desc: 'Tailored software solutions that fit exactly how your business operates — no unnecessary complexity.',
  },
  {
    icon: MdBrush,
    title: 'UI / UX Design',
    desc: 'Clean, intuitive interfaces that make your product easy to use and your brand easy to trust.',
  },
  {
    icon: MdSmartToy,
    title: 'AI Integration',
    desc: 'Practical AI tools and automation built into your existing systems to save time and reduce manual work.',
  },
  {
    icon: MdDesktopWindows,
    title: 'IT Consulting',
    desc: 'Straightforward technology guidance — we help you make the right decisions before you invest.',
  },
]

const process = [
  {
    number: '01',
    title: 'We Listen',
    desc: 'We take time to understand your business, your goals, and what problem you actually need solved.',
  },
  {
    number: '02',
    title: 'We Plan',
    desc: 'Clear scope, realistic timeline, fixed pricing. No vague estimates, no moving goalposts.',
  },
  {
    number: '03',
    title: 'We Build',
    desc: 'Quality development with regular updates. You see progress, not just a final reveal.',
  },
  {
    number: '04',
    title: 'We Support',
    desc: 'We stay after launch — maintenance, updates, and growth support as your business evolves.',
  },
]

const faqData = [
  {
    question: 'What does a website cost?',
    answer: 'Projects vary based on scope. Most business websites fall between ₹25,000 and ₹1,00,000. We provide a fixed quote before any work begins — no hidden charges, no surprises.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Standard websites take 3–5 weeks. Mobile apps typically take 8–14 weeks. Custom software timelines depend on complexity. We give you a clear timeline before we start.',
  },
  {
    question: 'Do you only work with businesses in Sikkim?',
    answer: 'No. We work with businesses across India — our clients are in Sikkim, Delhi, Kolkata, and beyond. We collaborate remotely and handle everything digitally.',
  },
  {
    question: 'What happens after the project is launched?',
    answer: 'We offer ongoing support and maintenance packages. You are never handed over a finished product and left alone — we stay available for updates, fixes, and growth.',
  },
]

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [queryMessage, setQueryMessage] = useState('')
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false)
  const [queryStatus, setQueryStatus] = useState(null)
  const [queryErrorMessage, setQueryErrorMessage] = useState('')

  const handleQuerySubmit = async (e) => {
    e.preventDefault()
    if (!queryMessage.trim()) {
      setQueryStatus('error')
      setQueryErrorMessage('Please describe what you need.')
      return
    }
    setIsSubmittingQuery(true)
    setQueryStatus(null)
    try {
      await submitQuery({ message: queryMessage })
      setQueryStatus('success')
      setQueryMessage('')
      setTimeout(() => setQueryStatus(null), 5000)
    } catch (error) {
      setQueryStatus('error')
      setQueryErrorMessage(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmittingQuery(false)
    }
  }

  return (
    <>
      <SEO page="home" />
      <StructuredData schemas={[generateFAQSchema(faqData)]} />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left — text */}
              <div>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-8"
                >
                  IT Company · Gangtok, Sikkim
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-5xl sm:text-6xl lg:text-6xl font-bold leading-[1.08] mb-6 text-[#0C0C0C]"
                >
                  Technology that{' '}
                  <span className="text-blue-600">works</span>{' '}
                  for your business.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="text-lg text-[#6E6B67] mb-10 leading-relaxed"
                >
                  We build websites, mobile apps, and software for growing businesses across India.
                  Straightforward process, honest pricing, and support that doesn't disappear after launch.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a href="/contact" className="btn-primary text-base px-7 py-3.5">
                    Start a Project
                    <MdArrowForward size={18} />
                  </a>
                  <a href="/projects" className="btn-outline text-base px-7 py-3.5">
                    View Our Work
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  className="mt-12 pt-8 border-t border-[#E5E2DC] flex flex-wrap gap-8"
                >
                  {[
                    { value: '50+', label: 'Projects Delivered' },
                    { value: '5+', label: 'Years in Business' },
                    { value: 'Pan-India', label: 'Clients Served' },
                    { value: 'Mon–Sun', label: 'Support Hours' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-[#0C0C0C]" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                      <div className="text-sm text-[#6E6B67] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — project screenshots */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                className="hidden lg:block relative h-[580px]"
              >
                {/* Main large card */}
                <div className="absolute top-0 left-0 right-8 rounded-xl overflow-hidden border border-[#E5E2DC] shadow-lg">
                  {/* Browser chrome */}
                  <div className="bg-[#F5F4F0] border-b border-[#E5E2DC] px-4 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#E5E2DC]" />
                      <div className="w-3 h-3 rounded-full bg-[#E5E2DC]" />
                      <div className="w-3 h-3 rounded-full bg-[#E5E2DC]" />
                    </div>
                    <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-[10px] text-[#A09A90] border border-[#E5E2DC]">
                      himato.ai
                    </div>
                  </div>
                  <img src="/himato.png" alt="Himato — AI travel app" className="w-full object-cover object-top" style={{ height: '220px' }} />
                </div>

                {/* Bottom-left card */}
                <div className="absolute bottom-0 left-0 w-[52%] rounded-xl overflow-hidden border border-[#E5E2DC] shadow-lg">
                  <div className="bg-[#F5F4F0] border-b border-[#E5E2DC] px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E2DC]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E2DC]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E2DC]" />
                    </div>
                    <div className="flex-1 mx-2 bg-white rounded px-2 py-0.5 text-[9px] text-[#A09A90] border border-[#E5E2DC]">
                      turtles.restaurant
                    </div>
                  </div>
                  <img src="/turtles.png" alt="Turtle's Restaurant" className="w-full object-cover object-top" style={{ height: '180px' }} />
                </div>

                {/* Bottom-right card */}
                <div className="absolute bottom-0 right-0 w-[45%] rounded-xl overflow-hidden border border-[#E5E2DC] shadow-lg">
                  <div className="bg-[#F5F4F0] border-b border-[#E5E2DC] px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E2DC]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E2DC]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E5E2DC]" />
                    </div>
                    <div className="flex-1 mx-2 bg-white rounded px-2 py-0.5 text-[9px] text-[#A09A90] border border-[#E5E2DC]">
                      tghe.travel
                    </div>
                  </div>
                  <img src="/tghe.png" alt="The Great Himalayan Escape" className="w-full object-cover object-top" style={{ height: '180px' }} />
                </div>

                {/* Floating tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="absolute top-[230px] right-0 bg-white border border-[#E5E2DC] rounded-xl px-4 py-3 shadow-md flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MdCheckCircle className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0C0C0C]">50+ Projects</div>
                    <div className="text-[10px] text-[#6E6B67]">Delivered across India</div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="section-label mb-4">What We Do</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] max-w-xl">
                Services built for real business needs.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-7 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <service.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0C0C0C] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#6E6B67] leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10"
            >
              <a href="/services" className="btn-outline text-sm px-6 py-3">
                See all services
                <MdArrowForward size={16} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── WHY US ───────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="section-label mb-4">Why Waglogy</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] mb-6">
                A technology company you can actually work with.
              </h2>
              <p className="text-[#6E6B67] text-lg leading-relaxed mb-8">
                We are not a faceless vendor. We are a team based in Gangtok, Sikkim,
                that understands the challenges of running a business in India — and builds
                technology solutions that fit your reality.
              </p>
              <a href="/about" className="btn-outline text-sm px-6 py-3">
                About our company
                <MdArrowForward size={16} />
              </a>
            </motion.div>

            <div className="space-y-5">
              {[
                {
                  icon: MdVerified,
                  title: 'Transparent Pricing',
                  desc: 'Fixed quotes before work begins. No surprises, no scope creep billed retroactively.',
                },
                {
                  icon: MdSupportAgent,
                  title: 'Real Support',
                  desc: 'You can call us. We answer. Monday to Sunday, 9am to 7pm — and available on WhatsApp.',
                },
                {
                  icon: MdGroups,
                  title: 'Experienced Team',
                  desc: 'Full-stack developers, designers, and consultants — everything under one roof.',
                },
                {
                  icon: MdStar,
                  title: 'Long-Term Partnership',
                  desc: 'We build lasting relationships, not one-off projects. Your growth matters to us beyond the invoice.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-6 flex gap-5 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0C0C0C] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#6E6B67] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="section-label mb-4">How We Work</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] max-w-xl">
                A clear process from start to finish.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, idx) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="relative"
                >
                  <div className="text-6xl font-black text-blue-100 font-['Outfit'] leading-none mb-4 select-none">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6E6B67] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-[#E5E2DC]">
          <div className="max-w-3xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="section-label mb-4">Common Questions</div>
              <h2 className="text-4xl font-bold text-[#0C0C0C]">
                Answers before you ask.
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqData.map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-[#0C0C0C] pr-4">{faq.question}</span>
                    <span className={`text-blue-500 transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-45' : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-[#6E6B67] text-sm leading-relaxed border-t border-[#E5E2DC] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA / CONTACT FORM ───────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to build something that works?
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Tell us what you need. We'll get back to you within one business day with a clear next step — no sales pitch, no obligation.
              </p>

              <div className="space-y-5">
                {[
                  { icon: MdCheckCircle, text: 'Free initial consultation' },
                  { icon: MdCheckCircle, text: 'Fixed quote before work begins' },
                  { icon: MdCheckCircle, text: 'No lock-in contracts' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-slate-300">
                    <item.icon size={18} className="text-blue-400 shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-slate-400 text-sm mb-4">Prefer to chat directly?</p>
                <a
                  href="https://wa.me/919733814168"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20BA5A] transition-colors"
                >
                  <FaWhatsapp size={18} />
                  Message us on WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <div className="bg-white rounded-2xl p-8 border border-[#E5E2DC]">
                <h3 className="text-xl font-bold text-[#0C0C0C] mb-6">Send us a message</h3>
                <form onSubmit={handleQuerySubmit} className="space-y-4">
                  <textarea
                    rows={5}
                    value={queryMessage}
                    onChange={(e) => setQueryMessage(e.target.value)}
                    placeholder="Describe what you're looking to build or solve..."
                    className="w-full border border-[#E5E2DC] rounded-lg p-4 text-[#0C0C0C] placeholder-[#A09A90] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    disabled={isSubmittingQuery}
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingQuery || !queryMessage.trim()}
                    className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingQuery ? 'Sending…' : 'Send Message'}
                  </button>
                </form>

                {queryStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center gap-2"
                  >
                    <MdCheckCircle size={16} />
                    Message sent! We'll be in touch shortly.
                  </motion.div>
                )}
                {queryStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                  >
                    {queryErrorMessage}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}

export default Landing
