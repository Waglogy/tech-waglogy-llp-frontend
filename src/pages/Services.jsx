import React, { useState } from 'react'

const Services = () => {
  const [activeService, setActiveService] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      icon: '🌐',
      features: [
        'Responsive Design',
        'Performance Optimization',
        'SEO Optimization',
        'Cross-browser Compatibility',
        'Mobile-first Approach'
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Express'],
      pricing: 'Starting from $2,500',
      timeline: '2-8 weeks'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: '📱',
      features: [
        'iOS & Android Apps',
        'Cross-platform Solutions',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'],
      pricing: 'Starting from $5,000',
      timeline: '4-12 weeks'
    },
    {
      id: 3,
      title: 'AI-Powered Solutions',
      description: 'Intelligent applications powered by machine learning and artificial intelligence.',
      icon: '🤖',
      features: [
        'Machine Learning Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'Chatbots & Virtual Assistants'
      ],
      technologies: ['Python', 'TensorFlow', 'OpenAI API', 'PyTorch', 'FastAPI'],
      pricing: 'Starting from $8,000',
      timeline: '6-16 weeks'
    },
    {
      id: 4,
      title: 'E-commerce Development',
      description: 'Complete e-commerce solutions with secure payment processing and inventory management.',
      icon: '🛒',
      features: [
        'Online Store Setup',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Processing',
        'Analytics & Reporting'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal'],
      pricing: 'Starting from $3,500',
      timeline: '3-10 weeks'
    },
    {
      id: 5,
      title: 'UI/UX Design',
      description: 'Beautiful, user-centered designs that enhance user experience and engagement.',
      icon: '🎨',
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Visual Design',
        'User Testing',
        'Design Systems'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      pricing: 'Starting from $1,500',
      timeline: '2-6 weeks'
    },
    {
      id: 6,
      title: 'Software Development',
      description: 'Custom software solutions tailored to your specific business requirements.',
      icon: '💻',
      features: [
        'Custom Applications',
        'API Development',
        'Database Design',
        'System Integration',
        'Maintenance & Support'
      ],
      technologies: ['Python', 'Java', 'C#', 'PostgreSQL', 'MongoDB'],
      pricing: 'Starting from $4,000',
      timeline: '4-14 weeks'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, target audience, and project requirements.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Design & Prototyping',
      description: 'Create wireframes, mockups, and interactive prototypes to visualize your project.',
      duration: '2-4 weeks'
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Build your solution with clean, scalable code and rigorous testing procedures.',
      duration: '4-12 weeks'
    },
    {
      step: 4,
      title: 'Launch & Support',
      description: 'Deploy your project and provide ongoing maintenance and support services.',
      duration: 'Ongoing'
    }
  ]

  const technologies = [
    { name: 'React', category: 'Frontend', icon: '⚛️' },
    { name: 'Node.js', category: 'Backend', icon: '🟢' },
    { name: 'Python', category: 'Backend', icon: '🐍' },
    { name: 'MongoDB', category: 'Database', icon: '🍃' },
    { name: 'AWS', category: 'Cloud', icon: '☁️' },
    { name: 'Docker', category: 'DevOps', icon: '🐳' },
    { name: 'Figma', category: 'Design', icon: '🎨' },
    { name: 'Git', category: 'Version Control', icon: '📝' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Our
              <span style={{ color: 'var(--brand-primary)' }}> Services</span>
            </h1>
            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              From concept to deployment, we provide comprehensive digital solutions that drive business growth. 
              Our expert team delivers modern, scalable, and user-focused applications.
            </p>
            <div className="mt-4 sm:mt-6">
              <a
                className="inline-block rounded-lg px-5 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
                href="#contact"
              >
                Get Started Today
              </a>
            </div>
          </div>
          <div className="mx-auto hidden max-w-md md:block">
            <img src="/banner.png" alt="Waglogy services" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What We Offer</h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
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

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6 text-sm">
                    <div>
                      <span className="text-gray-500">Starting from</span>
                      <div className="font-semibold text-gray-900">{service.pricing}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline</span>
                      <div className="font-semibold text-gray-900">{service.timeline}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveService(service)}
                    className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Process</h2>
            <p className="mt-4 text-lg text-gray-600">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
                       style={{ backgroundColor: 'var(--brand-primary)' }}>
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                  <span className="text-xs font-medium text-gray-500">{step.duration}</span>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 transform translate-x-4">
                    <div className="absolute right-0 top-0 w-2 h-2 bg-gray-200 rounded-full transform -translate-y-1"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Technologies We Use</h2>
            <p className="mt-4 text-lg text-gray-600">
              Modern tools and frameworks for building exceptional digital experiences
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {activeService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setActiveService(null)} />
            <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl">
              <div className="p-8">
                <button
                  onClick={() => setActiveService(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="flex items-start mb-6">
                  <div className="text-5xl mr-4">{activeService.icon}</div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{activeService.title}</h3>
                    <p className="text-lg text-gray-600">{activeService.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {activeService.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeService.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">Pricing</span>
                        <span className="font-semibold" style={{ color: 'var(--brand-primary)' }}>
                          {activeService.pricing}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">Timeline</span>
                        <span className="font-semibold" style={{ color: 'var(--brand-primary)' }}>
                          {activeService.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <a
                    href="mailto:contact@waglogy.in"
                    className="flex-1 rounded-lg px-6 py-3 text-center font-medium text-white transition-colors"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    Get Quote
                  </a>
                  <button
                    onClick={() => setActiveService(null)}
                    className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that drives your business forward. 
              Our team is ready to bring your vision to life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@waglogy.in"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Get Free Consultation
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
