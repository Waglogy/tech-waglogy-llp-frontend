import React, { useState } from 'react'
import { FaEnvelope, FaCheckCircle, FaMountain, FaRobot, FaRoute, FaClock } from 'react-icons/fa'
import { submitWaitlist } from '../services/waitlistService'
import SEO from '../components/SEO'

const Projects = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please enter your email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      await submitWaitlist({ 
        email: email.trim()
      })
      
      setSubmitStatus('success')
      setEmail('') // Reset form
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting waitlist:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to join waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO page="projects" />
      
      {/* Hero Section */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                <FaMountain className="w-4 h-4" />
                <span>Built by Waglogy</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to{' '}
                <span style={{ color: 'var(--brand-primary)' }}>Himato</span>
            </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
                Where artificial intelligence meets the mystical mountains of Sikkim
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Himato is not just another travel platform. It is an intelligent travel companion that transforms how people discover, plan, and experience one of India's most stunning destinations.
              </p>

              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaRobot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Planning</h3>
                    <p className="text-sm text-gray-600">Personalized itineraries in seconds</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaRoute className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Travel Expert</h3>
                    <p className="text-sm text-gray-600">Get instant answers & insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/himato.png" 
                  alt="Himato - AI Travel Companion for Sikkim" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist yet
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <FaMountain className="w-24 h-24 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-semibold">Himato</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Problem We Solve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Planning a trip to Sikkim can be overwhelming. Travelers face endless questions, scattered information, and generic packages that don't match their interests or budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Traditional Challenges</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Endless research across multiple websites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Generic packages that don't match your style</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>High fees for basic itineraries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Scattered Google results</span>
                </li>
              </ul>
                  </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Himato's Solution</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--brand-primary)' }} className="mt-1">•</span>
                  <span>AI-powered personalized itineraries in seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--brand-primary)' }} className="mt-1">•</span>
                  <span>24/7 AI travel expert with deep Sikkim knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--brand-primary)' }} className="mt-1">•</span>
                  <span>Free planning tools for travelers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--brand-primary)' }} className="mt-1">•</span>
                  <span>Stories, legends, and hidden spots</span>
                </li>
              </ul>
              </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Himato?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of personalized, AI-driven travel planning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FaRobot className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Itineraries</h3>
              <p className="text-gray-600">
                Our AI creates personalized, day-by-day travel plans tailored to your interests—whether you're an adventure lover, spiritual traveler, family, or photographer.
              </p>
          </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FaClock className="w-7 h-7" style={{ color: 'var(--brand-primary)' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Travel Expert</h3>
              <p className="text-gray-600">
                Get instant answers about permits, weather, road conditions, hidden spots, local food, and cultural insights. Himato tells stories, not just facts.
              </p>
          </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FaMountain className="w-7 h-7" style={{ color: 'var(--brand-primary)' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deep Sikkim Expertise</h3>
              <p className="text-gray-600">
                While others cover hundreds of destinations shallowly, Himato masters Sikkim deeply—from Gurudongmar Lake legends to Rumtek Monastery's peaceful energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 text-white relative overflow-hidden" style={{ backgroundColor: 'var(--brand-primary)' }}>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Join the Waitlist
          </h2>
          <p className="text-xl sm:text-2xl mb-2 text-white opacity-90">
            Be among the first to experience Himato
          </p>
          <p className="text-lg mb-12 text-white opacity-80 max-w-2xl mx-auto">
            Get early access to the future of travel planning. Launching soon!
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    disabled={isSubmitting}
                  />
                </div>
                  <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl whitespace-nowrap"
                  style={{ color: 'var(--brand-primary)' }}
                  >
                  {isSubmitting ? 'Joining...' : 'Get Early Access'}
                  </button>
                  </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg text-gray-900 border-2" style={{ borderColor: 'var(--brand-primary)' }}>
                  <FaCheckCircle className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                  <span>Successfully joined! Check your email for confirmation.</span>
                  </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-white rounded-lg text-gray-900 border-2 border-gray-900">
                  <p>{errorMessage}</p>
                </div>
              )}
            </form>

            <p className="mt-6 text-sm text-white opacity-80">
              We respect your privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              More Than Just Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Himato creates positive social impact while making travel planning intelligent and accessible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Supporting Local Communities</h3>
              <p className="text-gray-700">
                Himato promotes lesser-known regions like Dzongu, Uttarey, and Ravangla, helping distribute tourism and support local communities. Small travel businesses gain digital visibility they could never achieve alone.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Responsible Travel</h3>
              <p className="text-gray-700">
                We encourage respecting monasteries, reducing plastic waste, and choosing local homestays. Himato ensures every traveler experiences Sikkim's stories while preserving its beauty for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Mountains of Sikkim Have Stories to Tell
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Himato ensures every traveler hears them.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Welcome to the future of travel. Welcome to Himato.
          </p>
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('section:has(form)')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Join the Waitlist Now
          </a>
        </div>
      </section>
    </>
  )
}

export default Projects
