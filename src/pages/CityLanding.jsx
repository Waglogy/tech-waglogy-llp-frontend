import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MdWeb, MdPhoneIphone, MdDesktopWindows, MdBrush, MdSmartToy, MdCode,
  MdArrowForward, MdCheckCircle, MdVerified, MdSupportAgent, MdGroups, MdStar,
} from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'
import { getCityBySlug } from '../data/cities'
import {
  SITE_CONFIG,
  generateFAQSchema,
  generateCityLocalBusinessSchema,
  generateCityServiceSchema,
} from '../config/seo'
import StructuredData from '../components/StructuredData'
import { submitQuery } from '../services/queryService'
import { trackLead } from '../utils/track'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const services = [
  { icon: MdWeb,            title: 'Website Development',    desc: 'Professional websites built to perform — fast, secure, and optimised to turn visitors into customers.' },
  { icon: MdPhoneIphone,    title: 'Mobile App Development', desc: 'iOS and Android applications built around your business workflow, not the other way around.' },
  { icon: MdCode,           title: 'Custom Software',        desc: 'Tailored software solutions that fit exactly how your business operates — no unnecessary complexity.' },
  { icon: MdBrush,          title: 'UI / UX Design',         desc: 'Clean, intuitive interfaces that make your product easy to use and your brand easy to trust.' },
  { icon: MdSmartToy,       title: 'AI Integration',         desc: 'Practical AI tools and automation built into your existing systems to save time and reduce manual work.' },
  { icon: MdDesktopWindows, title: 'IT Consulting',          desc: 'Straightforward technology guidance — we help you make the right decisions before you invest.' },
]

const steps = [
  { number: '01', title: 'We Listen',  desc: 'We take time to understand your business, your goals, and what problem you actually need solved.' },
  { number: '02', title: 'We Plan',    desc: 'Clear scope, realistic timeline, fixed pricing. No vague estimates, no moving goalposts.' },
  { number: '03', title: 'We Build',   desc: 'Quality development with regular updates. You see progress, not just a final reveal.' },
  { number: '04', title: 'We Support', desc: 'We stay after launch — maintenance, updates, and growth support as your business evolves.' },
]

const trustPoints = [
  { icon: MdVerified,    title: 'Transparent Pricing',    desc: 'Fixed quotes before work begins. No surprises, no scope creep billed retroactively.' },
  { icon: MdSupportAgent, title: 'Real Support',          desc: 'You can call us. We answer. Monday to Sunday, 9am to 7pm — and available on WhatsApp.' },
  { icon: MdGroups,      title: 'Experienced Team',       desc: 'Full-stack developers, designers, and consultants — everything under one roof.' },
  { icon: MdStar,        title: 'Long-Term Partnership',  desc: 'We build lasting relationships, not one-off projects. Your growth matters to us beyond the invoice.' },
]

