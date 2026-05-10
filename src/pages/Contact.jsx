import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaChevronDown } from 'react-icons/fa'
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
    { question: 'What is a Revenue System?', answer: 'A Revenue System is an end-to-end AI-powered infrastructure that handles everything from lead capture and automated follow-ups to CRM management and revenue tracking.' },
    { question: 'How long does it take to build a system?', answer: 'Most core growth systems (Lead Capture + Automation) are deployed within 4-6 weeks. Custom CRM dashboards and complex AI workflows may take 8-12 weeks.' },
    { question: 'Do you provide ongoing support?', answer: 'Yes! We act as your growth partner, providing continuous optimization, updates, and scaling support to ensure your system performs at its peak.' },
    { question: 'What technologies do you use?', answer: 'We utilize a modern stack including React, Node.js, and advanced AI frameworks (LLMs, Python) to build seamless automation and dashboards.' },
    { question: 'Is this only for large businesses?', answer: 'No. Our systems are designed specifically for service businesses of all sizes looking to automate their lead-to-revenue pipeline and create predictable growth.' },
    { question: 'Do you offer fixed-price quotes?', answer: 'Yes. We provide transparent, fixed-price project quotes after our initial discovery session so you know exactly what your investment will be.' }
  ]

  const contactCards = [
    { icon: FaEnvelope, title: 'Email Us', val: 'contact@waglogy.in', sub: 'Responses in 24h', iconWrap: 'bg-blue-50 text-blue-600', href: 'mailto:contact@waglogy.in', external: false },
    { icon: FaPhoneAlt, title: 'Call Us', val: '+91 9733814168', sub: 'Mon–Sun, 9am–7pm', iconWrap: 'bg-blue-50 text-blue-600', href: 'tel:+919733814168', external: false },
    { icon: FaWhatsapp, title: 'WhatsApp', val: 'Chat now', sub: 'Instant response', iconWrap: 'bg-[#DCFCE7] text-[#16A34A]', href: 'https://wa.me/919733814168', external: true },
    { icon: FaMapMarkerAlt, title: 'Visit Us', val: 'Gangtok, Sikkim', sub: 'Tadong Metro Point', iconWrap: 'bg-[#F5F4F0] text-[#0C0C0C]', href: 'https://maps.google.com/?q=Tadong+Metro+Point+Gangtok+Sikkim', external: true }
  ]

  return (
    <>
      <SEO page="contact" />
      <StructuredData schemas={[generateFAQSchema(faqs)]} />

      <div className="relative bg-[#FAFAF8] text-[#0C0C0C] min-h-screen overflow-hidden">

        {/* Soft ambient blobs — aligned with marketing pages */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-[8%] right-[-8%] w-[min(480px,90vw)] h-[min(480px,90vw)] rounded-full bg-blue-400/20 blur-[100px]" />
          <div className="absolute top-[40%] left-[-15%] w-[min(520px,95vw)] h-[min(520px,95vw)] rounded-full bg-violet-300/25 blur-[110px]" />
          <div className="absolute bottom-[-5%] right-[20%] w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-[90px]" />
        </div>

        {/* Hero */}
        <section className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC] text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden />
              Available 24/7
            </motion.div>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6 text-[#0C0C0C]"
            >
              Get in{' '}
              <span className="text-blue-600">Touch</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl mx-auto"
            >
              Ready to automate your revenue? Whether you need a lead capture system or a full AI growth engine, we're here to build it.
            </motion.p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card p-6 text-center group block hover:border-[#C9C4BB] transition-colors h-full"
              >
                <div
                  className={`w-14 h-14 rounded-xl mx-auto flex items-center justify-center text-2xl mb-4 ${item.iconWrap} group-hover:scale-105 transition-transform`}
                >
                  <item.icon />
                </div>
                <h3 className="text-base font-bold text-[#0C0C0C] mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-blue-600 mb-1">{item.val}</p>
                <p className="text-xs text-[#A09A90]">{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="contact-form" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E5E2DC]">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-t-[inherit]" aria-hidden />

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0C0C] mb-2 text-center mt-1">
                {isQuoteRequest ? 'Request your quote' : 'Send a message'}
              </h2>
              <p className="text-[#6E6B67] text-center mb-10 text-sm sm:text-base">
                Tell us about your project requirements or general inquiry.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91…"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Organization name"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className={labelClass}>Interested in</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`${fieldClass} text-[#3D3A36]`}
                    >
                      <option value="">Select a system</option>
                      <option value="lead-capture">Lead Capture System</option>
                      <option value="automated-followup">Automated Follow-Up</option>
                      <option value="conversion-optimization">Conversion Optimization</option>
                      <option value="crm-dashboard">CRM & Inquiry Dashboard</option>
                      <option value="revenue-analytics">Revenue Analytics</option>
                      <option value="ai-automation">AI-Driven Automation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClass}>Budget range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`${fieldClass} text-[#3D3A36]`}
                    >
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
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your goals…"
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-center text-sm flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle className="shrink-0" /> Message sent! We'll reply shortly.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center text-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0C0C0C] mb-3 text-center">Common questions</h2>
            <p className="text-[#6E6B67] text-center text-sm mb-10">Straight answers before you reach out.</p>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex items-center justify-between w-full p-5 sm:p-6 text-left gap-4 hover:bg-[#FAFAF8]/80 transition-colors"
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
                </div>
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
