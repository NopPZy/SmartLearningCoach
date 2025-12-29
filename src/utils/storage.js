import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

/**
 * Get item from storage
 */
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item from storage:', error);
    return null;
  }
};

/**
 * Set item in storage
 */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error setting item in storage:', error);
    return false;
  }
};

/**
 * Remove item from storage
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing item from storage:', error);
    return false;
  }
};

/**
 * Clear all storage
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

/**
 * Get auth token
 */
export const getAuthToken = async () => {
  return getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Set auth token
 */
export const setAuthToken = async (token) => {
  return setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Remove auth token
 */
export const removeAuthToken = async () => {
  return removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Get user data
 */
export const getUserData = async () => {
  return getItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Set user data
 */
export const setUserData = async (userData) => {
  return setItem(STORAGE_KEYS.USER_DATA, userData);
};

/**
 * Remove user data
 */
export const removeUserData = async () => {
  return removeItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = async () => {
  const token = await getAuthToken();
  return !!token;
};

/**
 * Clear auth data (logout)
 */
export const clearAuthData = async () => {
  await removeAuthToken();
  await removeUserData();
  return true;
};