import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaChevronDown } from 'react-icons/fa'
import { submitContactForm } from '../services/contactService'
import SuccessModal from '../components/SuccessModal'
import { convertBudgetRangeToUSD } from '../utils/currencyConverter'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateFAQSchema } from '../config/seo'

// Shared animated section component
const ScrollFadeSection = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

const FloatingShape = ({ delay = 0, className }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      rotate: [0, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
)

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
      const budgetInUSD = formData.budget ? convertBudgetRangeToUSD(formData.budget) : '';
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
    { question: 'How long does a typical project take?', answer: 'Timelines vary. Simple sites take 2-4 weeks, while complex apps can take 3-6 months. We provide detailed schedules upfront.' },
    { question: 'What is your development process?', answer: 'We follow a 4-step cycle: Discovery, Design, Development, and Launch. You get regular updates at every stage.' },
    { question: 'Do you provide ongoing support?', answer: 'Yes! We offer maintenance packages for updates, security, and scaling.' },
    { question: 'What technologies do you use?', answer: 'We specialize in React, Next.js, Node.js, Python/Django, and AI integrations (LLMs, Automation).' },
    { question: 'Can you work with our existing team?', answer: 'Absolutely. We can augment your team or handle specific modules independently.' },
    { question: 'Do you offer fixed-price quotes?', answer: 'Yes. For well-defined scopes, we prefer fixed pricing so you know exactly what to budget.' }
  ]

  return (
    <>
      <SEO page="contact" />
      <StructuredData schemas={[generateFAQSchema(faqs)]} />

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-blue-600 top-[-10%] right-[-10%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-sky-600 bottom-[10%] left-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-16 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              AVAILABLE 24/7
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-500">Touch</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
              Ready to build something extraordinary? Whether you need a quote or just want to explore ideas, we're here.
            </p>
          </motion.div>
        </section>

        {/* Contact Cards */}
        <ScrollFadeSection className="relative z-10 px-4 mb-24">
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FaEnvelope, title: 'Email Us', val: 'contact@waglogy.in', sub: 'Responses in 24h', color: 'text-blue-400', bg: 'bg-blue-500/10', href: 'mailto:contact@waglogy.in' },
              { icon: FaPhoneAlt, title: 'Call Us', val: '+91 9733814168', sub: 'Mon-Sat, 9am-7pm', color: 'text-sky-400', bg: 'bg-sky-500/10', href: 'tel:+919733814168' },
              { icon: FaWhatsapp, title: 'WhatsApp', val: 'Chat Now', sub: 'Instant Response', color: 'text-cyan-400', bg: 'bg-cyan-500/10', href: 'https://wa.me/919733814168' },
              { icon: FaMapMarkerAlt, title: 'Visit Us', val: 'Gangtok, Sikkim', sub: 'Tadong Metro Point', color: 'text-white', bg: 'bg-white/10', href: 'https://maps.google.com/?q=Tadong+Metro+Point+Gangtok+Sikkim' }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.title === 'Visit Us' || item.title === 'WhatsApp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`glass-card p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all group text-center hover:-translate-y-1 block`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-2xl mb-4 ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className={`font-mono text-sm mb-1 ${item.color}`}>{item.val}</p>
                <p className="text-slate-500 text-xs">{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </ScrollFadeSection>

        {/* Form Section */}
        <section id="contact-form" className="relative z-10 pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0f172a]/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">

              {/* Glowing Border specific to form */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500"></div>

              <h2 className="text-3xl font-bold text-white mb-2 text-center">
                {isQuoteRequest ? 'Request Your Quote' : 'Send a Message'}
              </h2>
              <p className="text-slate-400 text-center mb-10">
                Tell us about your project requirements or general inquiry.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Full Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Email *</label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Phone</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleInputChange}
                      placeholder="+91..."
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Company</label>
                    <input
                      id="company" name="company" type="text"
                      value={formData.company} onChange={handleInputChange}
                      placeholder="Organization Name"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Interested In</label>
                    <select
                      id="service" name="service"
                      value={formData.service} onChange={handleInputChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="app-development">App Development</option>
                      <option value="ai-solutions">AI Solutions</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Budget Range</label>
                    <select
                      id="budget" name="budget"
                      value={formData.budget} onChange={handleInputChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option value="">Select budget</option>
                      <option value="under-50k">&lt; ₹50k</option>
                      <option value="50k-1l">₹50k - ₹1L</option>
                      <option value="1l-5l">₹1L - ₹5L</option>
                      <option value="over-5l">₹5L +</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase text-slate-500 mb-2 tracking-wider">Project Details *</label>
                  <textarea
                    id="message" name="message" required
                    value={formData.message} onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your goals..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 text-center flex items-center justify-center gap-2">
                    <FaCheckCircle /> Message sent! We'll reply shortly.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-center">
                    {errorMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ScrollFadeSection className="pb-24 px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card rounded-xl border border-white/5 bg-[#0f172a]/40 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex items-center justify-between w-full p-6 text-left"
                  >
                    <span className="font-bold text-slate-200">{faq.question}</span>
                    <FaChevronDown className={`text-slate-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeSection>

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
