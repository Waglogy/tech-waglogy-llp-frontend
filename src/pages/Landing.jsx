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

const flagshipSystems = [
  {
    icon: MdSmartToy,
    title: 'Lead Capture System',
    desc: 'Inquiries don\'t fall through cracks. Every WhatsApp, form, and call is captured, qualified, and routed — with a 30-second AI first-response so guests never wait.',
    outcome: 'Stop losing leads to slow replies',
  },
  {
    icon: MdSupportAgent,
    title: 'Automated Follow-Up Engine',
    desc: 'WhatsApp, email, and SMS sequences that nurture quiet leads, recover abandoned bookings, and bring guests back in the off-season — written and tuned for hospitality.',
    outcome: 'Recover the 60% you currently lose',
  },
  {
    icon: MdVerified,
    title: 'Revenue Analytics Dashboard',
    desc: 'Open your phone every morning to see leads this week, response time, conversion rate, and revenue by source. The numbers your team has been guessing at, finally on one screen.',
    outcome: 'Run the business on data, not gut',
  },
]

const otherServices = [
  {
    icon: MdWeb,
    title: 'Websites',
    desc: 'Built to capture inquiries, not just look pretty. SEO-ready and mobile-first.',
  },
  {
    icon: MdPhoneIphone,
    title: 'Mobile Apps',
    desc: 'iOS and Android apps built around how your business actually operates.',
  },
  {
    icon: MdCode,
    title: 'Custom Software',
    desc: 'Internal tools, dashboards, booking platforms — built to fit your workflow.',
  },
  {
    icon: MdBrush,
    title: 'UI / UX Design',
    desc: 'Interfaces that are easy to use and honest about what they are.',
  },
  {
    icon: MdDesktopWindows,
    title: 'IT Consulting',
    desc: 'Honest advice on technology decisions — before you spend a rupee.',
  },
]

const process = [
  {
    number: '01',
    title: 'Audit',
    desc: 'We sit with you for an hour and map your current funnel — where leads come from, where they get stuck, where revenue leaks out.',
  },
  {
    number: '02',
    title: 'Design',
    desc: 'We design your system: the messages, the AI agent\'s tone, the dashboard your team will actually use. You approve every piece before we build.',
  },
  {
    number: '03',
    title: 'Install',
    desc: 'We wire it up — WhatsApp Business API, AI agent, follow-up flows, analytics dashboard. Four to six weeks from kickoff to live.',
  },
  {
    number: '04',
    title: 'Tune',
    desc: 'Monthly retainer keeps it sharp. New campaigns each season, fresh AI prompts, new dashboards as your business grows. The system gets better every month.',
  },
]

