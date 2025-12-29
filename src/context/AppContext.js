import React, { createContext, useState, useContext, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [studySettings, setStudySettings] = useState({
    dailyGoal: 20,
    notificationEnabled: true,
    reminderTime: '19:00',
    studyMode: 'spaced',
    autoPlayAudio: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppData();
  }, []);

  const loadAppData = async () => {
    try {
      const [firstLaunch, settings] = await Promise.all([
        getItem(STORAGE_KEYS.FIRST_LAUNCH),
        getItem(STORAGE_KEYS.STUDY_SETTINGS),
      ]);

      setIsFirstLaunch(firstLaunch === null);
      
      if (settings) {
        setStudySettings(settings);
      }
    } catch (error) {
      console.error('Error loading app data:', error);
      setIsFirstLaunch(true);
    } finally {
      setIsLoading(false);
    }
  };

  const completeFirstLaunch = async () => {
    try {
      await setItem(STORAGE_KEYS.FIRST_LAUNCH, false);
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error completing first launch:', error);
    }
  };

  const updateStudySettings = async (newSettings) => {
    try {
      const updatedSettings = { ...studySettings, ...newSettings };
      setStudySettings(updatedSettings);
      await setItem(STORAGE_KEYS.STUDY_SETTINGS, updatedSettings);
      return { success: true };
    } catch (error) {
      console.error('Error updating study settings:', error);
      return { success: false, error: 'Failed to save settings' };
    }
  };

  const resetStudySettings = async () => {
    try {
      const defaultSettings = {
        dailyGoal: 20,
        notificationEnabled: true,
        reminderTime: '19:00',
        studyMode: 'spaced',
        autoPlayAudio: false,
      };
      setStudySettings(defaultSettings);
      await setItem(STORAGE_KEYS.STUDY_SETTINGS, defaultSettings);
      return { success: true };
    } catch (error) {
      console.error('Error resetting study settings:', error);
      return { success: false, error: 'Failed to reset settings' };
    }
  };

  const value = {
    isFirstLaunch,
    isLoading,
    studySettings,
    completeFirstLaunch,
    updateStudySettings,
    resetStudySettings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};