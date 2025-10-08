import React, { useState, useEffect, useRef } from 'react'

const Landing = () => {
  const [activeSection, setActiveSection] = useState('web')
  const [visiblePhases, setVisiblePhases] = useState([])
  const phaseRefs = useRef([])

  useEffect(() => {
    const observers = []
    
    phaseRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisiblePhases((prev) => [...new Set([...prev, index])])
                }, index * 150) // Stagger animation
              }
            })
          },
          { threshold: 0.2 }
        )
        
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <>
    <section className="bg-white py-8">
    <div
      className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8"
    >
      <div className="max-w-3xl text-left">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        Empowering Businesses with Modern
          <span style={{ color: 'var(--brand-primary)' }}>  Technology & Scalable Solutions</span>
         
        </h1>

        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
        At Tech Waglogy LLP, we believe technology should grow with your business—not burden you with unnecessary costs. That’s why we’ve designed our services with one simple promise:
        <span className='font-bold'>  start with the essentials, 
        scale as your business grows, and pay only for what you need.   </span>
           </p>

        <div className="mt-4 sm:mt-6">
          <a
            className="inline-block rounded-lg px-5 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: 'var(--brand-primary)' }}
            href="#projects"
          >
            Explore Our Work
          </a>
        </div>
      </div>
  
      <div className="mx-auto hidden max-w-md md:block">
        <img src="/banner.png" alt="Waglogy banner" className="w-full h-auto object-contain" />
      </div>
        
         
        
    </div>
    </section>
 
 
     <section className="py-18">
   <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-4 md:gap-8">
     <aside className="md:col-span-1 flex md:h-[80vh] flex-col justify-between border-e border-gray-100 bg-white">
   <div className="px-4 py-6">
     <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">Our Services</h3>

    <ul className="mt-6 space-y-1">
      <li>
        <button
          type="button"
          onClick={() => setActiveSection('web')}
          className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium ${activeSection==='web' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Web Development
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('app')}
          className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium ${activeSection==='app' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          App Development
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('software')}
          className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium ${activeSection==='software' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Software Development
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('design')}
          className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium ${activeSection==='design' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Graphic Designing
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('ai')}
          className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-medium ${activeSection==='ai' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          AI‑Powered Applications
        </button>
      </li>
    </ul>
  </div>
 
  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
        alt="Waglogy logo"
        src="/logo.png"
        className="size-10 rounded object-contain"
      />

      <div>
        <p className="text-xs">
          <strong className="block font-medium">Tech Waglogy LLP</strong>

          <a href="mailto:contact@waglogy.in" className="underline" style={{ color: 'var(--brand-primary)' }}> contact@waglogy.in </a>
        </p>
      </div>
    </a>
  </div>
 
    </aside>
 
    <div className="md:col-span-3 py-8 max-h-[80vh] overflow-y-auto pr-2">
     <div className="space-y-4 md:space-y-8">
       {activeSection === 'web' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Web Development</h2>
           <p className="mt-4 text-gray-700">Modern, fast, and scalable websites and web apps tailored to your business.</p>
           <img
             src="/3.png"
             alt="Web development"
             className="mt-6 rounded"
           />
         </div>
       )}

       {activeSection === 'app' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">App Development</h2>
           <p className="mt-4 text-gray-700">iOS, Android, and cross‑platform apps with great UX and robust performance.</p>
           <img
             src="/4.png"
             alt="App development"
             className="mt-6 rounded"
           />
         </div>
       )}

       {activeSection === 'software' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Software Development</h2>
           <p className="mt-4 text-gray-700">Custom software solutions, integrations, and automation for complex workflows.</p>
           <img
             src="/6.png"
             alt="Software development"
             className="mt-6 rounded"
           />
         </div>
       )}

       {activeSection === 'design' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Graphic Designing</h2>
           <p className="mt-4 text-gray-700">Branding, UI/UX, and visuals that communicate clearly and look stunning.</p>
           <img
             src="/7.png"
             alt="Graphic design workspace"
             className="mt-6 rounded"
           />
         </div>
       )}

       {activeSection === 'ai' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">AI‑Powered Applications</h2>
           <p className="mt-4 text-gray-700">Intelligent products using LLMs, automation, and data to deliver real value.</p>
           <img
             src="/5.png"
             alt="AI and machine learning"
             className="mt-6 rounded"
           />
         </div>
       )}

       
     </div>
    </div>
 
   </div>
 </section>
 <span class="flex items-center">
  <span class="h-px flex-1 bg-gray-300"></span>

  <span class="shrink-0 px-4 text-gray-900">
         <p className="text-gray-700">
           Have a project in mind? Email us at
           {' '}
           <a href="mailto:contact@waglogy.in" className="font-medium" style={{ color: 'var(--brand-primary)' }}>
             contact@waglogy.in
           </a>
           .
         </p>
       </span>

  <span class="h-px flex-1 bg-gray-300"></span>
