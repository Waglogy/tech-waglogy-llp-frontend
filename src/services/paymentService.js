import { api } from '../config/api';

/**
 * Payment Service
 * Handles all payment/invoice related API calls
 */

/**
 * Get all payments (Admin)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.status - Filter by status
 * @param {string} params.method - Filter by payment method
 * @param {string} params.client - Filter by client name
 * @param {string} params.sort - Sort fields
 * @param {string} params.fields - Select specific fields
 * @returns {Promise} API response with payments
 */
export const getAllPayments = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/v1/payments?${queryString}` : '/v1/payments';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    throw error;
  }
};

/**
 * Get single payment by ID (Admin)
 * @param {string} id - Payment ID
 * @returns {Promise} API response with payment details
 */
export const getPaymentById = async (id) => {
  try {
    const response = await api.get(`/v1/payments/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch payment:', error);
    throw error;
  }
};

/**
 * Get payment by invoice number (Admin)
 * @param {string} invoiceNo - Invoice number
 * @returns {Promise} API response with payment details
 */
export const getPaymentByInvoice = async (invoiceNo) => {
  try {
    const response = await api.get(`/v1/payments/invoice/${invoiceNo}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch payment by invoice:', error);
    throw error;
  }
};

/**
 * Create new payment (Admin)
 * @param {Object} paymentData - Payment data
 * @param {string} paymentData.client - Client name
 * @param {string} paymentData.description - Payment description
 * @param {number} paymentData.amount - Payment amount
 * @param {string} paymentData.date - Payment date
 * @param {string} paymentData.method - Payment method
 * @param {string} paymentData.status - Payment status
 * @param {string} paymentData.comment - Additional comments
 * @returns {Promise} API response
 */
export const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/v1/payments', paymentData);
    return response;
  } catch (error) {
    console.error('Failed to create payment:', error);
    throw error;
  }
};

/**
 * Update payment (Admin)
 * @param {string} id - Payment ID
 * @param {Object} paymentData - Updated payment data
 * @returns {Promise} API response
 */
export const updatePayment = async (id, paymentData) => {
  try {
    const response = await api.put(`/v1/payments/${id}`, paymentData);
    return response;
  } catch (error) {
    console.error('Failed to update payment:', error);
    throw error;
  }
};

/**
 * Delete payment (Admin)
 * @param {string} id - Payment ID
 * @returns {Promise} API response
 */
export const deletePayment = async (id) => {
  try {
    const response = await api.delete(`/v1/payments/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to delete payment:', error);
    throw error;
  }
};

/**
 * Get payment statistics (Admin)
 * @returns {Promise} API response with payment stats
 */
export const getPaymentStats = async () => {
  try {
    const response = await api.get('/v1/payments/stats/summary');
    return response;
  } catch (error) {
    console.error('Failed to fetch payment statistics:', error);
    throw error;
  }
};

export default {
  getAllPayments,
  getPaymentById,
  getPaymentByInvoice,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentStats
};

