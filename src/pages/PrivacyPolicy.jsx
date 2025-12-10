import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const PrivacyPolicy = () => {
  return (
    <>
      <SEO title="Privacy Policy - Waglogy" description="Our commitment to your privacy." />

      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] min-h-screen text-slate-300 relative overflow-hidden">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-12 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Policy</span>
            </h1>
            <p className="text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0f172a]/40 backdrop-blur-xl shadow-2xl">
              <div className="prose prose-invert prose-lg max-w-none text-slate-300">

                <h2 className="text-white">1. Introduction</h2>
                <p>
                  Waglogy Tech LLP ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://waglogy.in" className="text-blue-400 hover:text-blue-300">waglogy.in</a> or use our services.
                </p>

                <h2 className="text-white">2. Information We Collect</h2>
                <h3 className="text-white">2.1 Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="marker:text-blue-500">
                  <li>Fill out contact forms or request quotes</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Communicate with us via email or phone</li>
                  <li>Use our services or enter into a contract with us</li>
                </ul>

                <h3 className="text-white">2.2 Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information regarding your visit, such as IP address, browser type, and operating system.</p>

                <h2 className="text-white">3. How We Use Your Information</h2>
                <ul className="marker:text-blue-500">
                  <li>Providing and improving our services</li>
                  <li>Responding to your inquiries and requests</li>
                  <li>Sending updates about our services and company news</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h2 className="text-white">4. Information Sharing</h2>
                <p>We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our website and conducting our business.</p>

                <h2 className="text-white">5. Data Security</h2>
                <p>We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

                <h2 className="text-white">6. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 not-prose">
                  <p className="mb-2"><strong className="text-white">Waglogy Tech LLP</strong></p>
                  <p className="mb-2 text-slate-400">Email: <a href="mailto:privacy@waglogy.in" className="text-blue-400">privacy@waglogy.in</a></p>
                  <p className="text-slate-400">General: <a href="mailto:contact@waglogy.in" className="text-blue-400">contact@waglogy.in</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default PrivacyPolicy
