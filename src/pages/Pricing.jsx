import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MdWeb, MdPhoneIphone, MdDesktopWindows, MdBrush, MdSmartToy, MdPeople,
  MdArrowForward, MdCheckCircle, MdClose
} from 'react-icons/md'
import SEO from '../components/SEO'

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
    title: 'Website Design & Development',
    starting: '₹25,000',
    typical: '₹25,000 – ₹1,00,000',
    timeline: '3–5 weeks',
    affects: [
      'Number of pages and sections',
      'Custom design vs template-based',
      'CMS and content management needs',
      'Integrations (booking, payment, forms)',
    ],
  },
  {
    icon: MdPhoneIphone,
    title: 'Mobile App Development',
    starting: '₹1,50,000',
    typical: '₹1,50,000 – ₹6,00,000',
    timeline: '8–16 weeks',
    affects: [
      'iOS only, Android only, or both',
      'Complexity of features and user flows',
      'Back-end and database requirements',
      'Third-party integrations and APIs',
    ],
  },
  {
    icon: MdDesktopWindows,
    title: 'Custom Software Development',
    starting: '₹75,000',
    typical: '₹75,000 – ₹5,00,000+',
    timeline: '6–16 weeks',
    affects: [
      'Number of modules and features',
      'User roles and permission levels',
      'Data volume and performance needs',
      'Integration with existing systems',
    ],
  },
  {
    icon: MdBrush,
    title: 'UI / UX Design',
    starting: '₹20,000',
    typical: '₹20,000 – ₹80,000',
    timeline: '2–4 weeks',
    affects: [
      'Number of screens and flows',
      'Depth of research and testing',
      'Design system and component library',
      'Revisions and iteration rounds',
    ],
  },
  {
    icon: MdSmartToy,
    title: 'AI Integration & Automation',
    starting: '₹50,000',
    typical: '₹50,000 – ₹3,00,000',
    timeline: '4–10 weeks',
    affects: [
      'Type and complexity of AI features',
      'Volume of data to process',
      'Custom model training requirements',
      'Ongoing monitoring and tuning needs',
    ],
  },
  {
    icon: MdPeople,
    title: 'IT Consulting',
    starting: '₹2,500/hr',
    typical: '₹2,500 – ₹5,000 per hour',
    timeline: 'Flexible',
    affects: [
      'Scope of work and deliverables',
      'Retainer vs one-off engagement',
      'On-site vs remote requirement',
      'Urgency and turnaround time',
    ],
  },
]

const inputClass = 'w-full border border-[#E5E2DC] rounded-lg px-4 py-3 text-[#0C0C0C] placeholder-[#A09A90] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white'

