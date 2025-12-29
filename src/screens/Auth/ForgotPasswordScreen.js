import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';
import { validateForm, validators } from '../../utils/validators';
import { authApi } from '../../api/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import globalStyles from '../../styles/global';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import spacing from '../../styles/spacing';

const ForgotPasswordScreen = ({ navigation }) => {
  const { themeColors } = useThemeContext();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setTouched(true);
    
    // Validate email
    const emailError = validators.email(email) || validators.required(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.forgotPassword(email);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <Loader fullScreen text="Sending reset link..." />;
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={globalStyles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            {isSubmitted
              ? 'Check your email for reset instructions'
              : 'Enter your email to reset your password'}
          </Text>
        </View>

        <View style={styles.form}>
          {isSubmitted ? (
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successTitle}>Reset Link Sent!</Text>
              <Text style={styles.successMessage}>
                We've sent password reset instructions to your email address.
                Please check your inbox and follow the link to reset your password.
              </Text>
              <Button
                title="Back to Sign In"
                onPress={handleBackToLogin}
                style={styles.backButton}
              />
            </View>
          ) : (
            <>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setTouched(true)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="email"
                error={touched ? validators.email(email) || validators.required(email) : null}
                touched={touched}
              />

              <Button
                title="Send Reset Link"
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.submitButton}
              />

              <Button
                title="Back to Sign In"
                onPress={handleBackToLogin}
                variant="outline"
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  header: {
    alignItems: 'center',
    marginBottom: spacing[8],
    marginTop: spacing[4],
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal * typography.sizes.base,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: `${colors.error}15`,
    padding: spacing[3],
    borderRadius: spacing.borderRadius.md,
    marginBottom: spacing[4],
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    padding: spacing[4],
  },
  successIcon: {
    fontSize: 64,
    color: colors.success,
    fontWeight: 'bold',
    marginBottom: spacing[4],
  },
  successTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  successMessage: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
    marginBottom: spacing[6],
  },
  submitButton: {
    marginBottom: spacing[4],
  },
  backButton: {
    marginTop: spacing[4],
  },
};

export default ForgotPasswordScreen;