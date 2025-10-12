import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full"></div>
              <FaExclamationTriangle className="text-9xl text-blue-600 relative z-10" />
            </div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          >
            Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
            Let's get you back on track!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105 w-full sm:w-auto justify-center"
            >
              <FaHome className="text-xl" />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all hover:shadow-md w-full sm:w-auto justify-center"
            >
              <FaArrowLeft className="text-xl" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">Or explore these pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/services"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Services
              </Link>
              <Link
                to="/projects"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Projects
              </Link>
              <Link
                to="/blog"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound

