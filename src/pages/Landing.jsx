import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdConstruction, MdWeb, MdSmartphone, MdCode, MdBrush, MdAutoAwesome, MdSettingsSuggest } from 'react-icons/md'
import { FaRocket, FaRobot, FaBrain } from 'react-icons/fa'
import { HiChip } from 'react-icons/hi'
import { submitQuery } from '../services/queryService'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import ServiceArea from '../components/ServiceArea'
import { generateFAQSchema } from '../config/seo'

const Landing = () => {
  const [activeSection, setActiveSection] = useState('web')
  const [visiblePhases, setVisiblePhases] = useState([])
  const phaseRefs = useRef([])

  // Query form state
  const [queryMessage, setQueryMessage] = useState('')
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false)
  const [queryStatus, setQueryStatus] = useState(null) // 'success' or 'error'
  const [queryErrorMessage, setQueryErrorMessage] = useState('')

  useEffect(() => {
    const observers = []

    phaseRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisiblePhases((prev) => [...new Set([...prev, index])])
                }, index * 150) // Stagger animation
              }
            })
          },
          { threshold: 0.2 }
        )

        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Handle query form submission
  const handleQuerySubmit = async (e) => {
    e.preventDefault()

    if (!queryMessage.trim()) {
      setQueryStatus('error')
      setQueryErrorMessage('Please enter your query')
      return
    }

    setIsSubmittingQuery(true)
    setQueryStatus(null)
    setQueryErrorMessage('')

    try {
      const response = await submitQuery({ message: queryMessage })

      console.log('Query submitted successfully:', response)
      setQueryStatus('success')
      setQueryMessage('') // Reset form

      // Clear success message after 5 seconds
      setTimeout(() => {
        setQueryStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting query:', error)
      setQueryStatus('error')
      setQueryErrorMessage(error.message || 'Failed to submit query. Please try again.')
    } finally {
      setIsSubmittingQuery(false)
    }
  }

  // FAQ data for structured data
  const faqData = [
    {
      question: 'What makes Tech Waglogy different from other development agencies?',
      answer: 'Our Growth-Friendly Technology approach sets us apart. We don\'t believe in overwhelming businesses with features they don\'t need yet. Instead, we build your foundation first—website, branding, essential tools—then add smart features as you grow. Finally, when you\'re ready, we scale with AI & automation to optimize costs and efficiency. You pay only for what you need, when you need it.'
    },
    {
      question: 'How long does it take to complete a typical project?',
      answer: 'Project timelines vary based on scope and complexity. A standard business website typically takes 2-4 weeks, while a mobile app might take 6-12 weeks, and custom software solutions can range from 8-16 weeks. We provide a detailed timeline during our discovery phase and keep you updated throughout the project with regular demos and progress reports.'
    },
    {
      question: 'Do you offer ongoing support and maintenance after launch?',
      answer: 'Absolutely! We believe in long-term partnerships. Our relationship doesn\'t end at launch. We offer flexible support and maintenance packages that include continuous monitoring, bug fixes, security updates, and performance optimization. As your business grows, we\'re here to add new features, implement advanced integrations, and scale your technology infrastructure.'
    }
  ]

  const services = [
    { id: 'web', label: 'Web Development', icon: MdWeb, color: 'text-blue-400' },
    { id: 'app', label: 'App Development', icon: MdSmartphone, color: 'text-blue-400' },
    { id: 'software', label: 'Software Development', icon: MdCode, color: 'text-blue-400' },
    { id: 'design', label: 'Graphics & UI/UX', icon: MdBrush, color: 'text-blue-400' },
    { id: 'ai', label: 'AI Solutions', icon: FaBrain, color: 'text-blue-400' },
    { id: 'automation', label: 'AI Automations', icon: MdAutoAwesome, color: 'text-blue-400' },
  ]

  return (
    <>
      <SEO page="home" />
      <StructuredData schemas={[generateFAQSchema(faqData)]} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-blue-400">Future-Ready Tech Solutions</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Empowering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  Businesses
                </span> <br />
                with AI & Tech
              </h1>

              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed">
                We build scalable digital solutions that grow with you. Start with the essentials, scale with AI, and pay only for what you need.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                >
                  Get Started Today
                </a>
                <a
                  href="/services"
                  className="px-8 py-4 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-white font-semibold hover:bg-[rgba(255,255,255,0.1)] transition-all backdrop-blur-sm"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10 animate-float">
                <img src="/banner.png" alt="Waglogy AI Tech" className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[var(--bg-dark)] relative">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Our Expertise</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveSection(service.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 border ${activeSection === service.id
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)]'
                    }`}
                >
                  <service.icon className={`text-xl ${activeSection === service.id ? 'text-blue-400' : 'text-gray-500'}`} />
                  <span className="font-medium">{service.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3 rounded-2xl p-8 sm:p-12 min-h-[500px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {activeSection === 'web' && (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <MdWeb className="text-3xl" />
                          </div>
                          <h3 className="text-3xl font-bold">Web Development</h3>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                          Modern, responsive, and user-friendly websites that create impact. We build lightning-fast digital experiences.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          {['Responsive Design', 'Fast Performance', 'SEO Optimized', 'Scalable Architecture'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                              <span className="text-blue-400">✓</span> {item}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border-l-2 border-blue-500">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">More about this service</h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            We specialize in creating custom websites that not only look stunning but also perform exceptionally. From e-commerce platforms to corporate websites, we leverage the latest technologies like React, Next.js, and modern frameworks to deliver fast, secure, and scalable web solutions that drive business growth.
                          </p>
                        </div>
                      </>
                    )}
                    {activeSection === 'app' && (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <MdSmartphone className="text-3xl" />
                          </div>
                          <h3 className="text-3xl font-bold">App Development</h3>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                          Secure, scalable mobile apps for iOS and Android. We turn your ideas into powerful handheld experiences.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          {['Native & Cross-Platform', 'Intuitive UX', 'Secure Backend', 'Real-time Features'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                              <span className="text-blue-400">✓</span> {item}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border-l-2 border-blue-500">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">More about this service</h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            Our mobile app development expertise spans both native (iOS/Android) and cross-platform solutions using React Native and Flutter. We create intuitive, high-performance apps with seamless user experiences, robust backend integration, and features like push notifications, real-time sync, and offline capabilities.
                          </p>
                        </div>
                      </>
                    )}
                    {activeSection === 'software' && (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <MdCode className="text-3xl" />
                          </div>
                          <h3 className="text-3xl font-bold">Software Development</h3>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                          Custom software solutions to automate and streamline your business operations.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          {['Custom Workflows', 'API Integrations', 'Process Automation', 'Data Management'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                              <span className="text-blue-400">✓</span> {item}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border-l-2 border-blue-500">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">More about this service</h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            We build enterprise-grade custom software solutions tailored to your unique business needs. From CRM systems to inventory management, our solutions automate complex workflows, integrate with existing systems, and provide real-time analytics to help you make data-driven decisions and improve operational efficiency.
                          </p>
                        </div>
                      </>
                    )}
                    {activeSection === 'design' && (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <MdBrush className="text-3xl" />
                          </div>
                          <h3 className="text-3xl font-bold">Graphics & UI/UX</h3>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                          Eye-catching designs that build trust. We craft visual identities that resonate with your audience.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          {['Brand Identity', 'UI/UX Design', 'Marketing Graphics', 'Design Systems'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                              <span className="text-blue-400">✓</span> {item}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border-l-2 border-blue-500">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">More about this service</h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            Our design team creates compelling visual identities that resonate with your target audience. We offer comprehensive design services including brand identity, UI/UX design, marketing materials, and design systems. Every design is crafted with attention to detail, ensuring consistency and excellence across all touchpoints.
                          </p>
                        </div>
                      </>
                    )}
                    {activeSection === 'ai' && (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <FaBrain className="text-3xl" />
                          </div>
                          <h3 className="text-3xl font-bold">AI Solutions</h3>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                          Intelligent chatbots and AI applications that understand context and deliver personalized experiences.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          {['Smart Chatbots', 'LLM Integration', 'Voice Assistants', 'Intelligent Search'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                              <span className="text-blue-400">✓</span> {item}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border-l-2 border-blue-500">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">More about this service</h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            Harness the power of AI with our intelligent chatbot and AI application development services. We integrate advanced LLMs, create context-aware conversational interfaces, and build AI-powered features that enhance user engagement, automate customer support, and provide personalized experiences at scale.
                          </p>
                        </div>
                      </>
                    )}
                    {activeSection === 'automation' && (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <MdAutoAwesome className="text-3xl" />
                          </div>
                          <h3 className="text-3xl font-bold">AI Automations</h3>
                        </div>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                          Streamline workflows and eliminate repetitive tasks with our intelligent automation solutions.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          {['Lead Management', 'Workflow Automation', 'Data Processing', 'Smart Scheduling'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                              <span className="text-blue-400">✓</span> {item}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border-l-2 border-blue-500">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">More about this service</h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            Transform your business operations with intelligent automation. We design and implement AI-powered workflows that handle repetitive tasks, process data intelligently, manage leads automatically, and optimize scheduling. Our automation solutions save time, reduce errors, and allow your team to focus on high-value activities.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our USP: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Growth-Friendly Technology</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              We build smart, scalable solutions that grow with you. No unnecessary costs, just the right tech at the right time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MdConstruction,
                title: "Build Foundation",
                desc: "Start with the essentials—website, branding, and core tools.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              },
              {
                icon: FaRocket,
                title: "Smart Growth",
                desc: "Add apps, integrations, and custom features when you're ready.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              },
              {
                icon: HiChip,
                title: "Scale with AI",
                desc: "Optimize costs and efficiency with AI & automation at scale.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl transition-all group"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className={`text-3xl ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="w-full max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/10"></div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 relative z-10">Ready to Transform Your Business?</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 relative z-10">
              Let's discuss how we can help you build, grow, and scale with the right technology.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-white text-blue-900 font-bold hover:bg-blue-50 transition-colors relative z-10"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