</span>

<section>
    
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header className="text-left">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Our Projects</h2>

      <p className="mt-4 max-w-md text-gray-600">
        A curated look at web apps, mobile apps, and AI‑powered solutions we’ve built for clients.
        Each project reflects our focus on clean UX, performance, and measurable outcomes.
      </p>
    </header>

    <div className="mt-8 text-left">
      <p className="text-sm text-gray-500">Showing <span> 4 </span> of 40</p>
    </div>

    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li>
        <div className="group block overflow-hidden rounded-lg border border-gray-100 h-full flex flex-col">
          <img
            src="/banner.png"
            alt="BudBeaver preview"
            className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="bg-white p-4 flex-1 flex flex-col">
            <h3 className="text-base font-semibold text-gray-900">BudBeaver</h3>
            <p className="mt-2 text-sm text-gray-600">Budgeting web app that helps SMBs plan, track, and optimize spend.</p>
           
          </div>
        </div>
      </li>

      <li>
        <div className="group block overflow-hidden rounded-lg border border-gray-100 h-full flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1974&auto=format&fit=crop"
            alt="NovaCart preview"
            className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="bg-white p-4 flex-1 flex flex-col">
            <h3 className="text-base font-semibold text-gray-900">NovaCart</h3>
            <p className="mt-2 text-sm text-gray-600">Headless e‑commerce storefront with blazing‑fast checkout.</p>
            
          </div>
        </div>
      </li>

      <li>
        <div className="group block overflow-hidden rounded-lg border border-gray-100 h-full flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
            alt="PulseFit preview"
            className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="bg-white p-4 flex-1 flex flex-col">
            <h3 className="text-base font-semibold text-gray-900">PulseFit</h3>
            <p className="mt-2 text-sm text-gray-600">Cross‑platform fitness app with realtime coaching and analytics.</p>
           
          </div>
        </div>
      </li>

      <li>
        <div className="group block overflow-hidden rounded-lg border border-gray-100 h-full flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1974&auto=format&fit=crop"
            alt="InsightAI preview"
            className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="bg-white p-4 flex-1 flex flex-col">
            <h3 className="text-base font-semibold text-gray-900">InsightAI</h3>
            <p className="mt-2 text-sm text-gray-600">LLM‑powered dashboard turning raw data into actionable insights.</p>
            
          </div>
        </div>
      </li>
    </ul>

    <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded-sm border"
          style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>

      <li>
        <a href="#" className="block size-8 rounded-sm border text-center leading-8" style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}>
          1
        </a>
      </li>

      <li className="block size-8 rounded-sm text-center leading-8 text-white" style={{ backgroundColor: 'var(--brand-primary)' }}>
        2
      </li>

      <li>
        <a href="#" className="block size-8 rounded-sm border text-center leading-8" style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}>
          3
        </a>
      </li>

      <li>
        <a href="#" className="block size-8 rounded-sm border text-center leading-8" style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}>
          4
        </a>
      </li>

      <li>
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded-sm border"
          style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  </div>

  
</section>

