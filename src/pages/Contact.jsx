import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { submitContactForm } from '../services/contactService'
import SuccessModal from '../components/SuccessModal'
import { convertBudgetRangeToUSD } from '../utils/currencyConverter'

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
      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="pt-4 pb-12 sm:pt-2 sm:pb-16 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:pt-2 lg:pb-20">
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                {isQuoteRequest ? (
                  <>
                    Get Your
                    <span style={{ color: 'var(--brand-primary)' }}> Quote</span>
                  </>
                ) : (
                  <>
                    Get in
                    <span style={{ color: 'var(--brand-primary)' }}> Touch</span>
                  </>
                )}
              </h1>
              <p className="mt-4 text-base text-gray-700 sm:text-lg leading-relaxed">
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

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 text-sm sm:text-base">
                    <strong>Quick Response:</strong> We respond to all inquiries within 24 hours
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 text-sm sm:text-base">
                    <strong>Free Consultation:</strong> Get expert advice on your project at no cost
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 text-sm sm:text-base">
                    <strong>No Obligation:</strong> Ask questions, discuss ideas—no pressure to commit
                  </p>
                </div>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  className="inline-block w-full sm:w-auto text-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                  href="#contact-form"
                >
                  Send Message
                </a>
                <a
                  className="inline-block w-full sm:w-auto text-center rounded-lg px-6 py-3 font-medium border-2 hover:bg-gray-50 transition-colors"
                  style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
                  href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
            <div className="mx-auto mt-8 md:mt-0 max-w-md">
              <img src="/banner.png" alt="Waglogy contact" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to reach us. We're here to help bring your vision to life.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Email Card */}
            <a
              href="mailto:contact@waglogy.in"
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-t-4 border-purple-500"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 group-hover:scale-110 transition-transform">
                <FaEnvelope className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-900 font-medium mb-1 text-sm">contact@waglogy.in</p>
              <p className="text-xs text-gray-500">We reply within 24 hours</p>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919733814168"
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-t-4 border-blue-500"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 group-hover:scale-110 transition-transform">
                <FaPhoneAlt className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-900 font-medium mb-1 text-sm">+91 9733814168</p>
              <p className="text-xs text-gray-500">Mon-Sat, 9am to 7pm IST</p>
            </a>

            {/* Location Card */}
            <a
              href="https://maps.google.com/?q=Tadong+Metro+Point+Gangtok+Sikkim"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-t-4 border-red-500"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-900 font-medium mb-1 text-sm">Tadong Metro Point</p>
              <p className="text-xs text-gray-500">Gangtok, Sikkim - 737102</p>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-t-4 border-green-500"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 group-hover:scale-110 transition-transform">
                <FaWhatsapp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-900 font-medium mb-1 text-sm">+91 9733814168</p>
              <p className="text-xs text-gray-500">Instant messaging</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          
          {/* Contact Form - Centered */}
          <div className="max-w-3xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {isQuoteRequest ? 'Request Your Quote' : 'Send us a Message'}
              </h2>
              <p className="text-gray-600 mb-8 text-center">
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your company / organization name"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="app-development">Application Development</option>
                      <option value="software-development">Software Development</option>
                      <option value="graphics-uiux">Graphics & UI/UX Design</option>
                      <option value="ai-chatbots">AI Solutions & Chatbots</option>
                      <option value="ai-automations">AI Automations</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-50k">Under ₹50,000</option>
                      <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                      <option value="1l-3l">₹1,00,000 - ₹3,00,000</option>
                      <option value="3l-5l">₹3,00,000 - ₹5,00,000</option>
                      <option value="5l-10l">₹5,00,000 - ₹10,00,000</option>
                      <option value="over-10l">Over ₹10,00,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">
                      ❌ {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg px-6 py-3 font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  {isSubmitting 
                    ? 'Sending...' 
                    : isQuoteRequest 
                      ? 'Request Quote' 
                      : 'Send Message'
                  }
                </button>
              </form>
            </div>
          </div>

          {/* Why Choose Waglogy - Centered Below Form */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Waglogy?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 text-left">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Growth-Friendly Technology</h4>
                    <p className="text-gray-600 text-sm">Pay only for what you need, scale as you grow</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Modern Technologies</h4>
                    <p className="text-gray-600 text-sm">React, Next.js, Flutter, AI integrations & more</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Transparent Process</h4>
                    <p className="text-gray-600 text-sm">Regular updates and clear communication</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ongoing Support</h4>
                    <p className="text-gray-600 text-sm">Maintenance and support after launch</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg mt-6 text-center border" style={{ borderColor: 'var(--brand-primary)' }}>
                <h4 className="font-semibold text-gray-900 mb-3">⏰ Response Time</h4>
                <p className="text-gray-600 text-sm mb-3">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call or WhatsApp us directly.
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>
                  Business Hours: Mon-Sat, 9:00 AM - 7:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-white rounded-lg shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Don't wait! Get in touch today and let's discuss how we can help bring your vision to life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project%20requirements.%20Please%20let%20me%20know%20when%20you%20can%20schedule%20a%20call.%20Thank%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+919733814168"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Call Now
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
