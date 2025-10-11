import { api } from '../config/api';

/**
 * Query Service
 * Handles all query form related API calls
 */

/**
 * Submit query form
 * @param {Object} queryData - Query form data
 * @param {string} queryData.message - Query message
 * @returns {Promise} API response
 */
export const submitQuery = async (queryData) => {
  try {
    const response = await api.post('/v1/queries', queryData);
    return response;
  } catch (error) {
    console.error('Failed to submit query:', error);
    throw error;
  }
};

/**
 * Get all queries (Admin)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.status - Filter by status
 * @returns {Promise} API response with queries
 */
export const getAllQueries = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/v1/queries?${queryString}` : '/v1/queries';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error('Failed to fetch queries:', error);
    throw error;
  }
};

/**
 * Get single query by ID (Admin)
 * @param {string} id - Query ID
 * @returns {Promise} API response with query details
 */
export const getQueryById = async (id) => {
  try {
    const response = await api.get(`/v1/queries/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch query:', error);
    throw error;
  }
};

/**
 * Update query status (Admin)
 * @param {string} id - Query ID
 * @param {string} status - New status
 * @returns {Promise} API response
 */
export const updateQueryStatus = async (id, status) => {
  try {
    const response = await api.put(`/v1/queries/${id}`, { status });
    return response;
  } catch (error) {
    console.error('Failed to update query status:', error);
    throw error;
  }
};

/**
 * Delete query (Admin)
 * @param {string} id - Query ID
 * @returns {Promise} API response
 */
export const deleteQuery = async (id) => {
  try {
    const response = await api.delete(`/v1/queries/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to delete query:', error);
    throw error;
  }
};

export default {
  submitQuery,
  getAllQueries,
  getQueryById,
  updateQueryStatus,
  deleteQuery,
};

