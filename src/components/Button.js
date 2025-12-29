import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.gray : colors.primary,
          borderColor: disabled ? colors.gray : colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.gray : colors.primary,
          borderWidth: 1,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.gray : colors.border,
          borderWidth: 1,
        };
      case 'danger':
        return {
          backgroundColor: disabled ? colors.gray : colors.error,
          borderColor: disabled ? colors.gray : colors.error,
        };
      case 'success':
        return {
          backgroundColor: disabled ? colors.gray : colors.success,
          borderColor: disabled ? colors.gray : colors.success,
        };
      default:
        return {
          backgroundColor: disabled ? colors.gray : colors.primary,
          borderColor: disabled ? colors.gray : colors.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing[2],
          paddingHorizontal: spacing[3],
          borderRadius: spacing.borderRadius.md,
        };
      case 'large':
        return {
          paddingVertical: spacing[4],
          paddingHorizontal: spacing[8],
          borderRadius: spacing.borderRadius.xl,
        };
      default:
        return {
          paddingVertical: spacing[3],
          paddingHorizontal: spacing[6],
          borderRadius: spacing.borderRadius.lg,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.grayDark;
    if (variant === 'secondary' || variant === 'outline') return colors.primary;
    return colors.white;
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return typography.sizes.sm;
      case 'large':
        return typography.sizes.lg;
      default:
        return typography.sizes.base;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={styles.loader}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: getTextSize(),
                marginLeft: icon ? spacing[2] : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: typography.weights.semibold,
  },
  loader: {
    marginRight: spacing[2],
  },
});

export default Button;