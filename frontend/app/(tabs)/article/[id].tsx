import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";

type Article = {
  title: string;
  subtitle: string;
  publisher_logo_url: string;
  date: string;
  image_url: string;
  content: string[];
};

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  const shareIcons = [
    { key: "instagram", src: require("../../../assets/instagram-icon.png") },
    { key: "message", src: require("../../../assets/message-icon.png") },
    { key: "airdrop", src: require("../../../assets/airdrop-icon.png") },
    { key: "email", src: require("../../../assets/email-icon.png") },
  ];

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => setArticle(data))
        .catch((err) => console.error("Error fetching article:", err));
    }
  }, [id]);

  if (!article) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#808080" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Image
          source={{ uri: article.publisher_logo_url }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.subtitle}>{article.subtitle}</Text>
        <Text style={styles.meta}>{article.date}</Text>
        <Image
          source={{ uri: article.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* <Image
          source={require("../../../assets/Page Control.png")}
          style={styles.pageControl}
          resizeMode="contain"
        /> */}
        {article.content.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.bottomBar}>
        <Pressable onPress={() => router.push("/")}>
          {" "}
          {/* Back to main */}
          <Image
            source={require("../../../assets/black-left-arrow.png")}
            style={styles.icon}
          />
        </Pressable>
        <View style={styles.rightIcons}>
          <Pressable onPress={() => router.push(`/poll/${id}`)}>
            <Image
              source={require("../../../assets/poll-star.png")}
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={() => router.push(`/discussion/${id}`)}>
            <Image
              source={require("../../../assets/forum-logo.png")}
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={() => setBookmarked(!bookmarked)}>
            <Image
              source={
                bookmarked
                  ? require("../../../assets/black-filled-bookmark.png")
                  : require("../../../assets/black-outline-bookmark.png")
              }
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={() => setShowShareSheet(true)}>
            <Image
              source={require("../../../assets/black-share.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>

      {showShareSheet && (
        <View style={styles.shareSheet}>
          <View style={styles.shareBox}>
            <View style={styles.shareHeader}>
              <Image
                source={{ uri: article.image_url }}
                style={styles.shareImage}
              />
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={styles.shareTitle} numberOfLines={1}>
                  {article.title}
                </Text>
                <Pressable style={styles.sendCopyBtn}>
                  <Text style={styles.sendCopyText}>Send Copy</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => setShowShareSheet(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            <View style={styles.shareIconsRow}>
              {shareIcons.map((icon) => (
                <Pressable key={icon.key} onPress={() => {}}>
                  <Image source={icon.src} style={styles.shareIcon} />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 30,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "SchibstedGrotesk-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#404040",
    fontFamily: "SchibstedGrotesk-Regular",
    marginBottom: 4,
  },
  meta: {
    fontSize: 10,
    color: "#808080",
    fontFamily: "SchibstedGrotesk-Regular",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  pageControl: {
    width: 294,
    height: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 20,
    color: "#202020",
    fontFamily: "SchibstedGrotesk-Regular",
    marginBottom: 14,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(243, 243, 243, 0.5)",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  shareSheet: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 10,
  },
  shareBox: {
    backgroundColor: "#F3F3F3",
    padding: 16,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  shareHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  shareImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  shareTitle: {
    fontSize: 12,
    fontFamily: "SchibstedGrotesk-Regular",
    color: "#202020",
    marginBottom: 6,
  },
  sendCopyBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sendCopyText: {
    fontSize: 12,
    color: "#202020",
    fontFamily: "SchibstedGrotesk-Regular",
  },
  closeButton: {
    fontSize: 20,
    color: "#808080",
    paddingHorizontal: 10,
  },
  shareIconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 12,
  },
  shareIcon: {
    width: 48,
    height: 48,
  },
});
