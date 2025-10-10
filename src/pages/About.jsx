import react from 'react'
import { motion } from 'framer-motion'
import { FaChartLine, FaLaptopCode, FaPalette, FaHandshake, FaRupeeSign, FaClock } from 'react-icons/fa'

const About = () => {

  return (

    <>
    <div
      className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8 mb-12"
    >
      <motion.div 
        className="max-w-3xl text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-gray-900 sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
         About Us 
          {/* <span style={{ color: 'var(--brand-primary)' }}> Tech Waglogy LLP</span> */}
        </motion.h1>

        <motion.p 
          className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Founded in 2024, Tech Waglogy LLP was born from a vision to transform how businesses in India embrace digital technology. What began as a passionate team of developers has today evolved into a full-service technology partner for startups, SMEs, and enterprises across India.
        </motion.p>

        <motion.p 
          className="mt-3 text-base text-pretty text-gray-700 sm:text-lg/relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          At Tech Waglogy, we believe that technology should empower growth, not overwhelm it. That's why we design every solution to be modern, scalable, and cost-effective. We're proudly registered in Sikkim and serve clients nationwide with our innovative growth-friendly approach.
        </motion.p>

        <motion.div 
          className="mt-6 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm font-semibold text-gray-900">Status:</span>
            <span className="text-sm text-green-600 font-medium">● Active</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm font-semibold text-gray-900">LLPIN:</span>
            <span className="text-sm font-mono" style={{ color: 'var(--brand-primary)' }}>ACI-0335</span>
          </div>
        </motion.div>
      </motion.div>
  
      <motion.div 
        className="mx-auto hidden max-w-md md:block"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img src="/8.png" alt="Waglogy banner" className="w-full h-auto object-contain" />
      </motion.div>
    </div>

{/* Mission & Vision Section */}
<section className="py-12 bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-left hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4" style={{ color: 'var(--brand-primary)' }}>Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          To empower businesses with modern technology solutions that are accessible, scalable, and impactful, ensuring growth at every stage of their journey.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-left hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4" style={{ color: 'var(--brand-primary)' }}>Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          To become India's most trusted digital growth partner, helping businesses turn ideas into sustainable digital success stories through innovation, design, and AI.
        </p>
      </motion.div>
    </div>
  </div>
</section>
    
    <section className="py-12 bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    
    {/* Introduction */}
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6 text-center" style={{ color: 'var(--brand-primary)' }}>
        Why We Founded Waglogy – And How We Help Businesses Grow
      </h2>
    </motion.div>

    {/* Story Section with Image */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
      <motion.div 
        className="order-2 lg:order-1"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-6 text-gray-700 text-left">
            <p className="leading-relaxed">
              Every business has a story—and ours begins with a simple question:
            </p>

            <p className="text-lg font-medium italic" style={{ color: 'var(--brand-primary)' }}>
              💡 "Why should technology feel like a burden, when it has the power to make business easier?"
            </p>

            <p className="leading-relaxed">
              When we started Waglogy LLP in 2024, we saw a common struggle among startups, small businesses, and even growing enterprises in India. They all wanted to go digital—launch websites, create apps, automate workflows, and embrace AI—but they were held back by high costs, unnecessary complexity, and one-size-fits-all solutions.
            </p>

            <p className="leading-relaxed">
              We realized that most companies were being asked to buy everything upfront—even services they didn't need at the start. This created two problems:
            </p>

            <ul className="list-disc list-inside space-y-2 text-left">
              <li>Heavy initial investment that small businesses could not afford.</li>
              <li>Wasted resources on features that remained unused for months or years.</li>
            </ul>

            <p className="leading-relaxed">
              That's when we asked ourselves: <span className="font-semibold">"What if technology worked differently? What if it grew alongside the business, step by step?"</span>
            </p>

            <p className="leading-relaxed font-semibold" style={{ color: 'var(--brand-primary)' }}>
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
        <img
          src="/9.png"
          className="rounded-lg shadow-lg w-full h-auto object-cover"
          alt="Tech team collaboration"
        />
      </motion.div>
    </div>

    {/* Purpose Section */}
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left" style={{ color: 'var(--brand-primary)' }}>Our Purpose – Technology That Grows With You</h3>

        <div className="space-y-4 text-gray-700 text-left">
          <p className="leading-relaxed">
            At Waglogy, we built our model on a scaling-first approach:
          </p>

          <ul className="list-disc list-inside space-y-2 text-left ml-4">
            <li>Start small with only the essentials you need today (a website, branding, or simple tools).</li>
            <li>Expand your digital presence as your business grows (apps, automation, software).</li>
            <li>Integrate AI-powered solutions when you're ready to scale big—without re-investing or starting over.</li>
          </ul>

          <p className="leading-relaxed">
            This means businesses can go digital without fear—no huge upfront payments, no wasted services, just growth-aligned technology that evolves with them.
          </p>
        </div>
      </div>
    </motion.div>

    {/* How We Help Businesses */}
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">How We Help Businesses</h3>
      <p className="text-gray-700 leading-relaxed mb-6 text-left">
        We support companies in every stage of their journey:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
          <h4 className="font-semibold text-gray-900 mb-3 text-lg">For Startups</h4>
          <p className="text-sm text-gray-700 leading-relaxed text-left">
            We create the digital foundation (modern website, branding, and online presence) at an affordable cost, so they can launch quickly and confidently.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
          <h4 className="font-semibold text-gray-900 mb-3 text-lg">For Growing SMEs</h4>
          <p className="text-sm text-gray-700 leading-relaxed text-left">
            As businesses expand, we provide apps, custom software, automation tools, and integrations to help them scale operations smoothly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
          <h4 className="font-semibold text-gray-900 mb-3 text-lg">For Enterprises</h4>
          <p className="text-sm text-gray-700 leading-relaxed text-left">
            We implement AI-driven solutions, advanced automations, and data intelligence to reduce costs, boost efficiency, and maintain a competitive edge.
          </p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed italic mt-6 text-center">
        No matter the stage, we ensure that technology is not a barrier but a growth enabler.
      </p>
    </motion.div>

    {/* The Waglogy Difference */}
    <motion.div 
      className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left" style={{ color: 'var(--brand-primary)' }}>The Waglogy Difference</h3>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
        <motion.div 
          className="flex items-start gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <span className="text-2xl flex-shrink-0">✅</span>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Pay-as-you-grow</p>
            <p className="text-sm text-gray-600">Invest only in what you need, when you need it.</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-start gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <span className="text-2xl flex-shrink-0">✅</span>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Practical for India</p>
            <p className="text-sm text-gray-600">Designed for startups and SMEs who want results without overspending.</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-start gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <span className="text-2xl flex-shrink-0">✅</span>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Future-ready</p>
            <p className="text-sm text-gray-600">Solutions built with the latest frameworks and AI, ready to scale anytime.</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-start gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <span className="text-2xl flex-shrink-0">✅</span>
          <div className="text-left">
            <p className="font-semibold text-gray-900">Partnership mindset</p>
            <p className="text-sm text-gray-600">We don't just deliver services; we grow with your business.</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>

  </div>
</section>

{/* USP Section */}
<section className="bg-gray-50 py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Our USP – <span style={{ color: 'var(--brand-primary)' }}>Start Small. Scale Smart. Pay as You Grow.</span>
      </h2>
      <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
        Most businesses don't need every feature or system at the beginning. Investing in "everything at once" often means higher costs and wasted resources. That's where we stand apart.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Your Foundation First</h3>
        <p className="text-gray-700">
          Website, branding, and essential tools to establish your digital presence.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Add Advanced Features</h3>
        <p className="text-gray-700">
          Apps, automation, integrations, as your business expands and requirements grow.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Leverage AI & Automation</h3>
        <p className="text-gray-700">
          When ready, we integrate intelligent solutions to maximize efficiency and reduce costs.
        </p>
      </div>
    </div>

    <p className="mt-8 text-center text-gray-700 font-medium">
      With Tech Waglogy, you only pay for what you need when you need it—helping you stay efficient, lean, and growth-focused.
    </p>
  </div>
</section>

{/* Why Choose Us Section */}
<section className="bg-gray-50 py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="text-center mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
        Why Choose Tech Waglogy LLP?
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
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
      {/* Scalable Growth Model */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaChartLine className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Scalable Growth Model</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Our unique pay-as-you-grow approach means you invest only in what you need today, then scale features as your business expands—no wasteful spending.
        </p>
      </motion.div>

      {/* Cutting-Edge Technology */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaLaptopCode className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Cutting-Edge Technology</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          We leverage the latest technologies—React, Next.js, Flutter, AI integrations, and cloud infrastructure—to build future-proof solutions.
        </p>
      </motion.div>

      {/* Design + Development Expertise */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaPalette className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Design + Development Expertise</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Beautiful UI/UX design meets robust development. We create technology that's not just functional but delightful to use.
        </p>
      </motion.div>

      {/* Affordable & Practical */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaRupeeSign className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Affordable & Practical</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Specifically designed for the Indian market—startups and SMEs get enterprise-level solutions at costs that make business sense.
        </p>
      </motion.div>

      {/* Long-Term Partnership */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaHandshake className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Long-Term Partnership</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          We're not just vendors—we're growth partners. Your success is our success, and we're committed to supporting you at every step.
        </p>
      </motion.div>

      {/* Fast Turnaround */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaClock className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Fast & Reliable Delivery</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          We understand time is money. Our agile process ensures quick turnarounds without compromising on quality or security.
        </p>
      </motion.div>
    </motion.div>
  </div>
</section>

{/* Our Promise Section */}
<section className="py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="bg-white border-l-4 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
      style={{ borderLeftColor: 'var(--brand-primary)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">Our Promise</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        At Tech Waglogy LLP, we don't just create websites, apps, or software—we build digital journeys that evolve with your business. Every solution is crafted to adapt, scale, and deliver measurable impact, so you can focus on what matters most: growing your business.
      </p>
      <p className="text-lg font-semibold" style={{ color: 'var(--brand-primary)' }}>
        👉 Tech Waglogy LLP – Tech that grows with you.
      </p>
    </motion.div>
  </div>
</section>

{/* Company Details Section */}
<section className="bg-gray-50 py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
        Company Information
      </h2>
      <p className="text-gray-600">Legal entity details and registration information</p>
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
        className="bg-white p-6 rounded-lg shadow-md border-t-4 hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📋</span> Legal Information
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-sm font-semibold text-gray-900 min-w-[140px]">Legal Entity:</span>
            <span className="text-sm text-gray-700">TECH WAGLOGY LLP</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-sm font-semibold text-gray-900 min-w-[140px]">LLPIN:</span>
            <span className="text-sm font-mono font-medium" style={{ color: 'var(--brand-primary)' }}>ACI-0335</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-sm font-semibold text-gray-900 min-w-[140px]">Incorporation Date:</span>
            <span className="text-sm text-gray-700">June 26, 2024</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-sm font-semibold text-gray-900 min-w-[140px]">Status:</span>
            <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Active
            </span>
          </div>
        </div>
      </motion.div>

      {/* Partners Information Card */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md border-t-4 hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>👥</span> Registered Partners
        </h3>
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--brand-primary)' }}>
              BS
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Bhupesh Sharma</p>
              <p className="text-xs text-gray-500">Co-Founder & Partner</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--brand-primary)' }}>
              AA
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Abhisek Adhikari</p>
              <p className="text-xs text-gray-500">Co-Founder & Partner</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Registered Office Card */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md border-t-4 hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏢</span> Registered Office
        </h3>
        <div className="text-left">
          <p className="text-sm text-gray-700 leading-relaxed">
            C/o Iswari Psd Sharma,<br />
            Kokalya Chandeyn Nr Patuk,<br />
            Kokalay, East Sikkim,<br />
            Singtam, Sikkim, India<br />
            <span className="font-semibold">PIN: 737134</span>
          </p>
        </div>
      </motion.div>

      {/* Working/Corporate Office Card */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md border-t-4 hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>💼</span> Corporate Office
        </h3>
        <div className="text-left">
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Tadong Metro Point,<br />
            Gangtok, Sikkim<br />
            <span className="font-semibold">PIN: 737102</span>
          </p>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Get in touch:</p>
            <p className="text-sm text-gray-700">📞 +91 9733814168</p>
            <p className="text-sm text-gray-700">📧 contact@waglogy.in</p>
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