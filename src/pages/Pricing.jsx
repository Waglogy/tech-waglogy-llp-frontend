import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRupeeSign, FaDollarSign, FaCheckCircle, FaArrowRight, FaTimes, FaRocket } from 'react-icons/fa'
import { MdWeb, MdPhoneAndroid, MdComputer, MdPalette, MdConstruction } from 'react-icons/md'
import { HiChip } from 'react-icons/hi'
import { RiRobotFill } from 'react-icons/ri'
import SEO from '../components/SEO'

const Pricing = () => {
  const [currency, setCurrency] = useState('INR') // INR or USD
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [projectComplexity, setProjectComplexity] = useState('')
  const [features, setFeatures] = useState([])
  const [timeline, setTimeline] = useState('')
  const [showEstimate, setShowEstimate] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const exchangeRate = 83 // 1 USD = 83 INR (approximate)

  const services = [
    {
      id: 'web-development',
      name: 'Web Development',
      IconComponent: MdWeb,
      iconColor: '#3B82F6',
      description: 'Modern, responsive websites',
      basePrice: { INR: 40000, USD: 500 },
      complexityMultiplier: {
        simple: 1,
        medium: 2,
        complex: 3.5
      }
    },
    {
      id: 'app-development',
      name: 'Application Development',
      IconComponent: MdPhoneAndroid,
      iconColor: '#8B5CF6',
      description: 'iOS, Android & cross-platform apps',
      basePrice: { INR: 150000, USD: 1800 },
      complexityMultiplier: {
        simple: 1,
        medium: 2.5,
        complex: 4
      }
    },
    {
      id: 'software-development',
      name: 'Software Development',
      IconComponent: MdComputer,
      iconColor: '#10B981',
      description: 'Custom software solutions',
      basePrice: { INR: 120000, USD: 1500 },
      complexityMultiplier: {
        simple: 1,
        medium: 2.8,
        complex: 4.5
      }
    },
    {
      id: 'graphics-uiux',
      name: 'Graphics & UI/UX Design',
      IconComponent: MdPalette,
      iconColor: '#F59E0B',
      description: 'Eye-catching designs',
      basePrice: { INR: 30000, USD: 350 },
      complexityMultiplier: {
        simple: 1,
        medium: 1.8,
        complex: 2.5
      }
    },
    {
      id: 'ai-chatbots',
      name: 'AI Solutions & Chatbots',
      IconComponent: RiRobotFill,
      iconColor: '#EF4444',
      description: 'Smart AI-powered solutions',
      basePrice: { INR: 80000, USD: 1000 },
      complexityMultiplier: {
        simple: 1,
        medium: 2.2,
        complex: 3.8
      }
    },
    {
      id: 'ai-automations',
      name: 'AI Automations',
      IconComponent: HiChip,
      iconColor: '#EC4899',
      description: 'Workflow automation & optimization',
      basePrice: { INR: 100000, USD: 1200 },
      complexityMultiplier: {
        simple: 1,
        medium: 2.5,
        complex: 4
      }
    }
  ]

  const availableFeatures = {
    'web-development': [
      { id: 'cms', name: 'CMS Integration', price: { INR: 15000, USD: 180 } },
      { id: 'ecommerce', name: 'E-commerce', price: { INR: 35000, USD: 420 } },
      { id: 'multilang', name: 'Multi-language', price: { INR: 20000, USD: 240 } },
      { id: 'seo', name: 'Advanced SEO', price: { INR: 12000, USD: 150 } }
    ],
    'app-development': [
      { id: 'backend', name: 'Backend API', price: { INR: 60000, USD: 720 } },
      { id: 'realtime', name: 'Real-time Features', price: { INR: 40000, USD: 480 } },
      { id: 'payment', name: 'Payment Gateway', price: { INR: 25000, USD: 300 } },
      { id: 'analytics', name: 'Analytics Dashboard', price: { INR: 30000, USD: 360 } }
    ],
    'software-development': [
      { id: 'api', name: 'API Development', price: { INR: 45000, USD: 540 } },
      { id: 'database', name: 'Database Design', price: { INR: 35000, USD: 420 } },
      { id: 'cloud', name: 'Cloud Deployment', price: { INR: 25000, USD: 300 } },
      { id: 'security', name: 'Advanced Security', price: { INR: 30000, USD: 360 } }
    ],
    'graphics-uiux': [
      { id: 'branding', name: 'Brand Identity', price: { INR: 20000, USD: 240 } },
      { id: 'design-system', name: 'Design System', price: { INR: 25000, USD: 300 } },
      { id: 'animation', name: 'Motion Design', price: { INR: 15000, USD: 180 } },
      { id: 'prototype', name: 'Interactive Prototype', price: { INR: 18000, USD: 220 } }
    ],
    'ai-chatbots': [
      { id: 'llm', name: 'LLM Integration', price: { INR: 40000, USD: 480 } },
      { id: 'voice', name: 'Voice Assistant', price: { INR: 45000, USD: 540 } },
      { id: 'multilang-ai', name: 'Multilingual Support', price: { INR: 30000, USD: 360 } },
      { id: 'training', name: 'Custom AI Training', price: { INR: 50000, USD: 600 } }
    ],
    'ai-automations': [
      { id: 'workflow', name: 'Workflow Automation', price: { INR: 45000, USD: 540 } },
      { id: 'lead-mgmt', name: 'Lead Management', price: { INR: 35000, USD: 420 } },
      { id: 'data-process', name: 'Data Processing', price: { INR: 40000, USD: 480 } },
      { id: 'integration', name: 'Third-party Integration', price: { INR: 30000, USD: 360 } }
    ]
  }

  const calculateEstimate = () => {
    if (!selectedService || !projectComplexity) return 0

    const service = services.find(s => s.id === selectedService)
    if (!service) return 0

    let total = service.basePrice[currency] * service.complexityMultiplier[projectComplexity]

    // Add selected features
    const serviceFeatures = availableFeatures[selectedService] || []
    features.forEach(featureId => {
      const feature = serviceFeatures.find(f => f.id === featureId)
      if (feature) {
        total += feature.price[currency]
      }
    })

    // Timeline adjustments
    if (timeline === 'urgent') {
      total *= 1.3 // 30% rush fee
    } else if (timeline === 'flexible') {
      total *= 0.9 // 10% discount
    }

    return Math.round(total)
  }

  const formatCurrency = (amount) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`
    } else {
      return `$${amount.toLocaleString('en-US')}`
    }
  }

  const handleFeatureToggle = (featureId) => {
    setFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const resetCalculator = () => {
    setCurrentStep(1)
    setSelectedService('')
    setProjectComplexity('')
    setFeatures([])
    setTimeline('')
    setShowEstimate(false)
  }

  const selectedServiceData = services.find(s => s.id === selectedService)
  const estimatedPrice = calculateEstimate()
  const priceRange = {
    min: estimatedPrice * 0.85,
    max: estimatedPrice * 1.15
  }

  return (
    <>
      <SEO page="pricing" />
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)] to-[#0a0f1c]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl font-bold text-white sm:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transparent
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Pricing</span>
            </motion.h1>

            <motion.p
              className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get an instant estimate for your project. Our pricing calculator helps you understand costs based on your specific requirements. Remember our USP: <strong className="text-blue-400">Start Small, Scale Smart, Pay as You Grow</strong> — you don't need everything at once!
            </motion.p>

            {/* Currency Toggle */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-sm font-medium text-[var(--text-secondary)]">Select Currency:</span>
              <div className="inline-flex rounded-lg border border-[rgba(255,255,255,0.1)] bg-[var(--bg-card)] p-1">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${currency === 'INR'
                      ? 'text-white shadow-sm bg-blue-600'
                      : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                >
                  <FaRupeeSign className="w-4 h-4" />
                  INR
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${currency === 'USD'
                      ? 'text-white shadow-sm bg-blue-600'
                      : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                >
                  <FaDollarSign className="w-4 h-4" />
                  USD
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors ${currentStep >= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-[rgba(255,255,255,0.1)] text-[var(--text-muted)]'
                      }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 sm:w-24 h-1 mx-1 transition-colors ${currentStep > step ? 'bg-blue-600' : 'bg-[rgba(255,255,255,0.1)]'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-8 sm:gap-16 mt-4 text-xs sm:text-sm text-[var(--text-secondary)]">
                <span className={currentStep >= 1 ? 'font-semibold text-white' : ''}>Service</span>
                <span className={currentStep >= 2 ? 'font-semibold text-white' : ''}>Complexity</span>
                <span className={currentStep >= 3 ? 'font-semibold text-white' : ''}>Features</span>
                <span className={currentStep >= 4 ? 'font-semibold text-white' : ''}>Timeline</span>
              </div>
            </div>

            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Select Your Service</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => {
                    const IconComponent = service.IconComponent
                    return (
                      <div
                        key={service.id}
                        onClick={() => {
                          setSelectedService(service.id)
                          setCurrentStep(2)
                        }}
                        className={`cursor-pointer rounded-xl p-6 border transition-all hover:shadow-lg text-left glass-card ${selectedService === service.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'
                          }`}
                      >
                        <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${service.iconColor}20` }}>
                          <IconComponent className="w-8 h-8" style={{ color: service.iconColor }} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-4">{service.description}</p>
                        <div className="text-sm font-semibold text-blue-400">
                          Starting from {formatCurrency(service.basePrice[currency])}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Complexity */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Select Project Complexity</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { id: 'simple', name: 'Simple', desc: 'Basic features, standard design', example: 'Basic website or simple app' },
                    { id: 'medium', name: 'Medium', desc: 'Multiple features, custom design', example: 'Business website with CMS' },
                    { id: 'complex', name: 'Complex', desc: 'Advanced features, integrations', example: 'Enterprise solution with AI' }
                  ].map((complexity) => (
                    <div
                      key={complexity.id}
                      onClick={() => {
                        setProjectComplexity(complexity.id)
                        setCurrentStep(3)
                      }}
                      className={`cursor-pointer rounded-xl p-6 border transition-all hover:shadow-lg text-left glass-card ${projectComplexity === complexity.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'
                        }`}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{complexity.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">{complexity.desc}</p>
                      <p className="text-xs text-[var(--text-muted)] italic">Example: {complexity.example}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-[var(--text-secondary)] hover:text-white underline"
                  >
                    ← Back to Services
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Features */}
            {currentStep === 3 && selectedService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Features (Optional)</h2>
                <p className="text-center text-[var(--text-secondary)] mb-8">Select additional features to enhance your project</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {availableFeatures[selectedService]?.map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`cursor-pointer rounded-lg p-4 border transition-all hover:shadow-md glass-card ${features.includes(feature.id)
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{feature.name}</h4>
                          <p className="text-sm font-medium text-blue-400">
                            +{formatCurrency(feature.price[currency])}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${features.includes(feature.id)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-[rgba(255,255,255,0.3)]'
                          }`}>
                          {features.includes(feature.id) && (
                            <FaCheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] font-medium text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-lg font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-shadow bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Select Timeline</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { id: 'urgent', name: 'Urgent', desc: '2-4 weeks', note: '+30% rush fee', icon: '⚡' },
                    { id: 'standard', name: 'Standard', desc: '4-8 weeks', note: 'Recommended', icon: '📅' },
                    { id: 'flexible', name: 'Flexible', desc: '8+ weeks', note: '10% discount', icon: '🎯' }
                  ].map((time) => (
                    <div
                      key={time.id}
                      onClick={() => {
                        setTimeline(time.id)
                        setShowEstimate(true)
                      }}
                      className={`cursor-pointer rounded-xl p-6 border transition-all hover:shadow-lg text-center glass-card ${timeline === time.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'
                        }`}
                    >
                      <div className="text-4xl mb-3">{time.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{time.name}</h3>
                      <p className="text-[var(--text-secondary)] mb-2">{time.desc}</p>
                      <p className="text-sm font-medium text-blue-400">{time.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-sm text-[var(--text-secondary)] hover:text-white underline"
                  >
                    ← Back to Features
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Price Estimate */}
      {showEstimate && estimatedPrice > 0 && (
        <motion.section
          className="py-12 bg-[var(--bg-dark)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="glass-card rounded-2xl shadow-xl p-8 border border-blue-500/30">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Estimated Price</h2>

                {/* Price Breakdown */}
                <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-6 mb-6 border border-[rgba(255,255,255,0.05)]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[rgba(255,255,255,0.1)]">
                      <span className="font-medium text-[var(--text-secondary)]">Service:</span>
                      <span className="font-semibold text-white">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[rgba(255,255,255,0.1)]">
                      <span className="font-medium text-[var(--text-secondary)]">Complexity:</span>
                      <span className="font-semibold text-white capitalize">{projectComplexity}</span>
                    </div>
                    {features.length > 0 && (
                      <div className="pb-3 border-b border-[rgba(255,255,255,0.1)]">
                        <span className="font-medium text-[var(--text-secondary)] block mb-2">Additional Features:</span>
                        <ul className="space-y-1">
                          {features.map(featureId => {
                            const feature = availableFeatures[selectedService]?.find(f => f.id === featureId)
                            return feature ? (
                              <li key={featureId} className="flex justify-between text-sm">
                                <span className="text-[var(--text-muted)]">• {feature.name}</span>
                                <span className="text-white font-medium">+{formatCurrency(feature.price[currency])}</span>
                              </li>
                            ) : null
                          })}
                        </ul>
                      </div>
                    )}
                    <div className="flex justify-between items-center pb-3 border-b border-[rgba(255,255,255,0.1)]">
                      <span className="font-medium text-[var(--text-secondary)]">Timeline:</span>
                      <span className="font-semibold text-white capitalize">{timeline}</span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    <div className="text-center">
                      <p className="text-sm text-[var(--text-secondary)] mb-2">Estimated Price Range:</p>
                      <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                      </div>
                      <p className="text-xs text-[var(--text-muted)] italic">
                        * This is an estimate. Final pricing may vary based on detailed requirements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* USP Reminder */}
                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="text-sm font-semibold text-yellow-400 mb-1">Remember: Growth-Friendly Technology</p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        You don't need to build everything at once! Start with essentials, then add features as your business grows. This estimate can be phased over time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      // Pre-fill the modal with estimate details
                      setQuoteFormData({
                        ...quoteFormData,
                        message: `I'm interested in ${selectedServiceData?.name}.\n\nProject Details:\n- Complexity: ${projectComplexity}\n- Timeline: ${timeline}\n- Estimated Budget: ${formatCurrency(estimatedPrice)}\n\nPlease send me a detailed proposal.`
                      })
                      setShowQuoteModal(true)
                    }}
                    className="flex-1 text-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-shadow bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Send Quote Request
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] font-medium text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Growth-Friendly Pricing Model */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Growth-Friendly</span> Pricing Model
            </h2>
            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto">
              Unlike traditional agencies, we don't believe in overwhelming you with costs. Here's how we make technology affordable:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl text-left hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-blue-500/20">
                <MdConstruction className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Phase 1: Foundation</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Start with essential features only. Get your product live quickly at minimal cost.</p>
              <p className="text-xs text-[var(--text-muted)] italic">Example: Basic website → ₹40,000 - ₹80,000</p>
            </div>

            <div className="glass-card p-8 rounded-xl text-left hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-purple-500/20">
                <FaRocket className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Phase 2: Growth</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Add advanced features and integrations as your user base grows.</p>
              <p className="text-xs text-[var(--text-muted)] italic">Example: Add CMS + Analytics → ₹25,000</p>
            </div>

            <div className="glass-card p-8 rounded-xl text-left hover:border-green-500/50 transition-colors">
              <div className="flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-green-500/20">
                <HiChip className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Phase 3: Scale with AI</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">When ready, integrate AI automation to reduce costs and boost efficiency.</p>
              <p className="text-xs text-[var(--text-muted)] italic">Example: AI Chatbot → ₹80,000</p>
            </div>
          </div>

          <div className="mt-12 text-center glass-card p-8 rounded-lg max-w-2xl mx-auto border border-blue-500/30">
            <p className="text-lg font-semibold text-white mb-2">
              💡 Total Savings: Pay only when you're ready
            </p>
            <p className="text-[var(--text-secondary)] text-sm">
              Instead of investing ₹1,45,000 upfront, start with ₹40,000 and scale in phases based on revenue and growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Need a Custom Quote?
            </h2>
            <p className="text-[var(--text-secondary)] mb-10">
              Every project is unique. Share your requirements and we'll send you a detailed, customized proposal within 24 hours—completely free with no obligations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-shadow bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Get Custom Quote
                <FaArrowRight />
              </button>
              <a
                href="https://wa.me/919733814168?text=Hi! I'd like to discuss pricing for my project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] px-8 py-4 font-medium text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <motion.div
            className="glass-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[rgba(255,255,255,0.1)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[rgba(255,255,255,0.1)] p-6 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-2xl font-bold text-white">Request Custom Quote</h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-8">
              <p className="text-[var(--text-secondary)] mb-8 text-center">
                Fill out this form and we'll send you a detailed, customized proposal within 24 hours.
              </p>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault()
                // Send email with form data
                const subject = encodeURIComponent('Custom Quote Request')
                const body = encodeURIComponent(
                  `Name: ${quoteFormData.name}\nEmail: ${quoteFormData.email}\nPhone: ${quoteFormData.phone}\n\nMessage:\n${quoteFormData.message}`
                )
                window.location.href = `mailto:contact@waglogy.in?subject=${subject}&body=${body}`
                setShowQuoteModal(false)
              }}>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={quoteFormData.email}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={quoteFormData.phone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Project Details *</label>
                  <textarea
                    required
                    value={quoteFormData.message}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-600"
                    placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] font-medium text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-lg font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-shadow bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Send Quote Request
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Pricing
