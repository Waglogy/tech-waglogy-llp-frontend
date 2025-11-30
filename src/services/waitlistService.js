import { api } from '../config/api';

/**
 * Waitlist Service
 * Handles all waitlist related API calls
 */

/**
 * Submit waitlist form
 * @param {Object} waitlistData - Waitlist form data
 * @param {string} waitlistData.email - Email address
 * @returns {Promise} API response
 */
export const submitWaitlist = async (waitlistData) => {
  try {
    // Only send email in the request body
    const response = await api.post('/v1/himto-waitlist', {
      email: waitlistData.email
    });
    return response;
  } catch (error) {
    console.error('Failed to submit waitlist:', error);
    throw error;
  }
};

export default {
  submitWaitlist,
};

