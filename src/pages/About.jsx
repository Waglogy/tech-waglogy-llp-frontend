import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaChartLine, FaLaptopCode, FaPalette, FaHandshake, FaRupeeSign, FaClock } from 'react-icons/fa'
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

// 3D Card Component reuse from Landing
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

const About = () => {
  return (
    <>
      <SEO page="about" />

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-blue-600 top-[-10%] px-20 left-[-10%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-sky-600 bottom-[-10%] right-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* 1. Hero Section */}
        <section className="relative z-10 pt-44 lg:pt-60 pb-24 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
                Designing AI-Powered <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-sky-300 to-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  Revenue Systems
                </span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
                Waglogy designs AI-powered revenue systems for service businesses. We partner with you to build systems that increase leads, improve conversion, and create predictable revenue. Not just developers—we are your AI-first growth partners.
              </p>
            </motion.div>

            <motion.div
              className="hidden lg:block relative pl-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative z-10">
                <img src="/8.png" alt="Collaborative Team" className="rounded-2xl w-full h-auto object-cover opacity-90 shadow-2xl hover:scale-[1.01] transition-transform duration-500" />
              </div>
              {/* Decorative elements behind image */}
              <div className="absolute top-10 right-10 -z-10 w-full h-full border-2 border-white/5 rounded-2xl translate-x-4 translate-y-4"></div>
            </motion.div>
          </div>
        </section>

        {/* 2. Our Story - The Origin */}
        <ScrollFadeSection className="py-24 relative z-10 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">

              {/* Sticker Header */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-blue-500">Origin</span></h2>
                  <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
                  <p className="text-slate-400 text-lg mb-8">
                    A story of bridging the gap between ambition and technology.
                  </p>
                  <div className="hidden lg:block p-6 bg-blue-900/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-blue-300 italic">"Technology should feel like magic, not a burden."</p>
                    <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-wider">— Founders</p>
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="lg:col-span-8">
                <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6">
                  <p className="text-xl font-light text-white leading-8 border-l-4 border-blue-500 pl-6 mb-8">
                    The story of Waglogy began with a simple yet powerful observation: <span className="text-blue-400 font-semibold">Service businesses don't just need websites—they need engines for growth.</span>
                  </p>

                  <p>
                    In 2026, we evolved into <strong>Waglogy 2.0</strong>. We realized that while many companies can build a website, few build the actual systems that drive predictable revenue.
                  </p>

                  <p>
                    This realization led to our core positioning: <em>"From Lead to Revenue — We Build the System in Between."</em> We moved beyond being just a digital marketing agency or an AI tools provider. We became architects of growth, building lead capture systems, automated follow-ups, and CRM dashboards that act as the backbone of a modern service business.
                  </p>

                  <p>
                    Based in the serene hills of <strong className="text-white">Gangtok, Sikkim</strong>, our vision is global. We prove that world-class AI innovation can come from anywhere, helping service businesses worldwide build predictable, scalable revenue systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeSection>

        {/* 3. Mission & Vision - The Goal */}
        <ScrollFadeSection className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold">Driving <span className="text-sky-400">Purpose</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="glass-card p-10 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#0f172a] to-blue-900/10">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-8 text-3xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  To empower businesses with modern technology solutions that are accessible, scalable, and impactful, ensuring growth at every stage of their journey.
                </p>
              </div>

              <div className="glass-card p-10 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-[#0f172a] to-sky-900/10">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-8 text-3xl shadow-[0_0_30px_rgba(14,165,233,0.2)]">👁️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  To become a globally trusted AI-first growth partner that helps service businesses build predictable, scalable revenue systems.
                </p>
              </div>
            </div>
          </div>
        </ScrollFadeSection>

        {/* 4. Why Choose Us - The Capability */}
        <ScrollFadeSection className="py-24 relative z-10 bg-black/40 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With <span className="text-blue-500">Us?</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">We don't just write code. We engineer revenue systems that scale.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FaChartLine, title: "Scalable Growth", desc: "Pay-as-you-grow model. Invest only in what you need today, scale seamlessly tomorrow." },
                { icon: FaLaptopCode, title: "AI-Driven Systems", desc: "We use the latest stack: React, Next.js, AI integrations & Cloud to future-proof your revenue engine." },
                { icon: FaPalette, title: "Conversion Focused", desc: "Designing intuitive interfaces that move users through your conversion funnel and drive revenue." },
                { icon: FaRupeeSign, title: "Transparent ROI", desc: "System-level solutions priced thoughtfully for service businesses seeking predictable growth." },
                { icon: FaHandshake, title: "Strategic Partner", desc: "We are not just vendors; we act as your internal growth team, invested in your success." },
                { icon: FaClock, title: "Agile Execution", desc: "Rapid prototyping and agile processes ensure quick turnarounds for your growth engine." }
              ].map((item, idx) => (
                <Card3D key={idx}>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 w-fit rounded-xl text-blue-400 mb-5 text-xl">
                    <item.icon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </ScrollFadeSection>

      </div>
    </>
  )
}

export default About