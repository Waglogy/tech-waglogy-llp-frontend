import React from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaCheckCircle, FaHandshake, FaBolt, FaBuilding } from 'react-icons/fa'

/**
 * Service Area Component - Highlights Sikkim and Northeast India coverage
 * Optimized for local SEO - Dark Mode / Glassmorphism
 */
const ServiceArea = () => {
  const primaryAreas = [
    { name: 'Gangtok, Sikkim', description: 'Our headquarters - Complete IT solutions', isPrimary: true },
    { name: 'Sikkim State', description: 'Serving all districts across Sikkim', isPrimary: true },
    { name: 'Darjeeling', description: 'Web & app development services', isPrimary: false },
    { name: 'Kalimpong', description: 'Digital solutions for local businesses', isPrimary: false },
    { name: 'Siliguri', description: 'Complete web & mobile development', isPrimary: false },
    { name: 'Northeast India', description: 'Assam, Meghalaya, Arunachal Pradesh', isPrimary: false }
  ]

  const services = [
    'Local Sikkim businesses', 'Tourism & Hospitality', 'E-commerce & Retail',
    'Education & Healthcare', 'Government & NGOs', 'Startups & Enterprises'
  ]

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Proudly Serving <span className="text-blue-500">Sikkim</span> & Northeast India
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            Based in Gangtok, we're your local technology partner providing world-class web development,
            mobile app development, and AI solutions across neighboring regions.
          </p>
        </motion.div>

        {/* Service Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {primaryAreas.map((area, index) => (
            <motion.div
              key={index}
              className={`glass-card p-6 rounded-xl border-l-4 ${area.isPrimary ? 'border-blue-500' : 'border-slate-500'
                } hover:bg-white/5 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className={`w-6 h-6 flex-shrink-0 mt-1 ${area.isPrimary ? 'text-blue-500' : 'text-slate-500'}`} />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{area.name}</h3>
                  <p className="text-sm text-slate-400">{area.description}</p>
                  {area.isPrimary && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full">
                      Primary Service Area
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industries We Serve */}
        <motion.div
          className="glass-panel rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">Industries We Serve</h3>
            <p className="text-slate-400">Tailored digital solutions for every sector.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <FaCheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-slate-300 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Local Advantage */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-blue-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl p-8 text-white text-center border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Why Choose a Local Sikkim Company?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaHandshake className="text-xl" />
                <h4 className="font-semibold text-lg">Local Understanding</h4>
              </div>
              <p className="text-sm opacity-90">We know the local market dynamics better than anyone.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaBolt className="text-xl" />
                <h4 className="font-semibold text-lg">Quick Response</h4>
              </div>
              <p className="text-sm opacity-90">Same timezone, faster support, and easier communication.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaBuilding className="text-xl" />
                <h4 className="font-semibold text-lg">Support Local</h4>
              </div>
              <p className="text-sm opacity-90">Contribute to the growth of the Sikkim tech ecosystem.</p>
            </div>
          </div>

          <div className="mt-8">
            <a href="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all">
              Get Free Consultation
            </a>
          </div>
        </motion.div>

        {/* Visit Us Section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400 mb-4">
            <strong className="text-white">Visit Our Office:</strong> Tadong Metro Point, Gangtok, Sikkim - 737102
          </p>
          <p className="text-slate-500 text-sm">
            📞 <a href="tel:+919733814168" className="hover:text-blue-400 transition-colors">+91 9733814168</a>
            {' '} | {' '}
            📧 <a href="mailto:contact@waglogy.in" className="hover:text-blue-400 transition-colors">contact@waglogy.in</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceArea
