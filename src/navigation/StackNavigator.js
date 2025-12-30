import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils/constants';

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

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardStyle: { backgroundColor: '#F5F7FB' },
    }}
  >
    <Stack.Screen name="Tabs" component={TabNavigator} />
    <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    <Stack.Screen name={ROUTES.QUIZ} component={QuizScreen} />
  </Stack.Navigator>
);

export default StackNavigator;