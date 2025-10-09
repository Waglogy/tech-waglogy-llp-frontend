import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhone, FaChevronDown } from 'react-icons/fa'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
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
    <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
                <a className="block" href="/">
                <span className="sr-only">Home</span>
                <div className="h-20 overflow-hidden">
                  <img src="/logo.png" alt="Waglogy logo" className="h-28 w-auto object-cover object-center" />
                </div>
                </a>
            </div>

            <div className="hidden md:block">
                <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                    <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/about"> About </a>
                    </li>

                    <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/contact"> Contact Us </a>
                    </li>

                    <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/pricing"> Pricing </a>
                    </li>

                    <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/services"> Services </a>
                    </li>

                    {/* <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/projects"> Projects </a>
                    </li> */}

                    <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/blog"> Blog </a>
                    </li>
                </ul>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                <button
                    onClick={handleGetQuote}
                    className="rounded-md px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                    Get a Quote
                </button>

                <div className="hidden sm:flex relative" ref={dropdownRef}>
                    <button
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                    style={{ color: 'var(--brand-primary)' }}
                    onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                    >
                    Contact Us
                    <FaChevronDown className={`w-3 h-3 transition-transform ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isContactDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsContactDropdownOpen(false)}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                            <FaWhatsapp className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                            <p className="text-xs text-gray-500">9733814168</p>
                          </div>
                        </a>

                        {/* Call */}
                        <a
                          href="tel:9733814168"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsContactDropdownOpen(false)}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <FaPhone className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">Call Us</p>
                            <p className="text-xs text-gray-500">9733814168</p>
                          </div>
                        </a>

                        {/* Email */}
                        <a
                          href="mailto:contact@waglogy.in"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsContactDropdownOpen(false)}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                            <FaEnvelope className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">Email</p>
                            <p className="text-xs text-gray-500">contact@waglogy.in</p>
                          </div>
                        </a>
                      </div>
                    )}
                </div>
                </div>

                <div className="block md:hidden">
                <button
                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
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
    </>
  )
}

export default Header
