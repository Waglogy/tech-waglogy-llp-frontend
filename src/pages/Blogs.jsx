import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaEye, FaArrowRight, FaSearch, FaTimes, FaSpinner, FaClock } from 'react-icons/fa'
import { getAllBlogs } from '../services/blogService'
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

const Blogs = () => {
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
      const params = {
        page: currentPage,
        limit: 9,
        sort: '-date',
        isPublished: true
      }

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <>
      <SEO page="blog" />

      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white overflow-hidden">

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingShape className="bg-blue-600 top-[-10%] right-[-10%] w-[500px] h-[500px] opacity-20" />
          <FloatingShape className="bg-indigo-600 bottom-[10%] left-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              WAGLOGY INSIGHTS
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Blog</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Explore the latest trends in tech, AI, and digital growth.
            </p>
          </motion.div>
        </section>

        {/* Search and Filter Section */}
        <section className="relative z-10 py-8 px-4 border-b border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setCurrentPage(1)
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedTag(''); setCurrentPage(1) }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === ''
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setCurrentPage(1) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blogs Grid */}
        <ScrollFadeSection className="py-16 relative z-10 px-4">
          <div className="mx-auto max-w-screen-xl">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <FaSpinner className="animate-spin text-5xl text-blue-600" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-slate-500">
                  {searchTerm || selectedTag ? 'No matching articles found.' : 'No articles published yet.'}
                </p>
                {(searchTerm || selectedTag) && (
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedTag(''); setCurrentPage(1) }}
                    className="mt-4 text-blue-400 hover:text-blue-300 font-medium underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog, index) => (
                    <motion.article
                      key={blog._id}
                      className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 group flex flex-col bg-[#0f172a]/40"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Image */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => { e.target.src = '/banner.png' }}
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                            <span className="text-slate-600">No Image</span>
                          </div>
                        )}
                        {/* Categories Overlay */}
                        <div className="absolute bottom-3 left-3 z-20 flex gap-2">
                          {blog.tags && blog.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-black/50 backdrop-blur-md border border-white/20 text-white">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><FaCalendar /> {formatDate(blog.date)}</span>
                          {blog.readTime && <span className="flex items-center gap-1"><FaClock /> {blog.readTime} min</span>}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>

                        <p className="text-slate-400 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">
                          {blog.excerpt ? truncateText(blog.excerpt, 120) : truncateText(blog.content?.replace(/<[^>]*>/g, ''), 120)}
                        </p>

                        <Link
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors mt-auto text-sm uppercase tracking-wide"
                        >
                          Read Article <FaArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                              ? 'bg-blue-600 text-white'
                              : 'border border-white/10 text-slate-400 hover:bg-white/5'
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollFadeSection>

        {/* CTA Section */}
        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-blue-500/30 bg-black/40 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Digital Journey?</h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                  From reading about tech to building it. We are ready when you are.
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 rounded-full bg-white text-blue-900 font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Blogs
