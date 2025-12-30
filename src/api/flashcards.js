import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import { getItem, setItem } from '../utils/storage';
import { handleApiError } from '../utils/helpers';

const STORAGE_KEY = '@flashcards';

// Create axios instance with fallback to AsyncStorage
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
    try {
      const token = await getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore token fetch errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const flashcardsApi = {
  /**
   * Get all flashcards from storage or API
   */
  getAll: async (params = {}) => {
    try {
      // Try API first
      try {
        const response = await api.get(API_ENDPOINTS.FLASHCARDS.GET_ALL, { params });
        await setItem(STORAGE_KEY, response.data);
        return { success: true, data: response.data };
      } catch (apiError) {
        // Fallback to local storage
        const localData = await getItem(STORAGE_KEY);
        if (localData) {
          return { success: true, data: localData };
        }
        throw apiError;
      }
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
   * Create flashcard (stored locally first, syncs to API when available)
   */
  create: async (flashcardData) => {
    try {
      const newCard = {
        id: Date.now(),
        ...flashcardData,
        createdAt: new Date().toISOString(),
        mastery: 0,
        lastReviewed: null,
      };

      // Save to local storage immediately
      const allCards = await getItem(STORAGE_KEY) || [];
      allCards.push(newCard);
      await setItem(STORAGE_KEY, allCards);

      // Try to sync to API (don't block if fails)
      try {
        const response = await api.post(API_ENDPOINTS.FLASHCARDS.CREATE, flashcardData);
        return { success: true, data: response.data };
      } catch (apiError) {
        // API failed, but local save succeeded
        return { success: true, data: newCard };
      }
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Update flashcard
   */
  update: async (id, flashcardData) => {
    try {
      // Update local storage
      const allCards = await getItem(STORAGE_KEY) || [];
      const index = allCards.findIndex(c => c.id === id);
      if (index !== -1) {
        allCards[index] = { ...allCards[index], ...flashcardData };
        await setItem(STORAGE_KEY, allCards);
      }

      // Try to sync to API
      try {
        const response = await api.put(
          `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}`,
          flashcardData
        );
        return { success: true, data: response.data };
      } catch (apiError) {
        return { success: true, data: allCards[index] };
      }
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Delete flashcard
   */
  delete: async (id) => {
    try {
      // Remove from local storage
      let allCards = await getItem(STORAGE_KEY) || [];
      allCards = allCards.filter(c => c.id !== id);
      await setItem(STORAGE_KEY, allCards);

      // Try to sync to API
      try {
        await api.delete(`${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}`);
      } catch (apiError) {
        // API failed, but local delete succeeded
      }
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
      // Update local storage
      const allCards = await getItem(STORAGE_KEY) || [];
      const card = allCards.find(c => c.id === id);
      if (card) {
        const currentMastery = card.mastery || 0;
        if (reviewData.difficulty === 'easy') {
          card.mastery = Math.min(currentMastery + 10, 100);
        } else {
          card.mastery = Math.max(currentMastery - 10, 0);
        }
        card.lastReviewed = new Date().toISOString();
        await setItem(STORAGE_KEY, allCards);
      }

      // Try to sync to API
      try {
        const response = await api.post(
          `${API_ENDPOINTS.FLASHCARDS.GET_ALL}/${id}/review`,
          reviewData
        );
        return { success: true, data: response.data };
      } catch (apiError) {
        return { success: true, data: card };
      }
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  /**
   * Get flashcards for review
   */
  getForReview: async () => {
    try {
      // Try API first
      try {
        const response = await api.get(`${API_ENDPOINTS.FLASHCARDS.GET_ALL}/review`);
        await setItem(STORAGE_KEY, response.data);
        return { success: true, data: response.data };
      } catch (apiError) {
        // Fallback to local storage
        const allCards = await getItem(STORAGE_KEY) || [];
        const cardsForReview = allCards.filter(c => !c.mastery || c.mastery < 100);
        return { success: true, data: cardsForReview };
      }
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