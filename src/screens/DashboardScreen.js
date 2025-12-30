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
import Card from '../components/Card';
import Button from '../components/Button';

const DashboardScreen = ({ navigation }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [activeChart, setActiveChart] = useState('progress');

  const timeframes = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const chartTypes = [
    { id: 'progress', label: 'Progress', icon: 'chart-line' },
    { id: 'performance', label: 'Performance', icon: 'chart-bar' },
    { id: 'subjects', label: 'Subjects', icon: 'chart-pie' },
  ];

  const subjectProgress = [
    { name: 'Mathematics', progress: 78, color: colors.primary, icon: 'calculator' },
    { name: 'Science', progress: 85, color: colors.success, icon: 'flask' },
    { name: 'History', progress: 65, color: colors.warning, icon: 'clock-outline' },
    { name: 'Language', progress: 92, color: colors.info, icon: 'alphabet-latin' },
  ];

  const recentAchievements = [
    { id: 1, title: 'Math Master', description: 'Completed 50 math problems', icon: 'trophy', color: colors.warning },
    { id: 2, title: 'Perfect Score', description: '100% on Chemistry quiz', icon: 'star', color: colors.success },
    { id: 3, title: 'Study Streak', description: '7 days in a row', icon: 'fire', color: colors.error },
  ];

  const studyGoals = [
    { id: 1, title: 'Daily Goal', current: 45, target: 60, unit: 'minutes' },
    { id: 2, title: 'Weekly Cards', current: 120, target: 150, unit: 'cards' },
    { id: 3, title: 'Monthly Quizzes', current: 8, target: 12, unit: 'quizzes' },
  ];

  const performanceData = [
    { day: 'Mon', score: 85 },
    { day: 'Tue', score: 78 },
    { day: 'Wed', score: 92 },
    { day: 'Thu', score: 88 },
    { day: 'Fri', score: 95 },
    { day: 'Sat', score: 82 },
    { day: 'Sun', score: 90 },
  ];

  const ProgressBar = ({ progress, color }) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );

  const ChartPlaceholder = ({ type }) => (
    <View style={styles.chartContainer}>
      <View style={styles.chartPlaceholder}>
        <Icon name={type === 'progress' ? 'chart-line' : type === 'performance' ? 'chart-bar' : 'chart-pie'} size={48} color={colors.gray} />
        <Text style={styles.chartText}>Interactive {type} chart</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learning Dashboard</Text>
          <Text style={styles.subtitle}>Track your progress and achievements</Text>
        </View>

        {/* Timeframe Selector */}
        <View style={styles.timeframeContainer}>
          {timeframes.map((timeframe) => (
            <TouchableOpacity
              key={timeframe.id}
              style={[
                styles.timeframeButton,
                selectedTimeframe === timeframe.id && styles.timeframeButtonActive
              ]}
              onPress={() => setSelectedTimeframe(timeframe.id)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.timeframeText,
                selectedTimeframe === timeframe.id && styles.timeframeTextActive
              ]}>
                {timeframe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Type Selector */}
        <View style={styles.chartTypeContainer}>
          {chartTypes.map((chart) => (
            <TouchableOpacity
              key={chart.id}
              style={[
                styles.chartTypeButton,
                activeChart === chart.id && styles.chartTypeButtonActive
              ]}
              onPress={() => setActiveChart(chart.id)}
              activeOpacity={0.8}
            >
              <Icon 
                name={chart.icon} 
                size={20} 
                color={activeChart === chart.id ? colors.white : colors.primary} 
              />
              <Text style={[
                styles.chartTypeText,
                activeChart === chart.id && styles.chartTypeTextActive
              ]}>
                {chart.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Display */}
        <Card title="Performance Overview" icon="chart-line" style={styles.chartCard}>
          <ChartPlaceholder type={activeChart} />
        </Card>

        {/* Subject Progress */}
        <Card title="Subject Progress" icon="book-open" style={styles.progressCard}>
          <View style={styles.subjectList}>
            {subjectProgress.map((subject, index) => (
              <View key={index} style={styles.subjectItem}>
                <View style={styles.subjectHeader}>
                  <View style={styles.subjectInfo}>
                    <Icon name={subject.icon} size={20} color={subject.color} />
                    <Text style={styles.subjectName}>{subject.name}</Text>
                  </View>
                  <Text style={styles.subjectPercentage}>{subject.progress}%</Text>
                </View>
                <ProgressBar progress={subject.progress} color={subject.color} />
              </View>
            ))}
          </View>
        </Card>

        {/* Study Goals */}
        <Card title="Study Goals" icon="target" style={styles.goalsCard}>
          <View style={styles.goalsList}>
            {studyGoals.map((goal) => (
              <View key={goal.id} style={styles.goalItem}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalProgress}>
                    {goal.current}/{goal.target} {goal.unit}
                  </Text>
                </View>
                <ProgressBar 
                  progress={(goal.current / goal.target) * 100} 
                  color={colors.primary} 
                />
              </View>
            ))}
          </View>
        </Card>

        {/* Recent Achievements */}
        <Card title="Recent Achievements" icon="trophy" style={styles.achievementsCard}>
          <View style={styles.achievementsList}>
            {recentAchievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                  <Icon name={achievement.icon} size={24} color={achievement.color} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Performance Summary */}
        <Card title="Weekly Performance" icon="calendar-check" style={styles.performanceCard}>
          <View style={styles.performanceGrid}>
            {performanceData.map((day, index) => (
              <View key={index} style={styles.performanceItem}>
                <Text style={styles.performanceDay}>{day.day}</Text>
                <View style={[
                  styles.performanceBar,
                  { height: (day.score / 100) * 60, backgroundColor: colors.primary }
                ]} />
                <Text style={styles.performanceScore}>{day.score}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button
            title="View Detailed Reports"
            onPress={() => console.log('View Detailed Reports')}
            variant="primary"
            size="large"
            icon={<Icon name="file-chart" size={20} color={colors.white} />}
            style={styles.actionButton}
          />
          <Button
            title="Export Progress Data"
            onPress={() => console.log('Export Progress Data')}
            variant="secondary"
            size="large"
            icon={<Icon name="download" size={20} color={colors.primary} />}
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
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
  },
  timeframeContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeframeButtonActive: {
    backgroundColor: colors.primary,
  },
  timeframeText: {
    ...typography.small,
    color: colors.gray,
    fontWeight: '600',
  },
  timeframeTextActive: {
    color: colors.white,
  },
  chartTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  chartTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.xs,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chartTypeText: {
    ...typography.small,
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  chartTypeTextActive: {
    color: colors.white,
  },
  chartCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  chartContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  chartText: {
    ...typography.body,
    color: colors.gray,
    marginTop: spacing.sm,
  },
  progressCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  subjectList: {
    paddingVertical: spacing.sm,
  },
  subjectItem: {
    marginBottom: spacing.md,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectName: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  subjectPercentage: {
    ...typography.small,
    color: colors.gray,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  goalsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  goalsList: {
    paddingVertical: spacing.sm,
  },
  goalItem: {
    marginBottom: spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  goalProgress: {
    ...typography.small,
    color: colors.gray,
    fontWeight: '600',
  },
  achievementsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  achievementsList: {
    paddingVertical: spacing.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    ...typography.small,
    color: colors.gray,
  },
  performanceCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: spacing.lg,
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceDay: {
    ...typography.small,
    color: colors.gray,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  performanceBar: {
    width: 24,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  performanceScore: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
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

export default DashboardScreen;