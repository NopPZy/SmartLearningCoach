import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import StackNavigator from './StackNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import Loader from '../components/Loader';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const { isFirstLaunch, isLoading: appLoading } = useAppContext();

  if (authLoading || appLoading) {
    return <Loader fullScreen text="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth" component={StackNavigator} />
        ) : (
          <Stack.Screen name="Main" component={StackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;