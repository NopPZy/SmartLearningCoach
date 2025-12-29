import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import colors from '../styles/colors';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await getItem(STORAGE_KEYS.THEME_MODE);
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme(systemColorScheme || 'light');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      setTheme('light');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await setItem(STORAGE_KEYS.THEME_MODE, newTheme);
  };

  const setThemeMode = async (mode) => {
    if (['light', 'dark', 'system'].includes(mode)) {
      const finalMode = mode === 'system' ? systemColorScheme || 'light' : mode;
      setTheme(finalMode);
      await setItem(STORAGE_KEYS.THEME_MODE, mode);
    }
  };

  // Theme colors based on current theme
  const themeColors = theme === 'dark' ? {
    ...colors,
    background: '#121212',
    cardBackground: '#1E1E1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#2D2D2D',
    grayLight: '#2D2D2D',
    grayDark: '#F8F9FA',
  } : colors;

  return {
    theme,
    themeColors,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
  };
};