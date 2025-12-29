import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import { getAuthToken } from '../utils/storage';
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

export const dashboardApi = {
  /**
   * Get dashboard stats
   */
  getStats: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.DASHBOARD.STATS);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get progress data
   */
  getProgress: async (period = 'week') => {
    try {
      const response = await api.get(API_ENDPOINTS.DASHBOARD.PROGRESS, {
        params: { period },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get recent activity
   */
  getRecentActivity: async (limit = 10) => {
    try {
      const response = await api.get(API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITY, {
        params: { limit },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get study insights
   */
  getStudyInsights: async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.DASHBOARD.STATS}/insights`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get upcoming reviews
   */
  getUpcomingReviews: async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.DASHBOARD.STATS}/upcoming-reviews`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

export default dashboardApi;