import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import { getAuthToken, setAuthToken, setUserData } from '../utils/storage';
import { handleApiError } from '../utils/helpers';

// Create axios instance
const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  /**
   * Login user
   */
  login: async (email, password) => {
    try {
      console.log('Attempting login with email:', email);
      console.log('API URL:', process.env.API_URL || 'http://localhost:3000/api');
      console.log('Login endpoint:', API_ENDPOINTS.AUTH.LOGIN);
      
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      
      // Save token and user data
      await setAuthToken(token);
      await setUserData(user);

      console.log('Login successful for user:', user.email);
      return { success: true, data: user };
    } catch (error) {
      console.error('Login error details:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Signup user
   */
  signup: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);

      const { token, user } = response.data;
      
      // Save token and user data
      await setAuthToken(token);
      await setUserData(user);

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email) => {
    try {
      await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (token, newPassword) => {
    try {
      await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        newPassword,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      return { success: true };
    } catch (error) {
      // Even if API fails, we should clear local storage
      console.warn('Logout API failed, clearing local storage anyway:', error);
      return { success: true };
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.USER.PROFILE);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        profileData
      );
      
      // Update local user data
      await setUserData(response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

export default authApi;