import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { MdConstruction, MdWeb, MdPhoneIphone, MdDesktopWindows, MdBrush, MdSmartToy, MdAutoGraph, MdCode } from 'react-icons/md'
import { FaRocket, FaSearch, FaBug } from 'react-icons/fa'
import { HiChip } from 'react-icons/hi'
import { RiRobotFill } from 'react-icons/ri'
import { submitQuery } from '../services/queryService'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { generateFAQSchema } from '../config/seo'
// 3D Card Component
const Card3D = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-8 relative overflow-hidden group preserve-3d perspective-1000 ${className}`}
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

const TerminalWindow = () => {
  const [completedLines, setCompletedLines] = useState([])
  const [currentTyping, setCurrentTyping] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const script = useMemo(() => [
    { text: "> initializing_waglogy_protocol_2.0...", color: "text-slate-500" },
    { text: "> loading_revenue_engine --optimized", color: "text-blue-400" },
    { text: "[OK] Lead Capture: ACTIVE", color: "text-sky-400" },
    { text: "[OK] AI Automation: SYNCED", color: "text-sky-400" },
    { text: "> deploy_revenue_system -v 2.0", color: "text-white" },
    { text: "Compiling CRM... Optimizing Flows...", color: "text-slate-300" },
    { text: "Integrating Neural Growth Net...", color: "text-blue-300" },
    { text: ">>> REVENUE SYSTEM READY FOR SCALE", color: "text-sky-400 font-bold animate-pulse" },
  ], [])

  useEffect(() => {
    if (lineIndex >= script.length) return

    const currentScriptLine = script[lineIndex]

    // Typing logic
    if (charIndex < currentScriptLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentTyping(prev => prev + currentScriptLine.text[charIndex])
        setCharIndex(prev => prev + 1)
      }, 30 + Math.random() * 40) // Random typing speed variation
      return () => clearTimeout(timeout)
    } else {
      // Line finished, wait before moving to next
      const timeout = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentScriptLine])
        setCurrentTyping('')
        setCharIndex(0)
        setLineIndex(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, lineIndex, script])

  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#0a0f1e] border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] font-mono text-sm sm:text-base relative group">
      {/* Glow highlight */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-all duration-1000"></div>

      {/* Window Title Bar */}
      <div className="bg-[#1e293b]/50 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-600/80 shadow-md" />
          <div className="w-3 h-3 rounded-full bg-slate-500/80 shadow-md" />
          <div className="w-3 h-3 rounded-full bg-slate-400/80 shadow-md" />
        </div>
        <div className="text-xs text-slate-500 font-semibold tracking-wider">root@waglogy-server: ~</div>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-[400px] overflow-y-auto flex flex-col font-mono relative z-10 scrollbar-hide">
        {completedLines.map((line, i) => (
          <div key={i} className={`mb-2 font-medium tracking-wide ${line.color}`}>
            {line.text}
          </div>
        ))}

        {/* Current Typing Line */}
        {lineIndex < script.length && (
          <div className={`mb-2 font-medium tracking-wide ${script[lineIndex].color}`}>
            {currentTyping}
            <span className="w-2.5 h-5 bg-blue-500 inline-block align-middle ml-1 animate-blink shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
        )}

        {/* Blinking Cursor after full script */}
        {lineIndex >= script.length && (
          <div className="mt-2 text-sky-400">
            ➜  ~ <span className="w-2.5 h-5 bg-sky-500 inline-block align-middle ml-1 animate-blink shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
          </div>
        )}
      </div>
    </div>
  )
}

const Landing = () => {
  const [activeSection, setActiveSection] = useState('web')
  const [visiblePhases, setVisiblePhases] = useState([])
  const phasesContainerRef = useRef(null)

  // Query form state
  const [queryMessage, setQueryMessage] = useState('')
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false)
  const [queryStatus, setQueryStatus] = useState(null)
  const [queryErrorMessage, setQueryErrorMessage] = useState('')

  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Hero Parallax & Fade Effects
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  // Phase animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'))
            setTimeout(() => {
              setVisiblePhases((prev) => [...new Set([...prev, index])])
            }, index * 200)
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('.timeline-phase').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
      await submitQuery({ message: queryMessage })
      setQueryStatus('success')
      setQueryMessage('')
      setTimeout(() => setQueryStatus(null), 5000)
    } catch (error) {
      setQueryStatus('error')
      setQueryErrorMessage(error.message || 'Failed to submit query.')
    } finally {
      setIsSubmittingQuery(false)
    }
  }

  // FAQ data
  const faqData = [
    {
      question: 'What makes Waglogy 2.0 different?',
      answer: 'Waglogy is no longer just a web development agency. We are an AI-first growth partner that designs end-to-end revenue systems. From lead capture to automated follow-ups and CRM dashboards, we build the entire system that drives predictable revenue.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Timelines vary: 2-4 weeks for websites, 6-12 weeks for apps, and 8-16 weeks for custom software. We provide detailed roadmaps during discovery.'
    },
    {
      question: 'Do you offer ongoing support?',
      answer: 'Yes! We offer flexible support packages for monitoring, updates, and optimization to ensure your tech grows with your business.'
    }
  ]

  const services = [
    { id: 'lead-capture', title: 'Lead Capture Systems', icon: FaSearch, desc: 'High-conversion systems designed to turn visitors into inquiries.', details: 'Dynamic Forms, Landing Pages, Intent Tracking' },
    { id: 'automated-followup', title: 'Automated Follow-Up', icon: MdAutoGraph, desc: 'AI-driven follow-ups that ensure no lead goes cold.', details: 'Email/SMS Sequences, AI Response, Multi-Channel' },
    { id: 'conversion-optimization', title: 'Conversion Flows', icon: MdWeb, desc: 'Optimizing every touchpoint in the user journey for revenue.', details: 'A/B Testing, Heatmaps, UX Optimization' },
    { id: 'crm-dashboards', title: 'CRM & Inquiry Dashboards', icon: MdDesktopWindows, desc: 'Centralized hubs to manage all your leads and inquiries.', details: 'Real-time Tracking, Lead Scoring, Status Pipelines' },
    { id: 'revenue-analytics', title: 'Revenue Analytics', icon: MdSmartToy, desc: 'Predictable tracking of how leads turn into actual revenue.', details: 'ROI Tracking, Conversion Metrics, Growth Forecasting' },
    { id: 'ai-automation', title: 'AI-Driven Automation', icon: HiChip, desc: 'Custom AI workflows that streamline your entire business.', details: 'Smart Workflows, LLM Integration, Task Automation' },
  ]

  return (
    <>
      <SEO page="home" />
      <StructuredData schemas={[generateFAQSchema(faqData)]} />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-white transform origin-left z-50"
        style={{ scaleX }}
      />

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-blue-600 top-[-10%] px-20 left-[-10%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-sky-600 bottom-[-10%] right-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* Hero Section - Parallax Exit */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 pt-32 md:pt-40 lg:pt-60 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                AI-POWERED GROWTH PARTNER
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.15] mb-6 tracking-tight">
                AI-Powered <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-sky-300 to-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  Revenue Systems
                </span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                From Lead to Revenue — We Build the System in Between.
                <br />
                <span className="text-white font-medium">Waglogy partners with service businesses</span> to build AI-powered systems that increase leads, improve conversion, and create predictable revenue.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Project
                  <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-panel text-white rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center"
                >
                  View Growth Systems
                </motion.a>
              </div>

              {/* Tech Stats */}
              <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8 max-w-sm">
                <div>
                  <div className="text-2xl font-bold text-white font-mono">50+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Global Partnerships</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono">1.2x</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Avg Conversion</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono">24/7</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Nurture Loop</div>
                </div>
              </div>
            </motion.div>

            {/* Premium Hero Visual - Revenue Pulse Portal */}
            <motion.div
              className="relative h-[600px] hidden lg:flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Converging Light Beams (Psychology: Focus) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
              </div>

              {/* The "Revenue Center" - A solid, grounded hub */}
              <motion.div
                className="relative z-20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {/* Layered Glass Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-500/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-sky-500/10 rounded-full bg-blue-500/[0.02] backdrop-blur-3xl" />

                {/* Main Core */}
                <div className="relative w-72 h-72 rounded-[3.5rem] overflow-hidden border border-white/10 bg-[#0a0f1d]/60 backdrop-blur-2xl p-1 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-sky-500/5" />

                  {/* Internal Growth Visualization (Abstract) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full p-10 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="h-1.5 w-10 bg-blue-500 rounded-full opacity-30" />
                        <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-blue-400/50 rounded-full" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-4xl font-bold tracking-tighter text-white/90">REVENUE</div>
                        <div className="flex items-end gap-2 text-sky-400/80">
                          <div className="h-6 w-2 bg-blue-400/10 rounded-sm" />
                          <div className="h-10 w-2 bg-blue-400/20 rounded-sm" />
                          <div className="h-14 w-2 bg-blue-400/30 rounded-sm" />
                          <div className="h-18 w-2 bg-blue-400/40 rounded-sm" />
                          <div className="text-sm font-mono font-medium mb-1 ml-2 opacity-60">SYSTEM 2.0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-End Floating Indicators (Sophisticated, Not Technical) */}
                <motion.div
                  className="absolute -top-6 -right-6 px-4 py-2 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-[9px] font-bold text-blue-400/60 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500/40" />
                  MARKET INTENT: CAPTURING
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 px-4 py-2 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-[9px] font-bold text-sky-400/60 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-1 h-1 rounded-full bg-sky-500/40" />
                  CONVERSION FLOW: ACTIVE
                </motion.div>
              </motion.div>

              {/* Static Background Flare */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" />
            </motion.div>
          </div>
        </motion.section>

        {/* Services Section - 3D Grid */}
        <ScrollFadeSection className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-blue-500">Growth Systems</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">AI-powered infrastructure designed to scale your service business from inquiry to revenue.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <Card3D key={service.id} className="cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                      <service.icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">{service.desc}</p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-blue-300 font-mono">{service.details}</p>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        </ScrollFadeSection>

        {/* USP / Terminal Section */}
        <ScrollFadeSection className="py-24 bg-black/20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Content (Text) - Spans 5 cols */}
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  AI-FIRST GROWTH PARTNER
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Revenue-First <br className="hidden md:block" /> <span className="text-sky-500">Architecture</span></h2>
                <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                  We don't just build websites; we engineer <span className="text-white font-medium">revenue systems</span>.
                  Our AI-first approach ensures your business grows predictably and scalably.
                </p>

                <div className="space-y-8">
                  <div className="group flex items-start gap-5 p-4 rounded-xl hover:bg-white/5 transition-all cursor-default">
                    <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]"><MdConstruction className="text-2xl" /></div>
                    <div>
                      <h4 className="text-white text-xl font-bold mb-2">Modular Foundation</h4>
                      <p className="text-slate-400 leading-relaxed">Start with essential tools, add complex features later. No bloat, just efficiency.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-5 p-4 rounded-xl hover:bg-white/5 transition-all cursor-default">
                    <div className="p-4 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(14,165,233,0.2)]"><FaRocket className="text-2xl" /></div>
                    <div>
                      <h4 className="text-white text-xl font-bold mb-2">High-Performance Scale</h4>
                      <p className="text-slate-400 leading-relaxed">Optimized for speed, SEO, and user retention from Day 1.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-5 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
                    <div className="p-4 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"><HiChip className="text-2xl" /></div>
                    <div>
                      <h4 className="text-white text-xl font-bold mb-2">Predictable Scaling</h4>
                      <p className="text-slate-400 leading-relaxed">Turn your service business into a predictable growth machine with AI automation.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Terminal - Spans 7 cols (Wider) */}
              <motion.div
                className="lg:col-span-7 w-full"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* Decorative Elements behind terminal */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                  <TerminalWindow />
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollFadeSection>

        {/* Timeline Section - Glowing Circuit */}
        <ScrollFadeSection className="py-32 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Execution <span className="text-blue-500">Protocol</span></h2>
              <p className="text-slate-400">The battle-tested framework we use to build, deploy, and scale your AI-powered revenue engine.</p>
            </motion.div>

            <div className="relative">
              {/* Central Glowing Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2">
                <motion.div
                  className="w-full bg-gradient-to-b from-blue-500 via-sky-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  viewport={{ once: true, margin: "-100px" }}
                />
              </div>

              <div className="space-y-16">
                {[
                  { title: "Revenue Audit & Blueprinting", desc: "We analyze your current lead-to-revenue journey to identify leaks and map a path to predictable growth.", icon: FaSearch },
                  { title: "Growth Architecture", desc: "Designing the foundational infrastructure, combining high-conversion entry points with robust CRM systems.", icon: MdBrush },
                  { title: "AI Integration & Automation", desc: "Integrating custom LLMs and automated workflows to handle follow-ups, inquiries, and data syncs.", icon: HiChip },
                  { title: "Performance Engineering", desc: "Precision coding with a focus on load speeds, conversion triggers, and seamless API integrations.", icon: MdCode },
                  { title: "System Deployment", desc: "Seamlessly launching your revenue engine with real-time tracking and full analytics visibility.", icon: FaRocket },
                  { title: "Success & AI Scaling", desc: "Ongoing data-driven optimization using AI insights to maximize ROI and scale your business.", icon: MdAutoGraph }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className={`relative flex flex-col items-center md:items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0f172a] border-2 border-blue-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                      <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border-l-4 border-blue-500/50 hover:border-blue-400 group">
                        <div className={`flex items-center gap-4 mb-4 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                            <item.icon className="text-2xl" />
                          </div>
                          <span className="text-4xl font-bold text-white/10 font-mono">0{idx + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollFadeSection>

        {/* FAQ Section */}
        <ScrollFadeSection className="py-24 bg-black/30 relative z-10">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <motion.details
                  key={idx}
                  className="glass-panel rounded-xl group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg">{faq.question}</span>
                    <span className="text-blue-500 transform group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </ScrollFadeSection>

        {/* Query Form */}
        <ScrollFadeSection className="py-24 relative z-10">
          <div className="max-w-xl mx-auto px-6">
            <div className="glass-card p-8 rounded-2xl text-center border-t border-blue-500/30">
              <h2 className="text-2xl font-bold mb-4">Ready to Automate your Revenue?</h2>
              <p className="text-slate-400 mb-8">Let's build your AI-powered growth engine together.</p>

              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <input
                  type="text"
                  value={queryMessage}
                  onChange={(e) => setQueryMessage(e.target.value)}
                  placeholder="Describe your idea..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  disabled={isSubmittingQuery}
                />
                <button
                  type="submit"
                  disabled={isSubmittingQuery || !queryMessage.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingQuery ? 'Sending...' : 'Start Conversation'}
                </button>
              </form>

              {queryStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-sky-500/20 text-sky-300 rounded-lg text-sm">
                  ✅ Message sent successfully!
                </motion.div>
              )}
              {queryStatus === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                  ❌ {queryErrorMessage}
                </motion.div>
              )}
            </div>
          </div>
        </ScrollFadeSection>

      </div>
    </>
  )
}

export default Landing
