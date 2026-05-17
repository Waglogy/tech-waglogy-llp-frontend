import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaChevronDown, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { submitContactForm } from '../services/contactService'
import { trackLead } from '../utils/track'
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
    name: '', email: '', phone: '', company: '',
    propertyType: '', inquiryVolume: '',
    service: '', budget: '', message: ''
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

      // Compose qualification block + user's message so the inbox sees full context.
      const qualificationLines = [
        formData.propertyType && `Property type: ${formData.propertyType}`,
        formData.inquiryVolume && `Monthly inquiries: ${formData.inquiryVolume}`,
        formData.service && `Interested in: ${formData.service}`,
        formData.budget && `Budget for install: ${formData.budget}`,
      ].filter(Boolean)
      const composedMessage = qualificationLines.length
        ? `${qualificationLines.join('\n')}\n\n${formData.message}`
        : formData.message

      const apiData = {
        fullName: formData.name,
        email: formData.email,
        projectDetails: composedMessage,
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.company && { organizationName: formData.company.trim() }),
        ...(budgetInUSD && { budgetRange: budgetInUSD })
      }

      await submitContactForm(apiData)

      // GA4 conversion event — fires on successful form submission only.
      trackLead('contact_page', {
        service: formData.service || 'unspecified',
        budget_range: formData.budget || 'unspecified',
        property_type: formData.propertyType || 'unspecified',
        inquiry_volume: formData.inquiryVolume || 'unspecified',
      })

      setSubmittedData(apiData)
      setSubmitStatus('success')
      setShowSuccessModal(true)
      setFormData({
        name: '', email: '', phone: '', company: '',
        propertyType: '', inquiryVolume: '',
        service: '', budget: '', message: ''
      })
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
      question: 'What happens on the 20-minute walkthrough call?',
      answer: 'We walk through your current inquiry funnel together — where leads come from, how fast you reply, where they drop off. By the end you have a clear sense of where the biggest leak is and whether installing a revenue system would actually move the needle for your specific property. No pitch, no obligation, no slides.'
    },
    {
      question: 'Do I need to have my numbers ready before the call?',
      answer: 'Helpful but not required. Roughly knowing your monthly inquiry volume, average booking value, and which channels you use (WhatsApp, Booking.com, Instagram, etc.) makes the call sharper. If you don\'t have those handy, we work with whatever you bring.'
    },
    {
      question: 'Do you work with properties outside Sikkim or Northeast India?',
      answer: 'Yes. We\'re based in Gangtok but install remotely across India — hotels, homestays, and tour operators anywhere. Discovery, design, install, and tuning all happen via video calls and shared dashboards. Our hands have been in properties in Sikkim, West Bengal, Assam, and beyond.'
    },
    {
      question: 'What if we already have a website we like?',
      answer: 'We don\'t need to replace it. The Lead Capture System can live alongside your existing site, or be wired into it. We rebuild the site only if it\'s actively losing inquiries — slow, broken on mobile, missing capture forms. We\'ll tell you honestly on the walkthrough.'
    },
    {
      question: 'How quickly can we go live?',
      answer: 'The complete bundle takes 4–6 weeks from kickoff to live. Individual systems are 2–4 weeks. Once we sign the agreement we run a one-hour audit, two weeks of design + AI training, two to three weeks of build and integration, then one week of test traffic before flipping you fully live.'
    },
    {
      question: 'What if I just want a website or app, not a revenue system?',
      answer: 'That\'s fine. We still take selected one-off projects — websites start at ₹25,000, apps at ₹1,50,000. Tell us what you need; we\'ll be honest about whether we\'re the right fit and whether a revenue system would have made more sense.'
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
              See if a revenue system{' '}
              <span className="text-blue-600">fits your property</span>.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl mx-auto"
            >
              Tell us a bit about your property and we'll book a 20-minute walkthrough — we'll
              look at your current funnel, point to where leads are leaking, and tell you honestly
              whether we're the right install. No pitch, no obligation.
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
                {isQuoteRequest ? 'Request a quote' : 'Book a walkthrough'}
              </h2>
              <p className="text-[#6E6B67] mb-8 text-sm">
                Share a few details about your property and we'll come back within one business
                day to schedule the call. Skip anything you're not sure about.
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
                    <label htmlFor="company" className={labelClass}>Property / business name</label>
                    <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="e.g. Himalayan View Resort" className={fieldClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="propertyType" className={labelClass}>What kind of property?</label>
                    <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className={`${fieldClass} text-[#3D3A36]`}>
                      <option value="">Select type</option>
                      <option value="hotel">Hotel</option>
                      <option value="homestay">Homestay / Boutique stay</option>
                      <option value="resort">Resort</option>
                      <option value="tour-operator">Tour operator</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="other-service">Other service business</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inquiryVolume" className={labelClass}>Monthly inquiries (rough)</label>
                    <select id="inquiryVolume" name="inquiryVolume" value={formData.inquiryVolume} onChange={handleInputChange} className={`${fieldClass} text-[#3D3A36]`}>
                      <option value="">Select volume</option>
                      <option value="under-50">Fewer than 50</option>
                      <option value="50-200">50 – 200</option>
                      <option value="200-500">200 – 500</option>
                      <option value="500-plus">500+</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className={labelClass}>Which system fits?</label>
                    <select id="service" name="service" value={formData.service} onChange={handleInputChange} className={`${fieldClass} text-[#3D3A36]`}>
                      <option value="">I'd like a recommendation</option>
                      <option value="bundle">Complete Revenue System (bundle)</option>
                      <option value="lead-capture">Lead Capture System</option>
                      <option value="follow-up">Automated Follow-Up Engine</option>
                      <option value="analytics">Revenue Analytics Dashboard</option>
                      <option value="standalone-build">Standalone website / app / software</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClass}>Budget for install</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className={`${fieldClass} text-[#3D3A36]`}>
                      <option value="">Select budget</option>
                      <option value="under-50k">&lt; ₹50,000 (standalone build)</option>
                      <option value="50k-1l">₹50,000 – ₹1,50,000 (single system)</option>
                      <option value="2l-3l">₹2,00,000 – ₹3,00,000 (complete bundle)</option>
                      <option value="over-3l">₹3,00,000+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Anything else we should know? *</label>
                  <textarea
                    id="message" name="message" required value={formData.message}
                    onChange={handleInputChange} rows={5}
                    placeholder="What does your current funnel look like? Any tools you already use (Booking.com, WhatsApp Business, a CRM)? Anything specific you'd like us to focus on during the walkthrough."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending…' : 'Request walkthrough'}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-center text-sm flex items-center justify-center gap-2">
                    <FaCheckCircle className="shrink-0" /> Thanks — we'll reach out within one business day to schedule your walkthrough.
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
