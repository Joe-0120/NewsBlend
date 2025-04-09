import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();
  
  // Hard‑coded profile data
  const user = {
    initials: 'JD',
    name: 'Jane Doe',
    role: 'New reader',
    stats: {
      articlesRead: 6,
      streak: 2,
      level: 2,
    },
    menu: [
      'Saved articles',
      '2025 wrapped',
      'My account',
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Expo Router header */}
      <Stack.Screen options={{ title: 'Profile' }} />

      {/* Header: avatar + name + badge */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{user.initials}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.roleRow}>
            <MaterialCommunityIcons
              name="shield-check"
              size={18}
              color="#4CAF50"
              style={styles.roleIcon}
            />
            <Text style={styles.role}>{user.role}</Text>
          </View>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Articles read</Text>
          <Text style={styles.statValue}>
            {user.stats.articlesRead}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>
            {user.stats.streak}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={styles.statValue}>
            {user.stats.level}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.menuHeader}>Reading history</Text>
        {user.menu.slice(0, 2).map((label, i) => (
          <TouchableOpacity
            key={i}
            style={styles.menuItem}
            onPress={() => {
              if (i === 0) {
                // Navigate to the Saved Articles screen
                router.push('/saved-articles');
              } else {
                // Placeholder for other actions
                console.log(`${label} pressed`);
              }
            }}
          >
            <Text style={styles.menuLabel}>{label}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#999999"
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={[styles.menuHeader, styles.settingsHeader]}>
          Settings
        </Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('../components/account')}>
          <Text style={styles.menuLabel}>{user.menu[3]}</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#999999"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const AVATAR_SIZE = 80;
const HORIZONTAL_PADDING = 16;
const STAT_COLUMN_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2) / 3;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: HORIZONTAL_PADDING,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32, // from Figma: 32px below role
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 28,           // Figma: 28px
    lineHeight: 32,         // 32px line height
    fontWeight: '700',      // Bold
    color: '#FFFFFF',
  },
  headerText: {
    marginLeft: 16,         // 16px gap
  },
  name: {
    fontSize: 22,           // Figma: 22px
    lineHeight: 28,         // 28px line height
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,        // 4px under name
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleIcon: {
    marginRight: 6,         // 6px between icon & text
  },
  role: {
    fontSize: 16,           // 16px
    lineHeight: 20,         // 20px line height
    fontWeight: '400',      // Regular
    color: '#000000',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,       // 24px under stats
  },
  stat: {
    width: STAT_COLUMN_WIDTH,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,           // 14px
    lineHeight: 20,         // 20px
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,        // 8px under label
  },
  statValue: {
    fontSize: 20,           // Figma shows height 24px for value; use 20px font
    lineHeight: 24,         // 24px line height
    fontWeight: '400',
    color: '#808080',       // Exact hex from Figma
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#000000',
    marginBottom: 24,       // 24px under divider
  },
  menuSection: {
    marginBottom: 24,       // spacing between sections
  },
  menuHeader: {
    fontSize: 16,           // 16px
    lineHeight: 24,         // 24px
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,       // 12px under header
  },
  settingsHeader: {
    marginTop: 0,           // no extra top margin
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,    // 12px vertical touch area
  },
  menuLabel: {
    fontSize: 16,           // 16px
    lineHeight: 24,         // 24px
    fontWeight: '400',
    color: '#000000',
  },
});

