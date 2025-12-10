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

      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600 blur-[100px] opacity-10"
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-2xl mx-auto glass-card p-12 rounded-3xl border border-white/10"
        >
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 rounded-full animate-pulse"></div>
              <FaExclamationTriangle className="text-8xl text-blue-500 relative z-10" />
            </div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-8xl sm:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-400 mb-10 max-w-md mx-auto"
          >
            Oops! This page seems to have drifted into a black hole. Let's get you back to safety.
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
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all hover:shadow-lg shadow-blue-500/25 w-full sm:w-auto justify-center"
            >
              <FaHome className="text-xl" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:shadow-lg w-full sm:w-auto justify-center"
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
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-slate-500 mb-4 uppercase tracking-widest">Helpful Links</p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Services', 'Projects', 'Values', 'Contact'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-slate-400 hover:text-blue-400 font-medium transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound
