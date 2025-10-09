import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

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

                <div className="hidden sm:flex">
                    <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium hover:bg-gray-200 transition-colors"
                    style={{ color: 'var(--brand-primary)' }}
                    href="https://wa.me/919733814168?text=Hi%20Waglogy%20Team!%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project%20requirements.%20Please%20let%20me%20know%20when%20you%20can%20schedule%20a%20call.%20Thank%20you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Contact Us
                    </a>
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
