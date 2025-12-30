import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <AppNavigator />
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;