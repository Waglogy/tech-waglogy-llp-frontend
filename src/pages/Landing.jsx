import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MdConstruction } from 'react-icons/md'
import { FaRocket } from 'react-icons/fa'
import { HiChip } from 'react-icons/hi'
import { submitQuery } from '../services/queryService'

const Landing = () => {
  const [activeSection, setActiveSection] = useState('web')
  const [visiblePhases, setVisiblePhases] = useState([])
  const phaseRefs = useRef([])
  
  // Query form state
  const [queryMessage, setQueryMessage] = useState('')
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false)
  const [queryStatus, setQueryStatus] = useState(null) // 'success' or 'error'
  const [queryErrorMessage, setQueryErrorMessage] = useState('')

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

  // Handle query form submission
  const handleQuerySubmit = async (e) => {
    e.preventDefault()
    
    if (!queryMessage.trim()) {
      setQueryStatus('error')
      setQueryErrorMessage('Please enter your query')
      return
    }

    setIsSubmittingQuery(true)
    setQueryStatus(null)
    setQueryErrorMessage('')

    try {
      const response = await submitQuery({ message: queryMessage })
      
      console.log('Query submitted successfully:', response)
      setQueryStatus('success')
      setQueryMessage('') // Reset form
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setQueryStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting query:', error)
      setQueryStatus('error')
      setQueryErrorMessage(error.message || 'Failed to submit query. Please try again.')
    } finally {
      setIsSubmittingQuery(false)
    }
  }

  return (
    <>
    <section className="bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-screen-xl">
    <div
      className="pt-4 pb-8 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:pt-2 lg:pb-8"
    >
      <motion.div 
        className="max-w-3xl text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        Empowering Businesses with Modern
          <span style={{ color: 'var(--brand-primary)' }}>  Technology & Scalable Solutions</span>
         
        </motion.h1>

        <motion.p 
          className="mt-4 text-sm sm:text-base text-gray-700 sm:text-lg/relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
        At Tech Waglogy LLP, we believe technology should grow with your business—not burden you with unnecessary costs. That's why we've designed our services with one simple promise:
        <span className='font-bold'>  start with the essentials, 
        scale as your business grows, and pay only for what you need.   </span>
           </motion.p>

        <motion.div 
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            className="inline-block w-full sm:w-auto text-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: 'var(--brand-primary)' }}
            href="/contact"
          >
            Get Started Today
          </a>
        </motion.div>
      </motion.div>
  
      <motion.div 
        className="mx-auto mt-8 md:mt-0 max-w-md md:block"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img src="/banner.png" alt="Waglogy banner" className="w-full h-auto object-contain" />
      </motion.div>
        
         
        
    </div>
    </div>
    </section>
 
 
     <section className="py-8 sm:py-12 lg:py-18">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="md:grid md:grid-cols-4 md:gap-8">
    <aside className="md:col-span-1 flex md:h-[80vh] flex-col justify-between border-b md:border-b-0 md:border-e border-gray-100 bg-white mb-6 md:mb-0">
  <div className="px-2 sm:px-4 py-6">
    <h3 className="text-base sm:text-sm font-semibold uppercase tracking-wide text-gray-600">Our Services</h3>

   <ul className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-1">
      <li>
        <button
          type="button"
          onClick={() => setActiveSection('web')}
          className={`block w-full rounded-lg px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium ${activeSection==='web' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Web Development
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('app')}
          className={`block w-full rounded-lg px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium ${activeSection==='app' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Application Development
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('software')}
          className={`block w-full rounded-lg px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium ${activeSection==='software' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Software Development
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('design')}
          className={`block w-full rounded-lg px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium ${activeSection==='design' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          Graphics & UI/UX Design
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('ai')}
          className={`block w-full rounded-lg px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium ${activeSection==='ai' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          AI Solutions & Chatbots
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={() => setActiveSection('automation')}
          className={`block w-full rounded-lg px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium ${activeSection==='automation' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          AI Automations
        </button>
      </li>
    </ul>
  </div>
 
  <div className="hidden md:block sticky inset-x-0 bottom-0 border-t border-gray-100">
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
 
    <div className="md:col-span-3 py-4 sm:py-8 md:max-h-[80vh] md:overflow-y-auto md:pr-2">
     <div className="space-y-4 md:space-y-8">
       {activeSection === 'web' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Web Development</h2>
          <p className="mt-4 text-lg font-semibold text-gray-800">Modern, responsive, and user-friendly websites that create impact.</p>
          
          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              Your website is often the first impression customers have of your business. We build modern, lightning-fast, and fully responsive websites that not only look stunning but also drive real business results.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
              <h3 className="font-semibold text-gray-900 mb-3">What We Deliver:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Responsive Design:</strong> Perfect experience on desktop, tablet, and mobile</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Fast Performance:</strong> Optimized for speed and SEO rankings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>User-Friendly CMS:</strong> Easy content management without technical skills</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Scalable Architecture:</strong> Built to grow with your business needs</span>
                </li>
              </ul>
            </div>

            <p className="text-sm italic text-gray-600">
              💡 <strong>Growth-Friendly Approach:</strong> We start with a solid foundation—your essential online presence—then add advanced features like e-commerce, booking systems, or integrations as your business grows.
            </p>
          </div>
          
           <img
             src="/3.png"
             alt="Web development"
            className="mt-6 rounded shadow-lg"
           />
         </div>
       )}

       {activeSection === 'app' && (
         <div className="max-w-3xl text-left">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Application Development</h2>
          <p className="mt-4 text-lg font-semibold text-gray-800">Secure, scalable apps tailored to your business goals.</p>
          
          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              Whether you need a mobile app for iOS, Android, or a cross-platform solution, we build applications that are intuitive, secure, and designed to scale with your business. From concept to deployment, we handle it all.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
              <h3 className="font-semibold text-gray-900 mb-3">What We Deliver:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Native & Cross-Platform:</strong> iOS, Android, or both with React Native/Flutter</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Intuitive UX:</strong> Beautiful interfaces that users love to interact with</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Secure Backend:</strong> Protected data with industry-standard security practices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Real-time Features:</strong> Push notifications, live updates, and synchronization</span>
                </li>
              </ul>
            </div>

            <p className="text-sm italic text-gray-600">
              💡 <strong>Growth-Friendly Approach:</strong> Start with core features (MVP) to test the market, then progressively add advanced capabilities like payment gateways, analytics, or third-party integrations based on user feedback.
            </p>
          </div>
          
           <img
             src="/4.png"
             alt="App development"
            className="mt-6 rounded shadow-lg"
           />
         </div>
       )}

       {activeSection === 'software' && (
         <div className="max-w-3xl text-left">
           <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Software Development</h2>
          <p className="mt-4 text-lg font-semibold text-gray-800">Custom solutions to automate and streamline operations.</p>
          
          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              Every business has unique challenges. We create custom software solutions that automate manual processes, integrate disparate systems, and eliminate operational bottlenecks—helping you save time, reduce costs, and focus on growth.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
              <h3 className="font-semibold text-gray-900 mb-3">What We Deliver:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Custom Workflows:</strong> Tools tailored to your exact business processes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>API Integrations:</strong> Connect your existing tools and data sources seamlessly</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Process Automation:</strong> Eliminate repetitive tasks and human errors</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Data Management:</strong> Centralized dashboards and reporting systems</span>
                </li>
              </ul>
            </div>

            <p className="text-sm italic text-gray-600">
              💡 <strong>Growth-Friendly Approach:</strong> We build modular software that starts simple and evolves with you—add new modules, integrations, or automation workflows only when your business needs them.
            </p>
          </div>
          
           <img
             src="/6.png"
             alt="Software development"
            className="mt-6 rounded shadow-lg"
           />
         </div>
       )}

       {activeSection === 'design' && (
         <div className="max-w-3xl text-left">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Graphics & UI/UX Design</h2>
          <p className="mt-4 text-lg font-semibold text-gray-800">Eye-catching designs that build trust and engagement.</p>
          
          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              First impressions matter. We create visually stunning designs that not only capture attention but also build trust and guide users seamlessly through their journey. From brand identity to digital experiences, we make your business memorable.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
              <h3 className="font-semibold text-gray-900 mb-3">What We Deliver:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Brand Identity:</strong> Logos, color palettes, and visual guidelines that define your brand</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>UI/UX Design:</strong> Intuitive interfaces optimized for user experience and conversions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Marketing Graphics:</strong> Social media posts, banners, and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Design Systems:</strong> Consistent, scalable design components for your products</span>
                </li>
              </ul>
            </div>

            <p className="text-sm italic text-gray-600">
              💡 <strong>Growth-Friendly Approach:</strong> Begin with essential branding and core designs, then expand to complete marketing collateral, design systems, and advanced UI/UX iterations as your brand matures.
            </p>
          </div>
          
           <img
             src="/7.png"
             alt="Graphic design workspace"
            className="mt-6 rounded shadow-lg"
           />
         </div>
       )}

       {activeSection === 'ai' && (
         <div className="max-w-3xl text-left">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">AI Solutions & Chatbots</h2>
          <p className="mt-4 text-lg font-semibold text-gray-800">Smarter customer interactions, increased efficiency.</p>
          
          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              Transform how you interact with customers using intelligent AI-powered solutions. From 24/7 customer support chatbots to advanced AI applications that understand context and deliver personalized experiences—we help you harness the power of artificial intelligence.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
              <h3 className="font-semibold text-gray-900 mb-3">What We Deliver:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Smart Chatbots:</strong> 24/7 customer support that understands and resolves queries instantly</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>LLM Integration:</strong> Leverage GPT, Claude, and other AI models for your business</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Voice Assistants:</strong> Natural language interfaces for hands-free interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Intelligent Search:</strong> AI-powered search and recommendation systems</span>
                </li>
              </ul>
            </div>

            <p className="text-sm italic text-gray-600">
              💡 <strong>Growth-Friendly Approach:</strong> Start with a simple chatbot for FAQs, then gradually add AI capabilities like sentiment analysis, multilingual support, and personalization as your customer base grows.
            </p>
          </div>
          
           <img
             src="/5.png"
             alt="AI and machine learning"
            className="mt-6 rounded shadow-lg"
           />
         </div>
       )}

      {activeSection === 'automation' && (
        <div className="max-w-3xl text-left">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">AI Automations</h2>
          <p className="mt-4 text-lg font-semibold text-gray-800">From lead management to workflow optimization, powered by AI.</p>
          
          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              Stop wasting time on repetitive tasks. Our AI automation solutions handle everything from lead capture to customer follow-ups, data entry to report generation—freeing up your team to focus on what truly matters: growing your business.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: 'var(--brand-primary)' }}>
              <h3 className="font-semibold text-gray-900 mb-3">What We Deliver:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Lead Management:</strong> Automated lead capture, scoring, and nurturing workflows</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Workflow Automation:</strong> Streamline approvals, notifications, and task assignments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Data Processing:</strong> AI-powered data extraction, analysis, and insights generation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2" style={{ color: 'var(--brand-primary)' }}>✓</span>
                  <span><strong>Smart Scheduling:</strong> Intelligent appointment booking and resource allocation</span>
                </li>
              </ul>
     </div>

            <p className="text-sm italic text-gray-600">
              💡 <strong>Growth-Friendly Approach:</strong> We don't automate everything at once. First, we identify your biggest bottlenecks, automate those, measure results, then progressively optimize other workflows—ensuring ROI at every step.
            </p>
    </div>
 
          <img
            src="/8.png"
            alt="AI Automation workflow"
            className="mt-6 rounded shadow-lg"
          />
        </div>
      )}

       
     </div>
    </div>
    
    </div>
   </div>
 </section>

 {/* USP Section - Growth-Friendly Technology */}
 <section className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-screen-xl">
    <motion.div 
      className="text-center mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 lg:text-4xl mb-3 sm:mb-4">
        Our USP: <span style={{ color: 'var(--brand-primary)' }}>Growth-Friendly Technology</span>
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
        We know businesses don't need "everything at once." Instead, we build smart, scalable solutions that grow with you.
      </p>
    </motion.div>

    <motion.div 
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {/* Phase 1 */}
      <motion.div 
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 text-left hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6 mx-auto bg-opacity-10" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <MdConstruction className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-left">Build Your Foundation First</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-left leading-relaxed">
          Start with the essentials—website, branding, and core tools that establish your digital presence.
        </p>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-2 text-left">
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Professional website & branding</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Essential business tools</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Basic automation setup</span>
          </li>
        </ul>
      </motion.div>

      {/* Phase 2 */}
      <motion.div 
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 text-left hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6 mx-auto" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <FaRocket className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-left">Add Smart Features as You Grow</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-left leading-relaxed">
          Expand with apps, advanced integrations, and custom features when your business is ready.
        </p>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-2 text-left">
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Mobile applications</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Third-party integrations</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Custom workflow solutions</span>
          </li>
        </ul>
      </motion.div>

      {/* Phase 3 */}
      <motion.div 
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 text-left hover:shadow-xl transition-shadow" 
        style={{ borderColor: 'var(--brand-primary)' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6 mx-auto" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
          <HiChip className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-left">Scale with AI & Automation</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-left leading-relaxed">
          Once established, we integrate AI to optimize costs, efficiency, and customer experience.
        </p>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-2 text-left">
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>AI-powered chatbots</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Intelligent automation</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>•</span>
            <span>Advanced analytics & insights</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>

    <motion.div 
      className="text-center mt-8 sm:mt-12 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        💡 Pay only for what you need, when you need it.
      </p>
      <p className="text-sm sm:text-base text-gray-600">
        No unnecessary costs. No overwhelming features. Just the right technology at the right time.
      </p>
    </motion.div>
  </div>
 </section>

 <span class="flex items-center px-4 my-8 sm:my-12">
  <span class="h-px flex-1 bg-gray-300"></span>

  <span class="shrink-0 px-3 sm:px-4 text-gray-900">
         <p className="text-xs sm:text-sm text-gray-700 text-center">
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

{/* <section>
    
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header className="text-left">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Our Projects</h2>

      <p className="mt-4 max-w-md text-gray-600">
        A curated look at web apps, mobile apps, and AI‑powered solutions we've built for clients.
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

  
</section> */}

<section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-screen-xl">
    <header className="text-center mb-8 sm:mb-12 animate-[fadeIn_0.8s_ease-out]">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 lg:text-4xl">Our Project Timeline</h2>
    </header>

    <ol
      className="relative space-y-6 sm:space-y-8 before:absolute before:top-0 before:left-4 sm:before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-200 dark:before:bg-gray-700"
    >
      {/* Phase 1 – Kickoff & Discovery */}
      <li 
        ref={(el) => (phaseRefs.current[0] = el)}
        className={`group relative grid grid-cols-1 sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-3 sm:gap-4 pl-8 sm:pl-0 sm:group-odd:flex-row-reverse sm:group-even:order-last text-left"
        >
          <span className="absolute left-[11px] sm:left-auto sm:relative size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-left">Phase 1 – Kickoff & Discovery</h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-900 text-left leading-relaxed">
              Every great project starts with a strong foundation. In this phase, we:
            </p>
            
            <ul className="mt-2 text-xs sm:text-sm text-gray-900 space-y-1 text-left">
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Understand your business goals & challenges</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Analyze your industry & competitors</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Define the scope, deliverables, and success metrics</span></li>
            </ul>
            
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-left" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A clear roadmap for your digital journey.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 2 – Design & Strategy */}
      <li 
        ref={(el) => (phaseRefs.current[1] = el)}
        className={`group relative grid grid-cols-1 sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-3 sm:gap-4 pl-8 sm:pl-0 sm:group-odd:flex-row-reverse sm:group-even:order-last text-left"
        >
          <span className="absolute left-[11px] sm:left-auto sm:relative size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-left">Phase 2 – Design & Strategy</h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-900 text-left leading-relaxed">
              Once we know what to build, we focus on how to build it effectively.
            </p>
            
            <ul className="mt-2 text-xs sm:text-sm text-gray-900 space-y-1 text-left">
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Create wireframes & UI/UX designs</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Establish branding and user experience guidelines</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Develop a strategy aligned with your business growth</span></li>
            </ul>
            
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-left" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A visual blueprint that brings your idea to life.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 3 – Development & First Milestone */}
      <li 
        ref={(el) => (phaseRefs.current[2] = el)}
        className={`group relative grid grid-cols-1 sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-3 sm:gap-4 pl-8 sm:pl-0 sm:group-odd:flex-row-reverse sm:group-even:order-last text-left"
        >
          <span className="absolute left-[11px] sm:left-auto sm:relative size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-left">Phase 3 – Development & First Milestone</h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-900 text-left leading-relaxed">
              Our developers begin building the core system with a scalable, growth-ready architecture.
            </p>
            
            <ul className="mt-2 text-xs sm:text-sm text-gray-900 space-y-1 text-left">
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Development of core modules / MVP</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Regular updates & demo sessions</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Early testing for quality assurance</span></li>
            </ul>
            
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-left" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A working product prototype you can test and review.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 4 – Testing & Refinement */}
      <li 
        ref={(el) => (phaseRefs.current[3] = el)}
        className={`group relative grid grid-cols-1 sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-3 sm:gap-4 pl-8 sm:pl-0 sm:group-odd:flex-row-reverse sm:group-even:order-last text-left"
        >
          <span className="absolute left-[11px] sm:left-auto sm:relative size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-left">Phase 4 – Testing & Refinement</h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-900 text-left leading-relaxed">
              Before going live, we ensure everything runs smoothly.
            </p>
            
            <ul className="mt-2 text-xs sm:text-sm text-gray-900 space-y-1 text-left">
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Functional & security testing</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Client feedback integration</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Performance optimization</span></li>
            </ul>
            
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-left" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A polished product that's reliable, fast, and secure.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 5 – Launch & Deployment */}
      <li 
        ref={(el) => (phaseRefs.current[4] = el)}
        className={`group relative grid grid-cols-1 sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-3 sm:gap-4 pl-8 sm:pl-0 sm:group-odd:flex-row-reverse sm:group-even:order-last text-left"
        >
          <span className="absolute left-[11px] sm:left-auto sm:relative size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-left">Phase 5 – Launch & Deployment</h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-900 text-left leading-relaxed">
              The big moment! We make your product live for your users.
            </p>
            
            <ul className="mt-2 text-xs sm:text-sm text-gray-900 space-y-1 text-left">
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Deployment on chosen cloud/servers</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Final checks & training for your team</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Launch marketing & go-live support</span></li>
            </ul>
            
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-left" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A successful launch with everything ready for your audience.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>

      {/* Phase 6 – Post-Launch & Scaling */}
      <li 
        ref={(el) => (phaseRefs.current[5] = el)}
        className={`group relative grid grid-cols-1 sm:grid-cols-2 sm:odd:-me-3 sm:even:-ms-3 transition-all duration-700 ${
          visiblePhases.includes(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div
          className="relative flex items-start gap-3 sm:gap-4 pl-8 sm:pl-0 sm:group-odd:flex-row-reverse sm:group-even:order-last text-left"
        >
          <span className="absolute left-[11px] sm:left-auto sm:relative size-4 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand-primary)' }}></span>

          <div className="-mt-2 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-left">Phase 6 – Post-Launch & Scaling</h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-900 text-left leading-relaxed">
              Our relationship doesn't end at launch—we help you grow.
            </p>
            
            <ul className="mt-2 text-xs sm:text-sm text-gray-900 space-y-1 text-left">
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Continuous monitoring & support</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>Adding new features as your business scales</span></li>
              <li className="flex items-start"><span className="mr-2 flex-shrink-0">•</span><span>AI & automation integration when you're ready</span></li>
            </ul>
            
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-left" style={{ color: 'var(--brand-primary)' }}>
              👉 Outcome: A long-term growth partnership with technology that evolves with your business.
            </p>
          </div>
        </div>

        <div aria-hidden="true"></div>
      </li>
    </ol>
  </div>
</section>


<section className="py-12 md:py-18">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      
      {/* Left side - FAQ heading */}
      <motion.div 
        className="md:col-span-4 bg-gray-50 p-8 rounded-lg flex items-start"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our services, process, and pricing.
          </p>
        </div>
      </motion.div>

      {/* Right side - FAQ items */}
      <motion.div 
        className="md:col-span-8 space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
  <details className="group [&_summary::-webkit-details-marker]:hidden" open>
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <h2 className="text-lg font-medium">What makes Tech Waglogy different from other development agencies?</h2>

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

    <p className="px-4 pt-4 pb-4 text-gray-700 bg-white">
      Our <strong>Growth-Friendly Technology</strong> approach sets us apart. We don't believe in overwhelming businesses with features they don't need yet. Instead, we build your foundation first—website, branding, essential tools—then add smart features as you grow. Finally, when you're ready, we scale with AI & automation to optimize costs and efficiency. You pay only for what you need, when you need it.
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <h2 className="text-lg font-medium">How long does it take to complete a typical project?</h2>

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

    <p className="px-4 pt-4 pb-4 text-gray-700 bg-white">
      Project timelines vary based on scope and complexity. A standard business website typically takes <strong>2-4 weeks</strong>, while a mobile app might take <strong>6-12 weeks</strong>, and custom software solutions can range from <strong>8-16 weeks</strong>. We provide a detailed timeline during our discovery phase and keep you updated throughout the project with regular demos and progress reports.
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <h2 className="text-lg font-medium">Do you offer ongoing support and maintenance after launch?</h2>

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

    <p className="px-4 pt-4 pb-4 text-gray-700 bg-white">
      Absolutely! We believe in long-term partnerships. Our relationship doesn't end at launch. We offer flexible <strong>support and maintenance packages</strong> that include continuous monitoring, bug fixes, security updates, and performance optimization. As your business grows, we're here to add new features, implement advanced integrations, and scale your technology infrastructure.
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <h2 className="text-lg font-medium">What technologies do you work with?</h2>

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

    <p className="px-4 pt-4 pb-4 text-gray-700 bg-white">
      We use modern, proven technologies including <strong>React, Next.js, Node.js, Python, React Native, Flutter</strong> for development. For AI solutions, we work with <strong>GPT, Claude, and custom LLM integrations</strong>. We choose the right technology stack based on your specific needs, ensuring scalability, performance, and ease of maintenance. We stay updated with the latest tech trends while prioritizing stability and reliability.
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <h2 className="text-lg font-medium">Can you help with an existing project or only start from scratch?</h2>

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

    <p className="px-4 pt-4 pb-4 text-gray-700 bg-white">
      Yes, we work with both new and existing projects! We can <strong>audit your current system</strong>, identify bottlenecks, add new features, optimize performance, or completely redesign and modernize your application. Many clients come to us with legacy systems that need updating or apps that require additional functionality. We'll assess your existing codebase and provide honest recommendations on the best path forward.
    </p>
  </details>

  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <h2 className="text-lg font-medium">How do you handle pricing? Do you offer fixed-price or hourly rates?</h2>

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

    <p className="px-4 pt-4 pb-4 text-gray-700 bg-white">
      We offer both <strong>fixed-price project packages</strong> for well-defined scopes and <strong>flexible hourly/monthly retainer models</strong> for ongoing work. For most projects, we provide a detailed quote after the discovery phase, breaking down costs by feature and phase. This transparency helps you understand exactly what you're paying for and allows you to prioritize features within your budget. Check our <a href="/pricing" className="font-medium underline" style={{ color: 'var(--brand-primary)' }}>Pricing page</a> for more details.
    </p>
  </details>
      </motion.div>
      
    </div>
  </div>
</section>


<section className="bg-gray-50">
  <div className="p-6 sm:p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-lg text-center px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 md:text-3xl">
        Have a question in your mind?
      </h2>

      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">
        We're here to help! Reach out to us and we'll get back to you as soon as possible.
      </p>
    </div>

    <div className="mx-auto mt-6 sm:mt-8 max-w-xl px-4">
      <form onSubmit={handleQuerySubmit} className="sm:flex sm:gap-4">
        <div className="sm:flex-1">
          <label htmlFor="query-message" className="sr-only">Query</label>

          <input
            id="query-message"
            type="text"
            value={queryMessage}
            onChange={(e) => setQueryMessage(e.target.value)}
            placeholder="Enter your query"
            disabled={isSubmittingQuery}
            className="w-full rounded-md border-gray-200 bg-white p-3 text-sm sm:text-base text-gray-700 shadow-md transition focus:border-white focus:ring-3 focus:ring-blue-400 focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmittingQuery || !queryMessage.trim()}
          className="group mt-3 sm:mt-0 flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 px-5 py-3 text-white transition focus:ring-3 focus:ring-blue-400 focus:outline-hidden shadow-md sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          <span className="text-sm font-medium">
            {isSubmittingQuery ? 'Sending...' : 'Send Your query'}
          </span>

          {!isSubmittingQuery && (
            <svg
              className="size-4 sm:size-5 shadow-sm rtl:rotate-180"
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
          )}
        </button>
      </form>
      
      {/* Success/Error Messages */}
      {queryStatus === 'success' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 text-center font-medium">
            ✅ Thank you! Your query has been submitted successfully. We'll get back to you soon!
          </p>
        </div>
      )}
      
      {queryStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800 text-center font-medium">
            ❌ {queryErrorMessage}
          </p>
        </div>
      )}
    </div>
  </div>
</section>


  </>
  )
}

export default Landing
