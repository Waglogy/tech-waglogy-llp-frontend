import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MdWeb, MdPhoneAndroid, MdComputer, MdPalette, MdClose } from 'react-icons/md'
import { RiRobotFill } from 'react-icons/ri'
import { HiChip } from 'react-icons/hi'
import { FaTimes, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateServiceSchema } from '../config/seo'

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

// 3D Card Component
const Card3D = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card rounded-2xl p-8 relative overflow-hidden group preserve-3d perspective-1000 border border-white/10 bg-white/5 backdrop-blur-md ${className}`}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.div>
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

const Services = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // Same services data, just keeping structure
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      tagline: 'Modern, responsive, and user-friendly websites that create impact',
      IconComponent: MdWeb,
      iconColor: 'text-blue-400',
      description: 'Your website is often the first impression. We build modern, lightning-fast, and fully responsive websites using Next.js and React that look stunning and drive real business results.',
      features: [
        'Responsive Design - Perfect on all devices',
        'Fast Performance - Optimized for speed & SEO',
        'User-Friendly CMS - Easy content management',
        'Scalable Architecture - Built to grow with you',
        'E-commerce Integration - Sell online seamlessly',
        'SEO Optimization - Rank higher on Google'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'WordPress', 'Shopify'],
      pricing: { INR: '₹40,000' },
      timeline: '2-6 weeks'
    },
    {
      id: 'app-development',
      title: 'App Development',
      tagline: 'Secure, scalable apps tailored to your business goals',
      IconComponent: MdPhoneAndroid,
      iconColor: 'text-sky-400',
      description: 'Whether iOS, Android, or cross-platform, we build intuitive, secure apps designed to scale. From concept to deployment, we handle it all with Flutter and React Native.',
      features: [
        'Native & Cross-Platform - iOS, Android, or both',
        'Intuitive UX - Beautiful interfaces users love',
        'Secure Backend - Protected data & APIs',
        'Real-time Features - Push notifications & updates',
        'Offline Functionality - Works without internet',
        'App Store Optimization - Better visibility'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      pricing: { INR: '₹1,50,000' },
      timeline: '6-12 weeks'
    },
    {
      id: 'software-development',
      title: 'Custom Software',
      tagline: 'Custom solutions to automate and streamline operations',
      IconComponent: MdComputer,
      iconColor: 'text-indigo-400',
      description: 'We create custom software solutions that automate manual processes, integrate disparate systems, and eliminate operational bottlenecks.',
      features: [
        'Custom Workflows - Tailored to your processes',
        'API Integrations - Connect existing tools',
        'Process Automation - Eliminate repetitive tasks',
        'Data Management - Centralized dashboards',
        'Cloud Deployment - Scalable & secure',
        'System Integration - Unify your tech stack'
      ],
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS'],
      pricing: { INR: '₹1,20,000' },
      timeline: '8-16 weeks'
    },
    {
      id: 'graphics-uiux',
      title: 'UI/UX Design',
      tagline: 'Eye-catching designs that build trust and engagement',
      IconComponent: MdPalette,
      iconColor: 'text-white',
      description: 'We create visually stunning designs that capture attention and build trust. From brand identity to digital experiences, we make your business memorable.',
      features: [
        'Brand Identity - Logos & guidelines',
        'UI/UX Design - Intuitive interfaces',
        'Marketing Graphics - Social media & ads',
        'Design Systems - Consistent components',
        'Wireframing - Visualize before building',
        'User Research - Data-driven decisions'
      ],
      technologies: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop'],
      pricing: { INR: '₹30,000' },
      timeline: '2-4 weeks'
    },
    {
      id: 'ai-chatbots',
      title: 'AI Solutions',
      tagline: 'Smarter customer interactions, increased efficiency',
      IconComponent: RiRobotFill,
      iconColor: 'text-cyan-400',
      description: 'Transform customer interactions with intelligent AI. From 24/7 support chatbots to advanced AI apps that understand context and deliver personalized experiences.',
      features: [
        'Smart Chatbots - 24/7 support',
        'LLM Integration - GPT, Claude & more',
        'Voice Assistants - Natural language',
        'Intelligent Search - AI recommendations',
        'Sentiment Analysis - Understand emotions',
        'Multilingual Support - Global reach'
      ],
      technologies: ['OpenAI API', 'Claude', 'LangChain', 'Python', 'FastAPI'],
      pricing: { INR: '₹80,000' },
      timeline: '4-10 weeks'
    },
    {
      id: 'ai-automations',
      title: 'AI Automations',
      tagline: 'From lead management to workflow optimization',
      IconComponent: HiChip,
      iconColor: 'text-blue-300',
      description: 'Stop wasting time on repetitive tasks. Our AI automation solutions handle everything from lead capture to data entry—freeing up your team.',
      features: [
        'Lead Management - Automated capture',
        'Workflow Automation - Streamline tasks',
        'Data Processing - AI extraction',
        'Smart Scheduling - Intelligent booking',
        'Email Automation - Personalized campaigns',
        'Document Processing - Extract insights'
      ],
      technologies: ['Make.com', 'Zapier', 'Python', 'AI APIs'],
      pricing: { INR: '₹1,00,000' },
      timeline: '4-12 weeks'
    }
  ]

  const handleGetQuote = (service) => {
    setSelectedService(service)
    setQuoteFormData({
      ...quoteFormData,
      message: `I'm interested in ${service.title}.\n\nPlease provide more information regarding this.`
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
    setQuoteFormData({ name: '', email: '', phone: '', message: '' })
  }

  // Schema gen
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

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-sky-600 top-[-10%] right-[-10%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-blue-600 bottom-[20%] left-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-40 lg:pt-60 pb-20 px-4 sm:px-6 lg:px-8 min-h-[50vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                SERVICES
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 tracking-tight">
                Start Small. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-600">Scale Big.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                We don't just build software; we engineer growth systems. Start with essentials and scale your tech as you grow.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setSelectedService(null)
                    setQuoteFormData({ ...quoteFormData, message: 'I want to discuss a project.' })
                    setShowQuoteModal(true)
                  }}
                  className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2"
                >
                  Start Project <FaArrowRight />
                </button>
              </div>
            </motion.div>
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30"></div>
                <div className="glass-card p-2 rounded-2xl border border-white/10 relative">
                  <img src="/banner.png" alt="Services Hero" className="rounded-xl w-full h-auto object-contain" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <ScrollFadeSection className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-blue-500">Core Services</span></h2>
              <p className="text-slate-400">Comprehensive digital solutions engineered for growth.</p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const IconComponent = service.IconComponent
                return (
                  <Card3D key={service.id} className="cursor-pointer" onClick={() => handleGetQuote(service)}>
                    <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-2xl ${service.iconColor} shadow-inner`}>
                      <IconComponent />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 min-h-[60px]">{service.tagline}</p>

                    <div className="space-y-3 mb-6">
                      {service.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <FaCheckCircle className={`text-xs ${service.iconColor}`} />
                          <span>{f.split(' - ')[0]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end border-t border-white/10 pt-4 mt-auto">
                      <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                        <FaArrowRight size={14} />
                      </button>
                    </div>
                  </Card3D>
                )
              })}
            </div>
          </div>
        </ScrollFadeSection>

        {/* Growth Approach */}
        <ScrollFadeSection className="py-24 bg-black/30 relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The <span className="text-sky-500">Growth-Friendly</span> Protocol</h2>
              <p className="text-slate-400">We don't overwhelm you. We help you grow step-by-step.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "Start Small", desc: "Launch with essentials. Get live quickly without breaking the bank." },
                { num: "02", title: "Scale Smart", desc: "Add complexity, apps, and integrations only as your user base grows." },
                { num: "03", title: "Automate", desc: "Deploy AI and advanced automation when you are ready to dominate." }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-8 rounded-2xl relative border border-white/5 hover:border-blue-500/30 transition-colors group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="text-6xl font-bold text-white/5 absolute top-4 right-4 group-hover:text-blue-500/10 transition-colors">{step.num}</div>
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                  <p className="text-slate-400 text-sm relative z-10 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollFadeSection>

        {/* CTA Banner */}
        <section className="py-24 relative z-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-blue-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-sky-900/40 backdrop-blur-xl"></div>
              {/* Animated Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/20 blur-[100px] pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Transform?</span></h2>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                  Get a comprehensive digital strategy within 24 hours. No hidden costs, just clear growth paths.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelectedService(null)
                      setQuoteFormData({ ...quoteFormData, message: 'I want to build something amazing.' })
                      setShowQuoteModal(true)
                    }}
                    className="px-8 py-3 rounded-full bg-white text-blue-900 font-bold hover:scale-105 transition-transform shadow-xl"
                  >
                    Get Free Consultation
                  </button>
                  <a href="/pricing" className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                    View Pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Modal */}
        {showQuoteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowQuoteModal(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600/20 to-sky-600/20 p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">Start Your Project</h3>
                  {selectedService && <p className="text-sky-400 text-sm mt-1">{selectedService.title}</p>}
                </div>
                <button onClick={() => setShowQuoteModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <MdClose size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitQuote} className="p-6 space-y-4">
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your name"
                    value={quoteFormData.name}
                    onChange={e => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="john@example.com"
                      value={quoteFormData.email}
                      onChange={e => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+91..."
                      value={quoteFormData.phone}
                      onChange={e => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">Details</label>
                  <textarea
                    required
                    rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    value={quoteFormData.message}
                    onChange={e => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all mt-4">
                  Submit Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default Services
