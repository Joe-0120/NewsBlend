// app/(tabs)/explore.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Reuse News Card Component (or import if defined separately) ---
const NewsCard = ({ item, horizontal = false }) => (
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

const SmallNewsCard = ({ item }) => (
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


// --- Placeholder Data ---
const breakingNewsData = [
  { id: 'b1', title: "Here's a breakdown of the newly announced tariffs by country", source: 'CNN', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') }, // Replace placeholders
];

const moreNewsData = [
    { id: 'm1', title: "Could Trump's tariffs spell the end of Canadian-made NHL jerseys?", source: 'CBC', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') }, // Replace placeholders
    { id: 'm2', title: "Trump administration lists Quebec language law Bill 96 as trade barrier", source: 'CBC', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') }, // Replace placeholders
     { id: 'm3', title: "Another news item for the list", source: 'Reuters', category: 'Business', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') }, // Replace placeholders
];


const categories = ['Politics', 'Climate', 'Environment', 'Business', 'Tech', 'World'];

// --- Explore Screen Component ---
export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/black-loop.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
         <View style={styles.categoryContainer}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                {categories.map((category) => (
                <TouchableOpacity key={category} style={styles.categoryChip}>
                    <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
         </View>


        {/* Breaking News Section */}
        <Text style={styles.sectionTitle}>Breaking News</Text>
        {breakingNewsData.map(item => <NewsCard key={item.id} item={item} />)}


        {/* More News Section (using smaller cards) */}
        {moreNewsData.map(item => <SmallNewsCard key={item.id} item={item} />)}


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
  categoryText: {
    fontFamily: 'AppRegular',
    fontSize: 13,
    color: '#555',
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
      // Add border bottom if needed
      // borderBottomWidth: 1,
      // borderBottomColor: '#EEEEEE',
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