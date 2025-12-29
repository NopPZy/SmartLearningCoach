import { ERROR_MESSAGES } from './constants';

export const validators = {
  required: (value) => {
    if (!value || value.trim() === '') {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return ERROR_MESSAGES.INVALID_EMAIL;
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    
    if (value.length < 6) {
      return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    }
    return null;
  },

  confirmPassword: (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
    }
    return null;
  },

  minLength: (value, min) => {
    if (!value) return null;
    
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (value, max) => {
    if (!value) return null;
    
    if (value.length > max) {
      return `Must be less than ${max} characters`;
    }
    return null;
  },

  numeric: (value) => {
    if (!value) return null;
    
    if (isNaN(value)) {
      return 'Must be a number';
    }
    return null;
  },

  url: (value) => {
    if (!value) return null;
    
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },
};

/**
 * Validate form fields
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    fieldRules.forEach((rule) => {
      const error = rule(value, formData);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });
  });

  return { errors, isValid };
};

export default validators;