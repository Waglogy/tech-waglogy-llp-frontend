import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdWeb, MdPhoneAndroid, MdComputer, MdPalette } from 'react-icons/md'
import { RiRobotFill } from 'react-icons/ri'
import { HiChip } from 'react-icons/hi'
import { FaTimes, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateServiceSchema } from '../config/seo'

const Services = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      tagline: 'Modern, responsive, and user-friendly websites that create impact',
      IconComponent: MdWeb,
      iconColor: '#3B82F6',
      bgGradient: 'from-blue-50 to-blue-100',
      description: 'Your website is often the first impression customers have of your business. We build modern, lightning-fast, and fully responsive websites that not only look stunning but also drive real business results.',
      features: [
        'Responsive Design - Perfect on all devices',
        'Fast Performance - Optimized for speed & SEO',
        'User-Friendly CMS - Easy content management',
        'Scalable Architecture - Built to grow with you',
        'E-commerce Integration - Sell online seamlessly',
        'SEO Optimization - Rank higher on Google'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'WordPress', 'Shopify'],
      pricing: { INR: '₹40,000', USD: '$500' },
      timeline: '2-6 weeks',
      useCases: ['Business Websites', 'E-commerce Stores', 'Landing Pages', 'Portfolios']
    },
    {
      id: 'app-development',
      title: 'Application Development',
      tagline: 'Secure, scalable apps tailored to your business goals',
      IconComponent: MdPhoneAndroid,
      iconColor: '#8B5CF6',
      bgGradient: 'from-purple-50 to-purple-100',
      description: 'Whether you need a mobile app for iOS, Android, or a cross-platform solution, we build applications that are intuitive, secure, and designed to scale with your business. From concept to deployment, we handle it all.',
      features: [
        'Native & Cross-Platform - iOS, Android, or both',
        'Intuitive UX - Beautiful interfaces users love',
        'Secure Backend - Protected data & APIs',
        'Real-time Features - Push notifications & live updates',
        'Offline Functionality - Works without internet',
        'App Store Optimization - Better visibility'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      pricing: { INR: '₹1,50,000', USD: '$1,800' },
      timeline: '6-12 weeks',
      useCases: ['Business Apps', 'E-commerce Apps', 'Social Apps', 'Fitness & Health']
    },
    {
      id: 'software-development',
      title: 'Software Development',
      tagline: 'Custom solutions to automate and streamline operations',
      IconComponent: MdComputer,
      iconColor: '#10B981',
      bgGradient: 'from-green-50 to-green-100',
      description: 'Every business has unique challenges. We create custom software solutions that automate manual processes, integrate disparate systems, and eliminate operational bottlenecks—helping you save time, reduce costs, and focus on growth.',
      features: [
        'Custom Workflows - Tailored to your processes',
        'API Integrations - Connect existing tools seamlessly',
        'Process Automation - Eliminate repetitive tasks',
        'Data Management - Centralized dashboards & reports',
        'Cloud Deployment - Scalable & secure',
        'System Integration - Unify your tech stack'
      ],
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS'],
      pricing: { INR: '₹1,20,000', USD: '$1,500' },
      timeline: '8-16 weeks',
      useCases: ['CRM Systems', 'Inventory Management', 'Booking Systems', 'Data Analytics']
    },
    {
      id: 'graphics-uiux',
      title: 'Graphics & UI/UX Design',
      tagline: 'Eye-catching designs that build trust and engagement',
      IconComponent: MdPalette,
      iconColor: '#F59E0B',
      bgGradient: 'from-amber-50 to-amber-100',
      description: 'First impressions matter. We create visually stunning designs that not only capture attention but also build trust and guide users seamlessly through their journey. From brand identity to digital experiences, we make your business memorable.',
      features: [
        'Brand Identity - Logos, color palettes & guidelines',
        'UI/UX Design - Intuitive interfaces for conversions',
        'Marketing Graphics - Social media & promotional',
        'Design Systems - Consistent, scalable components',
        'Wireframing & Prototyping - Visualize before building',
        'User Research - Data-driven design decisions'
      ],
      technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Sketch'],
      pricing: { INR: '₹30,000', USD: '$350' },
      timeline: '2-4 weeks',
      useCases: ['Brand Identity', 'Website Design', 'App UI', 'Marketing Materials']
    },
    {
      id: 'ai-chatbots',
      title: 'AI Solutions & Chatbots',
      tagline: 'Smarter customer interactions, increased efficiency',
      IconComponent: RiRobotFill,
      iconColor: '#EF4444',
      bgGradient: 'from-red-50 to-red-100',
      description: 'Transform how you interact with customers using intelligent AI-powered solutions. From 24/7 customer support chatbots to advanced AI applications that understand context and deliver personalized experiences—we help you harness the power of artificial intelligence.',
      features: [
        'Smart Chatbots - 24/7 customer support',
        'LLM Integration - GPT, Claude & more',
        'Voice Assistants - Natural language interfaces',
        'Intelligent Search - AI-powered recommendations',
        'Sentiment Analysis - Understand customer emotions',
        'Multilingual Support - Reach global audiences'
      ],
      technologies: ['OpenAI API', 'Claude', 'LangChain', 'Python', 'FastAPI'],
      pricing: { INR: '₹80,000', USD: '$1,000' },
      timeline: '4-10 weeks',
      useCases: ['Customer Support Bots', 'Lead Qualification', 'Virtual Assistants', 'Content Generation']
    },
    {
      id: 'ai-automations',
      title: 'AI Automations',
      tagline: 'From lead management to workflow optimization, powered by AI',
      IconComponent: HiChip,
      iconColor: '#EC4899',
      bgGradient: 'from-pink-50 to-pink-100',
      description: 'Stop wasting time on repetitive tasks. Our AI automation solutions handle everything from lead capture to customer follow-ups, data entry to report generation—freeing up your team to focus on what truly matters: growing your business.',
      features: [
        'Lead Management - Automated capture, scoring & nurturing',
        'Workflow Automation - Streamline approvals & tasks',
        'Data Processing - AI-powered extraction & analysis',
        'Smart Scheduling - Intelligent booking & allocation',
        'Email Automation - Personalized campaigns at scale',
        'Document Processing - Extract insights from files'
      ],
      technologies: ['Make.com', 'Zapier', 'Python', 'AI APIs', 'Custom Scripts'],
      pricing: { INR: '₹1,00,000', USD: '$1,200' },
      timeline: '4-12 weeks',
      useCases: ['Lead Generation', 'Email Marketing', 'Data Entry', 'Report Generation']
    }
  ]

  const handleGetQuote = (service) => {
    setSelectedService(service)
    setQuoteFormData({
      ...quoteFormData,
      message: `I'm interested in ${service.title}.\n\nPlease provide more information about this service.`
    })
    setShowQuoteModal(true)
  }

  const handleSubmitQuote = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Service Inquiry - ${selectedService?.title}`)
    const body = encodeURIComponent(
      `Name: ${quoteFormData.name}\nEmail: ${quoteFormData.email}\nPhone: ${quoteFormData.phone}\n\nService: ${selectedService?.title}\n\nMessage:\n${quoteFormData.message}`
    )
    window.location.href = `mailto:contact@waglogy.in?subject=${subject}&body=${body}`
    setShowQuoteModal(false)
    // Reset form
    setQuoteFormData({ name: '', email: '', phone: '', message: '' })
  }

  // Generate service schemas for structured data
  const serviceSchemas = services.slice(0, 3).map(service => 
    generateServiceSchema({
      name: service.title,
      description: service.description,
      features: service.features
    })
  )

  return (
    <>
      <SEO page="services" />
      <StructuredData schemas={serviceSchemas} />
      
      {/* Hero Section */}
      <section className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="pt-4 pb-8 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-8">
            <motion.div 
              className="max-w-3xl text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                Our
                <span style={{ color: 'var(--brand-primary)' }}> Services</span>
              </h1>
              <p className="text-base text-gray-700 sm:text-lg leading-relaxed mb-6">
                From concept to deployment, we provide comprehensive digital solutions that drive business growth. 
                Our expert team delivers modern, scalable, and user-focused applications with our unique <strong>Growth-Friendly Technology</strong> approach.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
                <p className="text-sm font-semibold text-gray-900 mb-2">💡 Our Promise:</p>
                <p className="text-sm text-gray-700">
                  Start with essentials, scale as you grow, and pay only for what you need. No overwhelming features. No unnecessary costs.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mx-auto mt-8 md:mt-0 max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="/banner.png" alt="Waglogy services" className="w-full h-auto object-contain" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions designed to help your business thrive in the modern digital landscape
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const IconComponent = service.IconComponent
              return (
                <motion.div
                  key={service.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Header with gradient background */}
                  <div className={`bg-gradient-to-br ${service.bgGradient} p-6 text-center`}>
                    <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-10 h-10" style={{ color: service.iconColor }} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm font-medium text-gray-700">{service.tagline}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-left">
                    <p className="text-sm text-gray-700 leading-relaxed mb-6 text-left">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide text-left">What's Included:</h4>
                      <ul className="space-y-2 text-left">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 text-left">
                            <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: service.iconColor }} />
                            <span className="text-left">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {service.features.length > 4 && (
                        <p className="text-xs text-gray-500 mt-2 text-left">+ {service.features.length - 4} more features</p>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                        <p className="text-lg font-bold" style={{ color: service.iconColor }}>
                          {service.pricing.INR}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Timeline</p>
                        <p className="text-lg font-bold text-gray-900">{service.timeline}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleGetQuote(service)}
                      className="w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md hover:shadow-lg transition-all group-hover:scale-105"
                      style={{ backgroundColor: service.iconColor }}
                    >
                      Get Quote
                      <FaArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Growth-Friendly Approach */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Our <span style={{ color: 'var(--brand-primary)' }}>Growth-Friendly</span> Approach
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We don't believe in overwhelming you with costs. Here's how we help you grow sustainably:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Start Small</h3>
              <p className="text-gray-700 text-sm">
                Begin with only the essentials you need today. Get live quickly without breaking the bank.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scale Smart</h3>
              <p className="text-gray-700 text-sm">
                Add features and integrations as your business grows and user base expands.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pay As You Grow</h3>
              <p className="text-gray-700 text-sm">
                Invest in advanced features and AI only when you're ready to scale big.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Why Choose Tech Waglogy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: 'Agile methodology for quick turnarounds' },
              { icon: '🎯', title: 'Quality Focused', desc: 'Clean code, tested & optimized' },
              { icon: '💬', title: 'Clear Communication', desc: 'Regular updates & transparency' },
              { icon: '🤝', title: 'Long-term Support', desc: 'We grow with your business' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that drives your business forward. 
              Get a free consultation and detailed proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedService(null)
                  setQuoteFormData({ ...quoteFormData, message: 'I would like to discuss my project requirements.' })
                  setShowQuoteModal(true)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-medium shadow-lg hover:shadow-xl transition-shadow"
                style={{ color: 'var(--brand-primary)' }}
              >
                Get Free Consultation
                <FaArrowRight />
              </button>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-medium text-white hover:bg-white/10 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl text-white relative">
              <button
                onClick={() => setShowQuoteModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-2">Get a Quote</h3>
              {selectedService && (
                <p className="text-sm opacity-90">Service: {selectedService.title}</p>
              )}
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitQuote} className="p-6 space-y-5">
              <p className="text-sm text-gray-600 text-center">
                Fill out this quick form and we'll send you a detailed proposal within 24 hours.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={quoteFormData.name}
                  onChange={(e) => setQuoteFormData({...quoteFormData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData({...quoteFormData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={quoteFormData.phone}
                    onChange={(e) => setQuoteFormData({...quoteFormData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                <textarea
                  required
                  value={quoteFormData.message}
                  onChange={(e) => setQuoteFormData({...quoteFormData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  Send Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Services
