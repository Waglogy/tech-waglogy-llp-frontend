import { API_BASE_URL } from '../config/api'

/**
 * Blog Service
 * Handles all blog-related API calls
 */

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('adminToken')
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
export const getAllBlogs = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.search) queryParams.append('search', params.search)
    if (params.tags) queryParams.append('tags', params.tags)
    if (params.isPublished !== undefined) queryParams.append('isPublished', params.isPublished)
    
    const queryString = queryParams.toString()
    const url = `${API_BASE_URL}/blogs${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch blogs')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

/**
 * Get single blog by ID
 * @param {string} id - Blog ID
 */
export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
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
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      method: 'GET'
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch blog')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    throw error
  }
}

/**
 * Create new blog (admin only)
 * @param {Object} blogData - Blog data
 */
export const createBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
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
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/blogs/${id}/publish`, {
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
    const response = await fetch(`${API_BASE_URL}/blogs/stats/summary`, {
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

