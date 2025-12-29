import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

// Main Screens
import DashboardScreen from '../screens/DashboardScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';

// Tab Navigator
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "Tabs" : ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#F5F7FB' },
      }}
    >
      {!isAuthenticated ? (
        <>
          {/* Auth Screens */}
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
          <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          {/* Main Screens */}
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
          <Stack.Screen name={ROUTES.QUIZ} component={QuizScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};



export default StackNavigator;