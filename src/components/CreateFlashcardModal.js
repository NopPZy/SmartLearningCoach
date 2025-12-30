import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from './Input';
import Button from './Button';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';

const CreateFlashcardModal = ({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categories = ['Programming', 'Geography', 'Mathematics', 'Literature', 'Biology', 'Science', 'History', 'Other'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!frontText.trim()) {
      newErrors.frontText = 'Question is required';
    }
    if (!backText.trim()) {
      newErrors.backText = 'Answer is required';
    }
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSubmit({
      frontText: frontText.trim(),
      backText: backText.trim(),
      category: category.trim(),
      difficulty,
    });

    // Reset form
    setFrontText('');
    setBackText('');
    setCategory('');
    setDifficulty('Medium');
    setErrors({});
    setTouched({});
  };

  const handleClose = () => {
    // Reset form
    setFrontText('');
    setBackText('');
    setCategory('');
    setDifficulty('Medium');
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Icon name="close" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Flashcard</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Form */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Front Text (Question) */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Question</Text>
            <Input
              label="Front Side"
              value={frontText}
              onChangeText={setFrontText}
              placeholder="Enter the question or prompt..."
              multiline
              numberOfLines={4}
              onFocus={() => setTouched({ ...touched, frontText: true })}
              error={errors.frontText}
              touched={touched.frontText}
              style={styles.input}
            />
          </View>

          {/* Back Text (Answer) */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Answer</Text>
            <Input
              label="Back Side"
              value={backText}
              onChangeText={setBackText}
              placeholder="Enter the answer..."
              multiline
              numberOfLines={4}
              onFocus={() => setTouched({ ...touched, backText: true })}
              error={errors.backText}
              touched={touched.backText}
              style={styles.input}
            />
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.categoryButtonActive,
                  ]}
                  onPress={() => {
                    setCategory(cat);
                    setTouched({ ...touched, category: true });
                  }}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      category === cat && styles.categoryButtonTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.category && touched.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}
          </View>

          {/* Difficulty */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Difficulty</Text>
            <View style={styles.difficultyButtons}>
              {difficulties.map((diff) => (
                <TouchableOpacity
                  key={diff}
                  style={[
                    styles.difficultyButton,
                    difficulty === diff && styles.difficultyButtonActive,
                  ]}
                  onPress={() => setDifficulty(diff)}
                >
                  <Text
                    style={[
                      styles.difficultyButtonText,
                      difficulty === diff && styles.difficultyButtonTextActive,
                    ]}
                  >
                    {diff}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Icon name="lightbulb" size={20} color={colors.warning} />
            <Text style={styles.infoText}>
              Make your questions clear and concise. Add one concept per flashcard for better learning.
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <Button
            title="Cancel"
            onPress={handleClose}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title="Create Card"
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.createButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 2,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  input: {
    minHeight: 100,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  categoryButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  categoryButtonTextActive: {
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  difficultyButtonText: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  difficultyButtonTextActive: {
    color: colors.white,
  },
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    marginTop: spacing[1],
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.warning + '15',
    borderRadius: spacing.borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  infoText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing[2],
  },
  footer: {
    flexDirection: 'row',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelButton: {
    flex: 1,
  },
  createButton: {
    flex: 1,
  },
});

export default CreateFlashcardModal;
