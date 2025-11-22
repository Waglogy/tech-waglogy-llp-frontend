import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { submitContactForm } from '../services/contactService'
import SuccessModal from '../components/SuccessModal'
import { convertBudgetRangeToUSD } from '../utils/currencyConverter'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateFAQSchema } from '../config/seo'

const Contact = () => {
  const [searchParams] = useSearchParams()
  const isQuoteRequest = searchParams.get('quote') === 'true'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Auto-scroll to form if it's a quote request
  useEffect(() => {
    if (isQuoteRequest) {
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form')
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' })
          // Focus on the first input field after scrolling
          setTimeout(() => {
            const nameInput = document.getElementById('name')
            if (nameInput) {
              nameInput.focus()
            }
          }, 800)
        }
      }, 100)
    }
  }, [isQuoteRequest])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSubmitStatus(null)

    try {
      // Convert budget from INR to USD
      const budgetInUSD = formData.budget ? convertBudgetRangeToUSD(formData.budget) : '';

      // Prepare data in API format - only include required fields first
      const apiData = {
        fullName: formData.name,
        email: formData.email,
        projectDetails: formData.message
      }

      // Only add optional fields if they have actual values
      if (formData.phone && formData.phone.trim()) {
        apiData.phone = formData.phone.trim();
      }

      if (formData.company && formData.company.trim()) {
        apiData.organizationName = formData.company.trim();
      }

      if (budgetInUSD) {
        apiData.budgetRange = budgetInUSD;
      }

      // Log the data being sent (for debugging)
      console.log('Submitting to API:', apiData);

      // Submit to API
      const response = await submitContactForm(apiData)

      // Store submitted data for modal
      setSubmittedData(apiData)

      // Show success status and modal
      setSubmitStatus('success')
      setShowSuccessModal(true)

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      })

      console.log('Contact form submitted successfully:', response)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // FAQ data for structured data
  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'What is your development process?',
      answer: 'We follow a proven 4-step process: Discovery & Planning, Design & Prototyping, Development & Testing, and Launch & Support. Each phase includes regular check-ins and deliverables.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes! We offer comprehensive maintenance and support packages to ensure your application continues to perform optimally. This includes updates, security patches, and feature enhancements.'
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'We work with modern technologies including React, Next.js, Node.js, Python, React Native, Flutter, and various cloud platforms like AWS and Google Cloud.'
    },
    {
      question: 'Can you work with our existing team?',
      answer: 'Absolutely! We can integrate seamlessly with your existing team, providing additional expertise and resources as needed. We\'re experienced in collaborative development environments.'
    },
    {
      question: 'Do you offer fixed-price or hourly billing?',
      answer: 'We offer both! For well-defined projects, we provide fixed-price quotes. For ongoing work or evolving requirements, we offer competitive hourly rates with detailed time tracking.'
    }
  ]

  return (
    <>
      <SEO page="contact" />
      <StructuredData schemas={[generateFAQSchema(faqs)]} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] to-[#0a0f1c]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-3xl text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
                {isQuoteRequest ? (
                  <>
                    Get Your
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Quote</span>
                  </>
                ) : (
                  <>
                    Get in
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Touch</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                {isQuoteRequest ? (
                  <>
                    Ready to get a detailed quote for your project? Fill out the form below
                    and we'll send you a customized proposal within 24 hours.
                  </>
                ) : (
                  <>
                    Ready to start your next project? We'd love to hear from you.
                    Whether you need a website, mobile app, custom software, or AI-powered solutions—we're here to help bring your vision to life.
                  </>
                )}
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: "Quick Response", desc: "We respond to all inquiries within 24 hours" },
                  { title: "Free Consultation", desc: "Get expert advice on your project at no cost" },
                  { title: "No Obligation", desc: "Ask questions, discuss ideas—no pressure to commit" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg glass-card hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">{item.title}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  className="inline-block w-full sm:w-auto text-center rounded-full px-8 py-4 font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-all bg-gradient-to-r from-blue-600 to-purple-600"
                  href="#contact-form"
                >
                  Send Message
                </a>
                <a
                  className="inline-block w-full sm:w-auto text-center rounded-full px-8 py-4 font-medium border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto mt-8 md:mt-0 max-w-md relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <img src="/banner.png" alt="Waglogy contact" className="w-full h-auto object-contain relative z-10 drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Get In Touch</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Choose the most convenient way to reach us. We're here to help bring your vision to life.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Email Card */}
            <motion.a
              href="mailto:contact@waglogy.in"
              className="group glass-card p-8 rounded-xl text-center border-t-4 border-purple-500 hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 group-hover:scale-110 transition-transform">
                <FaEnvelope className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
              <p className="text-[var(--text-secondary)] font-medium mb-1 text-sm">contact@waglogy.in</p>
              <p className="text-xs text-[var(--text-muted)]">We reply within 24 hours</p>
            </motion.a>

            {/* Phone Card */}
            <motion.a
              href="tel:+919733814168"
              className="group glass-card p-8 rounded-xl text-center border-t-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20 group-hover:scale-110 transition-transform">
                <FaPhoneAlt className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
              <p className="text-[var(--text-secondary)] font-medium mb-1 text-sm">+91 9733814168</p>
              <p className="text-xs text-[var(--text-muted)]">Mon-Sat, 9am to 7pm IST</p>
            </motion.a>

            {/* Location Card */}
            <motion.a
              href="https://maps.google.com/?q=Tadong+Metro+Point+Gangtok+Sikkim"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-8 rounded-xl text-center border-t-4 border-red-500 hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-[var(--text-secondary)] font-medium mb-1 text-sm">Tadong Metro Point</p>
              <p className="text-xs text-[var(--text-muted)]">Gangtok, Sikkim - 737102</p>
            </motion.a>

            {/* WhatsApp Card */}
            <motion.a
              href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-8 rounded-xl text-center border-t-4 border-green-500 hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 group-hover:scale-110 transition-transform">
                <FaWhatsapp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-[var(--text-secondary)] font-medium mb-1 text-sm">+91 9733814168</p>
              <p className="text-xs text-[var(--text-muted)]">Instant messaging</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-dark)]"></div>
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Contact Form - Centered */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                {isQuoteRequest ? 'Request Your Quote' : 'Send us a Message'}
              </h2>
              <p className="text-[var(--text-secondary)] mb-10 text-center">
                {isQuoteRequest ? (
                  <>
                    Fill out the form below and we'll send you a detailed quote within 24 hours.
                    All fields marked with * are required.
                  </>
                ) : (
                  <>
                    Fill out the form below and we'll get back to you as soon as possible.
                    All fields marked with * are required.
                  </>
                )}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 sm:p-10 rounded-2xl border border-[rgba(255,255,255,0.1)]">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                      placeholder="Your company / organization name"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-[var(--bg-dark)]">Select a service</option>
                      <option value="web-development" className="bg-[var(--bg-dark)]">Web Development</option>
                      <option value="app-development" className="bg-[var(--bg-dark)]">Application Development</option>
                      <option value="software-development" className="bg-[var(--bg-dark)]">Software Development</option>
                      <option value="graphics-uiux" className="bg-[var(--bg-dark)]">Graphics & UI/UX Design</option>
                      <option value="ai-chatbots" className="bg-[var(--bg-dark)]">AI Solutions & Chatbots</option>
                      <option value="ai-automations" className="bg-[var(--bg-dark)]">AI Automations</option>
                      <option value="consultation" className="bg-[var(--bg-dark)]">Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-[var(--bg-dark)]">Select budget range</option>
                      <option value="under-50k" className="bg-[var(--bg-dark)]">Under ₹50,000</option>
                      <option value="50k-1l" className="bg-[var(--bg-dark)]">₹50,000 - ₹1,00,000</option>
                      <option value="1l-3l" className="bg-[var(--bg-dark)]">₹1,00,000 - ₹3,00,000</option>
                      <option value="3l-5l" className="bg-[var(--bg-dark)]">₹3,00,000 - ₹5,00,000</option>
                      <option value="5l-10l" className="bg-[var(--bg-dark)]">₹5,00,000 - ₹10,00,000</option>
                      <option value="over-10l" className="bg-[var(--bg-dark)]">Over ₹10,00,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder-gray-600"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400 font-medium">
                      ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 font-medium">
                      ❌ {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg px-6 py-4 font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  {isSubmitting
                    ? 'Sending...'
                    : isQuoteRequest
                      ? 'Request Quote'
                      : 'Send Message'
                  }
                </button>
              </form>
            </motion.div>
          </div>

          {/* Why Choose Waglogy - Centered Below Form */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="glass-card p-8 sm:p-10 rounded-2xl border border-[rgba(255,255,255,0.1)]">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Why Choose Waglogy?</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Growth-Friendly Technology", desc: "Pay only for what you need, scale as you grow" },
                  { title: "Modern Technologies", desc: "React, Next.js, Flutter, AI integrations & more" },
                  { title: "Transparent Process", desc: "Regular updates and clear communication" },
                  { title: "Ongoing Support", desc: "Maintenance and support after launch" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 text-left">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass p-6 rounded-xl mt-8 text-center border border-blue-500/20">
                <h4 className="font-semibold text-white mb-3">⏰ Response Time</h4>
                <p className="text-[var(--text-secondary)] text-sm mb-3">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call or WhatsApp us directly.
                </p>
                <p className="text-sm font-medium text-blue-400">
                  Business Hours: Mon-Sat, 9:00 AM - 7:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group glass-card rounded-xl border border-[rgba(255,255,255,0.05)]">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <svg
                    className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Don't wait! Get in touch today and let's discuss how we can help bring your vision to life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project%20requirements.%20Please%20let%20me%20know%20when%20you%20can%20schedule%20a%20call.%20Thank%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-medium text-white shadow-lg hover:shadow-green-500/30 transition-all bg-green-600 hover:bg-green-700"
              >
                <FaWhatsapp className="mr-2 text-xl" /> WhatsApp Us
              </a>
              <a
                href="tel:+919733814168"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] px-8 py-4 font-medium text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <FaPhoneAlt className="mr-2" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        submittedData={submittedData}
      />
    </>
  )
}

export default Contact
