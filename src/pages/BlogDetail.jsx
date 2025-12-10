import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaEye, FaArrowLeft, FaTag, FaSpinner, FaShareAlt, FaClock } from 'react-icons/fa'
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
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
      setError(error.message || 'Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = blog ? blog.title : 'Check out this blog post'

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    let shareLink = ''
    switch (platform) {
      case 'twitter': shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`; break;
      case 'facebook': shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`; break;
      case 'linkedin': shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`; break;
      case 'whatsapp': shareLink = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`; break;
      default: return;
    }
    window.open(shareLink, '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-blue-600 mx-auto mb-4" />
          <p className="text-slate-400">Loading Article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-6">{error || "This article seems to be missing."}</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${blog.title} - Tech Waglogy Blog`}
        description={blog.excerpt ? blog.excerpt.substring(0, 160) : blog.content?.replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={blog.tags || []}
        canonical={`/blog/${blog.slug}`}
        type="article"
        image={blog.image || '/banner.png'}
      />

      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000] min-h-screen text-slate-300">

        {/* Navigation Bar */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
              <FaArrowLeft /> Back to Articles
            </button>
            <Link to="/" className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              WAGLOGY
            </Link>
          </div>
        </div>

        <article className="py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-screen-lg bg-[#0f172a]/50 glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />
              <img
                src={blog.image || '/banner.png'}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/banner.png' }}
              />
              <div className="absolute bottom-6 left-6 md:left-12 z-20 flex flex-wrap gap-2">
                {blog.tags && blog.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-12">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-white/5">
                {blog.author && <div className="flex items-center gap-2"><FaUser className="text-blue-400" /> <span>{blog.author}</span></div>}
                <div className="flex items-center gap-2"><FaCalendar className="text-blue-400" /> <span>{formatDate(blog.date)}</span></div>
                {blog.readTime && <div className="flex items-center gap-2"><FaClock className="text-blue-400" /> <span>{blog.readTime} min read</span></div>}
              </div>

              {/* Excerpt */}
              {blog.excerpt && (
                <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 mb-10 rounded-r-xl">
                  <p className="text-blue-200 italic text-lg leading-relaxed">
                    "{blog.excerpt}"
                  </p>
                </div>
              )}

              {/* HTML Content */}
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-8 space-y-6">
                {blog.contentType === 'html' ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <div className="whitespace-pre-wrap">{blog.content}</div>
                )}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaShareAlt className="text-blue-400" /> Share this insight
                </h3>
                <div className="flex gap-3">
                  {[
                    { id: 'twitter', icon: FaTwitter, color: '#1DA1F2' },
                    { id: 'facebook', icon: FaFacebook, color: '#4267B2' },
                    { id: 'linkedin', icon: FaLinkedin, color: '#0077B5' },
                    { id: 'whatsapp', icon: FaWhatsapp, color: '#25D366' }
                  ].map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => handleShare(platform.id)}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white"
                      style={{ color: platform.color }}
                    >
                      <platform.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Footer CTA */}
        <section className="py-24 relative z-10 px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Implement these ideas?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Our team can help you turn these insights into reality.
          </p>
          <Link to="/contact" className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
            Get in Touch
          </Link>
        </section>
      </div>
    </>
  )
}

export default BlogDetail
