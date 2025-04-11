import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@/config";

type PollOption = {
  label: string;
  percentage: number;
};

type PollData = {
  article: {
    title: string;
    summary: string;
    source: string;
    category: string;
    image_url: string;
    logo_url: string;
  };
  question: string;
  options: PollOption[];
};

export default function PollScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/polls/${id}`)
        .then((res) => res.json())
        .then(setPoll)
        .catch(console.error);
    }
  }, [id]);

  if (!poll) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.replace(`../article/${id}`)}>
          <Image
            source={require("../../../assets/black-left-arrow.png")}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.title}>Polls</Text>
        <View style={{ width: 24 }} /> {/* spacer */}
      </View>

      {/* Poll Preview Card */}
      <View style={styles.pollPreview}>
        <View style={styles.pollTitleCenter}>
          <Image
            source={require("../../../assets/black-poll.png")}
            style={styles.pollIcon}
          />
          <Text style={styles.pollLabel}>Polls</Text>
        </View>
        <View style={styles.previewContent}>
          <Image
            source={{ uri: poll.article.image_url }}
            style={styles.previewImage}
          />
          <View style={styles.previewText}>
            <Text style={styles.previewSummary}>{poll.article.summary}</Text>
            <View style={styles.metaRow}>
              <Image
                source={{ uri: poll.article.logo_url }}
                style={styles.metaLogo}
              />
              <Text style={styles.metaCategory}>{poll.article.category}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Poll Question */}
      <View style={styles.pollCard}>
        <Text style={styles.question}>{poll.question}</Text>
        {poll.options.map((opt, i) => {
          const isSelected = selected === i;
          const isInactive = selected !== null && selected !== i;
          return (
            <Pressable
              key={i}
              style={styles.optionContainer}
              onPress={() => {
                if (selected === null) setSelected(i);
              }}
              disabled={selected !== null}
            >
              <View
                style={[
                  styles.optionRow,
                  isInactive && styles.optionRowDisabled,
                ]}
              >
                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                />
                <Text style={styles.optionLabel}>{opt.label}</Text>
                {selected !== null && (
                  <Text style={styles.optionPercent}>{opt.percentage}%</Text>
                )}
              </View>
              {selected !== null && (
                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${opt.percentage}%`,
                        backgroundColor: isSelected ? "#018B8B" : "#D3D3D3",
                      },
                    ]}
                  />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Disabled Add Poll Button */}
      <View style={styles.addPollDisabled}>
        <Image
          source={require("../../../assets/black-plus-circle.png")}
          style={{ width: 20, height: 20, marginRight: 6 }}
        />
        <Text style={styles.addPollText}>Add Poll</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 44,
    flex: 1,
  },
  content: {
    padding: 20,
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
    textAlign: "center",
  },
  pollPreview: {
    backgroundColor: "#F3F9F9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 12,
    marginBottom: 20,
  },
  pollTitleCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  pollIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  pollLabel: {
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
    justifyContent: "space-between",
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
  pollCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    marginBottom: 20,
  },
  question: {
    fontSize: 13,
    fontFamily: "SchibstedGrotesk-Bold",
    marginBottom: 16,
  },
  optionContainer: {
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  optionRowDisabled: {
    opacity: 0.4,
  },
  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#bbb",
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: "#018B8B",
    borderColor: "#018B8B",
  },
  optionLabel: {
    fontSize: 12,
    flex: 1,
    fontFamily: "SchibstedGrotesk-Regular",
    color: "#202020",
  },
  optionPercent: {
    fontSize: 12,
    color: "#202020",
    fontFamily: "SchibstedGrotesk-Regular",
  },
  barBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    marginTop: 2,
  },
  barFill: {
    height: 6,
  },
  addPollDisabled: {
    opacity: 0.8,
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
  },
  addPollText: {
    fontSize: 14,
    fontFamily: "SchibstedGrotesk-Regular",
    color: "#202020",
  },
});
