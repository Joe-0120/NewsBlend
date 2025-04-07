// app/(tabs)/home.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Reusable News Card Component ---
const NewsCard = ({ item, horizontal = false }) => (
  <View style={[styles.card, horizontal ? styles.cardHorizontal : styles.cardVertical]}>
    <Image source={item.imageUrl} style={styles.cardImage} />
    <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
    <View style={styles.cardFooter}>
      <Image source={item.sourceLogo} style={styles.sourceLogo} />
      <Text style={styles.cardSource}>{item.source}</Text>
      <Text style={styles.cardCategory}>{item.category}</Text>
    </View>
  </View>
);

// --- Placeholder Data ---
const featuredData = [
    { id: '1', title: 'Judge orders Trump administration to keep Signal records amid Yemen attack chat controversy', source: 'CNN', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
    { id: '2', title: 'US allies worldwide decry Trump\'s car tariffs and threaten retaliation', source: 'The Guardian', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
];

const forYouData = [
        { id: '3', title: "'Potent' ice storm likely to hit huge swath of Ontario, including Toronto: Environment Canada", source: 'CBC', category: 'Climate', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
        { id: '4', title: "Danielle Smith's fight against tariffs takes her to right-wing PragerU gala", source: 'CBC', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
];

const categories = ['Politics', 'Climate', 'Environment', 'Business', 'Tech', 'World'];

// --- Home Screen Component ---
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning Jane!</Text>
            <Text style={styles.date}>Thu Mar 27, 2025</Text>
          </View>
          <Image source={require('../../assets/logo.png')} style={styles.headerLogo} />
        </View>

        {/* News Categories */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.searchIconContainer}>
             <Image source={require('../../assets/black-loop.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity key={category} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Section */}
        <Text style={styles.sectionTitle}>Featured</Text>
        <FlatList
            data={featuredData}
            renderItem={({item}) => <NewsCard item={item} horizontal={true} />}
            keyExtractor={item => item.id}
            horizontal={false} // Render cards vertically but style them to appear side-by-side (or wrap)
            numColumns={2} // Key for side-by-side layout
            columnWrapperStyle={styles.row} // Style the row containing the columns
            scrollEnabled={false} // Disable FlatList scrolling, rely on ScrollView
        />


        {/* For You Section */}
        <Text style={styles.sectionTitle}>For you</Text>
         <FlatList
            data={forYouData}
            renderItem={({item}) => <NewsCard item={item} horizontal={true} />}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
        />

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
    // Add border radius if needed
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIconContainer: {
      padding: 8,
      marginRight: 5,
      // backgroundColor: '#F0F0F0', // Optional background
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
  categoryText: {
    fontFamily: 'AppRegular',
    fontSize: 13,
    color: '#555', // Darker grey text
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
      width: 16,
      height: 16,
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
  // --- Add placeholder image styles if you don't have real source logos ---
  // placeholderLogo: {
  //   width: 16,
  //   height: 16,
  //   borderRadius: 8,
  //   backgroundColor: '#CCCCCC',
  //   marginRight: 4,
  // }
});

// --- Add placeholder images/logos to your assets/images folder ---
// e.g., assets/images/placeholder.png, assets/images/cnn-logo.png etc.
// Make sure the require paths match your actual file locations.