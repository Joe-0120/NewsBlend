import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../config";

type Comment = {
  user: string;
  comment: string;
  likes: number;
  dislikes: number;
  replies: number;
};

type ArticleSummary = {
  summary: string;
  source: string;
  category: string;
  image_url: string;
  logo_url: string;
};

type DiscussionData = {
  article: ArticleSummary;
  comments: Comment[];
};

export default function DiscussionScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [discussion, setDiscussion] = useState<DiscussionData | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/discussions/${id}`)
        .then((res) => res.json())
        .then(setDiscussion)
        .catch(console.error);
    }
  }, [id]);

  const handleSend = () => {
    if (!newComment.trim()) return;
    const newEntry: Comment = {
      user: "You",
      comment: newComment.trim(),
      likes: 0,
      dislikes: 0,
      replies: 0,
    };
    setDiscussion((prev) =>
      prev ? { ...prev, comments: [...prev.comments, newEntry] } : prev
    );
    setNewComment("");
  };

  if (!discussion) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.replace(`../article/${id}`)}>
            <Image
              source={require("../../../assets/black-left-arrow.png")}
              style={styles.backIcon}
            />
          </Pressable>
          <Text style={styles.title}>Discussion Forum</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Article Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTitleCenter}>
            <Image
              source={require("../../../assets/discussion-forum.png")}
              style={styles.summaryIcon}
            />
            <Text style={styles.summaryLabel}>Discussion Forum</Text>
          </View>
          <View style={styles.previewContent}>
            <Image
              source={{ uri: discussion.article.image_url }}
              style={styles.previewImage}
            />
            <View style={styles.previewText}>
              <Text style={styles.previewSummary}>
                {discussion.article.summary}
              </Text>
              <View style={styles.metaRow}>
                <Image
                  source={{ uri: discussion.article.logo_url }}
                  style={styles.metaLogo}
                />
                <Text style={styles.metaCategory}>
                  {discussion.article.category}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Comments */}
        {discussion.comments.map((c, i) => (
          <View key={i} style={styles.commentCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{c.user[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{c.user}</Text>
              <Text style={styles.commentText}>{c.comment}</Text>
              <View style={styles.actionsRow}>
                <View style={styles.actionIconRow}>
                  <Image
                    source={require("../../../assets/like.png")}
                    style={styles.reactionIcon}
                  />
                  <Text style={styles.iconCount}>{c.likes}</Text>
                </View>
                <View style={styles.actionIconRow}>
                  <Image
                    source={require("../../../assets/dislike.png")}
                    style={styles.reactionIcon}
                  />
                  <Text style={styles.iconCount}>{c.dislikes}</Text>
                </View>
                <View style={styles.actionIconRow}>
                  <Image
                    source={require("../../../assets/forum-logo.png")}
                    style={styles.reactionIcon}
                  />
                  <Text style={styles.iconCount}>{c.replies}</Text>
                </View>
                <Text style={styles.reply}>Reply</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type here"
          placeholderTextColor="#999"
          value={newComment}
          onChangeText={setNewComment}
          style={styles.input}
        />
        <Pressable onPress={handleSend}>
          <Image
            source={require("../../../assets/arrow-up.png")}
            style={styles.sendIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 44,
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: "SchibstedGrotesk-Bold",
  },
  summaryCard: {
    backgroundColor: "#F3F9F9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    marginBottom: 20,
  },
  summaryTitleCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  summaryIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: "SchibstedGrotesk-Bold",
  },
  previewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  previewText: {
    flex: 1,
  },
  previewSummary: {
    fontSize: 12,
    fontFamily: "SchibstedGrotesk-Regular",
    color: "#202020",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaLogo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 6,
  },
  metaCategory: {
    fontSize: 10,
    fontFamily: "SchibstedGrotesk-Regular",
    color: "#808080",
  },
  commentCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#404040",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontFamily: "SchibstedGrotesk-Bold",
    color: "#fff",
  },
  userName: {
    fontSize: 12,
    fontFamily: "SchibstedGrotesk-Bold",
    marginBottom: 6,
  },
  commentText: {
    fontSize: 12,
    fontFamily: "SchibstedGrotesk-Regular",
    color: "#202020",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 12,
  },
  actionIconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  iconCount: {
    fontSize: 12,
    color: "#999",
    fontFamily: "SchibstedGrotesk-Regular",
  },
  reply: {
    fontSize: 12,
    color: "#808080",
    fontFamily: "SchibstedGrotesk-Regular",
    marginLeft: "auto",
  },
  inputBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 12,
    fontFamily: "SchibstedGrotesk-Regular",
    marginRight: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});
