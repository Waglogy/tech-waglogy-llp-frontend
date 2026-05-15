import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { trackPhoneClick, trackWhatsappClick } from '../utils/track'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleGetQuote = () => {
    if (location.pathname === '/contact') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/contact?quote=true')
    }
  }

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Insights', path: '/insights' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E2DC] shadow-sm'
            : 'bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">

            <a href="/" className="flex items-center shrink-0">
              <img src="/logo.png" alt="Waglogy" className="h-11 w-auto" />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-[#3D3A36] hover:text-[#0C0C0C] hover:bg-[#F0EDE8]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919733814168"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick('header_desktop')}
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E2DC] text-[#6E6B67] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={16} />
              </a>

              <button
                onClick={handleGetQuote}
                className="hidden sm:block btn-primary text-sm py-2.5 px-5"
              >
                Get a Quote
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg border border-[#E5E2DC] text-[#3D3A36] hover:bg-[#F0EDE8] transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-[#E5E2DC] shadow-xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#E5E2DC]">
                <img src="/logo.svg" alt="Waglogy" className="h-9 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F0EDE8] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`block px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-[#3D3A36] hover:bg-[#F5F4F0] hover:text-[#0C0C0C]'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="p-4 border-t border-[#E5E2DC] space-y-3">
                <button
                  onClick={() => { handleGetQuote(); setIsMobileMenuOpen(false) }}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Get a Quote
                </button>
                <div className="flex gap-5 justify-center pt-1">
                  <a href="https://wa.me/919733814168" target="_blank" rel="noopener noreferrer"
                    onClick={() => trackWhatsappClick('header_mobile_menu')}
                    className="text-[#6E6B67] hover:text-[#25D366] transition-colors">
                    <FaWhatsapp size={20} />
                  </a>
                  <a href="tel:+919733814168"
                    onClick={() => trackPhoneClick('header_mobile_menu')}
                    className="text-[#6E6B67] hover:text-blue-600 transition-colors">
                    <FaPhone size={18} />
                  </a>
                  <a href="mailto:contact@waglogy.in" className="text-[#6E6B67] hover:text-blue-600 transition-colors">
                    <FaEnvelope size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
