import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhone, FaChevronDown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsContactDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-dropdown')) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleGetQuote = () => {
    if (location.pathname === '/contact') {
      const contactForm = document.getElementById('contact-form')
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          const nameInput = document.getElementById('name')
          if (nameInput) nameInput.focus()
        }, 800)
      }
    } else {
      navigate('/contact?quote=true')
    }
  }

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Our Systems', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Build a System', path: '/contact' },
  ]

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4"
      >
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block" href="/">
                <span className="sr-only">Home</span>
                <div className="h-16 md:h-20 overflow-hidden flex items-center">
                  <img src="/logo.svg" alt="Waglogy logo" className="h-12 md:h-16 lg:h-20 w-auto object-contain" />
                </div>
              </a>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-8 text-sm font-medium">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-slate-300 transition hover:text-white hover:text-glow"
                        href={link.path}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetQuote}
                  className="hidden sm:block rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 bg-blue-600 hover:bg-blue-500 transition-all"
                >
                  Build Your System
                </motion.button>

                <div className="hidden sm:flex relative" ref={dropdownRef}>
                  <button
                    className="rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  >
                    Quick Connect
                    <FaChevronDown className={`w-3 h-3 transition-transform ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isContactDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-64 glass-card rounded-xl border border-white/10 py-2 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-white/5 mb-2">
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Reach Out</p>
                        </div>

                        <a
                          href="https://wa.me/919733814168"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                            <FaWhatsapp className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">WhatsApp</p>
                            <p className="text-xs text-slate-400">Chat with us instantly</p>
                          </div>
                        </a>

                        <a
                          href="tel:9733814168"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                            <FaPhone className="w-3 h-3 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Call Us</p>
                            <p className="text-xs text-slate-400">+91 97338 14168</p>
                          </div>
                        </a>

                        <a
                          href="mailto:contact@waglogy.in"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/20 group-hover:bg-sky-500/30 transition-colors">
                            <FaEnvelope className="w-3 h-3 text-sky-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Email</p>
                            <p className="text-xs text-slate-400">contact@waglogy.in</p>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="block md:hidden mobile-menu-container">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-lg bg-white/5 p-2 text-white transition hover:bg-white/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#0f172a] border-l border-white/10 shadow-2xl p-6 mobile-menu-dropdown flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <img src="/logo.png" alt="Waglogy" className="h-10 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-4 pt-8 border-t border-white/10">
              <button
                onClick={() => {
                  handleGetQuote()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white shadow-lg bg-blue-600 hover:bg-blue-500 transition-all"
              >
                Build Your System
              </button>

              <div className="flex justify-center gap-6 pt-4">
                <a href="https://wa.me/919733814168" className="text-slate-400 hover:text-cyan-400 transition-colors"><FaWhatsapp size={24} /></a>
                <a href="tel:9733814168" className="text-slate-400 hover:text-blue-400 transition-colors"><FaPhone size={20} /></a>
                <a href="mailto:contact@waglogy.in" className="text-slate-400 hover:text-sky-400 transition-colors"><FaEnvelope size={22} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  )
}

export default Header