const faqData = [
  {
    question: 'Will this actually increase bookings, or is it just another tool?',
    answer: 'A revenue system only works if the math is honest. Most hotels and operators we audit lose 50–70% of inquiries to slow response — replying in 30 seconds instead of 9 hours typically recovers a meaningful share of that. We instrument everything from day one so you can see exactly what changed, not just trust our word. And we back it with the 90-day Payback Promise: if the dashboard doesn\'t show enough new revenue to cover the install fee within 90 days, we refund the difference.',
  },
  {
    question: 'What does it cost to install?',
    answer: 'Build fee is typically ₹2,00,000 to ₹3,00,000 depending on scope — landing page, WhatsApp engine, AI agent, dashboard, follow-up flows. After that, a monthly retainer of ₹18,000 to ₹25,000 covers tuning, new campaigns, and adding flows as your business grows. Fixed quote before any work begins — and every install ships with a 90-day Payback Promise: if the dashboard doesn\'t show enough new revenue to cover the install fee in 90 days, we refund the difference.',
  },
  {
    question: 'What if I already use a CRM or booking system?',
    answer: 'We integrate. The system sits on top of what you already use — WhatsApp Business, Booking.com extranet, your existing CRM if you have one. You don\'t throw anything away. The goal is one place to see what\'s working, not another tool to log into.',
  },
  {
    question: 'Do you only work with hotels in Sikkim?',
    answer: 'No. We\'re based in Gangtok and start with Northeast India because that\'s where we have natural reach — but the same system installs cleanly for hotels, homestays, and tour operators anywhere in India. Most of the work is remote.',
  },
  {
    question: 'Who owns the data and the system after install?',
    answer: 'You do. The dashboard, the WhatsApp number, the customer data — it\'s all in accounts you own. The retainer is for tuning and improvement, not for holding your system hostage. You can walk away any time with everything intact.',
  },
  {
    question: 'Are you a Waglogy old client looking for website work?',
    answer: 'We still build websites, mobile apps, and custom software for select projects — but our main work now is installing revenue systems for the hospitality industry. If you need a one-off build, talk to us and we\'ll tell you honestly whether we\'re the right fit.',
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
                  From the team behind Himato
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-5xl sm:text-6xl lg:text-6xl font-bold leading-[1.08] mb-6 text-[#0C0C0C]"
                >
                  Turn every inquiry into a{' '}
                  <span className="text-blue-600">paying booking</span>.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="text-lg text-[#6E6B67] mb-10 leading-relaxed"
                >
                  We install AI-powered revenue systems for hotels, homestays, and tour operators
                  across India — lead capture, automated WhatsApp follow-up, and a live dashboard of
                  what's actually working. Built by the team behind Himato, our own AI travel
                  platform running in Northeast India.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a href="/contact" className="btn-primary text-base px-7 py-3.5">
                    Book a 20-min walkthrough
                    <MdArrowForward size={18} />
                  </a>
                  <a href="/services" className="btn-outline text-base px-7 py-3.5">
                    See how it works
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
                    { value: '<60s', label: 'First-touch response' },
                    { value: '24/7', label: 'Auto-response engine' },
                    { value: '4–6 wks', label: 'From kickoff to live' },
                    { value: '5+ yrs', label: 'Building in Northeast' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-[#0C0C0C]" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                      <div className="text-sm text-[#6E6B67] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — product mockups */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                className="hidden lg:block relative h-[580px]"
              >
                {/* ── MAIN: Revenue Dashboard mockup ── */}
                <div className="absolute top-0 left-0 right-8 rounded-xl overflow-hidden border border-[#E5E2DC] shadow-lg bg-white">
                  {/* App chrome */}
                  <div className="bg-[#F5F4F0] border-b border-[#E5E2DC] px-4 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#E5E2DC]" />
                      <div className="w-3 h-3 rounded-full bg-[#E5E2DC]" />
                      <div className="w-3 h-3 rounded-full bg-[#E5E2DC]" />
                    </div>
                    <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-[10px] text-[#A09A90] border border-[#E5E2DC]">
                      waglogy.app/dashboard
                    </div>
                  </div>

                  {/* Dashboard body */}
                  <div className="p-5 bg-[#FAFAF8]" style={{ height: '260px' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[10px] font-semibold text-[#A09A90] uppercase tracking-widest">Revenue Dashboard</div>
                        <div className="text-sm font-bold text-[#0C0C0C] mt-0.5">This Week · Mar 18 – Mar 24</div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-50 border border-green-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-semibold text-green-700">Live</span>
                      </div>
                    </div>

                    {/* Metric grid */}
                    <div className="grid grid-cols-4 gap-2.5 mb-4">
                      {[
                        { label: 'Inquiries', value: '127', delta: '+18%', positive: true },
                        { label: 'Bookings', value: '38', delta: '+24%', positive: true },
                        { label: 'Revenue', value: '₹4.2L', delta: '+31%', positive: true },
                        { label: 'Avg reply', value: '47s', delta: '−9h', positive: true },
                      ].map((m) => (
                        <div key={m.label} className="bg-white rounded-lg border border-[#E5E2DC] p-2.5">
                          <div className="text-[9px] text-[#A09A90] font-semibold uppercase tracking-widest mb-1">{m.label}</div>
                          <div className="text-base font-bold text-[#0C0C0C] leading-none">{m.value}</div>
                          <div className={`text-[10px] font-semibold mt-1.5 ${m.positive ? 'text-green-600' : 'text-red-500'}`}>{m.delta}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bar chart */}
                    <div className="bg-white rounded-lg border border-[#E5E2DC] p-3">
                      <div className="text-[10px] text-[#A09A90] font-semibold uppercase tracking-widest mb-2.5">Inquiries by day</div>
                      <div className="flex items-end justify-between gap-1.5">
                        {[
                          { day: 'M', h: 42 },
                          { day: 'T', h: 68 },
                          { day: 'W', h: 55 },
                          { day: 'T', h: 78 },
                          { day: 'F', h: 92 },
                          { day: 'S', h: 100 },
                          { day: 'S', h: 71 },
                        ].map((b, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                            <div
                              className="w-full rounded-t bg-blue-500"
                              style={{ height: `${b.h * 0.45}px`, minHeight: '4px', opacity: 0.85 }}
                            />
                            <div className="text-[9px] text-[#A09A90] font-medium leading-none">{b.day}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── BOTTOM LEFT: WhatsApp AI conversation ── */}
                <div className="absolute bottom-0 left-0 w-[52%] rounded-xl overflow-hidden border border-[#E5E2DC] shadow-lg bg-white">
                  {/* WhatsApp header */}
                  <div className="bg-[#075E54] px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">HV</div>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold text-white leading-none">Himalayan View Resort</div>
                      <div className="text-[9px] text-white/70 mt-0.5">online · AI agent active</div>
                    </div>
                    <FaWhatsapp className="text-white/80" size={14} />
                  </div>
                  {/* Conversation */}
                  <div className="bg-[#E7DFD3] px-3 py-3 space-y-2" style={{ height: '194px' }}>
                    {/* Guest message */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg rounded-tl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                        <div className="text-[10px] text-[#0C0C0C] leading-snug">Rooms for 24–28 Dec? family of 4 🙂</div>
                        <div className="text-[8px] text-[#A09A90] text-right mt-0.5">11:47 PM</div>
                      </div>
                    </div>
                    {/* AI reply */}
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                        <div className="text-[10px] text-[#0C0C0C] leading-snug">
                          Hi! Yes — Deluxe Suite is available 24–28 Dec at ₹6,500/night.
                          Breakfast included, full valley view. Want me to hold it 24h?
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-0.5">
                          <span className="text-[8px] text-[#3D3A36] font-medium">11:47 PM</span>
                          <span className="text-[8px] text-[#3D3A36]">✓✓</span>
                        </div>
                      </div>
                    </div>
                    {/* AI badge */}
                    <div className="flex justify-center pt-1">
                      <div className="bg-white/80 backdrop-blur px-2 py-0.5 rounded-full border border-white/60 flex items-center gap-1">
                        <MdSmartToy size={9} className="text-blue-600" />
                        <span className="text-[8px] font-semibold text-[#3D3A36]">AI replied in 28s</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── BOTTOM RIGHT: Today's Inquiries feed ── */}
                <div className="absolute bottom-0 right-0 w-[45%] rounded-xl overflow-hidden border border-[#E5E2DC] shadow-lg bg-white">
                  <div className="bg-[#F5F4F0] border-b border-[#E5E2DC] px-3 py-2 flex items-center justify-between">
                    <div className="text-[10px] font-bold text-[#0C0C0C]">Today's Inquiries</div>
                    <div className="text-[9px] text-blue-600 font-semibold">9 new</div>
                  </div>
                  <div className="divide-y divide-[#E5E2DC]" style={{ height: '208px' }}>
                    {[
                      { name: 'Priya M.', src: 'WhatsApp', srcColor: 'bg-green-50 text-green-700', preview: '4 nights, 2 rooms…', time: '2m', status: 'bg-green-500' },
                      { name: 'Arjun K.', src: 'Web Form', srcColor: 'bg-blue-50 text-blue-700', preview: 'Family of 5 in Dec', time: '11m', status: 'bg-amber-400' },
                      { name: 'Booking.com', src: 'Channel', srcColor: 'bg-purple-50 text-purple-700', preview: 'Twin deluxe Mar 28', time: '24m', status: 'bg-green-500' },
                      { name: 'Sangita T.', src: 'Instagram', srcColor: 'bg-pink-50 text-pink-700', preview: 'Honeymoon package?', time: '47m', status: 'bg-green-500' },
                      { name: 'David L.', src: 'WhatsApp', srcColor: 'bg-green-50 text-green-700', preview: 'Group of 12 in Apr', time: '1h', status: 'bg-green-500' },
                    ].map((row, i) => (
                      <div key={i} className="px-3 py-2 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${row.status} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold text-[#0C0C0C] truncate">{row.name}</span>
                            <span className={`text-[8px] font-semibold px-1 py-0.5 rounded ${row.srcColor}`}>{row.src}</span>
                          </div>
                          <div className="text-[9px] text-[#6E6B67] truncate mt-0.5">{row.preview}</div>
                        </div>
                        <div className="text-[9px] text-[#A09A90] font-medium shrink-0">{row.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="absolute top-[280px] right-0 bg-white border border-[#E5E2DC] rounded-xl px-4 py-3 shadow-md flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MdSmartToy className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0C0C0C]">Auto-replied in 28s</div>
                    <div className="text-[10px] text-[#6E6B67]">While the owner was asleep</div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── FLAGSHIP SYSTEMS ─────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 max-w-2xl"
            >
              <div className="section-label mb-4">What We Install</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] mb-4">
                Three systems that turn inquiries into revenue.
              </h2>
              <p className="text-[#6E6B67] text-lg leading-relaxed">
                Each one solves a specific failure point in the inquiry-to-booking funnel.
                Installed together, they replace the WhatsApp-and-Excel chaos most hospitality
                businesses run on today.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {flagshipSystems.map((system, idx) => (
                <motion.div
                  key={system.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-8 group cursor-default flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <system.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-3">{system.title}</h3>
                  <p className="text-sm text-[#6E6B67] leading-relaxed mb-5 flex-1">{system.desc}</p>
                  <div className="pt-4 border-t border-[#E5E2DC] flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest">
                    <MdCheckCircle size={14} />
                    {system.outcome}
                  </div>
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
                See full system breakdown
                <MdArrowForward size={16} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── WE ALSO BUILD ────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10 max-w-2xl"
            >
              <div className="section-label mb-4">We Also Build</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C] mb-3">
                Need a one-off project? We still do that.
              </h2>
              <p className="text-[#6E6B67] leading-relaxed">
                Websites, apps, and custom software for selected projects — usually as part of a larger
                revenue system, sometimes on their own when the fit makes sense.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherServices.map((service, idx) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-5 group cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <service.icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0C0C0C] mb-1.5">{service.title}</h3>
                  <p className="text-xs text-[#6E6B67] leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
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
                Built by an AI tourism company, not an agency.
              </h2>
              <p className="text-[#6E6B67] text-lg leading-relaxed mb-8">
                We run Himato — our own AI travel platform in Northeast India. Every system
                we install in your hotel is built on what's already working at scale in our
                own product. You're not the experiment.
              </p>
              <a href="/about" className="btn-outline text-sm px-6 py-3">
                About our company
                <MdArrowForward size={16} />
              </a>
            </motion.div>

            <div className="space-y-5">
              {[
                {
                  icon: MdStar,
                  title: 'We run what we sell',
                  desc: 'Himato is our own AI travel product. The lead capture, follow-up engine, and analytics we install in your hotel are battle-tested in our own operation first.',
                },
                {
                  icon: MdVerified,
                  title: 'Outcomes, instrumented',
                  desc: 'Every system ships with a dashboard. Inquiries, response time, conversion rate, revenue by source — measured from day one. No "trust us, it\'s working" energy.',
                },
                {
                  icon: MdGroups,
                  title: 'Built for hospitality',
                  desc: 'Tour operator flows, off-season nurture, group inquiry handling, multilingual replies — we know this industry, not just the tech. Less explaining for you.',
                },
                {
                  icon: MdSupportAgent,
                  title: 'We stay on the retainer',
                  desc: 'Monthly tuning keeps the system sharp as your business shifts. New campaigns, new flows, fresh prompts. Not a finished project — an ongoing engine.',
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
              <div className="section-label mb-4">How We Install</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] max-w-xl">
                From first call to live system in 4–6 weeks.
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
                Ready to stop losing inquiries?
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Tell us a bit about your property and how many inquiries you handle each month.
                We'll come back within one business day with a clear assessment — no sales pitch,
                no obligation.
              </p>

              <div className="space-y-5">
                {[
                  { icon: MdCheckCircle, text: 'Free 20-min walkthrough of your funnel' },
                  { icon: MdCheckCircle, text: 'Fixed install quote before any work begins' },
                  { icon: MdCheckCircle, text: 'You own the system, data, and accounts' },
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
