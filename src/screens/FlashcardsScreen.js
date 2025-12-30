import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';
import Flashcard from '../components/Flashcard';

const FlashcardsScreen = () => {
  const navigation = useNavigation();
  const [flashcards, setFlashcards] = useState([]);

  // Mock data for now - replace with API call
  useEffect(() => {
    // Simulate fetching flashcards
    setFlashcards([
      { id: 1, front: 'What is React?', back: 'A JavaScript library', category: 'Programming' },
      { id: 2, front: 'Capital of France?', back: 'Paris', category: 'Geography' },
    ]);
  }, []);

  const handleAddFlashcard = () => {
    // For now, show alert - later navigate to create screen
    Alert.alert('Add Flashcard', 'Feature coming soon! For now, use mock data.');
  };

  const renderFlashcard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Flashcard
        frontText={item.front}
        backText={item.back}
        category={item.category}
        showActions={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flashcards</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddFlashcard}>
          <Icon name="plus" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={flashcards}
        renderItem={renderFlashcard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No flashcards yet. Tap + to add one!</Text>
          </View>
        }
      />
    </SafeAreaView>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: spacing.lg,
  },
  cardContainer: {
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default FlashcardsScreen;