const CityLanding = () => {
  const { city: citySlug } = useParams()
  const city = getCityBySlug(citySlug)

  const [openFaq, setOpenFaq] = useState(null)
  const [queryMessage, setQueryMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [queryStatus, setQueryStatus] = useState(null)
  const [queryErrorMessage, setQueryErrorMessage] = useState('')

  if (!city) return <Navigate to="/404" replace />

  const fullCanonical = `${SITE_CONFIG.siteUrl}${city.seo.canonical}`

  // Combine base FAQs (always present) with extended FAQs added in citiesRichContent.
  const allFaqs = [...(city.faq || []), ...(city.extendedFaqs || [])]

  // Build the schema array. City-scoped LocalBusiness + Service get added on top
  // of the global Organization/LocalBusiness/Website schemas already injected
  // by <StructuredData />.
  const pageSchemas = [
    generateCityLocalBusinessSchema(city),
    generateCityServiceSchema(city),
    generateFAQSchema(allFaqs.map((f) => ({ question: f.q, answer: f.a }))),
  ]

  const stats = city.stats || [
    { value: '50+',       label: 'Projects Delivered' },
    { value: '5+',        label: 'Years in Business' },
    { value: 'Pan-India', label: 'Clients Served' },
    { value: 'Mon–Sun',   label: 'Support Hours' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!queryMessage.trim()) {
      setQueryStatus('error')
      setQueryErrorMessage('Please describe what you need.')
      return
    }
    setIsSubmitting(true)
    setQueryStatus(null)
    try {
      await submitQuery({ message: queryMessage })

      // GA4 conversion event — attribute the lead to this specific city page.
      trackLead(`city_landing_${citySlug}`, { city: city.name, state: city.state })

      setQueryStatus('success')
      setQueryMessage('')
      setTimeout(() => setQueryStatus(null), 5000)
    } catch (err) {
      setQueryStatus('error')
      setQueryErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{city.seo.title}</title>
        <meta name="description" content={city.seo.description} />
        <link rel="canonical" href={fullCanonical} />
        <meta property="og:title" content={city.seo.title} />
        <meta property="og:description" content={city.seo.description} />
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={city.seo.title} />
        <meta name="twitter:description" content={city.seo.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.siteUrl },
              { '@type': 'ListItem', position: 2, name: `Web Development ${city.name}`, item: fullCanonical },
            ],
          })}
        </script>
      </Helmet>

      <StructuredData schemas={pageSchemas} />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-8"
              >
                {city.badge}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6 text-[#0C0C0C]"
              >
                {city.h1.split(city.name).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <React.Fragment key={i}>
                      {part}
                      <span className="text-blue-600">{city.name}</span>
                    </React.Fragment>
                  ) : part
                )}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-lg text-[#6E6B67] mb-10 leading-relaxed"
              >
                {city.heroPara}
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

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="mt-12 pt-8 border-t border-[#E5E2DC] flex flex-wrap gap-8"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-[#0C0C0C]" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                    <div className="text-sm text-[#6E6B67] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── LONG-FORM INTRO (rich content only) ──────────── */}
        {city.intro && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="section-label mb-4">About Tech Waglogy in {city.name}</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C] mb-8 leading-tight">
                  {city.localHeading}
                </h2>
                <p className="text-lg text-[#3C3A37] leading-relaxed mb-6">
                  {city.intro}
                </p>
                {city.localContent && (
                  <p className="text-base text-[#6E6B67] leading-relaxed">
                    {city.localContent}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* ── WHY CHOOSE (rich content only) ───────────────── */}
        {city.whyChoose && city.whyChoose.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12 max-w-2xl"
              >
                <div className="section-label mb-4">Why {city.name} businesses choose us</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C]">
                  Built for the way business actually works in {city.name}.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {city.whyChoose.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    className="card p-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                      <MdCheckCircle size={20} />
                    </div>
                    <h3 className="text-base font-bold text-[#0C0C0C] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#6E6B67] leading-relaxed">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── INDUSTRIES ───────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="section-label mb-4">Local Expertise</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C] max-w-xl">
                {city.industriesHeading}
              </h2>
            </motion.div>

            {city.industryDetails ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {city.industryDetails.map((ind, idx) => (
                  <motion.div
                    key={ind.name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    className="card p-6"
                  >
                    <h3 className="font-bold text-[#0C0C0C] text-base mb-2">{ind.name}</h3>
                    <p className="text-sm text-[#6E6B67] leading-relaxed">{ind.body}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {city.industries.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#FAFAF8] border border-[#E5E2DC] text-sm font-medium text-[#0C0C0C]"
                  >
                    {industry}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-[#E5E2DC]">
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
                Services we deliver in {city.name}.
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

        {/* ── CASE STUDIES (rich content only) ─────────────── */}
        {city.caseStudies && city.caseStudies.length > 0 && (
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-12 max-w-2xl"
              >
                <div className="section-label mb-4">Selected work in {city.name}</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C]">
                  Real results for {city.name} businesses.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {city.caseStudies.map((cs, idx) => (
                  <motion.div
                    key={cs.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    className="card p-7 flex flex-col"
                  >
                    <h3 className="text-base font-bold text-[#0C0C0C] mb-3">{cs.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-[#A09C95] font-semibold mb-1.5">Challenge</p>
                    <p className="text-sm text-[#6E6B67] leading-relaxed mb-4">{cs.challenge}</p>
                    <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-1.5">Outcome</p>
                    <p className="text-sm text-[#0C0C0C] leading-relaxed">{cs.outcome}</p>
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
                <a href="/projects" className="btn-outline text-sm px-6 py-3">
                  View full portfolio
                  <MdArrowForward size={16} />
                </a>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── LOCAL CONTEXT ─────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="section-label mb-4">Why Waglogy for {city.name}</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] mb-6">
                {city.localHeading}
              </h2>
              <p className="text-[#6E6B67] text-lg leading-relaxed mb-8">
                {city.localPara}
              </p>
              <a href="/about" className="btn-outline text-sm px-6 py-3">
                About our company
                <MdArrowForward size={16} />
              </a>
            </motion.div>

            <div className="space-y-4">
              {city.localPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-5 flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <MdCheckCircle size={18} />
                  </div>
                  <p className="text-sm text-[#0C0C0C] leading-relaxed">{point}</p>
                </motion.div>
              ))}

              {trustPoints.slice(0, 2).map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx + city.localPoints.length}
                  className="card p-5 flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0C0C0C] text-sm mb-0.5">{item.title}</h4>
                    <p className="text-sm text-[#6E6B67] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-[#E5E2DC]">
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
              {steps.map((step, idx) => (
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

        {/* ── NEARBY AREAS / INTERNAL LINKS ─────────────────── */}
        {city.nearbyAreas && city.nearbyAreas.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6 max-w-2xl"
              >
                <div className="section-label mb-4">Service area</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0C0C]">
                  We serve {city.name} and surrounding areas.
                </h2>
                <p className="text-[#6E6B67] mt-3 leading-relaxed">
                  In addition to {city.name}, we work with businesses across these nearby locations. If you don't see yours listed, get in touch — we serve clients throughout {city.state} and Northeast India.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-2 mb-8">
                {city.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#FAFAF8] border border-[#E5E2DC] text-sm text-[#0C0C0C]"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E5E2DC]">
                <p className="text-sm font-semibold text-[#0C0C0C] mb-3">Explore other locations we serve:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {[
                    { slug: 'gangtok',    name: 'Gangtok' },
                    { slug: 'sikkim',     name: 'Sikkim' },
                    { slug: 'guwahati',   name: 'Guwahati' },
                    { slug: 'shillong',   name: 'Shillong' },
                    { slug: 'siliguri',   name: 'Siliguri' },
                    { slug: 'darjeeling', name: 'Darjeeling' },
                    { slug: 'imphal',     name: 'Imphal' },
                    { slug: 'aizawl',     name: 'Aizawl' },
                    { slug: 'kohima',     name: 'Kohima' },
                    { slug: 'agartala',   name: 'Agartala' },
                    { slug: 'itanagar',   name: 'Itanagar' },
                  ]
                    .filter((c) => c.slug !== city.slug)
                    .map((c) => (
                      <a
                        key={c.slug}
                        href={`/web-development/${c.slug}`}
                        className="text-blue-600 hover:underline"
                      >
                        Web development in {c.name}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E2DC]">
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
                Answers for {city.name} businesses.
              </h2>
            </motion.div>

            <div className="space-y-3">
              {allFaqs.map((faq, idx) => (
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
                    <span className="font-semibold text-[#0C0C0C] pr-4">{faq.q}</span>
                    <span className={`text-blue-500 transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-45' : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-[#6E6B67] text-sm leading-relaxed border-t border-[#E5E2DC] pt-4">
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to build something that works in {city.name}?
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Tell us what you need. We'll get back to you within one business day with a clear next step — no sales pitch, no obligation.
              </p>

              <div className="space-y-5">
                {[
                  'Free initial consultation',
                  'Fixed quote before work begins',
                  'No lock-in contracts',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 text-slate-300">
                    <MdCheckCircle size={18} className="text-blue-400 shrink-0" />
                    <span className="text-sm">{text}</span>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    rows={5}
                    value={queryMessage}
                    onChange={(e) => setQueryMessage(e.target.value)}
                    placeholder={`Describe what you're looking to build in ${city.name}...`}
                    className="w-full border border-[#E5E2DC] rounded-lg p-4 text-[#0C0C0C] placeholder-[#A09A90] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !queryMessage.trim()}
                    className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
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

export default CityLanding
