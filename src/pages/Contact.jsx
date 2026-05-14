import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaChevronDown, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { submitContactForm } from '../services/contactService'
import SuccessModal from '../components/SuccessModal'
import { convertBudgetRangeToUSD } from '../utils/currencyConverter'
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

const fieldClass =
  'w-full border border-[#E5E2DC] rounded-lg px-4 py-3 text-[#0C0C0C] placeholder-[#A09A90] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white'

const labelClass = 'block text-xs font-semibold text-[#3D3A36] mb-2 uppercase tracking-wider'

const Contact = () => {
  const [searchParams] = useSearchParams()
  const isQuoteRequest = searchParams.get('quote') === 'true'

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    if (isQuoteRequest) {
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form')
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' })
          const nameInput = document.getElementById('name')
          if (nameInput) nameInput.focus()
        }
      }, 500)
    }
  }, [isQuoteRequest])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSubmitStatus(null)

    try {
      const budgetInUSD = formData.budget ? convertBudgetRangeToUSD(formData.budget) : ''
      const apiData = {
        fullName: formData.name,
        email: formData.email,
        projectDetails: formData.message,
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.company && { organizationName: formData.company.trim() }),
        ...(budgetInUSD && { budgetRange: budgetInUSD })
      }

      await submitContactForm(apiData)
      setSubmittedData(apiData)
      setSubmitStatus('success')
      setShowSuccessModal(true)
      setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to submit form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: 'How long does it take to deliver a website?',
      answer: 'Most business websites are delivered within 3–4 weeks from the day we receive all your content and requirements. Complex projects with custom features or integrations typically take 6–10 weeks. We give you a firm timeline before any work begins.'
    },
    {
      question: 'What does a typical project cost?',
      answer: 'A standard business website starts at ₹25,000. E-commerce stores, booking systems, or custom web apps vary based on scope. We provide a fixed-price quote after a short discovery call — no hidden fees, no surprises.'
    },
    {
      question: 'Do you work with businesses outside Sikkim and Northeast India?',
      answer: 'Yes. While we are based in Gangtok, we serve clients across India. Our work process is fully remote-friendly — discovery, design, development, and handoff all happen via video calls, shared documents, and live previews.'
    },
    {
      question: 'What is included after delivery?',
      answer: 'Every project includes a 30-day post-launch support window for bug fixes and small adjustments at no extra cost. We also offer ongoing maintenance plans if you want regular updates, security checks, and content changes handled for you.'
    },
    {
      question: 'Can I update my website myself after it is built?',
      answer: 'Yes. If you need a CMS (content management system), we build it in so you can edit text, images, and blog posts without touching code. We also provide a handover walkthrough so you feel confident managing the site on your own.'
    },
    {
      question: 'Do you provide SEO along with the website?',
      answer: 'Every site we build is technically SEO-ready — fast load times, clean code, proper meta tags, and structured data out of the box. For ongoing keyword research, content strategy, and ranking work, we offer SEO as a separate service.'
    },
  ]

  const contactInfo = [
    { icon: FaEnvelope, title: 'Email', val: 'contact@waglogy.in', href: 'mailto:contact@waglogy.in', external: false },
    { icon: FaPhoneAlt, title: 'Phone', val: '+91 97338 14168', href: 'tel:+919733814168', external: false },
    { icon: FaWhatsapp, title: 'WhatsApp', val: 'Chat instantly', href: 'https://wa.me/919733814168', external: true },
    { icon: FaMapMarkerAlt, title: 'Office', val: 'Tadong Metro Point, Gangtok, Sikkim – 737102', href: 'https://maps.google.com/?q=Tadong+Metro+Point+Gangtok+Sikkim', external: true },
  ]

  const social = [
    { icon: FaLinkedin, href: 'https://in.linkedin.com/company/waglogy', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: FaInstagram, href: 'https://www.instagram.com/waglogy/', label: 'Instagram', color: 'hover:bg-pink-500 hover:border-pink-500' },
    { icon: FaWhatsapp, href: 'https://wa.me/919733814168', label: 'WhatsApp', color: 'hover:bg-green-500 hover:border-green-500' },
  ]

  return (
    <>
      <SEO page="contact" />
      <StructuredData schemas={[generateFAQSchema(faqs)]} />

      <div className="bg-[#FAFAF8] text-[#0C0C0C] min-h-screen">

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC] text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              Mon – Sun · 9 AM – 7 PM
            </motion.div>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6"
            >
              Let's build{' '}
              <span className="text-blue-600">together</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl mx-auto"
            >
              Tell us what you need — a website, an app, or something custom. We'll reply within 24 hours with a clear plan and honest pricing.
            </motion.p>
          </div>
        </section>

        {/* Main: Form + Sidebar */}
        <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-12 items-start">

            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="card p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-t-[inherit]" aria-hidden />

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0C0C] mb-1">
                {isQuoteRequest ? 'Request a quote' : 'Send us a message'}
              </h2>
              <p className="text-[#6E6B67] mb-8 text-sm">
                Fill in the details below and we'll get back to you within one business day.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full name *</label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className={fieldClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91…" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company</label>
                    <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Organization name" className={fieldClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className={labelClass}>What do you need?</label>
                    <select id="service" name="service" value={formData.service} onChange={handleInputChange} className={`${fieldClass} text-[#3D3A36]`}>
                      <option value="">Select a service</option>
                      <option value="website">Website Development</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="custom-software">Custom Software</option>
                      <option value="ui-ux">UI / UX Design</option>
                      <option value="ai-integration">AI Integration</option>
                      <option value="it-consulting">IT Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClass}>Budget range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className={`${fieldClass} text-[#3D3A36]`}>
                      <option value="">Select budget</option>
                      <option value="under-50k">&lt; ₹50k</option>
                      <option value="50k-1l">₹50k – ₹1L</option>
                      <option value="1l-5l">₹1L – ₹5L</option>
                      <option value="over-5l">₹5L +</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Project details *</label>
                  <textarea
                    id="message" name="message" required value={formData.message}
                    onChange={handleInputChange} rows={5}
                    placeholder="Describe your project, goals, or any questions you have…"
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-center text-sm flex items-center justify-center gap-2">
                    <FaCheckCircle className="shrink-0" /> Message sent! We'll reply within 24 hours.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center text-sm">
                    {errorMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Contact info */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="card p-6"
              >
                <h3 className="text-base font-bold text-[#0C0C0C] mb-5">Contact details</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <item.icon size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-[#A09A90] font-medium uppercase tracking-wider">{item.title}</p>
                        <p className="text-sm text-[#0C0C0C] font-medium group-hover:text-blue-600 transition-colors">{item.val}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Follow us */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                className="card p-6"
              >
                <h3 className="text-base font-bold text-[#0C0C0C] mb-2">Follow us</h3>
                <p className="text-sm text-[#6E6B67] mb-5">Stay up to date with our work and updates.</p>
                <div className="flex gap-3">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-lg border border-[#E5E2DC] text-[#6E6B67] hover:text-white transition-colors text-sm font-medium ${s.color}`}
                    >
                      <s.icon size={15} />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
                className="card p-6"
              >
                <h3 className="text-base font-bold text-[#0C0C0C] mb-4">Business hours</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM – 5:00 PM' },
                    { day: 'Sunday', hours: '10:00 AM – 3:00 PM' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center text-sm">
                      <span className="text-[#6E6B67]">{row.day}</span>
                      <span className="text-[#0C0C0C] font-medium">{row.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#A09A90] mt-4">IST (India Standard Time, UTC+5:30)</p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E5E2DC]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0C0C0C] mb-3">Common questions</h2>
              <p className="text-[#6E6B67] text-sm">Straight answers before you reach out.</p>
            </motion.div>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.5}
                  className="border border-[#E5E2DC] rounded-xl overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex items-center justify-between w-full p-5 sm:p-6 text-left gap-4 hover:bg-[#FAFAF8] transition-colors"
                  >
                    <span className="font-semibold text-[#0C0C0C] text-sm sm:text-base leading-snug">{faq.question}</span>
                    <FaChevronDown
                      className={`text-[#A09A90] shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-[#6E6B67] text-sm leading-relaxed border-t border-[#E5E2DC]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          submittedData={submittedData}
        />
      </div>
    </>
  )
}

export default Contact
