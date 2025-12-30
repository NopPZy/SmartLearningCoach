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
              Last reviewed: {formatLastReviewed(lastReviewed)}
            </Text>
          </View>
        )}
        
        {image && (
          <View style={styles.imageContainer}>
            {/* Image would be rendered here */}
            <Text style={styles.imagePlaceholder}>[Image]</Text>
          </View>
        )}
        
        <Text style={styles.cardText}>{text}</Text>
        
        <TouchableOpacity onPress={flipCard} style={styles.flipButton}>
          <Icon
            name="rotate-3d"
            size={20}
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
            style={[styles.actionButton, styles.hardButton]}
          >
            <Icon name="close" size={24} color={colors.error} />
            <Text style={[styles.actionText, styles.hardText]}>Hard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={flipCard}
            style={styles.flipActionButton}
          >
            <Icon name="rotate-3d" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onEasy}
            style={[styles.actionButton, styles.easyButton]}
          >
            <Icon name="check" size={24} color={colors.success} />
            <Text style={[styles.actionText, styles.easyText]}>Easy</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardWrapper: {
    width: '100%',
    height: 300,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.borderRadius.xl,
    padding: spacing[6],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  cardFront: {
    backgroundColor: colors.white,
  },
  cardBack: {
    backgroundColor: colors.primaryLight,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing[3],
    left: spacing[3],
    backgroundColor: colors.grayLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: spacing.borderRadius.full,
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  difficultyBadge: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: spacing.borderRadius.full,
  },
  difficultyText: {
    fontSize: typography.sizes.xs,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: colors.grayLight,
    borderRadius: spacing.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  imagePlaceholder: {
    color: colors.gray,
    fontSize: typography.sizes.sm,
  },
  cardText: {
    fontSize: typography.sizes.xl,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.sizes.xl,
  },
  flipButton: {
    position: 'absolute',
    bottom: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
  },
  flipIcon: {
    marginRight: spacing[1],
  },
  flipText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
  },
  masteryContainer: {
    position: 'absolute',
    bottom: spacing[8],
    left: spacing[3],
    right: spacing[3],
    alignItems: 'center',
  },
  masteryBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.grayLight,
    borderRadius: 3,
    marginBottom: spacing[1],
  },
  masteryFill: {
    height: '100%',
    borderRadius: 3,
  },
  masteryText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  lastReviewedContainer: {
    position: 'absolute',
    bottom: spacing[3],
    left: spacing[3],
    right: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastReviewedText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing[1],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: spacing[6],
    paddingHorizontal: spacing[8],
  },
  actionButton: {
    alignItems: 'center',
    padding: spacing[3],
    borderRadius: spacing.borderRadius.full,
  },
  hardButton: {
    backgroundColor: `${colors.error}15`, // 15% opacity
  },
  easyButton: {
    backgroundColor: `${colors.success}15`,
  },
  actionText: {
    marginTop: spacing[1],
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  hardText: {
    color: colors.error,
  },
  easyText: {
    color: colors.success,
  },
  flipActionButton: {
    padding: spacing[3],
  },
});

export default Flashcard;