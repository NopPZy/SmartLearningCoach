import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
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
          let iconSize = focused ? size + 4 : size;
          
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
          
          return (
            <View style={[
              styles.tabIconContainer,
              focused && styles.tabIconContainerActive
            ]}>
              <Icon name={iconName} size={iconSize} color={color} />
              {focused && (
                <View style={styles.activeIndicator} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        headerShown: false,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View style={styles.tabBarContent} />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home Tab',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarAccessibilityLabel: 'Dashboard Tab',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.FLASHCARDS}
        component={FlashcardsScreen}
        options={{
          tabBarLabel: 'Flashcards',
          tabBarAccessibilityLabel: 'Flashcards Tab',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarAccessibilityLabel: 'Profile Tab',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBackground: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBarContent: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabIconContainerActive: {
    transform: [{ scale: 1.1 }],
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;