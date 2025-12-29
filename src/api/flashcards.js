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

export const flashcardsApi = {
  /**
   * Get all flashcards
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.FLASHCARDS.GET_ALL, {
        params,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get flashcard by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Create flashcard
   */
  create: async (flashcardData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.FLASHCARDS.CREATE,
        flashcardData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Update flashcard
   */
  update: async (id, flashcardData) => {
    try {
      const response = await api.put(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}`,
        flashcardData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Delete flashcard
   */
  delete: async (id) => {
    try {
      await api.delete(`${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Review flashcard
   */
  review: async (id, reviewData) => {
    try {
      const response = await api.post(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}/review`,
        reviewData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get flashcards for review
   */
  getForReview: async () => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/review`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get flashcard stats
   */
  getStats: async () => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/stats`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Import flashcards
   */
  import: async (flashcards) => {
    try {
      const response = await api.post(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/import`,
        { flashcards }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Export flashcards
   */
  export: async () => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/export`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

export default flashcardsApi;