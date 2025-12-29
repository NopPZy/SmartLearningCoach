import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Flashcard from '../components/Flashcard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { flashcardsApi } from '../api/flashcards';
import globalStyles from '../styles/global';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const QuizScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [reviewedCards, setReviewedCards] = useState([]);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setLoading(true);
    const result = await flashcardsApi.getForReview();
    
    if (result.success && result.data.length > 0) {
      setCards(result.data);
    }
    setLoading(false);
  };

  const handleFlip = (flipped) => {
    setIsFlipped(flipped);
  };

  const handleEasy = async () => {
    await handleReview('easy');
  };

  const handleHard = async () => {
    await handleReview('hard');
  };

  const handleReview = async (difficulty) => {
    const currentCard = cards[currentCardIndex];
    
    // Save review
    const reviewData = {
      cardId: currentCard.id,
      difficulty,
      timestamp: new Date().toISOString(),
    };
    
    setReviewedCards(prev => [...prev, reviewData]);
    
    // Update score
    if (difficulty === 'easy') {
      setScore(prev => prev + 1);
    }
    
    // Move to next card or show results
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setShowResults(true);
      await submitReviews();
    }
  };

  const submitReviews = async () => {
    // Submit all reviews to API
    for (const review of reviewedCards) {
      await flashcardsApi.review(review.cardId, {
        difficulty: review.difficulty,
      });
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setScore(0);
    setShowResults(false);
    setReviewedCards([]);
    setIsFlipped(false);
  };

  const handleExit = () => {
    Alert.alert(
      'Exit Quiz',
      'Are you sure you want to exit? Your progress will be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            submitReviews().finally(() => {
              navigation.goBack();
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <Loader fullScreen text="Loading flashcards..." />;
  }

  if (cards.length === 0) {
    return (
      <EmptyState
        icon="cards-outline"
        title="No Flashcards to Review"
        message="You've reviewed all your flashcards for now. Come back later or add new flashcards to study."
        actionText="Add Flashcards"
        onAction={() => navigation.navigate('Flashcards')}
      />
    );
  }

  if (showResults) {
    const percentage = Math.round((score / cards.length) * 100);
    
    return (
      <View style={globalStyles.screen}>
        <Header
          title="Quiz Results"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView style={globalStyles.container}>
          <Card style={styles.resultsCard}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Quiz Complete!</Text>
              <Text style={styles.resultsSubtitle}>
                You reviewed {cards.length} flashcards
              </Text>
            </View>
            
            <View style={styles.scoreContainer}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scorePercentage}>{percentage}%</Text>
                <Text style={styles.scoreLabel}>Mastery</Text>
              </View>
              
              <View style={styles.scoreStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Correct:</Text>
                  <Text style={styles.statValue}>{score}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total:</Text>
                  <Text style={styles.statValue}>{cards.length}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Time:</Text>
                  <Text style={styles.statValue}>5:32</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.performance}>
              <Text style={styles.performanceTitle}>Performance</Text>
              {percentage >= 80 ? (
                <View style={styles.performanceGood}>
                  <Icon name="trophy" size={24} color={colors.success} />
                  <Text style={styles.performanceText}>
                    Excellent work! You're mastering these concepts.
                  </Text>
                </View>
              ) : percentage >= 60 ? (
                <View style={styles.performanceAverage}>
                  <Icon name="thumb-up" size={24} color={colors.warning} />
                  <Text style={styles.performanceText}>
                    Good job! Keep practicing to improve.
                  </Text>
                </View>
              ) : (
                <View style={styles.performancePoor}>
                  <Icon name="refresh" size={24} color={colors.error} />
                  <Text style={styles.performanceText}>
                    Keep practicing! Review these flashcards again.
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.actionButtons}>
              <Button
                title="Review Again"
                onPress={handleRestart}
                icon={<Icon name="refresh" size={20} color={colors.white} />}
                style={styles.restartButton}
              />
              
              <Button
                title="Back to Dashboard"
                onPress={() => navigation.navigate('Dashboard')}
                variant="outline"
              />
            </View>
          </Card>
          
          <Card title="Review Details" icon="clipboard-list">
            {reviewedCards.map((review, index) => {
              const card = cards[index];
              return (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewQuestion}>
                    {card.frontText}
                  </Text>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: review.difficulty === 'easy' ? colors.success : colors.error }
                  ]}>
                    <Text style={styles.difficultyText}>
                      {review.difficulty === 'easy' ? 'Easy' : 'Hard'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card>
        </ScrollView>
      </View>
    );
  }

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  return (
    <View style={globalStyles.screen}>
      <Header
        title="Quiz"
        showBackButton
        onBackPress={handleExit}
        rightText={`${currentCardIndex + 1}/${cards.length}`}
      />
      
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={styles.quizContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Card {currentCardIndex + 1} of {cards.length}
          </Text>
        </View>
        
        {/* Flashcard */}
        <Flashcard
          frontText={currentCard.frontText}
          backText={currentCard.backText}
          category={currentCard.category}
          difficulty={currentCard.difficulty}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onEasy={handleEasy}
          onHard={handleHard}
          style={styles.flashcard}
        />
        
        {/* Instructions */}
        {!isFlipped ? (
          <Card style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <Icon name="lightbulb" size={24} color={colors.warning} />
              <Text style={styles.instructionsTitle}>Tip</Text>
            </View>
            <Text style={styles.instructionsText}>
              Tap the card or use the flip button to reveal the answer. 
              Try to recall the answer before flipping.
            </Text>
          </Card>
        ) : (
          <Card style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <Icon name="check-circle" size={24} color={colors.success} />
              <Text style={styles.instructionsTitle}>How well did you know this?</Text>
            </View>
            <Text style={styles.instructionsText}>
              Select "Easy" if you knew it well, "Hard" if you need more practice.
              This helps our algorithm schedule your next review.
            </Text>
          </Card>
        )}
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickAction, styles.hardAction]}
            onPress={handleHard}
            activeOpacity={0.7}
          >
            <Icon name="close" size={24} color={colors.error} />
            <Text style={[styles.quickActionText, styles.hardActionText]}>
              Hard
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.flipAction}
            onPress={() => handleFlip(!isFlipped)}
            activeOpacity={0.7}
          >
            <Icon name="rotate-3d" size={28} color={colors.primary} />
            <Text style={styles.flipActionText}>
              {isFlipped ? 'Show Front' : 'Show Back'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.quickAction, styles.easyAction]}
            onPress={handleEasy}
            activeOpacity={0.7}
          >
            <Icon name="check" size={24} color={colors.success} />
            <Text style={[styles.quickActionText, styles.easyActionText]}>
              Easy
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  quizContainer: {
    paddingBottom: spacing[8],
  },
  progressContainer: {
    marginBottom: spacing[6],
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.grayLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  flashcard: {
    marginBottom: spacing[6],
  },
  instructionsCard: {
    marginBottom: spacing[6],
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  instructionsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginLeft: spacing[2],
  },
  instructionsText: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[4],
  },
  quickAction: {
    alignItems: 'center',
    padding: spacing[4],
    borderRadius: spacing.borderRadius.xl,
    minWidth: 100,
  },
  hardAction: {
    backgroundColor: `${colors.error}15`,
  },
  easyAction: {
    backgroundColor: `${colors.success}15`,
  },
  quickActionText: {
    marginTop: spacing[1],
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  hardActionText: {
    color: colors.error,
  },
  easyActionText: {
    color: colors.success,
  },
  flipAction: {
    alignItems: 'center',
    padding: spacing[3],
  },
  flipActionText: {
    marginTop: spacing[1],
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  resultsCard: {
    marginBottom: spacing[4],
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  resultsTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  resultsSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  scoreCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
  },
  scorePercentage: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  scoreLabel: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    opacity: 0.9,
  },
  scoreStats: {
    flex: 1,
    marginLeft: spacing[6],
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  performance: {
    marginBottom: spacing[6],
  },
  performanceTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  performanceGood: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.success}15`,
    padding: spacing[4],
    borderRadius: spacing.borderRadius.lg,
  },
  performanceAverage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.warning}15`,
    padding: spacing[4],
    borderRadius: spacing.borderRadius.lg,
  },
  performancePoor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.error}15`,
    padding: spacing[4],
    borderRadius: spacing.borderRadius.lg,
  },
  performanceText: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    marginLeft: spacing[3],
    flex: 1,
  },
  actionButtons: {
    marginTop: spacing[4],
  },
  restartButton: {
    marginBottom: spacing[3],
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reviewQuestion: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing[3],
  },
  difficultyBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: spacing.borderRadius.full,
  },
  difficultyText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
};

export default QuizScreen;