// app/(tabs)/saved.tsx
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // To handle back navigation potentially

// --- Reuse SmallNewsCard Component (or import) ---
// Copied here for simplicity, ideally import from a shared components folder
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
const savedArticlesData = [
  { id: 'b1', title: "Here's a breakdown of the newly announced tariffs by country", source: 'CNN', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
  { id: 'm1', title: "Could Trump's tariffs spell the end of Canadian-made NHL jerseys?", source: 'CBC', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
  { id: 'm2', title: "Trump administration lists Quebec language law Bill 96 as trade barrier", source: 'CBC', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
  { id: '1', title: 'Judge orders Trump administration to keep Signal records amid Yemen attack chat controversy', source: 'CNN', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
  { id: '2', title: 'US allies worldwide decry Trump\'s car tariffs and threaten retaliation', source: 'The Guardian', category: 'Politics', imageUrl: require('../../assets/logo.png'), sourceLogo: require('../../assets/logo.png') },
];


// --- Saved Screen Component ---
export default function SavedScreen() {
    const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : null}>
             <Image source={require('../../assets/black-left-arrow.png')} style={styles.backIcon} />
         </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved articles</Text>
          <View style={{ width: 24 }} /> {/* Spacer to balance title */}
        </View>

      {/* List of Saved Articles */}
      <FlatList
        data={savedArticlesData}
        renderItem={({ item }) => <SmallNewsCard item={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Use space-between for alignment
    paddingHorizontal: 15,
    paddingTop: 10, // Adjust as needed
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE', // Light border
    backgroundColor: '#FFFFFF', // Header background
  },
  backIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: '#000', // Black arrow
  },
  headerTitle: {
    fontFamily: 'AppBold',
    fontSize: 18,
    color: '#000',
    textAlign: 'center', // Center title
  },
  list: {
    flex: 1,
  },
  listContent: {
      paddingHorizontal: 15,
      paddingTop: 15, // Add padding at the top of the list
  },
  // Reusing SmallNewsCard styles from Explore
   smallCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#FFFFFF',
      marginBottom: 20, // Increased margin between saved items
   },
    smallCardTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    smallCardTitle: {
        fontFamily: 'AppBold',
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 0,
    },
    sourceLogo: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginRight: 4,
    },
    cardSource: {
      fontFamily: 'AppRegular',
      fontSize: 12,
      color: '#808080',
      fontWeight: 'bold',
      marginRight: 5,
    },
    cardCategory: {
      fontFamily: 'AppRegular',
      fontSize: 12,
      color: '#808080',
    },
    smallCardImage: {
        width: 90,
        height: 70,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
    },
});