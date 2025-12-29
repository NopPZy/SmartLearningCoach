import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import { ROUTES } from '../utils/constants';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_TAB}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case ROUTES.HOME_TAB:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case ROUTES.DASHBOARD:
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
              break;
            case ROUTES.FLASHCARDS:
              iconName = focused ? 'cards' : 'cards-outline';
              break;
            case ROUTES.PROFILE:
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'circle';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.FLASHCARDS}
        component={FlashcardsScreen}
        options={{
          tabBarLabel: 'Flashcards',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;