import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Article = {
  id: string;
  title: string;
  image_url: string;
  date: string;
};

// Define the navigation stack parameters
type RootStackParamList = {
  Article: { id: string };
  Profile: undefined;
};

export default function SavedArticlesScreen() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  
  // Type the navigation hook with your RootStackParamList.
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const stored = await AsyncStorage.getItem("savedArticles");
        if (stored) {
          setSavedArticles(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error loading saved articles", e);
      }
    };

    loadSavedArticles();
  }, []);

  const renderArticle = ({ item }: { item: Article }) => (
    <Pressable
      style={styles.articleItem}
      onPress={() => navigation.navigate("Article", { id: item.id })}
    >
      <Image source={{ uri: item.image_url }} style={styles.articleImage} />
      <View style={styles.articleInfo}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDate}>{item.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Custom header with back arrow and title */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Articles</Text>
      </View>

      <FlatList
        data={savedArticles}
        keyExtractor={(item) => item.id}
        renderItem={renderArticle}
        ListEmptyComponent={<Text>You have no saved articles.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56, paddingHorizontal: 16, backgroundColor: "#fff" },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  articleItem: { flexDirection: "row", marginBottom: 16 },
  articleImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  articleInfo: { flex: 1 },
  articleTitle: { fontSize: 16, fontWeight: "600" },
  articleDate: { fontSize: 12, color: "#666" },
});
