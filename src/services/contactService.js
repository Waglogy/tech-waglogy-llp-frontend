import { api } from '../config/api';

/**
 * Contact Service
 * Handles all contact form related API calls
 */

/**
 * Submit contact form
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.fullName - Full name of the contact
 * @param {string} contactData.email - Email address
 * @param {string} contactData.phone - Phone number
 * @param {string} contactData.organizationName - Organization name
 * @param {string} contactData.budgetRange - Budget range
 * @param {string} contactData.projectDetails - Project details/message
 * @returns {Promise} API response
 */
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/v1/contacts', contactData);
    return response;
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    throw error;
  }
};

/**
 * Get all contacts (Admin)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.status - Filter by status
 * @returns {Promise} API response with contacts
 */
export const getAllContacts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/v1/contacts?${queryString}` : '/v1/contacts';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    throw error;
  }
};

/**
 * Get single contact by ID (Admin)
 * @param {string} id - Contact ID
 * @returns {Promise} API response with contact details
 */
export const getContactById = async (id) => {
  try {
    const response = await api.get(`/v1/contacts/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch contact:', error);
    throw error;
  }
};

/**
 * Update contact status (Admin)
 * @param {string} id - Contact ID
 * @param {string} status - New status
 * @returns {Promise} API response
 */
export const updateContactStatus = async (id, status) => {
  try {
    const response = await api.put(`/v1/contacts/${id}`, { status });
    return response;
  } catch (error) {
    console.error('Failed to update contact status:', error);
    throw error;
  }
};

/**
 * Delete contact (Admin)
 * @param {string} id - Contact ID
 * @returns {Promise} API response
 */
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/v1/contacts/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to delete contact:', error);
    throw error;
  }
};

export default {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};

