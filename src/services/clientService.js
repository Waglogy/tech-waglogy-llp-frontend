import { api } from '../config/api';

/**
 * Client Service
 * Handles all client management related API calls
 */

/**
 * Get all clients (Admin)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.status - Filter by status
 * @param {string} params.company - Filter by company name
 * @param {string} params.service - Filter by service
 * @param {string} params.sort - Sort fields
 * @param {string} params.fields - Select specific fields
 * @returns {Promise} API response with clients
 */
export const getAllClients = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/v1/clients?${queryString}` : '/v1/clients';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    throw error;
  }
};

/**
 * Get single client by ID (Admin)
 * @param {string} id - Client ID
 * @returns {Promise} API response with client details
 */
export const getClientById = async (id) => {
  try {
    const response = await api.get(`/v1/clients/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch client:', error);
    throw error;
  }
};

/**
 * Create new client (Admin)
 * @param {Object} clientData - Client data
 * @param {string} clientData.company - Company name
 * @param {string} clientData.contactPerson - Contact person name
 * @param {string} clientData.email - Email address
 * @param {string} clientData.phone - Phone number
 * @param {string} clientData.service - Service provided
 * @param {string} clientData.startDate - Project start date
 * @param {string} clientData.endDate - Project end date
 * @param {number} clientData.revenue - Revenue amount
 * @param {string} clientData.status - Client status
 * @param {string} clientData.address - Client address
 * @param {string} clientData.notes - Additional notes
 * @returns {Promise} API response
 */
export const createClient = async (clientData) => {
  try {
    const response = await api.post('/v1/clients', clientData);
    return response;
  } catch (error) {
    console.error('Failed to create client:', error);
    throw error;
  }
};

/**
 * Update client (Admin)
 * @param {string} id - Client ID
 * @param {Object} clientData - Updated client data
 * @returns {Promise} API response
 */
export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/v1/clients/${id}`, clientData);
    return response;
  } catch (error) {
    console.error('Failed to update client:', error);
    throw error;
  }
};

/**
 * Delete client (Admin)
 * @param {string} id - Client ID
 * @returns {Promise} API response
 */
export const deleteClient = async (id) => {
  try {
    const response = await api.delete(`/v1/clients/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to delete client:', error);
    throw error;
  }
};

/**
 * Get client statistics (Admin)
 * @returns {Promise} API response with client stats
 */
export const getClientStats = async () => {
  try {
    const response = await api.get('/v1/clients/stats/summary');
    return response;
  } catch (error) {
    console.error('Failed to fetch client statistics:', error);
    throw error;
  }
};

/**
 * Search clients (Admin)
 * @param {string} query - Search term
 * @returns {Promise} API response with matching clients
 */
export const searchClients = async (query) => {
  try {
    const response = await api.get(`/v1/clients/search?query=${encodeURIComponent(query)}`);
    return response;
  } catch (error) {
    console.error('Failed to search clients:', error);
    throw error;
  }
};

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
  searchClients
};

