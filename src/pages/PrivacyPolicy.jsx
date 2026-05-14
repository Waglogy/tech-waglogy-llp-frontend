import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' }
  })
}

const lastUpdated = new Date().toLocaleDateString('en-IN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const sections = [
  {
    title: '1. Introduction',
    body: (
      <>
        <p>Tech Waglogy LLP ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit <a href="https://waglogy.in" className="text-blue-600 hover:underline">waglogy.in</a> or engage us for any of our services.</p>
        <p>By using our website or services, you agree to the practices described in this policy. If you disagree with any part, please do not use our services.</p>
      </>
    ),
  },
  {
    title: '2. Information We Collect',
    body: (
      <>
        <p className="font-semibold text-[#0C0C0C]">Information you provide directly:</p>
        <ul>
          <li>Name, email address, and phone number submitted via contact or quote forms</li>
          <li>Company name and project details you share during our discovery process</li>
          <li>Payment information processed securely through our payment partners (we do not store card details)</li>
        </ul>
        <p className="font-semibold text-[#0C0C0C] mt-4">Information collected automatically:</p>
        <ul>
          <li>IP address, browser type, and device information</li>
          <li>Pages visited and time spent on site (via analytics tools)</li>
          <li>Referral source (how you found us)</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. How We Use Your Information',
    body: (
      <ul>
        <li>To respond to your enquiries and provide the services you have requested</li>
        <li>To send project updates, invoices, and communications related to your engagement with us</li>
        <li>To improve our website experience and understand how visitors use our services</li>
        <li>To comply with legal obligations under applicable Indian law</li>
        <li>To send occasional service news or updates (you may opt out at any time)</li>
      </ul>
    ),
  },
  {
    title: '4. Information Sharing',
    body: (
      <>
        <p>We do not sell, trade, or rent your personal data to third parties.</p>
        <p>We may share your information only with:</p>
        <ul>
          <li><span className="font-medium text-[#0C0C0C]">Service providers</span> — hosting, analytics, or payment platforms that help us operate (bound by confidentiality agreements)</li>
          <li><span className="font-medium text-[#0C0C0C]">Legal authorities</span> — when required by law, court order, or to protect our rights</li>
        </ul>
      </>
    ),
  },
  {
    title: '5. Data Security',
    body: (
      <>
        <p>We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
        <p>No method of internet transmission is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. If you suspect any breach, please contact us immediately.</p>
      </>
    ),
  },
  {
    title: '6. Cookies',
    body: (
      <>
        <p>We use cookies to improve site performance and understand visitor behaviour. Cookies are small text files stored on your device. You can control cookie preferences through your browser settings.</p>
        <p>Disabling cookies may affect some features of our website.</p>
      </>
    ),
  },
  {
    title: '7. Your Rights',
    body: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to the personal information we hold about you</li>
          <li>Ask us to correct inaccurate data</li>
          <li>Request deletion of your data, subject to legal retention requirements</li>
          <li>Withdraw consent for marketing communications at any time</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:contact@waglogy.in" className="text-blue-600 hover:underline">contact@waglogy.in</a>.</p>
      </>
    ),
  },
  {
    title: '8. Changes to This Policy',
    body: (
      <p>We may update this Privacy Policy from time to time. The updated date at the top of this page reflects when changes were last made. Continued use of our website or services after changes constitutes your acceptance of the revised policy.</p>
    ),
  },
  {
    title: '9. Contact Us',
    body: (
      <>
        <p>For any questions, concerns, or requests related to this Privacy Policy:</p>
        <div className="mt-4 p-5 rounded-xl border border-[#E5E2DC] bg-[#FAFAF8] not-prose">
          <p className="font-semibold text-[#0C0C0C] mb-1">Tech Waglogy LLP</p>
          <p className="text-sm text-[#6E6B67]">Tadong Metro Point, Gangtok, Sikkim – 737102</p>
          <p className="text-sm mt-2">
            <a href="mailto:contact@waglogy.in" className="text-blue-600 hover:underline">contact@waglogy.in</a>
          </p>
        </div>
      </>
    ),
  },
]

const PrivacyPolicy = () => {
  return (
    <>
      <SEO title="Privacy Policy – Tech Waglogy LLP" description="How Tech Waglogy LLP collects, uses, and protects your personal information." />

      <div className="bg-[#FAFAF8] text-[#0C0C0C] min-h-screen">

        {/* Hero */}
        <section className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC] text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-7">
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-sm text-[#A09A90]">Last updated: {lastUpdated}</p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#6E6B67] leading-relaxed mb-12 text-base"
            >
              This policy explains what data we collect, why we collect it, and how we keep it safe. We've written it in plain language so you can actually understand it.
            </motion.p>

            <div className="space-y-12">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.3}
                  className="border-t border-[#E5E2DC] pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-lg font-bold text-[#0C0C0C] mb-4">{section.title}</h2>
                  <div className="prose prose-sm max-w-none text-[#6E6B67] [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-3 [&_p:last-child]:mb-0">
                    {section.body}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default PrivacyPolicy
