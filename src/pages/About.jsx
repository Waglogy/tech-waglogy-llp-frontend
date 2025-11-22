import React from 'react'
import { motion } from 'framer-motion'
import { FaChartLine, FaLaptopCode, FaPalette, FaHandshake, FaRupeeSign, FaClock } from 'react-icons/fa'
import SEO from '../components/SEO'

const About = () => {

  return (
    <>
      <SEO page="about" />
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-blue-400">Who We Are</span>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Tech Waglogy</span>
              </motion.h1>

              <motion.p
                className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Founded in 2024, Tech Waglogy LLP was born from a vision to transform how businesses in India embrace digital technology. What began as a passionate team of developers has today evolved into a full-service technology partner for startups, SMEs, and enterprises across India.
              </motion.p>

              <motion.p
                className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                At Tech Waglogy, we believe that technology should empower growth, not overwhelm it. That's why we design every solution to be modern, scalable, and cost-effective. We're proudly registered in Sikkim and serve clients nationwide with our innovative growth-friendly approach.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Status:</span>
                  <span className="text-sm text-green-400 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Active
                  </span>
                </div>
                <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">LLPIN:</span>
                  <span className="text-sm font-mono text-blue-400">ACI-0335</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center md:justify-end relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <img
                src="/8.png"
                alt="Waglogy banner"
                className="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[var(--bg-dark)] relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="glass-card p-8 rounded-2xl text-left border-l-4 border-blue-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🚀</span> Our Mission
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To empower businesses with modern technology solutions that are accessible, scalable, and impactful, ensuring growth at every stage of their journey.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-2xl text-left border-l-4 border-purple-500"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">👁️</span> Our Vision
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To become India's most trusted digital growth partner, helping businesses turn ideas into sustainable digital success stories through innovation, design, and AI.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] to-[#0a0f1c]"></div>
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Introduction */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Why We Founded Waglogy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-2xl sm:text-3xl">And How We Help Businesses Grow</span>
            </h2>
          </motion.div>

          {/* Story Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6 text-[var(--text-secondary)] text-left">
                <p className="leading-relaxed">
                  Every business has a story—and ours begins with a simple question:
                </p>

                <div className="glass p-6 rounded-xl border border-blue-500/20">
                  <p className="text-lg font-medium italic text-blue-300">
                    💡 "Why should technology feel like a burden, when it has the power to make business easier?"
                  </p>
                </div>

                <p className="leading-relaxed">
                  When we started Waglogy LLP in 2024, we saw a common struggle among startups, small businesses, and even growing enterprises in India. They all wanted to go digital—launch websites, create apps, automate workflows, and embrace AI—but they were held back by high costs, unnecessary complexity, and one-size-fits-all solutions.
                </p>

                <p className="leading-relaxed">
                  We realized that most companies were being asked to buy everything upfront—even services they didn't need at the start. This created two problems:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Heavy initial investment that small businesses could not afford.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Wasted resources on features that remained unused for months or years.</span>
                  </li>
                </ul>

                <p className="leading-relaxed">
                  That's when we asked ourselves: <span className="text-white font-semibold">"What if technology worked differently? What if it grew alongside the business, step by step?"</span>
                </p>

                <p className="leading-relaxed font-semibold text-blue-400">
                  And that's exactly why Waglogy was founded.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur-lg"></div>
                <img
                  src="/9.png"
                  className="rounded-xl shadow-2xl w-full h-auto object-cover relative z-10 border border-[rgba(255,255,255,0.1)]"
                  alt="Tech team collaboration"
                />
              </div>
            </motion.div>
          </div>

          {/* Purpose Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8 sm:p-10 rounded-2xl border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-left">Our Purpose – Technology That Grows With You</h3>

              <div className="space-y-4 text-[var(--text-secondary)] text-left">
                <p className="leading-relaxed">
                  At Waglogy, we built our model on a scaling-first approach:
                </p>

                <ul className="space-y-3 ml-2">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Start small with only the essentials you need today (a website, branding, or simple tools).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Expand your digital presence as your business grows (apps, automation, software).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Integrate AI-powered solutions when you're ready to scale big—without re-investing or starting over.</span>
                  </li>
                </ul>

                <p className="leading-relaxed pt-4 border-t border-[rgba(255,255,255,0.1)] mt-4">
                  This means businesses can go digital without fear—no huge upfront payments, no wasted services, just growth-aligned technology that evolves with them.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How We Help Businesses */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-left">How We Help Businesses</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl border-t-4 border-blue-400 hover:-translate-y-2 transition-transform duration-300">
                <h4 className="font-bold text-white mb-3 text-lg">For Startups</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-left">
                  We create the digital foundation (modern website, branding, and online presence) at an affordable cost, so they can launch quickly and confidently.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border-t-4 border-purple-400 hover:-translate-y-2 transition-transform duration-300">
                <h4 className="font-bold text-white mb-3 text-lg">For Growing SMEs</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-left">
                  As businesses expand, we provide apps, custom software, automation tools, and integrations to help them scale operations smoothly.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border-t-4 border-cyan-400 hover:-translate-y-2 transition-transform duration-300">
                <h4 className="font-bold text-white mb-3 text-lg">For Enterprises</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-left">
                  We implement AI-driven solutions, advanced automations, and data intelligence to reduce costs, boost efficiency, and maintain a competitive edge.
                </p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] leading-relaxed italic mt-8 text-center">
              No matter the stage, we ensure that technology is not a barrier but a growth enabler.
            </p>
          </motion.div>

          {/* The Waglogy Difference */}
          <motion.div
            className="glass-card p-8 sm:p-10 rounded-2xl border border-[rgba(255,255,255,0.1)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-left">The Waglogy Difference</h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { title: "Pay-as-you-grow", desc: "Invest only in what you need, when you need it." },
                { title: "Practical for India", desc: "Designed for startups and SMEs who want results without overspending." },
                { title: "Future-ready", desc: "Solutions built with the latest frameworks and AI, ready to scale anytime." },
                { title: "Partnership mindset", desc: "We don't just deliver services; we grow with your business." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                    ✓
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white mb-1">{item.title}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 bg-[var(--bg-card)] border-t border-[rgba(255,255,255,0.05)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Our USP – <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Start Small. Scale Smart. Pay as You Grow.</span>
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-3xl mx-auto">
              Most businesses don't need every feature or system at the beginning. Investing in "everything at once" often means higher costs and wasted resources. That's where we stand apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-6 rounded-xl hover:border-blue-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Build Your Foundation First</h3>
              <p className="text-[var(--text-secondary)]">
                Website, branding, and essential tools to establish your digital presence.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Add Advanced Features</h3>
              <p className="text-[var(--text-secondary)]">
                Apps, automation, integrations, as your business expands and requirements grow.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:border-cyan-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Leverage AI & Automation</h3>
              <p className="text-[var(--text-secondary)]">
                When ready, we integrate intelligent solutions to maximize efficiency and reduce costs.
              </p>
            </div>
          </div>

          <p className="mt-12 text-center text-[var(--text-primary)] font-medium">
            With Tech Waglogy, you only pay for what you need when you need it—helping you stay efficient, lean, and growth-focused.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Why Choose Tech Waglogy LLP?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              We combine innovation, expertise, and a client-first approach to deliver technology solutions that truly make a difference.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {[
              { icon: FaChartLine, title: "Scalable Growth Model", desc: "Our unique pay-as-you-grow approach means you invest only in what you need today, then scale features as your business expands—no wasteful spending.", color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: FaLaptopCode, title: "Cutting-Edge Technology", desc: "We leverage the latest technologies—React, Next.js, Flutter, AI integrations, and cloud infrastructure—to build future-proof solutions.", color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: FaPalette, title: "Design + Development", desc: "Beautiful UI/UX design meets robust development. We create technology that's not just functional but delightful to use.", color: "text-pink-400", bg: "bg-pink-500/10" },
              { icon: FaRupeeSign, title: "Affordable & Practical", desc: "Specifically designed for the Indian market—startups and SMEs get enterprise-level solutions at costs that make business sense.", color: "text-green-400", bg: "bg-green-500/10" },
              { icon: FaHandshake, title: "Long-Term Partnership", desc: "We're not just vendors—we're growth partners. Your success is our success, and we're committed to supporting you at every step.", color: "text-yellow-400", bg: "bg-yellow-500/10" },
              { icon: FaClock, title: "Fast & Reliable Delivery", desc: "We understand time is money. Our agile process ensures quick turnarounds without compromising on quality or security.", color: "text-cyan-400", bg: "bg-cyan-500/10" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl hover:border-opacity-50 transition-all text-left group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 ${item.bg} group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="glass-card border-l-4 border-blue-500 p-8 rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">Our Promise</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              At Tech Waglogy LLP, we don't just create websites, apps, or software—we build digital journeys that evolve with your business. Every solution is crafted to adapt, scale, and deliver measurable impact, so you can focus on what matters most: growing your business.
            </p>
            <p className="text-lg font-semibold text-blue-400">
              👉 Tech Waglogy LLP – Tech that grows with you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Details Section */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-3">
              Company Information
            </h2>
            <p className="text-[var(--text-secondary)]">Legal entity details and registration information</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {/* Legal Information Card */}
            <motion.div
              className="glass-card p-6 rounded-xl border-t-4 border-blue-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📋</span> Legal Information
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)] min-w-[140px]">Legal Entity:</span>
                  <span className="text-sm text-[var(--text-secondary)]">TECH WAGLOGY LLP</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)] min-w-[140px]">LLPIN:</span>
                  <span className="text-sm font-mono font-medium text-blue-400">ACI-0335</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)] min-w-[140px]">Incorporation Date:</span>
                  <span className="text-sm text-[var(--text-secondary)]">June 26, 2024</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)] min-w-[140px]">Status:</span>
                  <span className="inline-flex items-center gap-1 text-sm text-green-400 font-medium">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Partners Information Card */}
            <motion.div
              className="glass-card p-6 rounded-xl border-t-4 border-purple-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>👥</span> Registered Partners
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-purple-500">
                    BS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Bhupesh Sharma</p>
                    <p className="text-xs text-[var(--text-muted)]">Co-Founder & Partner</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-purple-500">
                    AA
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Abhisek Adhikari</p>
                    <p className="text-xs text-[var(--text-muted)]">Co-Founder & Partner</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Registered Office Card */}
            <motion.div
              className="glass-card p-6 rounded-xl border-t-4 border-cyan-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🏢</span> Registered Office
              </h3>
              <div className="text-left">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  C/o Iswari Psd Sharma,<br />
                  Kokalya Chandeyn Nr Patuk,<br />
                  Kokalay, East Sikkim,<br />
                  Singtam, Sikkim, India<br />
                  <span className="font-semibold text-white">PIN: 737134</span>
                </p>
              </div>
            </motion.div>

            {/* Working/Corporate Office Card */}
            <motion.div
              className="glass-card p-6 rounded-xl border-t-4 border-green-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>💼</span> Corporate Office
              </h3>
              <div className="text-left">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  Tadong Metro Point,<br />
                  Gangtok, Sikkim<br />
                  <span className="font-semibold text-white">PIN: 737102</span>
                </p>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.1)]">
                  <p className="text-xs text-[var(--text-muted)] mb-2 font-semibold">Get in touch:</p>
                  <p className="text-sm text-[var(--text-secondary)]">📞 +91 9733814168</p>
                  <p className="text-sm text-[var(--text-secondary)]">📧 contact@waglogy.in</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  )

}

export default About;