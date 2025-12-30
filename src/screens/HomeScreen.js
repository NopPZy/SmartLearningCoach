import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';
import Button from '../components/Button';
import Card from '../components/Card';

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [studyMode, setStudyMode] = useState('learn');

  const categories = [
    { id: 'all', name: 'All Subjects', icon: 'book-open-page-variant' },
    { id: 'math', name: 'Mathematics', icon: 'calculator' },
    { id: 'science', name: 'Science', icon: 'flask' },
    { id: 'history', name: 'History', icon: 'clock-outline' },
    { id: 'language', name: 'Language', icon: 'alphabet-latin' },
  ];

  const quickActions = [
    { id: 1, name: 'Create Flashcard', icon: 'plus-circle', color: colors.primary, action: () => navigation.navigate('Flashcards') },
    { id: 2, name: 'Start Quiz', icon: 'play-circle', color: colors.success, action: () => navigation.navigate('Quiz') },
    { id: 3, name: 'Study Session', icon: 'book-clock', color: colors.warning, action: () => console.log('Study Session') },
    { id: 4, name: 'Progress Stats', icon: 'chart-line', color: colors.info, action: () => navigation.navigate('Dashboard') },
  ];

  const recentActivities = [
    { id: 1, title: 'Algebra Quiz', subject: 'Mathematics', score: 85, time: '2 hours ago' },
    { id: 2, title: 'Chemistry Flashcards', subject: 'Science', score: 92, time: '1 day ago' },
    { id: 3, title: 'History Timeline', subject: 'History', score: 78, time: '3 days ago' },
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'Physics Exam', date: 'Tomorrow', urgency: 'high' },
    { id: 2, title: 'Essay Submission', date: 'In 3 days', urgency: 'medium' },
    { id: 3, title: 'Group Project', date: 'Next week', urgency: 'low' },
  ];

  const studyStreak = 7;
  const totalCards = 156;
  const averageScore = 84;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>Ready to continue learning?</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Icon name="fire" size={24} color={colors.warning} />
            <Text style={styles.statNumber}>{studyStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>
          <Card style={styles.statCard}>
            <Icon name="cards" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{totalCards}</Text>
            <Text style={styles.statLabel}>Flashcards</Text>
          </Card>
          <Card style={styles.statCard}>
            <Icon name="trophy" size={24} color={colors.success} />
            <Text style={styles.statNumber}>{averageScore}%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card title="Quick Actions" icon="lightning-bolt" style={styles.sectionCard}>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionButton, { backgroundColor: action.color + '20' }]}
                onPress={action.action}
                activeOpacity={0.8}
              >
                <Icon name={action.icon} size={32} color={action.color} />
                <Text style={styles.quickActionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Subject Categories */}
        <Card title="Study by Subject" icon="bookmark" style={styles.sectionCard}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
              >
                <Icon 
                  name={category.icon} 
                  size={20} 
                  color={selectedCategory === category.id ? colors.white : colors.primary} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>

        {/* Recent Activities */}
        <Card title="Recent Activity" icon="history" style={styles.sectionCard}>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Icon name="check-circle" size={20} color={colors.success} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.subject}</Text>
                </View>
                <View style={styles.activityScore}>
                  <Text style={styles.scoreText}>{activity.score}%</Text>
                  <Text style={styles.timeText}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Upcoming Deadlines */}
        <Card title="Upcoming Deadlines" icon="calendar-clock" style={styles.sectionCard}>
          <View style={styles.deadlinesList}>
            {upcomingDeadlines.map((deadline) => (
              <View key={deadline.id} style={styles.deadlineItem}>
                <View style={[
                  styles.deadlineIndicator,
                  { backgroundColor: 
                    deadline.urgency === 'high' ? colors.error :
                    deadline.urgency === 'medium' ? colors.warning :
                    colors.success
                  }
                ]} />
                <View style={styles.deadlineContent}>
                  <Text style={styles.deadlineTitle}>{deadline.title}</Text>
                  <Text style={styles.deadlineDate}>{deadline.date}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.gray} />
              </View>
            ))}
          </View>
        </Card>

        {/* Study Mode Selector */}
        <Card title="Study Mode" icon="school" style={styles.sectionCard}>
          <View style={styles.studyModeContainer}>
            <TouchableOpacity
              style={[
                styles.studyModeButton,
                studyMode === 'learn' && styles.studyModeButtonActive
              ]}
              onPress={() => setStudyMode('learn')}
            >
              <Icon name="book-open-variant" size={24} color={studyMode === 'learn' ? colors.white : colors.primary} />
              <Text style={[
                styles.studyModeText,
                studyMode === 'learn' && styles.studyModeTextActive
              ]}>
                Learn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.studyModeButton,
                studyMode === 'review' && styles.studyModeButtonActive
              ]}
              onPress={() => setStudyMode('review')}
            >
              <Icon name="refresh" size={24} color={studyMode === 'review' ? colors.white : colors.primary} />
              <Text style={[
                styles.studyModeText,
                studyMode === 'review' && styles.studyModeTextActive
              ]}>
                Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.studyModeButton,
                studyMode === 'test' && styles.studyModeButtonActive
              ]}
              onPress={() => setStudyMode('test')}
            >
              <Icon name="checkbox-marked-circle" size={24} color={studyMode === 'test' ? colors.white : colors.primary} />
              <Text style={[
                styles.studyModeText,
                studyMode === 'test' && styles.studyModeTextActive
              ]}>
                Test
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button
            title="Start Learning Session"
            onPress={() => {
              if (studyMode === 'review' || studyMode === 'test') {
                navigation.navigate('Quiz');
              } else {
                navigation.navigate('Flashcards');
              }
            }}
            variant="primary"
            size="large"
            icon={<Icon name="play" size={20} color={colors.white} />}
            style={styles.actionButton}
          />
          <Button
            title="Create New Study Set"
            onPress={() => navigation.navigate('Flashcards')}
            variant="secondary"
            size="large"
            icon={<Icon name="plus" size={20} color={colors.primary} />}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
  },
  welcomeTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[1],
  },
  welcomeSubtitle: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  statCard: {
    flex: 1,
    marginHorizontal: spacing[1],
    padding: spacing[4],
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginTop: spacing[2],
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing[1],
  },
  sectionCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    padding: spacing[4],
    borderRadius: spacing.borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  quickActionText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginTop: spacing[2],
    textAlign: 'center',
  },
  categoriesScroll: {
    marginTop: spacing[2],
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.grayLight,
    marginRight: spacing[2],
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    marginLeft: spacing[2],
  },
  categoryTextActive: {
    color: colors.white,
  },
  activitiesList: {
    marginTop: spacing[3],
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    marginRight: spacing[3],
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  activitySubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing[0.5],
  },
  activityScore: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  timeText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing[0.5],
  },
  deadlinesList: {
    marginTop: spacing[3],
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  deadlineIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing[3],
  },
  deadlineContent: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  deadlineDate: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing[0.5],
  },
  studyModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing[2],
  },
  studyModeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[4],
    borderRadius: spacing.borderRadius.lg,
    backgroundColor: colors.grayLight,
    marginHorizontal: spacing[1],
  },
  studyModeButtonActive: {
    backgroundColor: colors.primary,
  },
  studyModeText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    marginTop: spacing[2],
  },
  studyModeTextActive: {
    color: colors.white,
  },
  actionButtonsContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
  },
  actionButton: {
    marginBottom: spacing[3],
  },
});

export default HomeScreen;