<section className="py-12 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-screen-xl">
    <header className="text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Project Timeline</h2>
    </header>

    <ol
      className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700"
    >
      {/* Phase 1 – Kickoff & Discovery */}
      <li 
        ref={(el) => (phaseRefs.current[0] = el)}
        className={`group relative grid grid-cols-2 odd:-me-3 even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
        >
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phase 1 – Kickoff & Discovery</h3>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
              Every great project starts with a strong foundation. In this phase, we:
            </p>
            
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Understand your business goals & challenges</li>
              <li>• Analyze your industry & competitors</li>
              <li>• Define the scope, deliverables, and success metrics</li>
            </ul>
            
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A clear roadmap for your digital journey.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 2 – Design & Strategy */}
      <li 
        ref={(el) => (phaseRefs.current[1] = el)}
        className={`group relative grid grid-cols-2 odd:-me-3 even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
        >
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phase 2 – Design & Strategy</h3>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
              Once we know what to build, we focus on how to build it effectively.
            </p>
            
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Create wireframes & UI/UX designs</li>
              <li>• Establish branding and user experience guidelines</li>
              <li>• Develop a strategy aligned with your business growth</li>
            </ul>
            
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A visual blueprint that brings your idea to life.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 3 – Development & First Milestone */}
      <li 
        ref={(el) => (phaseRefs.current[2] = el)}
        className={`group relative grid grid-cols-2 odd:-me-3 even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
        >
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phase 3 – Development & First Milestone</h3>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
              Our developers begin building the core system with a scalable, growth-ready architecture.
            </p>
            
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Development of core modules / MVP</li>
              <li>• Regular updates & demo sessions</li>
              <li>• Early testing for quality assurance</li>
            </ul>
            
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A working product prototype you can test and review.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 4 – Testing & Refinement */}
      <li 
        ref={(el) => (phaseRefs.current[3] = el)}
        className={`group relative grid grid-cols-2 odd:-me-3 even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
        >
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phase 4 – Testing & Refinement</h3>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
              Before going live, we ensure everything runs smoothly.
            </p>
            
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Functional & security testing</li>
              <li>• Client feedback integration</li>
              <li>• Performance optimization</li>
            </ul>
            
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A polished product that's reliable, fast, and secure.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 5 – Launch & Deployment */}
      <li 
        ref={(el) => (phaseRefs.current[4] = el)}
        className={`group relative grid grid-cols-2 odd:-me-3 even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
        >
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phase 5 – Launch & Deployment</h3>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
              The big moment! We make your product live for your users.
            </p>
            
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Deployment on chosen cloud/servers</li>
              <li>• Final checks & training for your team</li>
              <li>• Launch marketing & go-live support</li>
            </ul>
            
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A successful launch with everything ready for your audience.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 6 – Post-Launch & Scaling */}
      <li 
        ref={(el) => (phaseRefs.current[5] = el)}
        className={`group relative grid grid-cols-2 odd:-me-3 even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last"
        >
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phase 6 – Post-Launch & Scaling</h3>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
              Our relationship doesn't end at launch—we help you grow.
            </p>
            
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Continuous monitoring & support</li>
              <li>• Adding new features as your business scales</li>
              <li>• AI & automation integration when you're ready</li>
            </ul>
            
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A long-term growth partnership with technology that evolves with your business.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>
    </ol>
  </div>
</section>


<section className="py-18 flex flex-row items-center justify-center gap-6">
<section className="bg-gray-50">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    
    <div>
      <h2 className="text-xl font-bold py-6 text-gray-900 sm:text-3xl">FAQ</h2>
    </div>  
    
  </div>
</section>
<div className="space-y-4">
  <details className="group [&_summary::-webkit-details-marker]:hidden" open>
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium">Lorem ipsum dolor sit amet consectetur adipisicing?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
      consequuntur distinctio corporis earum similique!
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium">Lorem ipsum dolor sit amet consectetur adipisicing?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
      consequuntur distinctio corporis earum similique!
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
    >
      <h2 className="text-lg font-medium">Lorem ipsum dolor sit amet consectetur adipisicing?</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block size-5 shrink-0 group-open:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="hidden size-5 shrink-0 group-open:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </summary>

    <p className="px-4 pt-4 text-gray-900">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
      recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
      consequuntur distinctio corporis earum similique!
    </p>
  </details>
</div>

</section>


<section className="bg-gray-50">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        Have a question in your mind?
      </h2>

      <p className="hidden text-gray-500 sm:mt-4 sm:block">
        We're here to help! Reach out to us and we'll get back to you as soon as possible.
      </p>
    </div>

    <div className="mx-auto mt-8 max-w-xl">
      <form action="#" className="sm:flex sm:gap-4">
        <div className="sm:flex-1">
          <label htmlFor="email" className="sr-only">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-md transition focus:border-white focus:ring-3 focus:ring-blue-400 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 px-5 py-3 text-white transition focus:ring-3 focus:ring-blue-400 focus:outline-hidden shadow-md sm:mt-0 sm:w-auto"
        >
          <span className="text-sm font-medium"> Contact Us </span>

          <svg
            className="size-5 shadow-sm rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</section>


  </>
  )
}

export default Landing
