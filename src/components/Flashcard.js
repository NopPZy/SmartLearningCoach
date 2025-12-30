import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const Flashcard = ({
  frontText,
  backText,
  frontImage,
  backImage,
  category,
  difficulty,
  mastery,
  lastReviewed,
  isFlipped: externalIsFlipped,
  onFlip,
  onEasy,
  onHard,
  showActions = true,
  style,
}) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  const isFlipped = externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped;

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 180;
    
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    if (onFlip) {
      onFlip(!isFlipped);
    } else {
      setInternalIsFlipped(!isFlipped);
    }
  };

  const frontRotateY = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backRotateY = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 89, 90, 91, 180],
    outputRange: [1, 1, 0, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 89, 90, 91, 180],
    outputRange: [0, 0, 0, 1, 1],
  });

  const getDifficultyColor = () => {
    const lowerDifficulty = difficulty?.toLowerCase();
    switch (lowerDifficulty) {
      case 'easy':
        return colors.success;
      case 'medium':
        return colors.warning;
      case 'hard':
        return colors.error;
      default:
        return colors.gray;
    }
  };

  const getMasteryColor = () => {
    if (mastery >= 80) return colors.success;
    if (mastery >= 60) return colors.warning;
    return colors.error;
  };

  const formatLastReviewed = (date) => {
    if (!date) return 'Never';
    const reviewDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return reviewDate.toLocaleDateString();
  };

  const renderCardSide = (isBack = false) => {
    const text = isBack ? backText : frontText;
    const image = isBack ? backImage : frontImage;

    return (
      <View style={styles.cardContent}>
        {category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
        
        {difficulty && (
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficultyText}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Text>
          </View>
        )}
        
        {mastery !== undefined && (
          <View style={styles.masteryContainer}>
            <View style={styles.masteryBar}>
              <View 
                style={[
                  styles.masteryFill, 
                  { 
                    width: `${mastery}%`,
                    backgroundColor: getMasteryColor()
                  }
                ]} 
              />
            </View>
            <Text style={styles.masteryText}>{mastery}% Mastery</Text>
          </View>
        )}
        
        {lastReviewed && (
          <View style={styles.lastReviewedContainer}>
            <Icon name="clock-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.lastReviewedText}>
              {formatLastReviewed(lastReviewed)}
            </Text>
          </View>
        )}
        
        {image && (
          <View style={styles.imageContainer}>
            <Text style={styles.imagePlaceholder}>[Image]</Text>
          </View>
        )}
        
        <Text style={[styles.cardText, isBack && { color: colors.white, fontSize: 24 }]}>
          {text}
        </Text>
        
        <TouchableOpacity onPress={flipCard} style={styles.flipButton}>
          <Icon
            name="rotate-3d"
            size={18}
            color={colors.primary}
            style={styles.flipIcon}
          />
          <Text style={styles.flipText}>
            {isBack ? 'Show Front' : 'Show Back'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard}>
        <View style={styles.cardWrapper}>
          {/* Front side */}
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              {
                opacity: frontOpacity,
                transform: [{ rotateY: frontRotateY }],
              },
            ]}
          >
            {renderCardSide(false)}
          </Animated.View>

          {/* Back side */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              {
                opacity: backOpacity,
                transform: [{ rotateY: backRotateY }],
              },
            ]}
          >
            {renderCardSide(true)}
          </Animated.View>
        </View>
      </TouchableOpacity>

      {showActions && isFlipped && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onHard}
            style={[styles.actionButton, styles.wrongButton]}
            activeOpacity={0.7}
          >
            <Icon name="close-circle" size={28} color={colors.error} />
            <Text style={[styles.actionText, styles.wrongText]}>Wrong</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={flipCard}
            style={styles.flipActionButton}
            activeOpacity={0.7}
          >
            <Icon name="rotate-3d" size={28} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onEasy}
            style={[styles.actionButton, styles.rightButton]}
            activeOpacity={0.7}
          >
            <Icon name="check-circle" size={28} color={colors.success} />
            <Text style={[styles.actionText, styles.rightText]}>Right</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing[4],
  },
  cardWrapper: {
    width: '100%',
    height: 550,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: spacing[8],
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardFront: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  cardBack: {
    background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)',
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing[5],
    left: spacing[5],
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  categoryText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  difficultyBadge: {
    position: 'absolute',
    top: spacing[5],
    right: spacing[5],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: 24,
    elevation: 3,
  },
  difficultyText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: colors.grayLight,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
    borderWidth: 2,
    borderColor: colors.border,
  },
  imagePlaceholder: {
    color: colors.gray,
    fontSize: typography.sizes.base,
  },
  cardText: {
    fontSize: 28,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * 28,
  },
  flipButton: {
    position: 'absolute',
    bottom: spacing[6],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.primary + '40',
  },
  flipIcon: {
    marginRight: spacing[2],
  },
  flipText: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  masteryContainer: {
    position: 'absolute',
    bottom: spacing[16],
    left: spacing[5],
    right: spacing[5],
    alignItems: 'center',
  },
  masteryBar: {
    width: '100%',
    height: 10,
    backgroundColor: colors.grayLight,
    borderRadius: 5,
    marginBottom: spacing[2],
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  masteryFill: {
    height: '100%',
    borderRadius: 5,
  },
  masteryText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.bold,
  },
  lastReviewedContainer: {
    position: 'absolute',
    bottom: spacing[6],
    left: spacing[5],
    right: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background + '80',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: 14,
  },
  lastReviewedText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing[2],
    fontWeight: typography.weights.medium,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: spacing[10],
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing[5],
    borderRadius: 18,
    borderWidth: 2.5,
    minHeight: 120,
    justifyContent: 'center',
  },
  wrongButton: {
    backgroundColor: colors.error + '15',
    borderColor: colors.error + '60',
  },
  rightButton: {
    backgroundColor: colors.success + '15',
    borderColor: colors.success + '60',
  },
  actionText: {
    marginTop: spacing[2],
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  wrongText: {
    color: colors.error,
  },
  rightText: {
    color: colors.success,
  },
  flipActionButton: {
    flex: 0.8,
    padding: spacing[5],
    backgroundColor: colors.primary + '15',
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: colors.primary + '60',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
});

export default Flashcard;