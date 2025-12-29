export const APP_NAME = 'Smart Learning Coach';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  FLASHCARDS: {
    GET_ALL: '/flashcards',
    CREATE: '/flashcards',
    UPDATE: '/flashcards/:id',
    DELETE: '/flashcards/:id',
    REVIEW: '/flashcards/:id/review',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    PROGRESS: '/dashboard/progress',
    RECENT_ACTIVITY: '/dashboard/recent-activity',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
  },
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME_MODE: '@theme_mode',
  FIRST_LAUNCH: '@first_launch',
  STUDY_SETTINGS: '@study_settings',
};

// Navigation routes
export const ROUTES = {
  // Auth
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main
  DASHBOARD: 'Dashboard',
  FLASHCARDS: 'Flashcards',
  QUIZ: 'Quiz',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  
  // Tabs
  HOME_TAB: 'HomeTab',
  STUDY_TAB: 'StudyTab',
  PROFILE_TAB: 'ProfileTab',
};

// Study constants
export const STUDY_CONSTANTS = {
  REVIEW_INTERVALS: [1, 3, 7, 14, 30], // Days for spaced repetition
  MAX_CARDS_PER_SESSION: 20,
  STUDY_MODES: {
    LEARN: 'learn',
    REVIEW: 'review',
    TEST: 'test',
  },
  CARD_STATUS: {
    NEW: 'new',
    LEARNING: 'learning',
    REVIEW: 'review',
    MASTERED: 'mastered',
  },
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'Email already exists.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.',
};