import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const Loader = ({
  size = 'large',
  color = colors.primary,
  text,
  fullScreen = false,
  style,
  textStyle,
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size={size} color={color} />
        {text && (
          <Text style={[styles.fullScreenText, textStyle]}>{text}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  fullScreenText: {
    marginTop: spacing[4],
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  text: {
    marginTop: spacing[3],
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default Loader;