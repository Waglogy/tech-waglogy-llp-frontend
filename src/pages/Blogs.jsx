import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MdSearch, MdClose, MdArrowForward, MdCalendarToday, MdAccessTime } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { getAllBlogs } from '../services/blogService'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' }
  })
}

const Insights = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    fetchBlogs()
  }, [currentPage, searchTerm, selectedTag])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = { page: currentPage, limit: 9, sort: '-date', isPublished: true }
      if (searchTerm) params.search = searchTerm
      if (selectedTag) params.tags = selectedTag

      const response = await getAllBlogs(params)
      setBlogs(response.data)
      setTotalPages(response.totalPages || 1)

      if (response.data.length > 0) {
        const tags = response.data
          .flatMap(blog => blog.tags || [])
          .filter((tag, index, self) => self.indexOf(tag) === index)
          .slice(0, 10)
        setAllTags(tags)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <>
      <SEO page="blog" title="Insights — Waglogy" />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="section-label mb-6">
              Insights
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl"
            >
              Field notes on AI, hospitality, and revenue systems.
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-lg text-[#6E6B67] leading-relaxed max-w-2xl"
            >
              Practical writing from building Himato and installing revenue systems in hotels —
              plus the occasional piece on technology, design, and running a service business in
              Northeast India.
            </motion.p>
          </div>
        </section>

        {/* ── SEARCH + FILTERS ─────────────────────────────── */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <MdSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09A90]" />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                className="w-full pl-10 pr-10 py-2.5 border border-[#E5E2DC] rounded-lg text-sm bg-[#FAFAF8] placeholder-[#A09A90] focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => { setSearchTerm(''); setCurrentPage(1) }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A09A90] hover:text-[#0C0C0C]"
                >
                  <MdClose size={16} />
                </button>
              )}
            </div>

            {/* Tag filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedTag(''); setCurrentPage(1) }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedTag === ''
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#F5F4F0] border border-[#E5E2DC] text-[#6E6B67] hover:border-blue-300'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setCurrentPage(1) }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#F5F4F0] border border-[#E5E2DC] text-[#6E6B67] hover:border-blue-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── ARTICLES GRID ────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-lg text-[#6E6B67] mb-4">
                  {searchTerm || selectedTag ? 'No articles match your search.' : 'No articles published yet.'}
                </p>
                {(searchTerm || selectedTag) && (
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedTag(''); setCurrentPage(1) }}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {blogs.map((blog, idx) => (
                    <motion.article
                      key={blog._id}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={idx}
                    >
                      <Link to={`/insights/${blog.slug}`} className="block group h-full">
                        <div className="card h-full flex flex-col overflow-hidden">

                          {/* Cover image */}
                          <div className="relative h-48 overflow-hidden bg-[#F0EDE8] shrink-0">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.target.src = '/banner.png' }}
                              />
                            ) : (
                              <div
                                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#E8EEF9] via-[#F0EDE8] to-[#E5E8F4]"
                                aria-hidden
                              >
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-600/80 mb-2">
                                  Article
                                </span>
                                <span className="text-[#5C5A56] text-sm font-medium leading-snug line-clamp-3">
                                  {blog.title}
                                </span>
                              </div>
                            )}
                            {/* Tags overlay */}
                            {blog.tags?.length > 0 && (
                              <div className="absolute bottom-3 left-3 flex gap-1.5">
                                {blog.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="px-2 py-0.5 rounded-md bg-white/90 text-[#0C0C0C] text-[10px] font-semibold uppercase tracking-wide">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-4 text-xs text-[#A09A90] mb-3">
                              <span className="flex items-center gap-1.5">
                                <MdCalendarToday size={12} />
                                {formatDate(blog.date)}
                              </span>
                              {blog.readTime && (
                                <span className="flex items-center gap-1.5">
                                  <MdAccessTime size={12} />
                                  {blog.readTime} min read
                                </span>
                              )}
                            </div>

                            <h2 className="text-base font-bold text-[#0C0C0C] group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-2">
                              {blog.title}
                            </h2>

                            <p className="text-sm text-[#6E6B67] leading-relaxed flex-1 line-clamp-3 mb-5">
                              {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 140)}
                            </p>

                            <div className="mt-auto pt-4 border-t border-[#E5E2DC] flex items-center justify-between">
                              {blog.author && (
                                <span className="text-xs text-[#A09A90]">{blog.author}</span>
                              )}
                              <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600 ml-auto">
                                Read
                                <MdArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-[#E5E2DC] text-sm text-[#6E6B67] hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'border border-[#E5E2DC] text-[#6E6B67] hover:border-blue-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-[#E5E2DC] text-sm text-[#6E6B67] hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to put these ideas to work?
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Reading about technology is a start. We're here to help you actually build it.
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

export default Insights
