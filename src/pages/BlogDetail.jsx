import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaEye, FaArrowLeft, FaTag, FaSpinner, FaShareAlt } from 'react-icons/fa'
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
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = blog ? blog.title : 'Check out this blog post'

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    
    let shareLink = ''
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
      default:
        return
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={`${blog.title} - Tech Waglogy Blog`}
        description={blog.description.substring(0, 160)}
        keywords={blog.tags || []}
        canonical={`/blog/${blog.slug}`}
        type="article"
        image={blog.image || '/banner.png'}
      />

      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <article className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Featured Image */}
            {blog.image && (
              <div className="w-full h-96 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/banner.png'
                  }}
                />
              </div>
            )}

            <div className="p-8 sm:p-12">
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800"
                    >
                      <FaTag className="text-xs" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FaCalendar />
                  <span>{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye />
                  <span>{blog.views} views</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog.description}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaShareAlt />
                  Share this post
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                  >
                    <FaTwitter />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
                  >
                    <FaFacebook />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba5a] transition-colors"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Author Info (if available) */}
              {blog.author && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {blog.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">Written by {blog.author}</h4>
                      <p className="text-gray-600">
                        Content creator at Tech Waglogy LLP
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Back to Blog CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaArrowLeft />
              Read More Articles
            </Link>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help With Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your ideas to life with our expert development services.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  )
}

export default BlogDetail

