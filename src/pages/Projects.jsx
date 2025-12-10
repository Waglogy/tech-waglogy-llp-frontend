import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaEnvelope, FaCheckCircle, FaMountain, FaRobot, FaRoute, FaClock, FaArrowRight } from 'react-icons/fa'
import { submitWaitlist } from '../services/waitlistService'
import SEO from '../components/SEO'

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
const Card3D = ({ children, className = '' }) => {
  return (
    <motion.div
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

const Projects = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      await submitWaitlist({ email: email.trim() })
      setSubmitStatus('success')
      setEmail('')
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting waitlist:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to join waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO page="projects" />

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-blue-600 top-[-10%] right-[30%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-sky-600 bottom-[10%] left-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6 backdrop-blur-md">
                <FaMountain className="w-3 h-3" />
                <span>BUILT BY WAGLOGY</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 tracking-tight">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                  Himato
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300 mb-8 leading-relaxed font-light">
                Where <span className="text-white font-medium">Artificial Intelligence</span> meets the mystical mountains of Sikkim.
              </p>

              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                Not just another travel platform. An intelligent travel companion that transforms how you discover India's hidden gem.
              </p>

              {/* Key Features Mini-Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-4 rounded-xl border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <FaRobot />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">AI-Powered</h3>
                    <p className="text-xs text-slate-400">Personalized itineraries in seconds</p>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-xl border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <FaRoute />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">24/7 Expert</h3>
                    <p className="text-xs text-slate-400">Instant answers & insights</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative group perspective-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="glass-card p-2 rounded-2xl border border-white/10 relative transform transition-transform duration-500 group-hover:rotate-1">
                  <img
                    src="/himato.png"
                    alt="Himato App Interface"
                    className="w-full h-auto object-cover rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback if image fails */}
                  <div className="hidden h-[400px] w-full bg-slate-800 rounded-xl items-center justify-center flex-col text-slate-500">
                    <FaMountain className="text-6xl mb-4 opacity-20" />
                    <p>Visualizing Ecosystem</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem/Solution Grid */}
        <ScrollFadeSection className="py-24 relative z-10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">The Challenge vs <span className="text-cyan-400">Solution</span></h2>
              <p className="text-slate-400">Rewriting the travel experience.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem */}
              <div className="glass-card p-8 rounded-2xl border border-slate-600/30 bg-slate-800/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FaClock className="text-9xl text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Traditional Chaos</h3>
                <ul className="space-y-4 text-slate-300 relative z-10">
                  <li className="flex items-start gap-3"><span className="text-slate-500 mt-1">✕</span> Endless research across scattered sites</li>
                  <li className="flex items-start gap-3"><span className="text-slate-500 mt-1">✕</span> Generic packages that fit nobody</li>
                  <li className="flex items-start gap-3"><span className="text-slate-500 mt-1">✕</span> Hidden costs and high agency fees</li>
                </ul>
              </div>

              {/* Solution */}
              <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FaCheckCircle className="text-9xl text-cyan-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Himato's Clarity</h3>
                <ul className="space-y-4 text-slate-300 relative z-10">
                  <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">✓</span> Customized itineraries in seconds</li>
                  <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">✓</span> Deep local stories & hidden spots</li>
                  <li className="flex items-start gap-3"><span className="text-cyan-400 mt-1">✓</span> 100% Free planning tools</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollFadeSection>

        {/* Why Choose Himato (Features) */}
        <ScrollFadeSection className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Experience Future Travel</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card3D>
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-6">
                  <FaRobot />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Intelligent Planning</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our AI builds day-by-day plans tailored to your specific interests—adventure, spiritual, or leisure.
                </p>
              </Card3D>
              <Card3D>
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl mb-6">
                  <FaClock />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Real-Time Expert</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Get instant facts on permits, weather, and road conditions. It's like having a local guide in your pocket.
                </p>
              </Card3D>
              <Card3D>
                <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl mb-6">
                  <FaMountain />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Deep Expertise</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We don't just skim the surface. We go deep into local legends, monasteries, and hidden trails.
                </p>
              </Card3D>
            </div>
          </div>
        </ScrollFadeSection>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-cyan-500/30 bg-black/40 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">Join the Waitlist</h2>
                <p className="text-cyan-200 mb-8 text-lg">Be the first to experience the future of Himalayan travel.</p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : 'Get Early Access'}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-cyan-400 bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20"
                    >
                      <FaCheckCircle /> Successfully joined!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </form>

                <p className="mt-6 text-sm text-slate-500">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Impact */}
        <ScrollFadeSection className="py-24 bg-black/30 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">More Than Technology</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Himato isn't just an app; it's a bridge. We promote lesser-known regions like Dzongu and Uttarey, helping distribute tourism wealth to remote communities.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-bold mb-2">Community First</h4>
                    <p className="text-xs text-slate-400">Supporting local homestays & guides</p>
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-bold mb-2">Eco-Conscious</h4>
                    <p className="text-xs text-slate-400">Promoting responsible, trash-free travel</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
                <div className="glass-card p-8 rounded-2xl border border-white/10 text-center relative">
                  <p className="text-xl text-white font-light italic">
                    "The mountains of Sikkim have stories to tell. Himato ensures every traveler hears them."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeSection>

      </div>
    </>
  )
}

export default Projects
