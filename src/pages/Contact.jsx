import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'contact@waglogy.in',
      description: 'Send us an email anytime',
      action: 'mailto:contact@waglogy.in'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+91 97338 14168',
      description: 'Mon-Fri from 9am to 6pm',
      action: 'tel:+919733814168'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Tech Street, Suite 100',
      description: 'San Francisco, CA 94105',
      action: '#'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      details: '+91 97338 14168',
      description: 'Quick response guaranteed',
      action: 'https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project%20requirements.%20Please%20let%20me%20know%20when%20you%20can%20schedule%20a%20call.%20Thank%20you!'
    }
  ]

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
      <section className="bg-white py-8">
        <div className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8">
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
            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              {isQuoteRequest ? (
                <>
                  Ready to get a detailed quote for your project? Fill out the form below 
                  and we'll send you a customized proposal within 24 hours.
                </>
              ) : (
                <>
                  Ready to start your next project? We'd love to hear from you. 
                  Send us a message and we'll respond within 24 hours.
                </>
              )}
            </p>
            <div className="mt-4 sm:mt-6">
              <a
                className="inline-block rounded-lg px-5 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
                href="#contact-form"
              >
                Send Message
              </a>
            </div>
          </div>
          <div className="mx-auto hidden max-w-md md:block">
            <img src="/banner.png" alt="Waglogy contact" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Information</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the most convenient way to reach us
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isQuoteRequest ? 'Request Your Quote' : 'Send us a Message'}
              </h2>
              <p className="text-gray-600 mb-8">
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
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your company name"
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
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="ai-solutions">AI-Powered Solutions</option>
                      <option value="ecommerce">E-commerce Development</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="software">Software Development</option>
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
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
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

            {/* Additional Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Waglogy?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Team</h4>
                      <p className="text-gray-600 text-sm">Experienced developers and designers with proven track records</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Modern Technologies</h4>
                      <p className="text-gray-600 text-sm">We use the latest tools and frameworks for optimal performance</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transparent Process</h4>
                      <p className="text-gray-600 text-sm">Regular updates and clear communication throughout the project</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                      <p className="text-gray-600 text-sm">Comprehensive maintenance and support after project completion</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Response Time</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Business Hours: Mon-Fri, 9:00 AM - 6:00 PM PST
                </div>
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
    </>
  )
}

export default Contact
