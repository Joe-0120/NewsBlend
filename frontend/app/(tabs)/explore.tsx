// app/(tabs)/explore.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

// Import the model and service
import { Article, ArticleSearchParams } from '../../models/Article';
import { getBreakingNewsArticles, getMoreNewsArticles, searchArticles } from '../../services/ArticleService';

// --- Reuse News Card Component (or import if defined separately) ---
const NewsCard = ({ item, horizontal = false }: { item: Article, horizontal?: boolean }) => (
  <View style={[styles.card, horizontal ? styles.cardHorizontal : styles.cardVertical]}>
    <Image source={item.imageUrl} style={styles.cardImageLarge} />
    <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
    <View style={styles.cardFooter}>
      <Image source={item.sourceLogo} style={styles.sourceLogo} />
      <Text style={styles.cardSource}>{item.source}</Text>
      <Text style={styles.cardCategory}>{item.category}</Text>
    </View>
  </View>
);

const SmallNewsCard = ({ item }: { item: Article }) => (
  <View style={styles.smallCard}>
    <View style={styles.smallCardTextContainer}>
      <Text style={styles.smallCardTitle} numberOfLines={3}>{item.title}</Text>
      <View style={styles.cardFooter}>
        <Image source={item.sourceLogo} style={styles.sourceLogo} />
        <Text style={styles.cardSource}>{item.source}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
      </View>
    </View>
    <Image source={item.imageUrl} style={styles.smallCardImage} />
  </View>
);

const categories = ['Politics', 'Climate', 'Environment', 'Business', 'Tech', 'World'];

