import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaEye, FaArrowRight, FaSearch, FaTimes, FaSpinner } from 'react-icons/fa'
import { getAllBlogs } from '../services/blogService'
import SEO from '../components/SEO'

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
      
      // Extract unique tags from all blogs
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
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <>
      <SEO page="blog" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Our <span style={{ color: 'var(--brand-primary)' }}>Blog</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              Insights, tutorials, and stories about web development, technology, and digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setCurrentPage(1)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedTag('')
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === ''
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag)
                      setCurrentPage(1)
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-5xl text-blue-600" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                {searchTerm || selectedTag ? 'No blogs found matching your criteria' : 'No blogs published yet'}
              </p>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTag('')
                    setCurrentPage(1)
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
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
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Image */}
                    {blog.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/banner.png'
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                        {truncateText(blog.description, 150)}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        {blog.author && (
                          <div className="flex items-center gap-1">
                            <FaUser className="text-xs" />
                            <span>{blog.author}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <FaCalendar className="text-xs" />
                          <span>{formatDate(blog.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaEye className="text-xs" />
                          <span>{blog.views} views</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:gap-3 transition-all"
                      >
                        Read More
                        <FaArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We'd love to hear about your project. Let's build something amazing together!
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

export default Blogs
