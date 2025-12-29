import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const OnboardingScreen = () => {
  const { completeFirstLaunch } = useAppContext();

  const handleGetStarted = () => {
    completeFirstLaunch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Smart Learning Coach</Text>
          <Text style={styles.subtitle}>
            Your personalized learning companion for effective studying
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>📚 Flashcards</Text>
            <Text style={styles.featureDescription}>
              Create and study interactive flashcards with spaced repetition
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureTitle}>📊 Progress Tracking</Text>
            <Text style={styles.featureDescription}>
              Monitor your learning progress and achievements
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🎯 Personalized Goals</Text>
            <Text style={styles.featureDescription}>
              Set and achieve your daily learning targets
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginBottom: spacing[8],
  },
  feature: {
    marginBottom: spacing[6],
    padding: spacing[4],
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  featureDescription: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    borderRadius: 25,
    alignItems: 'center',
    marginTop: spacing[4],
  },
  buttonText: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.white,
  },
});

export default OnboardingScreen;