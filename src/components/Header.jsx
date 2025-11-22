import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhone, FaChevronDown } from 'react-icons/fa'

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
    // If we're on the contact page, scroll to the form
    if (location.pathname === '/contact') {
      const contactForm = document.getElementById('contact-form')
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' })
        // Focus on the first input field after scrolling
        setTimeout(() => {
          const nameInput = document.getElementById('name')
          if (nameInput) {
            nameInput.focus()
          }
        }, 800)
      }
    } else {
      // Navigate to contact page with quote parameter
      navigate('/contact?quote=true')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block" href="/">
                <span className="sr-only">Home</span>
                <div className="h-20 flex items-center">
                  {/* Assuming logo might need a background or filter if it's dark text on transparent */}
                  <img src="/logo.png" alt="Waglogy logo" className="h-16 w-auto object-contain" />
                </div>
              </a>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-8 text-sm font-medium">
                  <li>
                    <a className="text-[var(--text-secondary)] transition hover:text-[var(--brand-accent)]" href="/about"> About </a>
                  </li>

                  <li>
                    <a className="text-[var(--text-secondary)] transition hover:text-[var(--brand-accent)]" href="/contact"> Contact </a>
                  </li>

                  <li>
                    <a className="text-[var(--text-secondary)] transition hover:text-[var(--brand-accent)]" href="/pricing"> Pricing </a>
                  </li>

                  <li>
                    <a className="text-[var(--text-secondary)] transition hover:text-[var(--brand-accent)]" href="/services"> Services </a>
                  </li>

                  <li>
                    <a className="text-[var(--text-secondary)] transition hover:text-[var(--brand-accent)]" href="/blog"> Blog </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button
                  onClick={handleGetQuote}
                  className="hidden sm:block rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
                >
                  Get a Quote
                </button>

                <div className="hidden sm:flex relative" ref={dropdownRef}>
                  <button
                    className="rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.1)] transition-colors flex items-center gap-2"
                    onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  >
                    Contact Us
                    <FaChevronDown className={`w-3 h-3 transition-transform ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isContactDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 glass-card rounded-xl shadow-2xl border border-[rgba(255,255,255,0.1)] py-2 z-50 overflow-hidden">
                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                          <FaWhatsapp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">WhatsApp</p>
                          <p className="text-xs text-[var(--text-muted)]">Chat with us</p>
                        </div>
                      </a>

                      {/* Call */}
                      <a
                        href="tel:9733814168"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                          <FaPhone className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">Call Us</p>
                          <p className="text-xs text-[var(--text-muted)]">+91 97338 14168</p>
                        </div>
                      </a>

                      {/* Email */}
                      <a
                        href="mailto:contact@waglogy.in"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
                        onClick={() => setIsContactDropdownOpen(false)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                          <FaEnvelope className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">Email</p>
                          <p className="text-xs text-[var(--text-muted)]">contact@waglogy.in</p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="block md:hidden mobile-menu-container">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-md bg-[rgba(255,255,255,0.05)] p-2 text-[var(--text-primary)] transition hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-[rgba(255,255,255,0.1)] shadow-lg relative z-50 mobile-menu-dropdown">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <nav className="space-y-2">
              <a
                href="/about"
                className="block px-4 py-3 text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="block px-4 py-3 text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </a>
              <a
                href="/pricing"
                className="block px-4 py-3 text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="/services"
                className="block px-4 py-3 text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/blog"
                className="block px-4 py-3 text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
            </nav>

            {/* Contact Options */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 px-2">Get in Touch</h3>
              <div className="space-y-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                    <FaWhatsapp className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">WhatsApp</p>
                    <p className="text-xs text-[var(--text-muted)]">Chat with us</p>
                  </div>
                </a>

                {/* Call */}
                <a
                  href="tel:9733814168"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20">
                    <FaPhone className="w-3 h-3 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Call Us</p>
                    <p className="text-xs text-[var(--text-muted)]">+91 97338 14168</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@waglogy.in"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20">
                    <FaEnvelope className="w-3 h-3 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Email</p>
                    <p className="text-xs text-[var(--text-muted)]">contact@waglogy.in</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Get Quote Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  handleGetQuote()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full rounded-full px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
