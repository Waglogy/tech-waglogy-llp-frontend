import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaRupeeSign, FaDollarSign, FaCheckCircle, FaArrowRight, FaTimes, FaRocket } from 'react-icons/fa'
import { MdWeb, MdPhoneAndroid, MdComputer, MdPalette, MdConstruction, MdClose } from 'react-icons/md'
import { HiChip } from 'react-icons/hi'
import { RiRobotFill } from 'react-icons/ri'
import SEO from '../components/SEO'

// Shared animated section component
const ScrollFadeSection = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

const FloatingShape = ({ delay = 0, className }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      rotate: [0, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
)

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

  // Data Definitions
  const services = [
    {
      id: 'lead-capture',
      name: 'Lead Capture System',
      IconComponent: MdWeb,
      iconColor: 'text-blue-400',
      description: 'Landing pages & high-conversion forms',
      basePrice: { INR: 40000, USD: 500 },
      complexityMultiplier: { simple: 1, medium: 1.8, complex: 3 }
    },
    {
      id: 'automated-followup',
      name: 'Automated Follow-Up',
      IconComponent: RiRobotFill,
      iconColor: 'text-sky-400',
      description: 'AI-driven nurture sequences',
      basePrice: { INR: 60000, USD: 750 },
      complexityMultiplier: { simple: 1, medium: 2, complex: 3.5 }
    },
    {
      id: 'conversion-optimization',
      name: 'Conversion Flows',
      IconComponent: MdPalette,
      iconColor: 'text-indigo-400',
      description: 'User journey engineering',
      basePrice: { INR: 50000, USD: 600 },
      complexityMultiplier: { simple: 1, medium: 2, complex: 3 }
    },
    {
      id: 'crm-dashboards',
      name: 'CRM Dashboards',
      IconComponent: MdComputer,
      iconColor: 'text-white',
      description: 'Custom lead management hubs',
      basePrice: { INR: 100000, USD: 1200 },
      complexityMultiplier: { simple: 1, medium: 2.5, complex: 4 }
    },
    {
      id: 'revenue-analytics',
      name: 'Revenue Analytics',
      IconComponent: HiChip,
      iconColor: 'text-cyan-400',
      description: 'ROI & conversion tracking',
      basePrice: { INR: 80000, USD: 1000 },
      complexityMultiplier: { simple: 1, medium: 2.2, complex: 3.8 }
    },
    {
      id: 'ai-automation',
      name: 'AI Automation',
      IconComponent: HiChip,
      iconColor: 'text-blue-300',
      description: 'End-to-end workflow AI',
      basePrice: { INR: 150000, USD: 1800 },
      complexityMultiplier: { simple: 1, medium: 2.5, complex: 4.5 }
    }
  ]

  const availableFeatures = {
    'lead-capture': [
      { id: 'multistep', name: 'Multi-step Forms', price: { INR: 15000, USD: 180 } },
      { id: 'tracking', name: 'Source Tracking', price: { INR: 10000, USD: 120 } },
      { id: 'abtesting', name: 'A/B Test Setup', price: { INR: 20000, USD: 250 } },
      { id: 'validation', name: 'Identity Validation', price: { INR: 12000, USD: 150 } }
    ],
    'automated-followup': [
      { id: 'whatsapp', name: 'WhatsApp Sync', price: { INR: 20000, USD: 250 } },
      { id: 'ai-voice', name: 'AI Voice Intro', price: { INR: 45000, USD: 550 } },
      { id: 'nurture', name: 'Nurture Sequences', price: { INR: 25000, USD: 300 } },
      { id: 'scheduling', name: 'Auto-Scheduling', price: { INR: 30000, USD: 360 } }
    ],
    'conversion-optimization': [
      { id: 'heatmap', name: 'Heatmap Setup', price: { INR: 15000, USD: 180 } },
      { id: 'funnel', name: 'Funnel Analytics', price: { INR: 25000, USD: 300 } },
      { id: 'visuals', name: 'Asset Optimization', price: { INR: 20000, USD: 250 } },
      { id: 'behavior', name: 'Session Replay', price: { INR: 18000, USD: 220 } }
    ],
    'crm-dashboards': [
      { id: 'pipelining', name: 'Custom Pipelines', price: { INR: 25000, USD: 300 } },
      { id: 'api-sync', name: 'Third-party Sync', price: { INR: 40000, USD: 480 } },
      { id: 'roles', name: 'Role Permissions', price: { INR: 20000, USD: 250 } },
      { id: 'notifications', name: 'Real-time Alerts', price: { INR: 15000, USD: 180 } }
    ],
    'revenue-analytics': [
      { id: 'roi', name: 'ROI Attribution', price: { INR: 30000, USD: 360 } },
      { id: 'cac', name: 'CAC Tracking', price: { INR: 25000, USD: 300 } },
      { id: 'reports', name: 'Automated Reports', price: { INR: 20000, USD: 250 } },
      { id: 'forecasting', name: 'Growth Modeling', price: { INR: 35000, USD: 420 } }
    ],
    'ai-automation': [
      { id: 'llm-custom', name: 'Custom LLM Training', price: { INR: 60000, USD: 750 } },
      { id: 'workflows', name: 'Advanced Workflows', price: { INR: 50000, USD: 600 } },
      { id: 'extraction', name: 'Data Extraction', price: { INR: 40000, USD: 480 } },
      { id: 'inventory', name: 'Live Stock Sync', price: { INR: 35000, USD: 420 } }
    ]
  }

  const calculateEstimate = () => {
    if (!selectedService || !projectComplexity) return 0

    const service = services.find(s => s.id === selectedService)
    if (!service) return 0

    let total = service.basePrice[currency] * service.complexityMultiplier[projectComplexity]

    const serviceFeatures = availableFeatures[selectedService] || []
    features.forEach(featureId => {
      const feature = serviceFeatures.find(f => f.id === featureId)
      if (feature) {
        total += feature.price[currency]
      }
    })

    if (timeline === 'urgent') total *= 1.3
    else if (timeline === 'flexible') total *= 0.9

    return Math.round(total)
  }

  const formatCurrency = amount => currency === 'INR' ? `₹${amount.toLocaleString('en-IN')}` : `$${amount.toLocaleString('en-US')}`

  const handleFeatureToggle = (featureId) => {
    setFeatures(prev => prev.includes(featureId) ? prev.filter(id => id !== featureId) : [...prev, featureId])
  }

  const resetCalculator = () => {
    setCurrentStep(1); setSelectedService(''); setProjectComplexity(''); setFeatures([]); setTimeline(''); setShowEstimate(false);
  }

  const selectedServiceData = services.find(s => s.id === selectedService)
  const estimatedPrice = calculateEstimate()
  const priceRange = { min: estimatedPrice * 0.85, max: estimatedPrice * 1.15 }

  return (
    <>
      <SEO page="pricing" />

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-indigo-600 top-[-20%] left-[20%] w-[600px] h-[600px] opacity-15" />
          <FloatingShape className="bg-blue-600 bottom-[-10%] right-[-10%] w-[500px] h-[500px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* Header Section */}
        <section className="relative z-10 pt-40 lg:pt-60 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Pricing</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Get an instant estimate. No hidden fees. <strong className="text-white">Start Small, Scale Smart.</strong>
            </p>

            {/* Currency Toggle */}
            <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              {['INR', 'USD'].map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${currency === curr ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {curr === 'INR' ? <FaRupeeSign size={12} /> : <FaDollarSign size={12} />} {curr}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Calculator Section */}
        <section className="relative z-10 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl overflow-hidden">

              {/* Progress Bar */}
              <div className="bg-black/20 p-6 border-b border-white/5">
                <div className="flex items-center justify-center gap-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-slate-500'
                        }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-12 sm:w-20 h-1 mx-2 rounded-full ${currentStep > step ? 'bg-blue-600' : 'bg-white/5'
                          }`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-14 sm:gap-24 mt-2 text-xs text-slate-500 font-mono uppercase tracking-widest">
                  <span>Service</span>
                  <span>Scale</span>
                  <span>Features</span>
                  <span>Timeline</span>
                </div>
              </div>

              <div className="p-8 sm:p-12 min-h-[400px]">
                <AnimatePresence mode="wait">

                  {/* Step 1: Select Service */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-bold text-white mb-8 text-center">Select Your Service</h2>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => { setSelectedService(service.id); setCurrentStep(2) }}
                            className={`cursor-pointer rounded-xl p-6 border transition-all hover:scale-[1.02] ${selectedService === service.id
                              ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                              : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                              }`}
                          >
                            <div className={`w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center mb-4 text-2xl ${service.iconColor}`}>
                              <service.IconComponent />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                            <p className="text-sm text-slate-400 mb-4 h-10">{service.description}</p>
                            <div className="text-xs font-mono text-blue-400 bg-blue-500/10 py-1 px-2 rounded w-fit">
                              From {formatCurrency(service.basePrice[currency])}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Complexity */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-bold text-white mb-8 text-center">Select Complexity</h2>
                      <div className="grid gap-6 md:grid-cols-3">
                        {[
                          { id: 'simple', name: 'MVP / Simple', desc: 'Core features only', example: 'Landing page, basic app' },
                          { id: 'medium', name: 'Standard', desc: 'Custom features & design', example: 'Business site with CMS' },
                          { id: 'complex', name: 'Enterprise', desc: 'Advanced Logic & AI', example: 'SaaS, AI Platform' }
                        ].map((c) => (
                          <div
                            key={c.id}
                            onClick={() => { setProjectComplexity(c.id); setCurrentStep(3) }}
                            className={`cursor-pointer rounded-xl p-6 border transition-all text-center group ${projectComplexity === c.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-white/10 bg-white/5 hover:border-white/30'
                              }`}
                          >
                            <h3 className="text-xl font-bold text-white mb-2">{c.name}</h3>
                            <p className="text-slate-400 text-sm mb-4">{c.desc}</p>
                            <div className="text-xs text-slate-500 py-2 border-t border-white/5">Ex: {c.example}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setCurrentStep(1)} className="block mx-auto mt-8 text-slate-500 hover:text-white transition-colors text-sm">← Back</button>
                    </motion.div>
                  )}

                  {/* Step 3: Features */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-bold text-white mb-8 text-center">Add Features</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {availableFeatures[selectedService]?.map((f) => (
                          <div
                            key={f.id}
                            onClick={() => handleFeatureToggle(f.id)}
                            className={`cursor-pointer rounded-xl p-4 border transition-all flex items-center justify-between ${features.includes(f.id)
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                          >
                            <div>
                              <h4 className="font-bold text-white">{f.name}</h4>
                              <p className="text-blue-400 text-sm font-mono mt-1">+{formatCurrency(f.price[currency])}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${features.includes(f.id) ? 'border-blue-500 bg-blue-500' : 'border-slate-600'
                              }`}>
                              {features.includes(f.id) && <FaCheckCircle className="text-white text-xs" />}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center gap-4 mt-8">
                        <button onClick={() => setCurrentStep(2)} className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5">Back</button>
                        <button onClick={() => setCurrentStep(4)} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg">Continue</button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Timeline */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-2xl font-bold text-white mb-8 text-center">Timeline</h2>
                      <div className="grid gap-6 md:grid-cols-3">
                        {[
                          { id: 'urgent', name: 'Proty', desc: 'Need it yesterday', note: '+30% Rush Fee', icon: '⚡' },
                          { id: 'standard', name: 'Standard', desc: 'Balanced pace', note: 'Standard Rate', icon: '📅' },
                          { id: 'flexible', name: 'Relaxed', desc: 'No rush', note: '-10% Discount', icon: '🍃' }
                        ].map((t) => (
                          <div
                            key={t.id}
                            onClick={() => { setTimeline(t.id); setShowEstimate(true) }}
                            className={`cursor-pointer rounded-xl p-6 border transition-all text-center ${timeline === t.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                          >
                            <div className="text-4xl mb-4">{t.icon}</div>
                            <h3 className="font-bold text-white mb-2">{t.name}</h3>
                            <p className="text-slate-400">{t.desc}</p>
                            <p className="text-blue-400 text-xs mt-2 font-mono">{t.note}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setCurrentStep(3)} className="block mx-auto mt-8 text-slate-500 hover:text-white transition-colors text-sm">← Back</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Estimation Result */}
        <AnimatePresence>
          {showEstimate && estimatedPrice > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="py-12 px-4 relative z-20"
            >
              <div className="max-w-3xl mx-auto">
                <div className="glass-card p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-[1px]">
                  <div className="bg-[#0f172a] rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Estimated Investment</h2>

                    <div className="flex flex-col items-center justify-center py-8 border-y border-white/10 mb-6">
                      <span className="text-slate-400 text-sm mb-2">Estimated Range</span>
                      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300 mb-8">
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span>Service</span> <span className="text-white">{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span>Complexity</span> <span className="text-white capitalize">{projectComplexity}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span>Timeline</span> <span className="text-white capitalize">{timeline}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span>Add-ons</span> <span className="text-white">{features.length} selected</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setQuoteFormData({
                            ...quoteFormData,
                            message: `Project Estimate: ${formatCurrency(priceRange.min)} - ${formatCurrency(priceRange.max)}\nService: ${selectedServiceData?.name}\nComplexity: ${projectComplexity}\nTimeline: ${timeline}`
                          })
                          setShowQuoteModal(true)
                        }}
                        className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/25 transition-all"
                      >
                        Book Consultation
                      </button>
                      <button onClick={resetCalculator} className="px-6 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Growth Model Grid */}
        <ScrollFadeSection className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: MdConstruction, title: 'Lead Capture', price: '₹40k - ₹80k', desc: 'Landing pages & forms. Start capturing ROI.' },
                { icon: FaRocket, title: 'Automation', price: '+ ₹20k - ₹60k', desc: 'Automated follow-ups & nurture syncs.' },
                { icon: HiChip, title: 'Growth Hub', price: '+ ₹100k systems', desc: 'CRMs & AI-driven revenue tracking.' }
              ].map((Box, i) => (
                <div key={i} className="glass-card p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl mb-4">
                    <Box.icon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{Box.title}</h3>
                  <p className="text-blue-400 font-mono text-sm mb-2">{Box.price}</p>
                  <p className="text-slate-400 text-sm">{Box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeSection>

        {/* Quote Modal */}
        {showQuoteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowQuoteModal(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Save Estimate</h3>
                <button onClick={() => setShowQuoteModal(false)} className="text-slate-400 hover:text-white"><MdClose size={24} /></button>
              </div>

              <form className="p-6 space-y-4" onSubmit={(e) => {
                e.preventDefault()
                const subject = encodeURIComponent('Custom Quote Request')
                const body = encodeURIComponent(
                  `Name: ${quoteFormData.name}\nEmail: ${quoteFormData.email}\nPhone: ${quoteFormData.phone}\n\nMessage:\n${quoteFormData.message}`
                )
                window.location.href = `mailto:contact@waglogy.in?subject=${subject}&body=${body}`
                setShowQuoteModal(false)
              }}>
                <div>
                  <label className="block text-slate-400 text-xs uppercase mb-2">Name</label>
                  <input
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    value={quoteFormData.name}
                    onChange={e => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs uppercase mb-2">Email</label>
                    <input
                      required type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      value={quoteFormData.email}
                      onChange={e => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs uppercase mb-2">Phone</label>
                    <input
                      required type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      value={quoteFormData.phone}
                      onChange={e => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase mb-2">Project Details</label>
                  <textarea
                    required rows="4"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"
                    value={quoteFormData.message}
                    onChange={e => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg">
                  Request Formal Quote
                </button>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </>
  )
}

export default Pricing
