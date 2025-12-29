import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const EmptyState = ({
  icon,
  title,
  message,
  actionText,
  onAction,
  image,
  style,
  titleStyle,
  messageStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {image ? (
        <Image source={image} style={styles.image} resizeMode="contain" />
      ) : icon ? (
        <Icon name={icon} size={80} color={colors.gray} style={styles.icon} />
      ) : null}
      
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      
      {message && (
        <Text style={[styles.message, messageStyle]}>{message}</Text>
      )}
      
      {actionText && onAction && (
        <TouchableOpacity
          onPress={onAction}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: spacing[6],
  },
  icon: {
    marginBottom: spacing[4],
    opacity: 0.5,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  message: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
    marginBottom: spacing[6],
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: spacing.borderRadius.lg,
    marginTop: spacing[4],
  },
  actionText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
});

export default EmptyState;