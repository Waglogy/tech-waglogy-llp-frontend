import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaGlobe, FaLaptopCode, FaMobileAlt, FaRocket, FaExternalLinkAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import HimatoDetail from '../components/projects/HimatoDetail'
import ClientProjectDetail from '../components/projects/ClientProjectDetail'
import { FloatingShape } from '../components/projects/Shared'

// Project Data
const PROJECTS = [
  {
    id: 'himato',
    type: 'product',
    name: 'Himato',
    subtitle: 'AI-Powered Travel Companion',
    description: 'Revolutionizing Himalayan tourism with personalized AI itineraries and real-time expert guidance.',
    tags: ['AI/ML', 'React Native', 'Node.js', 'GenAI'],
    image: '/himato.png', // Assuming this exists as it was in original file
    accent: 'cyan',
    url: 'https://himato.in'
  },
  {
    id: 'daragharmaila',
    type: 'client',
    name: 'Daraghar Maila',
    subtitle: 'Homestay & Glamping',
    description: '"Where the hills whisper stories of our ancestors." A peaceful retreat nestled in the sunny slopes of Lower Luing, where time slows down and nature breathes life into every moment.',
    url: 'https://daragharmaila.com',
    industry: 'Hospitality',
    address: 'Lower Luing, Gangtok, Sikkim',
    image: '/daraghar.png',
    tags: ['Next.js', 'Booking System', 'UI/UX'],
    accent: 'green'
  },
  {
    id: 'sbvidalaya',
    type: 'client',
    name: 'Saraswati Bal Vidyalaya',
    subtitle: 'School Website',
    description: 'Official website for Saraswati Bal Vidyalaya, located in Bermiok Budhbarey, West Sikkim. Facilitating digital communication and educational resources.',
    url: 'https://sbvidalaya.in',
    industry: 'Education',
    address: 'Bermiok Budhbarey, West - Sikkim',
    image: '/sbvidlaya.png',
    tags: ['React', 'Content Management', 'Responsive'],
    accent: 'yellow'
  },
  {
    id: 'dhenterprises',
    type: 'client',
    name: 'DH Enterprises',
    subtitle: 'Growing Geo-Tech Firm With Over 8 Years Of Expertise',
    description: 'DH enterprise offers a comprehensive range of services, including slope stabilization, landslide restoration, hydropower projects, tunneling, geotechnical field investigations, topographical surveys, geophysical investigations, geological studies, project management, and non-destructive testing on concrete.',
    url: 'https://dhenterprises.in',
    industry: 'Construction & Engineering',
    address: 'Nepalipatty, Tezpur - 784001 (Assam)',
    image: '/dhenterprise.png',
    tags: ['Web Design', 'Branding', 'Performance'],
    accent: 'blue'
  }
]

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const location = useLocation()

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedProjectId])

  const handleProjectClick = (id) => {
    setSelectedProjectId(id)
  }

  const handleBack = () => {
    setSelectedProjectId(null)
  }

  // Render Logic
  const renderContent = () => {
    if (selectedProjectId === 'himato') {
      return <HimatoDetail onBack={handleBack} />
    }

    const selectedProject = PROJECTS.find(p => p.id === selectedProjectId)
    if (selectedProject) {
      return <ClientProjectDetail project={selectedProject} onBack={handleBack} />
    }

    return (
      <div className="relative min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-blue-600 top-[-10%] right-[30%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-purple-600 bottom-[10%] left-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
        </div>

        <div className="relative z-10 pt-40 lg:pt-60 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Work</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                We build digital products that matter. From our own innovative AI platforms to transformative solutions for our clients.
              </p>
            </motion.div>
          </div>

          {/* SECTION 1: Our Products */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1" />
              <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest shrink-0">Our Flagship Products</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1" />
            </div>

            {/* Himato Featured Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => handleProjectClick('himato')}
              className="group cursor-pointer relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-black hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="grid lg:grid-cols-2 gap-8 p-1 sm:p-2">
                {/* Content */}
                <div className="p-8 sm:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-6">
                    <FaRocket className="w-3 h-3" />
                    <span>PRODUCT INCUBATOR</span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Himato</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    The future of travel planning in the Himalayas. An AI-native platform that generates personalized itineraries, connects travelers with local experts, and uncovers hidden gems in Sikkim.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['AI/ML', 'Mobile App', 'Travel Tech'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <button className="flex items-center gap-2 text-white font-semibold group/btn">
                      View Project Details
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform text-cyan-400" />
                    </button>
                    <a
                      href="https://himato.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors z-20"
                    >
                      <FaExternalLinkAlt /> Visit Live Site
                    </a>
                  </div>
                </div>

                {/* Preview Image Area */}
                <div className="relative min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden order-1 lg:order-2 bg-black/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <img
                    src="/himato.png"
                    alt="Himato Preview"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div className="hidden absolute inset-0 w-full h-full bg-slate-800 items-center justify-center flex-col text-slate-500">
                    <FaRocket className="text-6xl mb-4 opacity-20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>


          {/* SECTION 2: Client Projects */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
              <h2 className="text-2xl font-bold text-slate-200 uppercase tracking-widest shrink-0">Client Success Stories</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.filter(p => p.type === 'client').map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    onClick={() => handleProjectClick(project.id)}
                    className="group h-full bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-all hover:bg-white/[0.07] flex flex-col"
                  >
                    {/* Card Header / Image */}
                    <div className={`h-48 relative overflow-hidden bg-gradient-to-br from-slate-800 to-black group-hover:scale-105 transition-transform duration-500`}>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-60 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]"></div>
                      )}

                      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent`}></div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <FaGlobe className="w-3 h-3" /> {project.url.replace('https://', '')}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-500 uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-xs text-slate-500 font-mono">CLIENT PROJECT</span>
                          <span className="text-sm text-white font-medium flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                            Details <FaArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="mt-32 mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Have a project in mind?</h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-cyan-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Let's Build It
              <FaArrowRight />
            </Link>
          </div>

        </div>
      </div>
    )
  }

  return (
    <>
      <SEO page="projects" title="Our Projects - Waglogy" />
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProjectId ? 'detail' : 'list'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Projects
