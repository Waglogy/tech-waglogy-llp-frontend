import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const TermsConditions = () => {
  return (
    <>
      <SEO title="Terms & Conditions - Waglogy" description="Rules and regulations for using Waglogy's services." />

      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] min-h-screen text-slate-300 relative overflow-hidden">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-12 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Conditions</span>
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

                <h2 className="text-white">1. Agreement to Terms</h2>
                <p>
                  These Terms and Conditions ("Terms") govern your use of our website and services provided by Waglogy Tech LLP. By accessing our website or using our services, you agree to be bound by these Terms.
                </p>

                <h2 className="text-white">2. Services</h2>
                <p>Waglogy Tech LLP provides web/app development, AI solutions, and consulting services. We reserve the right to modify or discontinue services at any time.</p>

                <h2 className="text-white">3. Client Obligations</h2>
                <ul className="marker:text-blue-500">
                  <li>Provide accurate information and requirements</li>
                  <li>Respond promptly to feedback/approvals</li>
                  <li>Make timely payments</li>
                  <li>Respect intellectual property rights</li>
                </ul>

                <h2 className="text-white">4. Payment Terms</h2>
                <p>Pricing is project-based or hourly as agreed. Invoices are due within 30 days. Late payments may incur fees.</p>

                <h2 className="text-white">5. Intellectual Property</h2>
                <p><strong>Client Ownership:</strong> You own the final deliverables upon full payment.</p>
                <p><strong>Our Rights:</strong> We retain ownership of our proprietary tools, frameworks, and pre-existing IP.</p>

                <h2 className="text-white">6. Confidentiality</h2>
                <p>Both parties agree to maintain the confidentiality of proprietary information shared during the project.</p>

                <h2 className="text-white">7. Limitation of Liability</h2>
                <p>Our liability is limited to the amount paid for the specific services. We are not liable for indirect or consequential damages.</p>

                <h2 className="text-white">8. Termination</h2>
                <p>Either party may terminate the agreement with 30 days notice, or immediately for material breach.</p>

                <h2 className="text-white">9. Governing Law</h2>
                <p>These Terms are governed by the laws of Sikkim, India.</p>

                <h2 className="text-white">10. Contact Information</h2>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 not-prose">
                  <p className="mb-2"><strong className="text-white">Waglogy Tech LLP</strong></p>
                  <p className="mb-2 text-slate-400">Legal: <a href="mailto:legal@waglogy.in" className="text-blue-400">legal@waglogy.in</a></p>
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

export default TermsConditions
