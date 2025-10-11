import React from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'

/**
 * Service Area Component - Highlights Sikkim and Northeast India coverage
 * Optimized for local SEO
 */
const ServiceArea = () => {
  const primaryAreas = [
    {
      name: 'Gangtok, Sikkim',
      description: 'Our headquarters - Complete IT solutions',
      isPrimary: true
    },
    {
      name: 'Sikkim State',
      description: 'Serving all districts across Sikkim',
      isPrimary: true
    },
    {
      name: 'Darjeeling',
      description: 'Web & app development services',
      isPrimary: false
    },
    {
      name: 'Kalimpong',
      description: 'Digital solutions for local businesses',
      isPrimary: false
    },
    {
      name: 'Siliguri',
      description: 'Complete web & mobile development',
      isPrimary: false
    },
    {
      name: 'Northeast India',
      description: 'Assam, Meghalaya, Arunachal Pradesh & more',
      isPrimary: false
    }
  ]

  const services = [
    'Local Sikkim businesses',
    'Tourism & Hospitality sector',
    'E-commerce & Retail',
    'Education & Healthcare',
    'Government & NGOs',
    'Startups & Enterprises'
  ]

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Proudly Serving <span style={{ color: 'var(--brand-primary)' }}>Sikkim</span> & Northeast India
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Based in Gangtok, we're your local technology partner providing world-class web development, 
            mobile app development, and AI solutions across Sikkim and neighboring regions.
          </p>
        </motion.div>

        {/* Service Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {primaryAreas.map((area, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 ${
                area.isPrimary ? 'border-blue-500' : 'border-purple-400'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt 
                  className={`w-6 h-6 flex-shrink-0 mt-1 ${
                    area.isPrimary ? 'text-blue-500' : 'text-purple-500'
                  }`} 
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{area.name}</h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                  {area.isPrimary && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
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
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Industries We Serve in Sikkim & Northeast
            </h3>
            <p className="text-gray-600">
              From local businesses to enterprises, we provide tailored digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Local Advantage */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Why Choose a Local Sikkim Company?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-lg mb-2">🤝 Local Understanding</h4>
              <p className="text-sm opacity-90">
                We understand the unique needs of Sikkim and Northeast India businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">⚡ Quick Response</h4>
              <p className="text-sm opacity-90">
                Same timezone, faster communication, and in-person meetings when needed
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">💼 Support Local Economy</h4>
              <p className="text-sm opacity-90">
                Partner with a Sikkim-based company and contribute to local growth
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-shadow"
            >
              Get Free Consultation
            </a>
          </div>
        </motion.div>

        {/* Visit Us Section */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-700 mb-4">
            <strong>Visit Our Office:</strong> Tadong Metro Point, Gangtok, Sikkim - 737102
          </p>
          <p className="text-gray-600 text-sm">
            📞 Call us: <a href="tel:+919733814168" className="font-semibold hover:underline" style={{ color: 'var(--brand-primary)' }}>+91 9733814168</a>
            {' '} | {' '}
            📧 Email: <a href="mailto:contact@waglogy.in" className="font-semibold hover:underline" style={{ color: 'var(--brand-primary)' }}>contact@waglogy.in</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceArea

