import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=100088111282938', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  ]

  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Systems', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <footer className="relative bg-[#050811] text-slate-300 border-t border-white/5 overflow-hidden pt-20 pb-10">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* Brand & Vision Section */}
          <div className="md:col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <a href="/" className="inline-block group">
                <img
                  src="/logo.svg"
                  alt="Waglogy logo"
                  className="h-14 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </motion.div>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
              <span className="text-white font-medium">Empowering businesses</span> with future-ready digital solutions. From stunning websites to intelligent AI automation, we build the revenue systems that grow with you.
            </p>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all ${social.color} hover:text-white hover:border-transparent`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
              Explore
              <div className="h-px bg-blue-500 w-8" />
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-2 group w-fit"
                  >
                    <FaArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-6 lg:col-span-4">
            <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
              Get in Touch
              <div className="h-px bg-sky-500 w-8" />
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Our Studio</p>
                  <p className="text-slate-300 leading-snug">
                    Tadong Metro Point,<br />
                    Gangtok, Sikkim - 737102
                  </p>
                </div>
              </div>

              <a href="tel:+919733814168" className="flex items-center gap-4 group w-fit">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Call Us</p>
                  <p className="text-slate-300 group-hover:text-white transition-colors">+91 97338 14168</p>
                </div>
              </a>

              <a href="mailto:contact@waglogy.in" className="flex items-center gap-4 group w-fit">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Email Us</p>
                  <p className="text-slate-300 group-hover:text-white transition-colors">contact@waglogy.in</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-center md:text-left"
          >
            © {currentYear} <span className="text-white font-medium">Tech Waglogy LLP</span>. All rights reserved.
            <span className="mx-2 hidden md:inline">|</span>
            <br className="md:hidden" />
            Designed for the <span className="text-blue-500">Global AI Economy</span>.
          </motion.p>

          <div className="flex gap-8">
            <a href="/privacy-policy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
