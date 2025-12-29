import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthContext } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import globalStyles from '../styles/global';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, isLoading } = useAuthContext();
  const { themeColors, toggleTheme, isDark } = useThemeContext();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    // navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const menuItems = [
    {
      id: 1,
      title: 'Study Statistics',
      icon: 'chart-line',
      onPress: () => console.log('Study Statistics'),
    },
    {
      id: 2,
      title: 'Achievements',
      icon: 'trophy',
      onPress: () => console.log('Achievements'),
    },
    {
      id: 3,
      title: 'Study Preferences',
      icon: 'cog',
      onPress: () => console.log('Study Preferences'),
    },
    {
      id: 4,
      title: 'Help & Support',
      icon: 'help-circle',
      onPress: () => console.log('Help & Support'),
    },
  ];

  if (isLoading) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (!user) {
    return (
      <EmptyState
        icon="account-question"
        title="No User Found"
        message="Please sign in to view your profile"
        actionText="Sign In"
        onAction={() => navigation.navigate('Login')}
      />
    );
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Profile" />
      
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name || 'User'}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              
              <View style={styles.stats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>42</Text>
                  <Text style={styles.statLabel}>Cards</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>7</Text>
                  <Text style={styles.statLabel}>Days</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>85%</Text>
                  <Text style={styles.statLabel}>Mastery</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              title="Edit Profile"
              onPress={handleEditProfile}
              variant="outline"
              size="small"
              style={styles.editButton}
            />
            <TouchableOpacity
              onPress={toggleTheme}
              style={styles.themeButton}
              activeOpacity={0.7}
            >
              <Icon
                name={isDark ? 'weather-sunny' : 'weather-night'}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color={colors.primary} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Card */}
        <Card title="Settings" icon="cog-outline">
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <View style={styles.settingItemLeft}>
              <Icon name="cog" size={20} color={colors.textPrimary} />
              <Text style={styles.settingItemText}>App Settings</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => console.log('Notification Settings')}
            activeOpacity={0.7}
          >
            <View style={styles.settingItemLeft}>
              <Icon name="bell" size={20} color={colors.textPrimary} />
              <Text style={styles.settingItemText}>Notifications</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => console.log('Privacy Settings')}
            activeOpacity={0.7}
          >
            <View style={styles.settingItemLeft}>
              <Icon name="shield-lock" size={20} color={colors.textPrimary} />
              <Text style={styles.settingItemText}>Privacy & Security</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray} />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          icon={<Icon name="logout" size={20} color={colors.white} />}
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = {
  profileHeader: {
    marginBottom: spacing[4],
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: spacing[4],
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[0.5],
  },
  userEmail: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    marginBottom: spacing[3],
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing[0.5],
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: spacing[4],
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[4],
  },
  editButton: {
    flex: 1,
    marginRight: spacing[3],
  },
  themeButton: {
    padding: spacing[2],
    backgroundColor: colors.grayLight,
    borderRadius: spacing.borderRadius.md,
  },
  menuSection: {
    marginBottom: spacing[4],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
    padding: spacing[4],
    borderRadius: spacing.borderRadius.md,
    marginBottom: spacing[2],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    marginLeft: spacing[3],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    marginLeft: spacing[3],
  },
  logoutButton: {
    marginTop: spacing[4],
    marginBottom: spacing[8],
  },
};

export default ProfileScreen;