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
    title: '1. Agreement to Terms',
    body: (
      <p>These Terms and Conditions ("Terms") govern your use of the website at <a href="https://waglogy.in" className="text-blue-600 hover:underline">waglogy.in</a> and any services provided by Tech Waglogy LLP ("we," "us," or "our"), a company registered in Sikkim, India. By accessing our website or engaging our services, you confirm that you have read, understood, and agreed to be bound by these Terms.</p>
    ),
  },
  {
    title: '2. Services',
    body: (
      <>
        <p>Tech Waglogy LLP provides technology services including website development, mobile app development, custom software, UI/UX design, AI integration, and IT consulting.</p>
        <p>The scope, timeline, and pricing for each engagement are agreed in writing before work begins. We reserve the right to modify or discontinue any service offering with reasonable notice.</p>
      </>
    ),
  },
  {
    title: '3. Project Engagement',
    body: (
      <>
        <p>Every project starts with a discovery session. Work begins only after:</p>
        <ul>
          <li>A written proposal or statement of work has been agreed by both parties</li>
          <li>The initial advance payment has been received</li>
          <li>You have provided the content, assets, and access we need to begin</li>
        </ul>
        <p className="mt-3">Delays caused by late content delivery, extended feedback cycles, or scope changes may affect the agreed timeline. We will communicate any impact promptly.</p>
      </>
    ),
  },
  {
    title: '4. Client Obligations',
    body: (
      <ul>
        <li>Provide accurate, complete project requirements and materials</li>
        <li>Review and approve deliverables within agreed timelines</li>
        <li>Make payments as scheduled in the project agreement</li>
        <li>Ensure that any content, images, or data you provide does not infringe third-party rights</li>
        <li>Respect our team members and maintain professional communication</li>
      </ul>
    ),
  },
  {
    title: '5. Payment Terms',
    body: (
      <>
        <p>Pricing is fixed per project or milestone as stated in your proposal. Our standard payment structure is:</p>
        <ul>
          <li><span className="font-medium text-[#0C0C0C]">50% advance</span> before work begins</li>
          <li><span className="font-medium text-[#0C0C0C]">50% on delivery</span> before handover of files or launch</li>
        </ul>
        <p className="mt-3">For larger projects, milestone-based payment schedules are available. Invoices are due within 7 days of issue. Delayed payments may pause work until dues are cleared.</p>
      </>
    ),
  },
  {
    title: '6. Intellectual Property',
    body: (
      <>
        <p><span className="font-semibold text-[#0C0C0C]">Your ownership:</span> Once all payments have been received in full, you own the final deliverables — source code, designs, and content specific to your project.</p>
        <p><span className="font-semibold text-[#0C0C0C]">Our retained rights:</span> We retain ownership of our proprietary tools, frameworks, reusable code libraries, and any pre-existing intellectual property used in your project. These are licensed to you for use within the deliverable but not transferred.</p>
        <p><span className="font-semibold text-[#0C0C0C]">Portfolio rights:</span> We reserve the right to showcase completed work in our portfolio, case studies, or marketing materials unless you request otherwise in writing.</p>
      </>
    ),
  },
  {
    title: '7. Post-Delivery Support',
    body: (
      <>
        <p>Every project includes a <span className="font-semibold text-[#0C0C0C]">30-day post-launch support window</span> for fixing bugs or issues that arise directly from our implementation — at no additional charge.</p>
        <p>Support beyond this window, or changes to scope, design, or features, falls under a maintenance or retainer agreement billed separately.</p>
      </>
    ),
  },
  {
    title: '8. Confidentiality',
    body: (
      <p>Both parties agree to keep confidential any sensitive business information, credentials, or data shared during the project. This obligation continues after the engagement ends. We will not share your project details, data, or internal business information with any third party without your consent.</p>
    ),
  },
  {
    title: '9. Limitation of Liability',
    body: (
      <>
        <p>Our total liability for any claim arising from our services is limited to the amount you paid us for the specific service in question.</p>
        <p>We are not liable for indirect, incidental, or consequential damages — including loss of revenue, data, or business opportunities — arising from the use or inability to use our deliverables.</p>
      </>
    ),
  },
  {
    title: '10. Termination',
    body: (
      <>
        <p>Either party may terminate a project engagement with 14 days written notice. Upon termination:</p>
        <ul>
          <li>You are liable for payment of all work completed up to the termination date</li>
          <li>We will deliver all completed work to you upon receipt of outstanding dues</li>
          <li>Either party may terminate immediately in the case of a material breach that is not remedied within 7 days of written notice</li>
        </ul>
      </>
    ),
  },
  {
    title: '11. Governing Law & Disputes',
    body: (
      <p>These Terms are governed by the laws of India. Any disputes arising from or related to these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Sikkim, India. We will always attempt to resolve disputes amicably before any legal action.</p>
    ),
  },
  {
    title: '12. Changes to These Terms',
    body: (
      <p>We may update these Terms from time to time. The updated date at the top of this page reflects when changes were last made. For ongoing engagements, material changes will be communicated directly. Continued use of our services constitutes acceptance of the revised Terms.</p>
    ),
  },
  {
    title: '13. Contact',
    body: (
      <>
        <p>Questions about these Terms? Reach out to us:</p>
        <div className="mt-4 p-5 rounded-xl border border-[#E5E2DC] bg-[#FAFAF8] not-prose">
          <p className="font-semibold text-[#0C0C0C] mb-1">Tech Waglogy LLP</p>
          <p className="text-sm text-[#6E6B67]">Tadong Metro Point, Gangtok, Sikkim – 737102</p>
          <p className="text-sm mt-2">
            <a href="mailto:contact@waglogy.in" className="text-blue-600 hover:underline">contact@waglogy.in</a>
          </p>
          <p className="text-sm mt-1">
            <a href="tel:+919733814168" className="text-blue-600 hover:underline">+91 97338 14168</a>
          </p>
        </div>
      </>
    ),
  },
]

const TermsConditions = () => {
  return (
    <>
      <SEO title="Terms & Conditions – Tech Waglogy LLP" description="Terms governing the use of Waglogy's website and services." />

      <div className="bg-[#FAFAF8] text-[#0C0C0C] min-h-screen">

        {/* Hero */}
        <section className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC] text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-7">
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
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
              These terms govern your relationship with Tech Waglogy LLP when you use our website or hire us for a project. We've kept the language straightforward so you know exactly where you stand.
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

export default TermsConditions
