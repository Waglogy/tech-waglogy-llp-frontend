import { API_BASE_URL } from '../config/api'
import { STATIC_INSIGHTS, applyInsightQuery, mergeApiAndStatic } from '../data/staticInsights'

/**
 * Blog Service
 * Handles all blog-related API calls.
 * Static insights: 50 SEO articles in src/data/staticInsights (used when API is down or merged with CMS).
 *
 * VITE_PUBLIC_INSIGHTS_SOURCE=api | static  (default api)
 * VITE_MERGE_STATIC_INSIGHTS=true          (merge CMS + static catalog; fetches up to 500 CMS rows first)
 */

const INSIGHTS_SOURCE = import.meta.env.VITE_PUBLIC_INSIGHTS_SOURCE || 'api'
const MERGE_STATIC_INSIGHTS = import.meta.env.VITE_MERGE_STATIC_INSIGHTS === 'true'

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('admin_token')
}

// Get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

/**
 * Get all blogs (public)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Results per page
 * @param {string} params.sort - Sort field
 * @param {string} params.search - Search term
 * @param {string} params.tags - Filter by tag
 * @param {boolean} params.isPublished - Filter by publish status (admin only)
 */
const fetchBlogsRaw = async (searchParams) => {
  const queryString = searchParams.toString()
  const url = `${API_BASE_URL}/v1/blogs${queryString ? `?${queryString}` : ''}`
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch blogs' }))
    throw new Error(error.message || 'Failed to fetch blogs')
  }
  return response.json()
}

export const getAllBlogs = async (params = {}) => {
  if (INSIGHTS_SOURCE === 'static') {
    return applyInsightQuery(STATIC_INSIGHTS, params)
  }

  try {
    if (MERGE_STATIC_INSIGHTS) {
      const wide = new URLSearchParams()
      wide.append('page', '1')
      wide.append('limit', '500')
      if (params.sort) wide.append('sort', params.sort)
      if (params.isPublished !== undefined) wide.append('isPublished', params.isPublished)
      const json = await fetchBlogsRaw(wide)
      const merged = mergeApiAndStatic(json.data || [], STATIC_INSIGHTS)
      return applyInsightQuery(merged, params)
    }

    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.search) queryParams.append('search', params.search)
    if (params.tags) queryParams.append('tags', params.tags)
    if (params.isPublished !== undefined) queryParams.append('isPublished', params.isPublished)

    return await fetchBlogsRaw(queryParams)
  } catch (error) {
    console.warn('[insights] API unavailable, using static catalog:', error?.message || error)
    return applyInsightQuery(STATIC_INSIGHTS, params)
  }
}

/**
 * Get single blog by ID
 * @param {string} id - Blog ID
 */
export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs/${id}`, {
      method: 'GET'
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch blog')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog:', error)
    throw error
  }
}

/**
 * Get single blog by slug
 * @param {string} slug - Blog slug
 */
export const getBlogBySlug = async (slug) => {
  if (INSIGHTS_SOURCE === 'static') {
    const found = STATIC_INSIGHTS.find((b) => b.slug === slug)
    if (!found) throw new Error('Article not found')
    return { data: found }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs/slug/${slug}`, {
      method: 'GET'
    })

    if (response.ok) {
      const json = await response.json()
      if (json?.data) return json
    }
  } catch (error) {
    console.warn('[insights] slug request failed, checking static catalog:', error?.message || error)
  }

  const found = STATIC_INSIGHTS.find((b) => b.slug === slug)
  if (found) return { data: found }

  throw new Error('Article not found')
}

/**
 * Create new blog (admin only)
 * @param {Object} blogData - Blog data
 */
export const createBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create blog')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating blog:', error)
    throw error
  }
}

/**
 * Update blog (admin only)
 * @param {string} id - Blog ID
 * @param {Object} blogData - Updated blog data
 */
export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update blog')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating blog:', error)
    throw error
  }
}

/**
 * Delete blog (admin only)
 * @param {string} id - Blog ID
 */
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete blog')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}

/**
 * Toggle blog publish status (admin only)
 * @param {string} id - Blog ID
 */
export const togglePublishStatus = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs/${id}/publish`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to toggle publish status')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error toggling publish status:', error)
    throw error
  }
}

/**
 * Get blog statistics (admin only)
 */
export const getBlogStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/blogs/stats/summary`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch blog stats')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog stats:', error)
    throw error
  }
}

