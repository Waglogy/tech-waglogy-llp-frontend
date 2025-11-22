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
      bgGradient: 'from-blue-500/10 to-blue-600/10',
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
      bgGradient: 'from-purple-500/10 to-purple-600/10',
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
      bgGradient: 'from-green-500/10 to-green-600/10',
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
      bgGradient: 'from-amber-500/10 to-amber-600/10',
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
      bgGradient: 'from-red-500/10 to-red-600/10',
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
      bgGradient: 'from-pink-500/10 to-pink-600/10',
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] to-[#0a0f1c]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-3xl text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
                Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Services</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                From concept to deployment, we provide comprehensive digital solutions that drive business growth.
                Our expert team delivers modern, scalable, and user-focused applications with our unique <strong>Growth-Friendly Technology</strong> approach.
              </p>

              <div className="glass-card p-6 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-blue-400 mb-2">💡 Our Promise:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Start with essentials, scale as you grow, and pay only for what you need. No overwhelming features. No unnecessary costs.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto mt-8 md:mt-0 max-w-md relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <img src="/banner.png" alt="Waglogy services" className="w-full h-auto object-contain relative z-10 drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Our Core Services</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Comprehensive digital solutions designed to help your business thrive in the modern digital landscape
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const IconComponent = service.IconComponent
              return (
                <motion.div
                  key={service.id}
                  className="group glass-card rounded-2xl overflow-hidden hover:border-opacity-50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Header with gradient background */}
                  <div className={`bg-gradient-to-br ${service.bgGradient} p-8 text-center border-b border-[rgba(255,255,255,0.05)]`}>
                    <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] shadow-lg mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-10 h-10" style={{ color: service.iconColor }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">{service.tagline}</p>
                  </div>

                  {/* Content */}
                  <div className="p-8 text-left">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 text-left">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide text-left">What's Included:</h4>
                      <ul className="space-y-3 text-left">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] text-left">
                            <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: service.iconColor }} />
                            <span className="text-left">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {service.features.length > 4 && (
                        <p className="text-xs text-[var(--text-muted)] mt-3 text-left pl-7">+ {service.features.length - 4} more features</p>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-3 uppercase tracking-wide">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.1)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Starting from</p>
                        <p className="text-lg font-bold" style={{ color: service.iconColor }}>
                          {service.pricing.INR}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Timeline</p>
                        <p className="text-lg font-bold text-white">{service.timeline}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleGetQuote(service)}
                      className="w-full flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-medium text-white shadow-lg hover:shadow-xl transition-all group-hover:scale-105"
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
      <section className="py-20 relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Growth-Friendly</span> Approach
            </h2>
            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto">
              We don't believe in overwhelming you with costs. Here's how we help you grow sustainably:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center border border-blue-500/20 hover:border-blue-500/50 transition-colors">
              <div className="text-5xl mb-6">1️⃣</div>
              <h3 className="text-xl font-bold text-white mb-4">Start Small</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Begin with only the essentials you need today. Get live quickly without breaking the bank.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center border border-purple-500/20 hover:border-purple-500/50 transition-colors">
              <div className="text-5xl mb-6">2️⃣</div>
              <h3 className="text-xl font-bold text-white mb-4">Scale Smart</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Add features and integrations as your business grows and user base expands.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center border border-green-500/20 hover:border-green-500/50 transition-colors">
              <div className="text-5xl mb-6">3️⃣</div>
              <h3 className="text-xl font-bold text-white mb-4">Pay As You Grow</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Invest in advanced features and AI only when you're ready to scale big.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-[var(--bg-card)] border-t border-[rgba(255,255,255,0.05)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
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
              <div key={idx} className="glass-card p-8 rounded-xl text-center hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 text-center border border-blue-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 opacity-90 max-w-2xl mx-auto relative z-10">
              Let's discuss your requirements and create a custom solution that drives your business forward.
              Get a free consultation and detailed proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button
                onClick={() => {
                  setSelectedService(null)
                  setQuoteFormData({ ...quoteFormData, message: 'I would like to discuss my project requirements.' })
                  setShowQuoteModal(true)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Get Free Consultation
                <FaArrowRight />
              </button>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] px-8 py-4 font-medium text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <motion.div
            className="glass-card rounded-2xl shadow-2xl max-w-lg w-full border border-[rgba(255,255,255,0.1)]"
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
            <form onSubmit={handleSubmitQuote} className="p-8 space-y-6">
              <p className="text-sm text-[var(--text-secondary)] text-center">
                Fill out this quick form and we'll send you a detailed proposal within 24 hours.
              </p>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={quoteFormData.name}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={quoteFormData.phone}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Your Message *</label>
                <textarea
                  required
                  value={quoteFormData.message}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder-gray-600"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] font-medium text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-all bg-gradient-to-r from-blue-600 to-purple-600"
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
