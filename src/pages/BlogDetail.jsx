import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdArrowBack, MdCalendarToday, MdAccessTime, MdPerson, MdShare } from 'react-icons/md'
import { FaSpinner, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { getBlogBySlug } from '../services/blogService'
import SEO from '../components/SEO'

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getBlogBySlug(slug)
      setBlog(response.data)
    } catch (error) {
      console.error('Error fetching blog:', error)
      setError(error.message || 'Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = blog?.title || 'Check out this article'

  const handleShare = (platform) => {
    const u = encodeURIComponent(shareUrl)
    const t = encodeURIComponent(shareTitle)
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      whatsapp: `https://wa.me/?text=${t}%20${u}`
    }
    if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center pt-[var(--site-header-height)]">
        <FaSpinner className="animate-spin text-5xl text-blue-500" />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4 pt-[var(--site-header-height)]">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-[#0C0C0C] mb-4">Article not found</h1>
          <p className="text-[#6E6B67] mb-8">{error || 'This article seems to be missing.'}</p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <MdArrowBack size={18} /> Back to Insights
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${blog.title} — Waglogy Insights`}
        description={blog.excerpt ? blog.excerpt.substring(0, 160) : blog.content?.replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={blog.tags || []}
        canonical={`/insights/${blog.slug}`}
        type="article"
        image={blog.image || '/banner.png'}
      />

      <div className="bg-[#FAFAF8] text-[#0C0C0C] pt-[var(--site-header-height)]">

        {/* ── BACK NAV (below fixed site header; sticky offset matches Header height) ── */}
        <div className="sticky top-[var(--site-header-height)] z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E2DC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate('/insights')}
              className="inline-flex items-center gap-2 text-[#6E6B67] hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <MdArrowBack size={16} /> Back to Insights
            </button>
            <Link to="/" className="text-sm font-bold text-[#0C0C0C] hover:text-blue-600 transition-colors">
              Waglogy
            </Link>
          </div>
        </div>

        <article className="pt-8 pb-12 sm:pt-10 sm:pb-12 px-4 sm:px-6 lg:px-8 scroll-mt-[calc(var(--site-header-height)+4rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 pt-1">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] leading-[1.1] mb-6">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#A09A90] mb-8 pb-8 border-b border-[#E5E2DC]">
              {blog.author && (
                <span className="flex items-center gap-1.5">
                  <MdPerson size={15} className="text-blue-500" /> {blog.author}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MdCalendarToday size={14} className="text-blue-500" /> {formatDate(blog.date)}
              </span>
              {blog.readTime && (
                <span className="flex items-center gap-1.5">
                  <MdAccessTime size={15} className="text-blue-500" /> {blog.readTime} min read
                </span>
              )}
            </div>

            {/* Hero image */}
            {blog.image && (
              <div className="rounded-2xl overflow-hidden mb-10 border border-[#E5E2DC]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 sm:h-96 object-cover"
                  onError={(e) => { e.target.src = '/banner.png' }}
                />
              </div>
            )}

            {/* Excerpt callout */}
            {blog.excerpt && (
              <div className="border-l-4 border-blue-500 bg-blue-50 px-6 py-5 rounded-r-xl mb-10">
                <p className="text-[#0C0C0C] text-lg italic leading-relaxed">
                  "{blog.excerpt}"
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-slate prose-lg max-w-none leading-relaxed">
              {blog.contentType === 'html' ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div className="whitespace-pre-wrap text-[#3D3A36]">{blog.content}</div>
              )}
            </div>

            {/* Share */}
            <div className="mt-14 pt-10 border-t border-[#E5E2DC]">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#0C0C0C] mb-4">
                <MdShare size={16} className="text-blue-600" /> Share this article
              </p>
              <div className="flex gap-3">
                {[
                  { id: 'twitter', icon: FaTwitter, label: 'Twitter' },
                  { id: 'facebook', icon: FaFacebook, label: 'Facebook' },
                  { id: 'linkedin', icon: FaLinkedin, label: 'LinkedIn' },
                  { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleShare(p.id)}
                    aria-label={`Share on ${p.label}`}
                    className="w-10 h-10 rounded-lg border border-[#E5E2DC] bg-white flex items-center justify-center text-[#6E6B67] hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <p.icon size={16} />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </article>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E] mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Want to implement these ideas?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
              Our team can help turn what you just read into something your business actually uses.
            </p>
            <Link to="/contact" className="btn-primary px-8 py-4 text-base inline-flex">
              Let's Talk
            </Link>
          </motion.div>
        </section>

      </div>
    </>
  )
}

export default BlogDetail
