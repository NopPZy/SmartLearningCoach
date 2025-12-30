import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeContext } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import globalStyles from '../styles/global';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDark } = useThemeContext();
  const { studySettings, updateStudySettings } = useAppContext();
  
  const [localSettings, setLocalSettings] = useState(studySettings);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    study: true,
    display: true,
    notifications: false,
    data: false,
    advanced: false,
  });
  const [fontSize, setFontSize] = useState('Medium');
  const [notificationSettings, setNotificationSettings] = useState({
    studyReminders: true,
    dailyGoals: true,
    weeklyReports: true,
    newFeatures: false,
    marketing: false,
  });
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    cloudProvider: 'google',
  });

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    const result = await updateStudySettings(localSettings);
    setIsSaving(false);
    
    if (result.success) {
      Alert.alert('Success', 'Settings saved successfully');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            const defaultSettings = {
              dailyGoal: 20,
              notificationEnabled: true,
              reminderTime: '19:00',
              studyMode: 'spaced',
              autoPlayAudio: false,
            };
            setLocalSettings(defaultSettings);
            setNotificationSettings({
              studyReminders: true,
              dailyGoals: true,
              weeklyReports: true,
              newFeatures: false,
              marketing: false,
            });
            setBackupSettings({
              autoBackup: true,
              backupFrequency: 'daily',
              cloudProvider: 'google',
            });
            setFontSize('Medium');
            await updateStudySettings(defaultSettings);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleBackupChange = (key, value) => {
    setBackupSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Choose export format:',
      [
        { text: 'JSON', onPress: () => console.log('Export JSON') },
        { text: 'CSV', onPress: () => console.log('Export CSV') },
        { text: 'PDF', onPress: () => console.log('Export PDF') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      'Import Data',
      'Warning: Importing data will replace your current flashcards. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Import', style: 'destructive', onPress: () => console.log('Import data') }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your flashcards, progress, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => console.log('Clear all data') }
      ]
    );
  };

  const SectionHeader = ({ title, icon, section }) => (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={() => toggleSection(section)}
      activeOpacity={0.7}
    >
      <View style={styles.sectionHeaderLeft}>
        <Icon name={icon} size={24} color={colors.primary} />
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>
      <Icon 
        name={expandedSections[section] ? 'chevron-up' : 'chevron-down'} 
        size={24} 
        color={colors.textSecondary} 
      />
    </TouchableOpacity>
  );

  const studyModes = [
    { label: 'Spaced Repetition', value: 'spaced' },
    { label: 'Random Order', value: 'random' },
    { label: 'Sequential', value: 'sequential' },
  ];

  return (
    <View style={globalStyles.screen}>
      <Header 
        title="Settings" 
        showBackButton 
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Study Settings */}
        <Card title="Study Settings" icon="book-open">
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="target" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Daily Goal</Text>
            </View>
            <View style={styles.settingControl}>
              <Input
                value={localSettings.dailyGoal.toString()}
                onChangeText={(value) => handleSettingChange('dailyGoal', parseInt(value) || 0)}
                keyboardType="numeric"
                style={styles.numberInput}
              />
              <Text style={styles.settingUnit}>cards/day</Text>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="bell" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Study Reminders</Text>
            </View>
            <Switch
              value={localSettings.notificationEnabled}
              onValueChange={(value) => handleSettingChange('notificationEnabled', value)}
              trackColor={{ false: colors.gray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          {localSettings.notificationEnabled && (
            <View style={styles.settingItem}>
              <View style={styles.settingLabel}>
                <Icon name="clock" size={20} color={colors.textPrimary} />
                <Text style={styles.settingText}>Reminder Time</Text>
              </View>
              <Input
                value={localSettings.reminderTime}
                onChangeText={(value) => handleSettingChange('reminderTime', value)}
                placeholder="HH:MM"
                style={styles.timeInput}
              />
            </View>
          )}
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="shuffle" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Study Mode</Text>
            </View>
            <View style={styles.modeButtons}>
              {studyModes.map((mode) => (
                <TouchableOpacity
                  key={mode.value}
                  style={[
                    styles.modeButton,
                    localSettings.studyMode === mode.value && styles.modeButtonActive,
                  ]}
                  onPress={() => handleSettingChange('studyMode', mode.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.modeButtonText,
                      localSettings.studyMode === mode.value && styles.modeButtonTextActive,
                    ]}
                  >
                    {mode.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="volume-high" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Auto-play Audio</Text>
            </View>
            <Switch
              value={localSettings.autoPlayAudio}
              onValueChange={(value) => handleSettingChange('autoPlayAudio', value)}
              trackColor={{ false: colors.gray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </Card>

        {/* Display Settings */}
        <Card title="Display" icon="monitor">
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="theme-light-dark" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Theme</Text>
            </View>
            <View style={styles.themeButtons}>
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  theme === 'light' && styles.themeButtonActive,
                ]}
                onPress={() => toggleTheme('light')}
                activeOpacity={0.7}
              >
                <Icon
                  name="weather-sunny"
                  size={20}
                  color={theme === 'light' ? colors.white : colors.textPrimary}
                />
                <Text
                  style={[
                    styles.themeButtonText,
                    theme === 'light' && styles.themeButtonTextActive,
                  ]}
                >
                  Light
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  theme === 'dark' && styles.themeButtonActive,
                ]}
                onPress={() => toggleTheme('dark')}
                activeOpacity={0.7}
              >
                <Icon
                  name="weather-night"
                  size={20}
                  color={theme === 'dark' ? colors.white : colors.textPrimary}
                />
                <Text
                  style={[
                    styles.themeButtonText,
                    theme === 'dark' && styles.themeButtonTextActive,
                  ]}
                >
                  Dark
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  theme === 'system' && styles.themeButtonActive,
                ]}
                onPress={() => toggleTheme('system')}
                activeOpacity={0.7}
              >
                <Icon
                  name="cog"
                  size={20}
                  color={theme === 'system' ? colors.white : colors.textPrimary}
                />
                <Text
                  style={[
                    styles.themeButtonText,
                    theme === 'system' && styles.themeButtonTextActive,
                  ]}
                >
                  System
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="text" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Font Size</Text>
            </View>
            <View style={styles.fontSizeButtons}>
              {['Small', 'Medium', 'Large'].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.fontSizeButton,
                    // Add active state logic here
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={styles.fontSizeButtonText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Data Settings */}
        <Card title="Data" icon="database">
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="download" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Export Data</Text>
            </View>
            <Button
              title="Export"
              onPress={() => console.log('Export data')}
              variant="outline"
              size="small"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="upload" size={20} color={colors.textPrimary} />
              <Text style={styles.settingText}>Import Data</Text>
            </View>
            <Button
              title="Import"
              onPress={() => console.log('Import data')}
              variant="outline"
              size="small"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Icon name="trash-can" size={20} color={colors.error} />
              <Text style={[styles.settingText, { color: colors.error }]}>
                Clear All Data
              </Text>
            </View>
            <Button
              title="Clear"
              onPress={() => Alert.alert('Clear Data', 'This will delete all your flashcards and progress. This action cannot be undone.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive' },
              ])}
              variant="danger"
              size="small"
            />
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Save Settings"
            onPress={handleSaveSettings}
            loading={isSaving}
            style={styles.saveButton}
          />
          
          <Button
            title="Reset to Default"
            onPress={handleResetSettings}
            variant="outline"
          />
        </View>

        {/* App Info */}
        <Card title="About" icon="information">
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Build Number</Text>
            <Text style={styles.infoValue}>1001</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>Jan 15, 2024</Text>
          </View>
          
          <View style={styles.infoLinks}>
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Terms of Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Support</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

// TouchableOpacity import moved to top

const styles = {
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    marginLeft: spacing[3],
  },
  settingControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberInput: {
    width: 60,
    textAlign: 'center',
    marginRight: spacing[2],
  },
  settingUnit: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  timeInput: {
    width: 80,
    textAlign: 'center',
  },
  modeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  modeButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  modeButtonTextActive: {
    color: colors.white,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  themeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  themeButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    marginLeft: spacing[1],
  },
  themeButtonTextActive: {
    color: colors.white,
  },
  fontSizeButtons: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  fontSizeButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  fontSizeButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  actionButtons: {
    marginVertical: spacing[4],
  },
  saveButton: {
    marginBottom: spacing[3],
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  infoLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing[3],
  },
  infoLink: {
    paddingVertical: spacing[2],
  },
  infoLinkText: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
};

export default SettingsScreen;