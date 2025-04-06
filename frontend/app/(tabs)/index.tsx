import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type NewsItem = {
  title: string;
  source: string;
};

export default function HomeScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news") // replace with your IP if testing on mobile
      .then((res) => res.json())
      .then((data: NewsItem[]) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NewsBlend</Text>
      <FlatList
        data={news}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.source}>{item.source}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  title: { fontSize: 18 },
  source: { fontSize: 14, color: "gray" },
});
