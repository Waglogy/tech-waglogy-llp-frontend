import react from 'react'

const About = () => {

  return (

    <>
    <div
      className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8 mb-12"
    >
      <div className="max-w-3xl text-left">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
         About Us 
          {/* <span style={{ color: 'var(--brand-primary)' }}> Tech Waglogy LLP</span> */}
        </h1>

        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          Founded in 2022, Tech Waglogy LLP was born from a vision to transform how businesses in India embrace digital technology. What began as a passionate team of developers has today evolved into a full-service technology partner for startups, SMEs, and enterprises.
        </p>

        <p className="mt-3 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          At Tech Waglogy, we believe that technology should empower growth, not overwhelm it. That's why we design every solution to be modern, scalable, and cost-effective.
        </p>
      </div>
  
      <div className="mx-auto hidden max-w-md md:block">
        <img src="/8.png" alt="Waglogy banner" className="w-full h-auto object-contain" />
      </div>
    </div>
    
    <section>
  <div className="mx-auto max-w-screen-xl px-16 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-stretch md:gap-8">
      <div className="md:col-span-3 md:h-[600px] overflow-y-auto">
        <img
          src="/9.png"
          className="rounded w-full h-auto object-contain"
          alt="Tech team collaboration"
        />
      </div>

      <div className="md:col-span-1 md:h-[600px] overflow-y-auto">
        <div className="max-w-prose md:max-w-none pr-2 text-right">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-6" style={{ color: 'var(--brand-primary)' }}>
            Why We Founded Waglogy – And How We Help Businesses Grow
          </h2>

          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Every business has a story—and ours begins with a simple question:
            </p>

            <p className="text-lg font-medium italic" style={{ color: 'var(--brand-primary)' }}>
              💡 "Why should technology feel like a burden, when it has the power to make business easier?"
            </p>

            <p className="leading-relaxed">
              When we started Waglogy LLP in 2022, we saw a common struggle among startups, small businesses, and even growing enterprises in India. They all wanted to go digital—launch websites, create apps, automate workflows, and embrace AI—but they were held back by high costs, unnecessary complexity, and one-size-fits-all solutions.
            </p>

            <p className="leading-relaxed">
              We realized that most companies were being asked to buy everything upfront—even services they didn't need at the start. This created two problems:
            </p>

            <ul className="list-disc list-inside space-y-2 pr-2">
              <li>Heavy initial investment that small businesses could not afford.</li>
              <li>Wasted resources on features that remained unused for months or years.</li>
            </ul>

            <p className="leading-relaxed">
              That's when we asked ourselves: <span className="font-semibold">"What if technology worked differently? What if it grew alongside the business, step by step?"</span>
            </p>

            <p className="leading-relaxed font-semibold">
              And that's exactly why Waglogy was founded.
            </p>

            <h3 className="text-xl font-bold text-gray-900 pt-4">Our Purpose – Technology That Grows With You</h3>

            <p className="leading-relaxed">
              At Waglogy, we built our model on a scaling-first approach:
            </p>

            <ul className="list-disc list-inside space-y-2 pr-2">
              <li>Start small with only the essentials you need today (a website, branding, or simple tools).</li>
              <li>Expand your digital presence as your business grows (apps, automation, software).</li>
              <li>Integrate AI-powered solutions when you're ready to scale big—without re-investing or starting over.</li>
            </ul>

            <p className="leading-relaxed">
              This means businesses can go digital without fear—no huge upfront payments, no wasted services, just growth-aligned technology that evolves with them.
            </p>

            <h3 className="text-xl font-bold text-gray-900 pt-4">How We Help Businesses</h3>

            <p className="leading-relaxed">
              We support companies in every stage of their journey:
            </p>

            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900">For Startups –</span> We create the digital foundation (modern website, branding, and online presence) at an affordable cost, so they can launch quickly and confidently.
              </div>

              <div>
                <span className="font-semibold text-gray-900">For Growing SMEs –</span> As businesses expand, we provide apps, custom software, automation tools, and integrations to help them scale operations smoothly.
              </div>

              <div>
                <span className="font-semibold text-gray-900">For Enterprises –</span> We implement AI-driven solutions, advanced automations, and data intelligence to reduce costs, boost efficiency, and maintain a competitive edge.
              </div>
            </div>

            <p className="leading-relaxed italic">
              No matter the stage, we ensure that technology is not a barrier but a growth enabler.
            </p>

            <h3 className="text-xl font-bold text-gray-900 pt-4">The Waglogy Difference</h3>

            <div className="space-y-2">
              <p className="leading-relaxed">
                ✅ <span className="font-semibold">Pay-as-you-grow</span> – Invest only in what you need, when you need it.
              </p>
              <p className="leading-relaxed">
                ✅ <span className="font-semibold">Practical for India</span> – Designed for startups and SMEs who want results without overspending.
              </p>
              <p className="leading-relaxed">
                ✅ <span className="font-semibold">Future-ready</span> – Solutions built with the latest frameworks and AI, ready to scale anytime.
              </p>
              <p className="leading-relaxed">
                ✅ <span className="font-semibold">Partnership mindset</span> – We don't just deliver services; we grow with your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* USP Section */}
<section className="bg-gray-50 py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Our USP – <span style={{ color: 'var(--brand-primary)' }}>Start Small. Scale Smart. Pay as You Grow.</span>
      </h2>
      <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
        Most businesses don't need every feature or system at the beginning. Investing in "everything at once" often means higher costs and wasted resources. That's where we stand apart.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Your Foundation First</h3>
        <p className="text-gray-700">
          Website, branding, and essential tools to establish your digital presence.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Add Advanced Features</h3>
        <p className="text-gray-700">
          Apps, automation, integrations, as your business expands and requirements grow.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Leverage AI & Automation</h3>
        <p className="text-gray-700">
          When ready, we integrate intelligent solutions to maximize efficiency and reduce costs.
        </p>
      </div>
    </div>

    <p className="mt-8 text-center text-gray-700 font-medium">
      With Tech Waglogy, you only pay for what you need when you need it—helping you stay efficient, lean, and growth-focused.
    </p>
  </div>
</section>

{/* Mission & Vision Section */}
<section className="py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="text-left">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          To empower businesses with modern technology solutions that are accessible, scalable, and impactful, ensuring growth at every stage of their journey.
        </p>
      </div>

      <div className="text-left">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          To become India's most trusted digital growth partner, helping businesses turn ideas into sustainable digital success stories through innovation, design, and AI.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Why Choose Us Section */}
<section className="bg-gray-50 py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-center mb-8">
      Why Choose Tech Waglogy LLP?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl mb-3">🔹</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalable Growth Model</h3>
        <p className="text-gray-700">Pay only for what you need, expand as you grow.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl mb-3">🔹</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cutting-Edge Technology</h3>
        <p className="text-gray-700">Built with the latest tools, frameworks, and AI solutions.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl mb-3">🔹</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Design + Development Expertise</h3>
        <p className="text-gray-700">Technology that's not only functional but also user-friendly and visually impactful.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl mb-3">🔹</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable & Practical</h3>
        <p className="text-gray-700">Tailored for startups and SMEs in India.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl mb-3">🔹</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Long-Term Partnership</h3>
        <p className="text-gray-700">We grow only when our clients grow.</p>
      </div>
    </div>
  </div>
</section>

{/* Our Promise Section */}
<section className="py-12">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="bg-white border-l-4 p-8 rounded-lg shadow-md" style={{ borderLeftColor: 'var(--brand-primary)' }}>
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">Our Promise</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        At Tech Waglogy LLP, we don't just create websites, apps, or software—we build digital journeys that evolve with your business. Every solution is crafted to adapt, scale, and deliver measurable impact, so you can focus on what matters most: growing your business.
      </p>
      <p className="text-lg font-semibold" style={{ color: 'var(--brand-primary)' }}>
        👉 Tech Waglogy LLP – Tech that grows with you.
      </p>
    </div>
  </div>
</section>

    </>
  )

}

export default About;