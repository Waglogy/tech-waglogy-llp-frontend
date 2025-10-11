import React, { useState } from 'react'
import SEO from '../components/SEO'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI Solutions' },
    { id: 'ecommerce', name: 'E-commerce' }
  ]

  const projects = [
    {
      id: 1,
      title: 'BudBeaver',
      description: 'Budgeting web app that helps SMBs plan, track, and optimize spend with intelligent insights.',
      image: '/banner.png',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      status: 'Live',
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'NovaCart',
      description: 'Headless e-commerce storefront with blazing-fast checkout and seamless payment integration.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1974&auto=format&fit=crop',
      category: 'ecommerce',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
      status: 'Live',
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'PulseFit',
      description: 'Cross-platform fitness app with real-time coaching, analytics, and social features.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      status: 'Live',
      link: '#',
      featured: false
    },
    {
      id: 4,
      title: 'InsightAI',
      description: 'LLM-powered dashboard turning raw data into actionable insights with natural language queries.',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1974&auto=format&fit=crop',
      category: 'ai',
      technologies: ['Python', 'OpenAI API', 'FastAPI', 'PostgreSQL'],
      status: 'Live',
      link: '#',
      featured: true
    },
    {
      id: 5,
      title: 'TaskFlow Pro',
      description: 'Advanced project management tool with AI-powered task prioritization and team collaboration.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1974&auto=format&fit=crop',
      category: 'web',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebSockets'],
      status: 'In Development',
      link: '#',
      featured: false
    },
    {
      id: 6,
      title: 'HealthTracker',
      description: 'Mobile health monitoring app with AI-driven health insights and doctor connectivity.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1974&auto=format&fit=crop',
      category: 'mobile',
      technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'HealthKit'],
      status: 'Live',
      link: '#',
      featured: false
    }
  ]

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <>
      <SEO page="projects" />
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Our
              <span style={{ color: 'var(--brand-primary)' }}> Projects</span>
            </h1>
            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Explore our portfolio of modern web applications, mobile apps, and AI-powered solutions. 
              Each project showcases our commitment to clean design, performance, and user experience.
            </p>
            <div className="mt-4 sm:mt-6">
              <a
                className="inline-block rounded-lg px-5 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
                href="#contact"
              >
                Start Your Project
              </a>
            </div>
          </div>
          <div className="mx-auto hidden max-w-md md:block">
            <img src="/banner.png" alt="Waglogy projects" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our most impactful work that demonstrates our expertise and innovation
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      project.status === 'Live' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Section */}
      <section className="py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">All Projects</h2>
            <p className="mt-4 text-lg text-gray-600">
              Browse through our complete portfolio of digital solutions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? 'var(--brand-primary)' : 'transparent'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group block overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.status === 'Live' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
                      style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                      View Details
                    </button>
                    <a
                      href={project.link}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                    >
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedProject(null)} />
            <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl">
              <div className="flex">
                <div className="w-1/2">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="w-1/2 p-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedProject.title}</h3>
                  <p className="text-gray-600 mb-6">{selectedProject.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Status</h4>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                      selectedProject.status === 'Live' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={selectedProject.link}
                      className="flex-1 rounded-lg px-4 py-2 text-center font-medium text-white transition-colors"
                      style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                      Visit Project
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
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
              Let's discuss your ideas and bring your vision to life with our expertise in modern web development, 
              mobile apps, and AI-powered solutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@waglogy.in"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Get Started Today
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects

