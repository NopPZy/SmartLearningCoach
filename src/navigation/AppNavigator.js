import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppContext } from '../context/AppContext';
import StackNavigator from './StackNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import Loader from '../components/Loader';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isFirstLaunch, isLoading: appLoading } = useAppContext();

  if (appLoading) {
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
        ) : (
          <Stack.Screen name="App" component={StackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;