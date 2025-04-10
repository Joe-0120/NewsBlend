// app/(tabs)/home.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { format } from 'date-fns';

// Import the model and service
import { Article } from '../../models/Article';
import { getFeaturedArticles, getPersonalizedArticles, searchArticles } from '../../services/ArticleService';

// --- Reusable News Card Component ---
const NewsCard = ({ item, horizontal = false }: { item: Article, horizontal?: boolean }) => (
  <TouchableOpacity 
    style={[styles.card, horizontal ? styles.cardHorizontal : styles.cardVertical]}
    onPress={() => router.push(`../components/article/${item.id}`)}
    activeOpacity={0.8}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
    <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
    <View style={styles.cardFooter}>
      <Image source={{ uri: item.sourceLogo }} style={styles.sourceLogo} />
      <Text style={styles.cardCategory}>{item.category}</Text>
    </View>
  </TouchableOpacity>
);

const categories = ['Politics', 'Climate', 'Environment', 'Business', 'Tech', 'World'];

// --- Home Screen Component ---
export default function HomeScreen() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [personalizedArticles, setPersonalizedArticles] = useState<Article[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryArticles, setCategoryArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Navigate to search
  const handleSearchPress = () => {
    router.push({
      pathname: '/(tabs)/explore',
      params: { searchMode: 'true' }
    });
  };

  // Handle category press
  const handleCategoryPress = async (category: string) => {
    // Toggle the category if it's already selected
    if (selectedCategory === category) {
      setSelectedCategory(null);
      return;
    }

    setSelectedCategory(category);
    setIsLoading(true);

    try {
      // Fetch articles for the selected category
      const results = await searchArticles({ category });
      setCategoryArticles(results);
    } catch (error) {
      console.error('Error filtering articles by category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set current date and greeting
    const now = new Date();
    setCurrentDate(format(now, 'EEE MMM d, yyyy'));
    
    const hour = now.getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
    
    // Fetch articles
    const loadArticles = async () => {
      try {
        const featured = await getFeaturedArticles();
        setFeaturedArticles(featured);
        
        const personalized = await getPersonalizedArticles();
        setPersonalizedArticles(personalized);
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    };
    
    loadArticles();
  }, []);

  // Render regular sections (Featured and For You)
  const renderRegularSections = () => (
    <>
      {/* Featured Section */}
      <Text style={styles.sectionTitle}>Featured</Text>
      <FlatList
          data={featuredArticles}
          renderItem={({item}) => <NewsCard item={item} horizontal={true} />}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
      />

      {/* For You Section */}
      <Text style={styles.sectionTitle}>For you</Text>
      <FlatList
          data={personalizedArticles}
          renderItem={({item}) => <NewsCard item={item} horizontal={true} />}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
      />
    </>
  );

  // Render category-filtered content
  const renderCategoryContent = () => (
    <>
      <Text style={styles.sectionTitle}>{selectedCategory} News</Text>
      {categoryArticles.length === 0 ? (
        <Text style={styles.noResultsText}>No articles found in {selectedCategory}</Text>
      ) : (
        <FlatList
          data={categoryArticles}
          renderItem={({item}) => <NewsCard item={item} horizontal={true} />}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} Jane!</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>
          <Image source={require('../../assets/logo.png')} style={styles.headerLogo} />
        </View>

        {/* News Categories */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity 
            style={styles.searchIconContainer}
            onPress={handleSearchPress}
          >
             <Image source={require('../../assets/black-loop.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category} 
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip
                ]}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
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

        {/* Content: Either regular sections or category-filtered content */}
        {!isLoading && (selectedCategory ? renderCategoryContent() : renderRegularSections())}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for the main content area
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
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'AppBold',
    fontSize: 18,
    color: '#000',
  },
  date: {
    fontFamily: 'AppRegular',
    fontSize: 14,
    color: '#808080', // Grey
  },
  headerLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIconContainer: {
      padding: 8,
      marginRight: 5,
      borderRadius: 15,
  },
  searchIcon: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
      tintColor: '#808080',
  },
  categoryScroll: {
      paddingVertical: 5,
  },
  categoryChip: {
    backgroundColor: '#F3F9F9', // Light greyish background
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: '#0a7ea4', // Highlight selected category
  },
  categoryText: {
    fontFamily: 'AppRegular',
    fontSize: 13,
    color: '#555', // Darker grey text
  },
  selectedCategoryText: {
    color: '#FFFFFF', // White text for selected category
  },
  sectionTitle: {
    fontFamily: 'AppBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-between", // Distribute space between cards in a row
  },
  card: {
    backgroundColor: '#FFFFFF', // Cards seem to be on the main background
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden', // Clip image corners if needed
  },
  cardHorizontal: {
     width: '48%', // Roughly half width minus some margin/padding
  },
  cardVertical: { // Style for cards that take full width (like in Explore)
     width: '100%',
  },
  cardImage: {
    width: '100%',
    height: 100, // Adjust height as needed
    backgroundColor: '#E0E0E0', // Placeholder background
  },
  cardTitle: {
    fontFamily: 'AppBold',
    fontSize: 14, // Slightly smaller than section titles
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
    marginTop: 5,
  },
  sourceLogo: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      marginRight: 4,
  },
  cardSource: {
    fontFamily: 'AppRegular',
    fontSize: 11,
    color: '#808080',
    fontWeight: 'bold', // As per screenshot (CNN is bold)
    marginRight: 5,
  },
  cardCategory: {
    fontFamily: 'AppRegular',
    fontSize: 11,
    color: '#808080',
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
    marginTop: 20,
    marginBottom: 20,
  }
});