import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';
import spacing from '../styles/spacing';
import Flashcard from '../components/Flashcard';
import Card from '../components/Card';
import Button from '../components/Button';

const FlashcardsScreen = () => {
  const navigation = useNavigation();
  const [flashcards, setFlashcards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'category', 'difficulty'

  // Enhanced mock data
  useEffect(() => {
    const mockFlashcards = [
      { 
        id: 1, 
        front: 'What is React?', 
        back: 'A JavaScript library for building user interfaces', 
        category: 'Programming',
        difficulty: 'Medium',
        lastReviewed: '2024-01-15',
        mastery: 75,
        createdAt: new Date('2024-01-01')
      },
      { 
        id: 2, 
        front: 'Capital of France?', 
        back: 'Paris', 
        category: 'Geography',
        difficulty: 'Easy',
        lastReviewed: '2024-01-14',
        mastery: 90,
        createdAt: new Date('2024-01-02')
      },
      { 
        id: 3, 
        front: 'What is the Pythagorean theorem?', 
        back: 'a² + b² = c²', 
        category: 'Mathematics',
        difficulty: 'Hard',
        lastReviewed: '2024-01-13',
        mastery: 60,
        createdAt: new Date('2024-01-03')
      },
      { 
        id: 4, 
        front: 'Who wrote Romeo and Juliet?', 
        back: 'William Shakespeare', 
        category: 'Literature',
        difficulty: 'Easy',
        lastReviewed: '2024-01-12',
        mastery: 85,
        createdAt: new Date('2024-01-04')
      },
      { 
        id: 5, 
        front: 'What is photosynthesis?', 
        back: 'Process by which plants convert light energy into chemical energy', 
        category: 'Biology',
        difficulty: 'Medium',
        lastReviewed: '2024-01-11',
        mastery: 70,
        createdAt: new Date('2024-01-05')
      },
    ];
    setFlashcards(mockFlashcards);
  }, []);

  const categories = ['All', 'Programming', 'Geography', 'Mathematics', 'Literature', 'Biology'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const filteredFlashcards = flashcards.filter(card => {
    const matchesSearch = card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.back.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'category':
        return a.category.localeCompare(b.category);
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'date':
      default:
        return b.createdAt - a.createdAt;
    }
  });

  const handleAddFlashcard = () => {
    Alert.alert(
      'Add New Flashcard',
      'Choose how to add your flashcard:',
      [
        { text: 'Manual Entry', onPress: () => console.log('Manual entry') },
        { text: 'Import from File', onPress: () => console.log('Import file') },
        { text: 'Use Template', onPress: () => console.log('Use template') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleStudyMode = () => {
    Alert.alert(
      'Study Mode',
      'Choose your study method:',
      [
        { text: 'Spaced Repetition', onPress: () => console.log('Spaced repetition') },
        { text: 'Random Review', onPress: () => console.log('Random review') },
        { text: 'Category Focus', onPress: () => console.log('Category focus') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleBulkActions = () => {
    Alert.alert(
      'Bulk Actions',
      'Choose an action:',
      [
        { text: 'Export Cards', onPress: () => console.log('Export') },
        { text: 'Share Collection', onPress: () => console.log('Share') },
        { text: 'Backup to Cloud', onPress: () => console.log('Backup') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderFlashcard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Flashcard
        frontText={item.front}
        backText={item.back}
        category={item.category}
        difficulty={item.difficulty}
        mastery={item.mastery}
        lastReviewed={item.lastReviewed}
        showActions={true}
      />
    </View>
  );

  const renderCategoryChip = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item && styles.categoryChipActive
      ]}
      onPress={() => setSelectedCategory(item)}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item && styles.categoryChipTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderDifficultyBar = () => (
    <View style={styles.difficultyStats}>
      <Text style={styles.difficultyTitle}>Difficulty Distribution</Text>
      <View style={styles.difficultyBars}>
        {difficulties.map((difficulty) => {
          const count = flashcards.filter(card => card.difficulty === difficulty).length;
          const percentage = flashcards.length > 0 ? (count / flashcards.length) * 100 : 0;
          return (
            <View key={difficulty} style={styles.difficultyItem}>
              <View style={styles.difficultyHeader}>
                <Text style={styles.difficultyLabel}>{difficulty}</Text>
                <Text style={styles.difficultyCount}>{count}</Text>
              </View>
              <View style={styles.difficultyBarContainer}>
                <View style={[styles.difficultyBar, { width: `${percentage}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Flashcards</Text>
          <Text style={styles.subtitle}>{filteredFlashcards.length} cards</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleStudyMode}>
            <Icon name="school" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleBulkActions}>
            <Icon name="dots-vertical" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddFlashcard}>
            <Icon name="plus" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search flashcards..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={colors.gray} />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryChip}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card title="Progress Overview" icon="chart-bar" style={styles.statCard}>
            <View style={styles.progressGrid}>
              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>{flashcards.length}</Text>
                <Text style={styles.progressLabel}>Total Cards</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>78%</Text>
                <Text style={styles.progressLabel}>Avg Mastery</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>12</Text>
                <Text style={styles.progressLabel}>Due Today</Text>
              </View>
            </View>
          </Card>

          {renderDifficultyBar()}
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewModeContainer}>
          <Text style={styles.sectionTitle}>My Cards</Text>
          <View style={styles.viewModeToggle}>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('grid')}
              activeOpacity={0.8}
            >
              <Icon name="view-grid" size={20} color={viewMode === 'grid' ? colors.white : colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
              onPress={() => setViewMode('list')}
              activeOpacity={0.8}
            >
              <Icon name="view-list" size={20} color={viewMode === 'list' ? colors.white : colors.gray} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Flashcards List */}
        {filteredFlashcards.length > 0 ? (
          <View style={styles.cardsContainer}>
            {filteredFlashcards.map((card) => (
              <View key={card.id} style={styles.cardWrapper}>
                {renderFlashcard({ item: card })}
              </View>
            ))}
          </View>
        ) : (
          <Card title="No Cards Found" icon="cards" style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              {searchQuery || selectedCategory !== 'All' 
                ? 'No cards match your current filters. Try adjusting your search or category selection.'
                : 'No flashcards yet. Create your first card to get started!'
              }
            </Text>
            <Button
              title="Create First Card"
              onPress={handleAddFlashcard}
              variant="primary"
              size="medium"
              style={styles.emptyButton}
            />
          </Card>
        )}
      </ScrollView>
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
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 2,
  },
  headerLeft: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 14,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginRight: spacing.sm,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    ...typography.body,
    color: colors.text.primary,
  },
  categoriesContainer: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  categoryChip: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 14,
  },
  categoryChipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  statsContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  statCard: {
    marginBottom: spacing.md,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressValue: {
    ...typography.h3,
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  progressLabel: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  difficultyStats: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  difficultyTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  difficultyBars: {
    gap: spacing.sm,
  },
  difficultyItem: {
    marginBottom: spacing.xs,
  },
  difficultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  difficultyLabel: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 14,
  },
  difficultyCount: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  difficultyBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  difficultyBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.xs,
  },
  viewModeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  viewModeButtonActive: {
    backgroundColor: colors.primary,
  },
  cardsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
  cardContainer: {
    marginBottom: 0,
  },
  emptyCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyButton: {
    alignSelf: 'center',
  },
  listContainer: {
    padding: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xl * 2,
  },
});

export default FlashcardsScreen;