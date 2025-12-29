import { ERROR_MESSAGES } from './constants';

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time for display
 */
export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hr${hours > 1 ? 's' : ''} ${mins} min`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Generate a random color
 */
export const getRandomColor = () => {
  const colors = [
    '#4361EE', '#3A0CA3', '#7209B7', '#F72585',
    '#4CC9F0', '#4895EF', '#560BAD', '#B5179E',
    '#06D6A0', '#118AB2', '#073B4C', '#EF476F',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Handle API errors
 */
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  const { status, data } = error.response;
  
  switch (status) {
    case 400:
      return data.message || 'Bad request';
    case 401:
      return ERROR_MESSAGES.INVALID_CREDENTIALS;
    case 403:
      return 'You are not authorized to perform this action';
    case 404:
      return 'Resource not found';
    case 409:
      return ERROR_MESSAGES.EMAIL_EXISTS;
    case 422:
      return data.errors?.[0]?.msg || 'Validation error';
    case 500:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return 'An error occurred. Please try again.';
  }
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};