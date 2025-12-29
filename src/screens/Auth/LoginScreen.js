import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import { validateForm, validators } from '../../utils/validators';
import { ROUTES } from '../../utils/constants';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import globalStyles from '../../styles/global';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import spacing from '../../styles/spacing';

const LoginScreen = ({ navigation }) => {
  const { login, isLoading } = useAuthContext();
  const { themeColors } = useThemeContext();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validationRules = {
    email: [
      validators.required,
      validators.email,
    ],
    password: [
      validators.required,
      validators.password,
    ],
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    const fieldRules = validationRules[field];
    if (fieldRules) {
      const error = fieldRules.reduce((err, rule) => {
        return err || rule(formData[field], formData);
      }, null);
      
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate form
    const { errors: validationErrors, isValid } = validateForm(formData, validationRules);
    setErrors(validationErrors);

    if (!isValid) return;

    // Call login API
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      // Show error message
      setErrors(prev => ({ ...prev, form: result.error }));
    }
  };

  const navigateToSignup = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.FORGOT_PASSWORD);
  };

  if (isLoading) {
    return <Loader fullScreen text="Logging in..." />;
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your learning journey
          </Text>
        </View>

        <View style={styles.form}>
          {errors.form && (
            <View style={styles.formError}>
              <Text style={styles.formErrorText}>{errors.form}</Text>
            </View>
          )}

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            onBlur={() => handleBlur('email')}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="email"
            error={errors.email}
            touched={touched.email}
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            onBlur={() => handleBlur('password')}
            placeholder="Enter your password"
            secureTextEntry
            icon="lock"
            error={errors.password}
            touched={touched.password}
          />

          <TouchableOpacity
            onPress={navigateToForgotPassword}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.submitButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Create New Account"
            onPress={navigateToSignup}
            variant="outline"
            style={styles.signupButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
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
  },
  form: {
    width: '100%',
  },
  formError: {
    backgroundColor: `${colors.error}15`,
    padding: spacing[3],
    borderRadius: spacing.borderRadius.md,
    marginBottom: spacing[4],
  },
  formErrorText: {
    color: colors.error,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[6],
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  submitButton: {
    marginBottom: spacing[4],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    paddingHorizontal: spacing[3],
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  signupButton: {
    marginBottom: spacing[6],
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing[6],
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal * typography.sizes.sm,
  },
  link: {
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
};

export default LoginScreen;