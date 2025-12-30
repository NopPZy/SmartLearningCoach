import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import globalStyles from '../styles/global';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const ProfileScreen = ({ navigation }) => {
  const { themeColors, toggleTheme, isDark } = useThemeContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  // Enhanced mock user data
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: null,
    bio: 'Passionate learner',
    joinDate: 'January 2024',
    totalStudyTime: 42,
    completedLessons: 7,
    streak: 15,
    level: 5,
    xp: 850,
    nextLevelXP: 1000,
    rank: 'Bronze Learner',
    badges: [
      { id: 1, name: 'Early Bird', icon: 'weather-sunny', color: colors.warning },
      { id: 2, name: 'Night Owl', icon: 'weather-night', color: colors.info },
    ],
    preferences: {
      dailyGoal: 30,
      studyReminder: '09:00',
      breakDuration: 10,
      difficulty: 'Intermediate',
    }
  });

  const languages = ['English', 'Spanish', 'French', 'German'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleUpdatePreference = (key, value) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const MenuItem = ({ icon, title, value, onPress, hasSwitch = false, switchValue, onSwitchChange }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.menuLeft}>
        <Icon name={icon} size={20} color={colors.primary} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <View style={styles.menuRight}>
        {hasSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor={switchValue ? colors.white : colors.gray}
          />
        ) : (
          <>
            {value && <Text style={styles.menuValue}>{value}</Text>}
            <Icon name="chevron-right" size={20} color={colors.gray} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

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


      </ScrollView>
    </View>
  );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  profileSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    ...typography.h2,
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  userBio: {
    ...typography.small,
    color: colors.gray,
    marginBottom: spacing.sm,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMetaText: {
    ...typography.small,
    color: colors.gray,
    marginRight: spacing.sm,
  },
  editButton: {
    marginTop: spacing.sm,
  },
  levelCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    ...typography.h4,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  xpText: {
    ...typography.body,
    color: colors.gray,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.lg,
  },
  streakText: {
    ...typography.body,
    color: colors.warning,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  xpBarContainer: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  xpBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  xpRemaining: {
    ...typography.small,
    color: colors.gray,
    textAlign: 'center',
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  statItem: {
    width: '50%',
    padding: spacing.sm,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  statLabel: {
    ...typography.small,
    color: colors.gray,
    textAlign: 'center',
  },
  badgesCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  badgeItem: {
    width: '50%',
    padding: spacing.sm,
    alignItems: 'center',
  },
  badgeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badgeName: {
    ...typography.small,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  preferencesCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  settingsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  menuValue: {
    ...typography.small,
    color: colors.gray,
    marginRight: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  actionButtonsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
});

export default ProfileScreen;