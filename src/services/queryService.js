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

export default {
  submitQuery,
};

