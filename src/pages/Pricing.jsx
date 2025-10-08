import React, { useState, useEffect } from 'react'

const Pricing = () => {
  const [selectedServices, setSelectedServices] = useState([])
  const [budget, setBudget] = useState('')
  const [budgetSuggestions, setBudgetSuggestions] = useState([])
  const [showBudgetExplorer, setShowBudgetExplorer] = useState(false)

  const services = [
    {
      id: 'web-development',
      name: 'Web Development',
      basePrice: 2500,
      description: 'Modern, responsive websites and web applications',
      features: ['Responsive Design', 'SEO Optimization', 'Performance Optimization', 'Cross-browser Compatibility'],
      addOns: [
        { name: 'E-commerce Integration', price: 1500 },
        { name: 'CMS Integration', price: 800 },
        { name: 'Advanced Analytics', price: 600 },
        { name: 'Multi-language Support', price: 1000 }
      ]
    },
    {
      id: 'mobile-app',
      name: 'Mobile App Development',
      basePrice: 5000,
      description: 'Native and cross-platform mobile applications',
      features: ['iOS & Android Apps', 'Cross-platform Solutions', 'App Store Optimization', 'Push Notifications'],
      addOns: [
        { name: 'Backend API Development', price: 2000 },
        { name: 'Real-time Features', price: 1500 },
        { name: 'Offline Functionality', price: 1000 },
        { name: 'Social Media Integration', price: 800 }
      ]
    },
    {
      id: 'ai-solutions',
      name: 'AI-Powered Solutions',
      basePrice: 8000,
      description: 'Intelligent applications powered by machine learning',
      features: ['Machine Learning Models', 'Natural Language Processing', 'Predictive Analytics', 'Chatbots'],
      addOns: [
        { name: 'Custom AI Training', price: 3000 },
        { name: 'Real-time Processing', price: 2000 },
        { name: 'Data Visualization', price: 1500 },
        { name: 'API Integration', price: 1000 }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Development',
      basePrice: 3500,
      description: 'Complete e-commerce solutions with payment processing',
      features: ['Online Store Setup', 'Payment Gateway Integration', 'Inventory Management', 'Order Processing'],
      addOns: [
        { name: 'Advanced Analytics', price: 1200 },
        { name: 'Multi-vendor Support', price: 2000 },
        { name: 'Subscription Management', price: 1500 },
        { name: 'Advanced Search', price: 800 }
      ]
    },
    {
      id: 'ui-ux-design',
      name: 'UI/UX Design',
      basePrice: 1500,
      description: 'Beautiful, user-centered designs',
      features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'User Testing'],
      addOns: [
        { name: 'Design System', price: 1000 },
        { name: 'Brand Identity', price: 800 },
        { name: 'Animation Design', price: 600 },
        { name: 'Usability Testing', price: 500 }
      ]
    },
    {
      id: 'software-development',
      name: 'Software Development',
      basePrice: 4000,
      description: 'Custom software solutions',
      features: ['Custom Applications', 'API Development', 'Database Design', 'System Integration'],
      addOns: [
        { name: 'Cloud Deployment', price: 1200 },
        { name: 'Security Implementation', price: 1000 },
        { name: 'Performance Optimization', price: 800 },
        { name: 'Documentation', price: 500 }
      ]
    }
  ]

  const calculateTotalPrice = () => {
    let total = 0
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId)
      if (service) {
        total += service.basePrice
      }
    })
    return total
  }

  const calculateBudgetSuggestions = (budgetAmount) => {
    const suggestions = []
    const budget = parseInt(budgetAmount)
    
    if (isNaN(budget) || budget < 1000) return suggestions

    // Find combinations that fit within budget
    const sortedServices = [...services].sort((a, b) => a.basePrice - b.basePrice)
    
    // Single service suggestions
    sortedServices.forEach(service => {
      if (service.basePrice <= budget) {
        suggestions.push({
          services: [service],
          totalPrice: service.basePrice,
          remaining: budget - service.basePrice
        })
      }
    })

    // Two service combinations
    for (let i = 0; i < sortedServices.length; i++) {
      for (let j = i + 1; j < sortedServices.length; j++) {
        const total = sortedServices[i].basePrice + sortedServices[j].basePrice
        if (total <= budget) {
          suggestions.push({
            services: [sortedServices[i], sortedServices[j]],
            totalPrice: total,
            remaining: budget - total
          })
        }
      }
    }

    // Three service combinations (if budget allows)
    if (budget >= 10000) {
      for (let i = 0; i < sortedServices.length; i++) {
        for (let j = i + 1; j < sortedServices.length; j++) {
          for (let k = j + 1; k < sortedServices.length; k++) {
            const total = sortedServices[i].basePrice + sortedServices[j].basePrice + sortedServices[k].basePrice
            if (total <= budget) {
              suggestions.push({
                services: [sortedServices[i], sortedServices[j], sortedServices[k]],
                totalPrice: total,
                remaining: budget - total
              })
            }
          }
        }
      }
    }

    return suggestions.sort((a, b) => b.totalPrice - a.totalPrice).slice(0, 6)
  }

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleBudgetChange = (value) => {
    setBudget(value)
    if (value && parseInt(value) >= 1000) {
      setBudgetSuggestions(calculateBudgetSuggestions(value))
    } else {
      setBudgetSuggestions([])
    }
  }

  const selectBudgetSuggestion = (suggestion) => {
    const serviceIds = suggestion.services.map(s => s.id)
    setSelectedServices(serviceIds)
    setShowBudgetExplorer(false)
  }

  const getSelectedServices = () => {
    return services.filter(service => selectedServices.includes(service.id))
  }

  const totalPrice = calculateTotalPrice()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Interactive
              <span style={{ color: 'var(--brand-primary)' }}> Pricing</span>
            </h1>
            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Build your perfect package by selecting services and see real-time pricing. 
              Or tell us your budget and we'll show you what's possible.
            </p>
            <div className="mt-4 sm:mt-6 flex gap-4">
              <button
                onClick={() => setShowBudgetExplorer(!showBudgetExplorer)}
                className="inline-block rounded-lg px-5 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                {showBudgetExplorer ? 'Hide Budget Explorer' : 'Explore by Budget'}
              </button>
              <a
                href="#contact"
                className="inline-block rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Get Custom Quote
              </a>
            </div>
          </div>
          <div className="mx-auto hidden max-w-md md:block">
            <img src="/banner.png" alt="Waglogy pricing" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Budget Explorer */}
      {showBudgetExplorer && (
        <section className="py-8 bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What can you get for your budget?</h2>
              <div className="max-w-md mx-auto">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your budget (USD)
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  placeholder="e.g., 10000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {budgetSuggestions.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {budgetSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Package {index + 1}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>
                          ${suggestion.totalPrice.toLocaleString()}
                        </div>
                        {suggestion.remaining > 0 && (
                          <div className="text-sm text-gray-500">
                            ${suggestion.remaining.toLocaleString()} remaining
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {suggestion.services.map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {service.name}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => selectBudgetSuggestion(suggestion)}
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                      Select This Package
                    </button>
                  </div>
                ))}
              </div>
            )}

            {budget && parseInt(budget) < 1000 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Please enter a budget of at least $1,000 to see suggestions.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Service Selection */}
      <section className="py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Select Your Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the services you need and see real-time pricing
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className={`relative rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                  selectedServices.includes(service.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => handleServiceToggle(service.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>
                      ${service.basePrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">starting from</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {selectedServices.includes(service.id) ? 'Selected' : 'Click to select'}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedServices.includes(service.id) && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      {selectedServices.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Selected Package</h2>
              
              <div className="space-y-4 mb-6">
                {getSelectedServices().map((service) => (
                  <div key={service.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${service.basePrice.toLocaleString()}</div>
                      <button
                        onClick={() => handleServiceToggle(service.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-2xl font-bold text-gray-900 py-4 border-t border-gray-200">
                <span>Total Price:</span>
                <span style={{ color: 'var(--brand-primary)' }}>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="mailto:contact@waglogy.in"
                  className="flex-1 rounded-lg px-6 py-3 font-medium text-white text-center transition-colors"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  Get Detailed Quote
                </a>
                <button
                  onClick={() => setSelectedServices([])}
                  className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Add-ons Section */}
      {selectedServices.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Available Add-ons</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getSelectedServices().map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{service.name} Add-ons</h3>
                  <div className="space-y-3">
                    {service.addOns.map((addon, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <div className="font-medium text-gray-900">{addon.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">+${addon.price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our pricing is transparent and flexible. Contact us for a detailed quote 
              tailored to your specific needs and timeline.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@waglogy.in"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Get Custom Quote
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricing

