import React from 'react'

const TermsConditions = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Terms &
              <span style={{ color: 'var(--brand-primary)' }}> Conditions</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="mt-2 text-base text-gray-500">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions ("Terms") govern your use of our website and services provided by Waglogy Tech LLP ("Company," "we," "our," or "us"). By accessing our website or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you do not agree to these Terms, please do not use our website or services.
              </p>
            </div>

            {/* Services Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Waglogy Tech LLP provides the following services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Web development and design services</li>
                <li>Mobile application development</li>
                <li>AI-powered solutions and machine learning applications</li>
                <li>E-commerce platform development</li>
                <li>UI/UX design services</li>
                <li>Custom software development</li>
                <li>Consulting and technical advisory services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
              </p>
            </div>

            {/* Client Obligations */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Obligations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a client, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Provide accurate and complete information about your project requirements</li>
                <li>Respond promptly to our requests for information, feedback, or approvals</li>
                <li>Make timely payments as specified in your service agreement</li>
                <li>Respect intellectual property rights and not infringe on third-party rights</li>
                <li>Use our services in compliance with applicable laws and regulations</li>
                <li>Not use our services for illegal, harmful, or unauthorized purposes</li>
                <li>Maintain confidentiality of any proprietary information shared during the project</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Pricing and Invoicing</h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>All prices are quoted in USD unless otherwise specified</li>
                <li>Pricing is based on project scope and requirements as discussed during consultation</li>
                <li>Additional work outside the original scope will be charged separately</li>
                <li>Invoices are due within 30 days of receipt unless otherwise agreed</li>
                <li>Late payments may incur additional charges as specified in the service agreement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Payment Methods</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We accept payments through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Bank transfers</li>
                <li>Credit/debit cards</li>
                <li>Digital payment platforms (PayPal, Stripe, etc.)</li>
                <li>Cryptocurrency (Bitcoin, Ethereum) - subject to agreement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Refunds</h3>
              <p className="text-gray-700 leading-relaxed">
                Refunds are handled on a case-by-case basis. Generally, refunds are not provided for completed work, but we may offer partial refunds for work that has not yet begun, subject to our discretion and any applicable cancellation fees.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Client Ownership</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon full payment, you will own the final deliverables created specifically for your project, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Custom code and applications developed for your project</li>
                <li>Designs and creative work created specifically for your project</li>
                <li>Documentation and user manuals created for your project</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Our Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain ownership of:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Our proprietary frameworks, libraries, and tools</li>
                <li>General knowledge, skills, and methodologies</li>
                <li>Pre-existing intellectual property used in your project</li>
                <li>Portfolio rights to showcase completed work (with your permission)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Third-Party Materials</h3>
              <p className="text-gray-700 leading-relaxed">
                Any third-party materials, libraries, or frameworks used in your project remain subject to their respective licenses. We will inform you of any licensing requirements or restrictions.
              </p>
            </div>

            {/* Project Timeline */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Project Timeline and Deliverables</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Timeline</h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Project timelines are estimates based on initial requirements</li>
                <li>Delays caused by client feedback, changes, or external factors may extend the timeline</li>
                <li>We will communicate any significant timeline changes promptly</li>
                <li>Rush projects may incur additional charges</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Deliverables</h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Deliverables will be provided as specified in the project agreement</li>
                <li>Client approval is required before final delivery</li>
                <li>Revisions beyond the agreed scope may incur additional charges</li>
                <li>We provide reasonable support for delivered projects as specified in the agreement</li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentiality</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Both parties agree to maintain confidentiality of:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Proprietary business information</li>
                <li>Technical specifications and requirements</li>
                <li>Financial information and pricing</li>
                <li>Any other information marked as confidential</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                This obligation survives the termination of our business relationship.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Our total liability shall not exceed the total amount paid by you for the specific services</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>We are not liable for damages resulting from third-party actions or external factors</li>
                <li>We are not liable for data loss unless caused by our negligence</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Some jurisdictions do not allow the limitation of liability, so these limitations may not apply to you.
              </p>
            </div>

            {/* Warranties */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Warranties and Disclaimers</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Our Warranties</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>Our services will be performed with reasonable care and skill</li>
                <li>We have the necessary rights and authority to provide our services</li>
                <li>Our work will not infringe on third-party intellectual property rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Disclaimers</h3>
              <p className="text-gray-700 leading-relaxed">
                Except as expressly stated, we provide our services "as is" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Termination by Either Party</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate the service agreement:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
                <li>With 30 days written notice</li>
                <li>Immediately for material breach of contract</li>
                <li>Immediately for non-payment after 60 days</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Effect of Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, you will pay for all work completed up to the termination date. We will deliver any completed work and return any materials you provided, subject to payment of outstanding invoices.
              </p>
            </div>

            {/* Force Majeure */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Force Majeure</h2>
              <p className="text-gray-700 leading-relaxed">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, government actions, or other unforeseeable events.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from these Terms or our services shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization], or through the courts of [Your Jurisdiction].
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Waglogy Tech LLP</strong></p>
                <p className="text-gray-700 mb-2">Email: <a href="mailto:legal@waglogy.in" className="text-blue-600 hover:text-blue-800">legal@waglogy.in</a></p>
                <p className="text-gray-700 mb-2">General Contact: <a href="mailto:contact@waglogy.in" className="text-blue-600 hover:text-blue-800">contact@waglogy.in</a></p>
                <p className="text-gray-700">Website: <a href="https://waglogy.in" className="text-blue-600 hover:text-blue-800">https://waglogy.in</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Ready to Work With Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our terms or want to discuss your project? We're here to help and provide clarity on any aspect of our services.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@waglogy.in"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Contact Legal Team
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsConditions

