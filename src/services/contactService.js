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

export default {
  submitContactForm,
};