// --- Explore Screen Component ---
export default function ExploreScreen() {
  // Get search params if coming from search navigation
  const params = useLocalSearchParams<{ searchMode?: string, category?: string }>();
  const [isSearchMode, setIsSearchMode] = useState(params.searchMode === 'true');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    params.category ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  // State for articles
  const [allBreakingNews, setAllBreakingNews] = useState<Article[]>([]);
  const [allMoreNews, setAllMoreNews] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  // Fetch initial articles
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const breakingNewsData = await getBreakingNewsArticles();
        setAllBreakingNews(breakingNewsData);
        
        const moreNewsData = await getMoreNewsArticles();
        setAllMoreNews(moreNewsData);
        
        // Combine all articles
        const combinedArticles = [...breakingNewsData, ...moreNewsData];
        setAllArticles(combinedArticles);
        setFilteredArticles(combinedArticles);
        
        // If we have an initial category from params, filter the articles
        if (selectedCategory) {
          filterArticlesByCategory(selectedCategory, combinedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  // Filter articles by category
  const filterArticlesByCategory = (
    category: string | null,
    articles: Article[] = allArticles
  ) => {
    if (!category) {
      // Reset to all articles if no category is selected
      setFilteredArticles(articles);
      return;
    }
    
    // Filter articles by the selected category
    const filtered = articles.filter(article => article.category === category);
    setFilteredArticles(filtered);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    // Toggle category selection
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    
    if (isSearchMode) {
      // In search mode, update search results with the category filter
      performSearch(searchQuery, newCategory);
    } else {
      // In regular mode, filter the articles
      filterArticlesByCategory(newCategory);
    }
  };

  // Handle search
  const performSearch = async (query: string, category: string | null = selectedCategory) => {
    setIsLoading(true);
    try {
      const searchParams: ArticleSearchParams = {
        query: query.trim(),
      };

      if (category) {
        searchParams.category = category;
      }

      const results = await searchArticles(searchParams);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle search mode
  const toggleSearchMode = () => {
    // When toggling search mode, maintain the selected category
    if (!isSearchMode) {
      // Entering search mode, perform empty search with current category filter
      performSearch('', selectedCategory);
    }
    
    setIsSearchMode(!isSearchMode);
  };

  // Handle search input submission
  const handleSearchSubmit = () => {
    performSearch(searchQuery);
  };

  // Render sections for normal mode
  const renderNormalSections = () => {
    if (selectedCategory) {
      // When a category is selected, show all articles in that category together
      return (
        <>
          <Text style={styles.sectionTitle}>
            {filteredArticles.length > 0 ? `${selectedCategory} News` : `No articles found in ${selectedCategory}`}
          </Text>
          {filteredArticles.length > 0 ? (
            filteredArticles.map(item => <SmallNewsCard key={item.id} item={item} />)
          ) : !isLoading && (
            <Text style={styles.noResultsText}>No articles found in {selectedCategory}</Text>
          )}
        </>
      );
    } else {
      // When no category is selected, show the original sections
      return (
        <>
          {/* Breaking News Section */}
          {allBreakingNews.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Breaking News</Text>
              {allBreakingNews.map(item => <NewsCard key={item.id} item={item} />)}
            </>
          )}

          {/* More News Section (using smaller cards) */}
          {allMoreNews.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>More News</Text>
              {allMoreNews.map(item => <SmallNewsCard key={item.id} item={item} />)}
            </>
          )}
        </>
      );
    }
  };

  // Render sections for search mode
  const renderSearchSections = () => (
    <>
      <Text style={styles.sectionTitle}>
        {searchQuery ? `Results for "${searchQuery}"` : 'All Articles'}
        {selectedCategory ? ` in ${selectedCategory}` : ''}
      </Text>
      {searchResults.length === 0 && !isLoading ? (
        <Text style={styles.noResultsText}>No articles found</Text>
      ) : (
        searchResults.map(item => <SmallNewsCard key={item.id} item={item} />)
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header with conditional search bar */}
        {isSearchMode ? (
          <View style={styles.searchHeader}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for news..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearchSubmit}
                autoFocus
              />
              <TouchableOpacity onPress={handleSearchSubmit}>
                <Image
                  source={require('../../assets/black-loop.png')}
                  style={styles.searchInputIcon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleSearchMode} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Explore</Text>
            <TouchableOpacity onPress={toggleSearchMode}>
              <Image source={require('../../assets/black-loop.png')} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        )}

        {/* Categories */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0a7ea4" />
          </View>
        )}

        {/* Conditional Content */}
        {isSearchMode ? renderSearchSections() : renderNormalSections()}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles (reuse and add specific ones) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: 'AppBold',
    fontSize: 24,
    color: '#000',
  },
  searchIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#808080',
  },
  // Search Header Styles
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F9F9',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'AppRegular',
    fontSize: 16,
    color: '#000',
  },
  searchInputIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#808080',
  },
  cancelButton: {
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  cancelButtonText: {
    fontFamily: 'AppRegular',
    fontSize: 16,
    color: '#000',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: 'AppRegular',
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 40,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryScroll: {
    paddingVertical: 5,
  },
  categoryChip: {
    backgroundColor: '#F3F9F9',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: '#0a7ea4', // Use your app's accent color
  },
  categoryText: {
    fontFamily: 'AppRegular',
    fontSize: 13,
    color: '#555',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'AppBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  card: { // Style for the large breaking news card
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20, // More margin after the big card
    overflow: 'hidden',
  },
  cardVertical: {
    width: '100%',
  },
  cardHorizontal: {
    width: '48%', // For side-by-side layout if needed
  },
  cardImageLarge: { // Larger image for breaking news
    width: '100%',
    height: 180, // Adjust height
    backgroundColor: '#E0E0E0',
  },
  cardTitle: {
    fontFamily: 'AppBold',
    fontSize: 16, // Title size from PDF
    color: '#000',
    paddingHorizontal: 8,
    paddingTop: 10, // Add padding top
    paddingBottom: 5, // Adjust padding
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
    marginTop: 0, // Adjust margin
  },
  sourceLogo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 4,
  },
  cardSource: {
    fontFamily: 'AppRegular',
    fontSize: 12, // Regular size from PDF
    color: '#808080',
    fontWeight: 'bold',
    marginRight: 5,
  },
  cardCategory: {
    fontFamily: 'AppRegular',
    fontSize: 12, // Regular size from PDF
    color: '#808080',
  },
  // Styles for smaller news cards
  smallCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the top
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    paddingVertical: 5, // Add some vertical padding if needed
  },
  smallCardTextContainer: {
    flex: 1, // Take available space
    marginRight: 10,
  },
  smallCardTitle: {
    fontFamily: 'AppBold',
    fontSize: 14, // Slightly smaller title
    color: '#000',
    marginBottom: 8, // Space between title and footer
  },
  smallCardImage: {
    width: 90, // Fixed width for small image
    height: 70, // Fixed height
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
});