const Pricing = () => {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Project Quote Request')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    )
    window.location.href = `mailto:contact@waglogy.in?subject=${subject}&body=${body}`
    setShowModal(false)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <>
      <SEO page="pricing" />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="section-label mb-6">
              Pricing
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl"
            >
              Honest pricing. Fixed quotes. No surprises.
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl mb-10"
            >
              Every project is different, so we don't do fixed packages. What we do instead: give you a clear, fixed quote before any work begins — based on exactly what your project needs, nothing more.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-wrap gap-6"
            >
              {[
                'Fixed price agreed before work starts',
                'No hourly billing surprises',
                'No hidden charges',
                'Scope changes discussed openly',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#3D3A36]">
                  <MdCheckCircle size={16} className="text-blue-500 shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PRICE GUIDE ──────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-14"
            >
              <div className="section-label mb-4">Price Guide</div>
              <h2 className="text-4xl font-bold text-[#0C0C0C] max-w-xl">
                Starting points, not final quotes.
              </h2>
              <p className="text-[#6E6B67] mt-3 max-w-2xl">
                These ranges are based on real projects we've delivered. Your actual quote depends on your specific requirements — we'll tell you exactly what it'll cost after a free discovery call.
              </p>
            </motion.div>

            <div className="space-y-4">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-7 lg:p-8"
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-start">

                    {/* Service name */}
                    <div className="lg:col-span-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                        <service.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0C0C0C] text-lg leading-snug">{service.title}</h3>
                        <p className="text-sm text-[#6E6B67] mt-1">{service.timeline} typical</p>
                      </div>
                    </div>

                    {/* Price range */}
                    <div className="lg:col-span-3">
                      <p className="text-xs font-semibold text-[#A09A90] uppercase tracking-widest mb-1">Typical range</p>
                      <p className="text-xl font-bold text-[#0C0C0C]">{service.typical}</p>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">Starting from {service.starting}</p>
                    </div>

                    {/* What affects price */}
                    <div className="lg:col-span-5">
                      <p className="text-xs font-semibold text-[#A09A90] uppercase tracking-widest mb-3">What affects the final price</p>
                      <ul className="space-y-1.5">
                        {service.affects.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-[#6E6B67]">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE QUOTE ─────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-14"
            >
              <div className="section-label mb-4">How We Quote</div>
              <h2 className="text-4xl font-bold text-[#0C0C0C] max-w-xl">
                From first conversation to fixed price — here's the process.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  number: '01',
                  title: 'Free discovery call',
                  desc: 'We spend 30–60 minutes understanding what you need, what you already have, and what success looks like for you.',
                },
                {
                  number: '02',
                  title: 'We scope the project',
                  desc: 'Based on the call, we define exactly what will be built, what\'s out of scope, and what we need from you.',
                },
                {
                  number: '03',
                  title: 'Fixed quote sent',
                  desc: 'You receive a written quote with a clear price, timeline, and deliverables. No range. One number.',
                },
                {
                  number: '04',
                  title: 'Work begins',
                  desc: 'Once you approve the quote, we start. The price does not change unless you ask us to change the scope.',
                },
              ].map((step, idx) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <div className="text-6xl font-black text-blue-100 leading-none mb-4 select-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#0C0C0C] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6E6B67] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON QUESTIONS ─────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-3xl mx-auto">

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-12"
            >
              <div className="section-label mb-4">Common Questions</div>
              <h2 className="text-4xl font-bold text-[#0C0C0C]">Things people ask about pricing.</h2>
            </motion.div>

            <div className="space-y-5">
              {[
                {
                  q: 'Do you charge by the hour or by the project?',
                  a: 'Almost always by the project. We agree on a fixed price upfront so you know exactly what you\'re spending. Hourly billing is only used for consulting or small open-ended tasks where scope genuinely can\'t be defined in advance.',
                },
                {
                  q: 'What if my requirements change mid-project?',
                  a: 'We handle this openly. If you want to add something outside the original scope, we\'ll tell you the cost of that addition before doing it. Nothing gets billed retroactively.',
                },
                {
                  q: 'Do you take a deposit?',
                  a: 'Yes. We typically work on a 50% upfront, 50% on delivery structure for most projects. For larger projects we split payments into milestones. This is discussed and agreed in the quote.',
                },
                {
                  q: 'Can you work within a tight budget?',
                  a: 'Sometimes yes. If your budget is limited, we\'ll tell you honestly what\'s achievable within it and what trade-offs that means. We\'d rather scope a smaller project properly than overpromise on a bigger one.',
                },
                {
                  q: 'Are there ongoing costs after the project is delivered?',
                  a: 'Hosting, domains, and third-party services have their own costs which we\'ll highlight during scoping. We also offer optional maintenance and support packages — but these are never mandatory.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-6"
                >
                  <h3 className="font-bold text-[#0C0C0C] mb-2">{item.q}</h3>
                  <p className="text-sm text-[#6E6B67] leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Get a fixed quote for your project.
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Tell us what you're building. We'll come back with a clear price, a realistic timeline, and no obligation to proceed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-primary px-8 py-4 text-base justify-center"
                >
                  Request a Quote
                  <MdArrowForward size={18} />
                </button>
                <a
                  href="/contact"
                  className="btn-outline px-8 py-4 text-base justify-center border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                >
                  Or book a call first
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>

      {/* ── QUOTE MODAL ──────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#E5E2DC] overflow-hidden"
          >
            <div className="flex items-start justify-between p-6 border-b border-[#E5E2DC]">
              <div>
                <h3 className="text-lg font-bold text-[#0C0C0C]">Request a Quote</h3>
                <p className="text-sm text-[#6E6B67] mt-0.5">We'll respond within one business day.</p>
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
                  type="text" required placeholder="Your name"
                  className={inputClass}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email" required placeholder="you@example.com"
                    className={inputClass}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">Phone</label>
                  <input
                    type="tel" required placeholder="+91..."
                    className={inputClass}
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1.5">What do you need built?</label>
                <textarea
                  required rows={4}
                  placeholder="Describe your project — what it is, who it's for, and what problem it solves..."
                  className={`${inputClass} resize-none`}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3.5 text-sm">
                Send Quote Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Pricing
