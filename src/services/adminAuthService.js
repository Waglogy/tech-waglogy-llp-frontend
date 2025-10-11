import { api } from '../config/api';

/**
 * Admin Authentication Service
 * Handles all admin authentication related API calls
 */

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

/**
 * Admin Login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise} API response with token and user data
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/v1/auth/login', { email, password });
    
    // Store token and user data
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Verify Admin Token and Get Current User
 * @returns {Promise} API response with current user data
 */
export const verifyAdmin = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await api.get('/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Update stored user data
    if (response.data) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    
    return response;
  } catch (error) {
    console.error('Token verification failed:', error);
    // Clear invalid token
    logout();
    throw error;
  }
};

/**
 * Admin Logout
 * @returns {Promise} API response
 */
export const logoutAPI = async () => {
  try {
    const token = getToken();
    if (token) {
      await api.post('/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  } catch (error) {
    console.error('Logout API call failed:', error);
    // Continue with local logout even if API fails
  } finally {
    logout();
  }
};

/**
 * Clear local authentication data
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  // Also remove old auth key if it exists
  localStorage.removeItem('adminAuth');
};

/**
 * Get stored JWT token
 * @returns {string|null} JWT token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get stored user data
 * @returns {Object|null} User data
 */
export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Update Admin Details
 * @param {Object} data - Updated name and/or email
 * @returns {Promise} API response
 */
export const updateDetails = async (data) => {
  try {
    const token = getToken();
    const response = await api.put('/v1/auth/updatedetails', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Update stored user data
    if (response.data) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    
    return response;
  } catch (error) {
    console.error('Update details failed:', error);
    throw error;
  }
};

/**
 * Update Admin Password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} API response
 */
export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const token = getToken();
    const response = await api.put('/v1/auth/updatepassword', {
      currentPassword,
      newPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response;
  } catch (error) {
    console.error('Update password failed:', error);
    throw error;
  }
};

export default {
  login,
  verifyAdmin,
  logoutAPI,
  logout,
  getToken,
  getUser,
  isAuthenticated,
  updateDetails,
  updatePassword
};

