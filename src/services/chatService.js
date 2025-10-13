// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8080';

class ChatService {
  /**
   * Send a chat message to the API
   * @param {Object} params - Chat parameters
   * @param {string} params.message - The message to send
   * @param {string} [params.sessionId] - Session ID for continuing conversations
   * @param {string} [params.name] - User's name (required for first message)
   * @param {string} [params.email] - User's email (required for first message)
   * @returns {Promise<Object>} API response
   */
  async sendMessage({ message, sessionId, name, email }) {
    try {
      const payload = {
        message,
        ...(sessionId && { sessionId }),
        ...(name && { name }),
        ...(email && { email }),
      };

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if response has content before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Chat service is not responding. Please ensure the backend is running.');
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from chat service. Please try again.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from chat service. Please try again.');
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Chat service error:', error);
      // Provide user-friendly error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to chat service. Please ensure the backend API is running on ' + API_BASE_URL);
      }
      throw error;
    }
  }

  /**
   * Get conversation history for a session
   * @param {string} sessionId - The session ID
   * @returns {Promise<Object>} Conversation data
   */
  async getConversation(sessionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if response has content before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Chat service is not responding. Please ensure the backend is running.');
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from chat service.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response from chat service.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get conversation');
      }

      return data;
    } catch (error) {
      console.error('Chat service error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to chat service. Please ensure the backend API is running.');
      }
      throw error;
    }
  }

  /**
   * Check service health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      const text = await response.text();
      if (!text) {
        return { success: false, message: 'Chat service is offline' };
      }

      try {
        return JSON.parse(text);
      } catch (parseError) {
        return { success: false, message: 'Invalid response from chat service' };
      }
    } catch (error) {
      console.error('Health check error:', error);
      return { success: false, message: 'Cannot connect to chat service' };
    }
  }
  
  /**
   * Get the current API base URL
   * @returns {string} The API base URL
   */
  getApiUrl() {
    return API_BASE_URL;
  }
}

export default new ChatService();

