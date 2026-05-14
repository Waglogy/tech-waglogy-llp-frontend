import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'

const cityLinks = [
  { name: 'Gangtok',   state: 'Sikkim',            href: '/web-development/gangtok' },
  { name: 'Sikkim',    state: 'Sikkim',            href: '/web-development/sikkim' },
  { name: 'Guwahati',  state: 'Assam',             href: '/web-development/guwahati' },
  { name: 'Shillong',  state: 'Meghalaya',         href: '/web-development/shillong' },
  { name: 'Itanagar',  state: 'Arunachal Pradesh', href: '/web-development/itanagar' },
  { name: 'Imphal',    state: 'Manipur',           href: '/web-development/imphal' },
  { name: 'Aizawl',   state: 'Mizoram',           href: '/web-development/aizawl' },
  { name: 'Kohima',    state: 'Nagaland',          href: '/web-development/kohima' },
  { name: 'Agartala',  state: 'Tripura',           href: '/web-development/agartala' },
  { name: 'Siliguri',  state: 'West Bengal',       href: '/web-development/siliguri' },
  { name: 'Darjeeling',state: 'West Bengal',       href: '/web-development/darjeeling' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Website Development', href: '/services' },
    { name: 'Mobile App Development', href: '/services' },
    { name: 'Custom Software', href: '/services' },
    { name: 'UI / UX Design', href: '/services' },
    { name: 'AI Integration', href: '/services' },
    { name: 'IT Consulting', href: '/services' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ]

  const social = [
    { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=100088111282938', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/waglogy/', label: 'Instagram' },
    { icon: FaLinkedin, href: 'https://in.linkedin.com/company/waglogy', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/919733814168', label: 'WhatsApp' },
  ]

  return (
    <footer className="bg-[#0A0F1E] text-slate-400">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <img src="/logo.svg" alt="Waglogy" className="h-10 w-auto brightness-0 invert opacity-90" />
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Tech Waglogy LLP is an IT company based in Gangtok, Sikkim. We build digital solutions for growing businesses across India.
            </p>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MdLocationOn size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm leading-snug">
                  Tadong Metro Point,<br />
                  Gangtok, Sikkim – 737102
                </span>
              </div>
              <a href="tel:+919733814168" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <MdPhone size={16} className="text-blue-400 shrink-0" />
                +91 97338 14168
              </a>
              <a href="mailto:contact@waglogy.in" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <MdEmail size={16} className="text-blue-400 shrink-0" />
                contact@waglogy.in
              </a>
              <p className="text-xs text-slate-500 pt-1">Mon – Sun · 9 AM to 7 PM</p>
            </div>
          </div>
        </div>

        {/* Cities We Serve */}
        <div className="border-t border-white/5 mt-10 pt-10">
          <h4 className="text-white font-semibold text-sm mb-5">Cities We Serve</h4>
          <div className="flex flex-wrap gap-2">
            {cityLinks.map((city) => (
              <a
                key={city.href}
                href={city.href}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-colors"
              >
                {city.name}
                <span className="text-slate-600 ml-1">· {city.state}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <span>© {currentYear} Tech Waglogy LLP. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
