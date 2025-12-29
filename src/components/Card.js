import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const Card = ({
  children,
  title,
  subtitle,
  icon,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  footer,
  footerStyle,
  ...props
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, onPress && styles.pressableCard, style]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      {(title || subtitle || icon) && (
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {icon && (
              <Icon
                name={icon}
                size={24}
                color={colors.primary}
                style={styles.icon}
              />
            )}
            <View style={styles.titleWrapper}>
              {title && (
                <Text style={[styles.title, titleStyle]}>{title}</Text>
              )}
              {subtitle && (
                <Text style={[styles.subtitle, subtitleStyle]}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          
          {onPress && (
            <Icon
              name="chevron-right"
              size={24}
              color={colors.gray}
            />
          )}
        </View>
      )}
      
      <View style={styles.content}>
        {children}
      </View>
      
      {footer && (
        <View style={[styles.footer, footerStyle]}>
          {footer}
        </View>
      )}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing[4],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: spacing[2],
  },
  pressableCard: {
    // Additional styles for pressable cards
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: spacing[3],
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing[0.5],
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  content: {
    // Content styles
  },
  footer: {
    marginTop: spacing[3],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default Card;