import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=100088111282938', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-white' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
  ]

  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <footer className="relative bg-[#0f172a] text-slate-300 border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <a href="/" className="block mb-6">
              <span className="sr-only">Waglogy</span>
              <img src="/logo.svg" alt="Waglogy logo" className="h-16 w-auto object-contain brightness-0 invert" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-8">
              Empowering businesses with future-ready digital solutions.
              From stunning websites to intelligent AI automation, we build technology that grows with you.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`text-slate-400 transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-blue-500">📍</span>
                <span>
                  Tadong Metro Point,<br />
                  Gangtok, Sikkim - 737102
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📞</span>
                <a href="tel:+919733814168" className="hover:text-white transition-colors">
                  +91 97338 14168
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📧</span>
                <a href="mailto:contact@waglogy.in" className="hover:text-white transition-colors">
                  contact@waglogy.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Tech Waglogy LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
