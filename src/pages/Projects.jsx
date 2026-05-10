import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdArrowForward, MdOpenInNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { PROJECTS } from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
  })
}

const Projects = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const product = PROJECTS.find(p => p.type === 'product')
  const clientProjects = PROJECTS.filter(p => p.type === 'client')

  return (
    <>
      <SEO page="projects" title="Our Work — Waglogy" />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="section-label mb-6">
              Our Work
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl"
            >
              Real projects. Real businesses. Real results.
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl"
            >
              We build across industries — travel, hospitality, education, engineering, sustainability, and more.
              Here's a look at what we've delivered.
            </motion.p>
          </div>
        </section>

        {/* ── FEATURED PRODUCT ─────────────────────────────── */}
        {product && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto">

              <div className="section-label mb-8">Our Own Product</div>

              <Link to={`/projects/${product.id}`}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-[#E5E2DC] hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto overflow-hidden bg-[#0A0F1E]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-6 w-fit">
                      In-house product
                    </span>
                    <h2 className="text-4xl font-bold text-[#0C0C0C] mb-3 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-[#6E6B67] text-lg leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-[#F5F4F0] border border-[#E5E2DC] text-xs text-[#6E6B67] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="flex items-center gap-2 text-[#0C0C0C] font-semibold text-sm">
                        View project details
                        <MdArrowForward size={16} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-sm text-[#6E6B67] hover:text-blue-600 transition-colors"
                      >
                        <MdOpenInNew size={14} />
                        Live site
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </section>
        )}

        {/* ── CLIENT PROJECTS ──────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <div className="section-label mb-8">Client Projects</div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {clientProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <Link to={`/projects/${project.id}`} className="block group h-full">
                    <div className="card h-full flex flex-col overflow-hidden">

                      {/* Screenshot */}
                      <div className="relative h-48 overflow-hidden bg-[#F0EDE8] shrink-0">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.name}
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#C9C4BB]">
                            <MdOpenInNew size={40} />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#0C0C0C] group-hover:text-blue-600 transition-colors leading-snug">
                            {project.name}
                          </h3>
                          <span className="text-xs text-[#A09A90] bg-[#F5F4F0] border border-[#E5E2DC] px-2 py-1 rounded-md shrink-0 mt-0.5">
                            {project.industry}
                          </span>
                        </div>

                        <p className="text-sm text-[#6E6B67] leading-relaxed mb-5 flex-1 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-xs text-blue-600 font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-[#E5E2DC]">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-xs text-[#A09A90] hover:text-blue-600 transition-colors flex items-center gap-1"
                            >
                              <MdOpenInNew size={12} />
                              {project.url.replace('https://www.', '').replace('https://', '')}
                            </a>
                            <span className="text-sm font-medium text-[#0C0C0C] flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
                              Details
                              <MdArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Your project could be next.
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Every project on this page started with a conversation. Tell us what you're building and we'll tell you how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary px-8 py-4 text-base justify-center">
                  Start a Conversation
                  <MdArrowForward size={18} />
                </Link>
                <Link to="/services" className="btn-outline px-8 py-4 text-base justify-center border-white/20 text-white hover:border-white/40 hover:bg-white/5">
                  See Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}

export default Projects
