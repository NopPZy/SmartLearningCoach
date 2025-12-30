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

const SignupScreen = ({ navigation }) => {
  const { signup, isLoading } = useAuthContext();
  const { themeColors } = useThemeContext();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validationRules = {
    name: [
      validators.required,
      (value) => validators.minLength(value, 2),
    ],
    email: [
      validators.required,
      validators.email,
    ],
    password: [
      validators.required,
      validators.password,
    ],
    confirmPassword: [
      validators.required,
      (value) => validators.confirmPassword(formData.password, value),
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

    // Check terms agreement
    if (!agreedToTerms) {
      setErrors(prev => ({ ...prev, terms: 'You must agree to the terms and conditions' }));
      return;
    }

    // Validate form
    const { errors: validationErrors, isValid } = validateForm(formData, validationRules);
    setErrors(validationErrors);

    if (!isValid) return;

    // Call signup API
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const result = await signup(userData);
    
    if (!result.success) {
      // Show error message
      setErrors(prev => ({ ...prev, form: result.error }));
    } else {
      console.log('Signup successful!');
      // Navigation will be handled automatically by the navigator switching
    }
  };

  const navigateToLogin = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  if (isLoading) {
    return <Loader fullScreen text="Creating account..." />;
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Start your smart learning journey today
          </Text>
        </View>

        <View style={styles.form}>
          {errors.form && (
            <View style={styles.formError}>
              <Text style={styles.formErrorText}>{errors.form}</Text>
            </View>
          )}

          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            onBlur={() => handleBlur('name')}
            placeholder="Enter your full name"
            icon="account"
            error={errors.name}
            touched={touched.name}
            autoCapitalize="words"
          />

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
            placeholder="Create a password"
            secureTextEntry
            icon="lock"
            error={errors.password}
            touched={touched.password}
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            onBlur={() => handleBlur('confirmPassword')}
            placeholder="Confirm your password"
            secureTextEntry
            icon="lock-check"
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxBoxChecked]}>
                {agreedToTerms && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            
            {errors.terms && (
              <Text style={styles.termsError}>{errors.terms}</Text>
            )}
          </View>

          <Button
            title="Create Account"
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.submitButton}
            disabled={!agreedToTerms}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
  termsContainer: {
    marginBottom: spacing[6],
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.sm,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.normal * typography.sizes.sm,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  termsError: {
    color: colors.error,
    fontSize: typography.sizes.sm,
    marginTop: spacing[1],
    marginLeft: spacing[5],
  },
  submitButton: {
    marginBottom: spacing[4],
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  loginText: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
};

export default SignupScreen;