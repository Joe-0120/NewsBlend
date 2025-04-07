// app/(tabs)/profile.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router'; // Use Link for navigation if these lead somewhere

// --- Reusable List Item Component ---
const ProfileListItem = ({ label, onPress }) => (
     <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <Text style={styles.listItemText}>{label}</Text>
        <Image source={require('../../assets/black-next-arrow.png')} style={styles.arrowIcon} />
     </TouchableOpacity>
);

// --- Profile Screen Component ---
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.profileName}>Jane Doe</Text>
          <View style={styles.badge}>
             <Image source={require('../../assets/yellow-shield.png')} style={styles.badgeIcon} />
             <Text style={styles.badgeText}>New reader</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Articles read</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Reading History Section */}
        <Text style={styles.sectionTitle}>Reading history</Text>
        {/* Use Link component if these navigate to other screens */}
        {/* <Link href="/saved" asChild> */}
            <ProfileListItem label="Saved articles" onPress={() => console.log('Navigate to Saved')} />
        {/* </Link> */}
        <ProfileListItem label="Read articles" onPress={() => console.log('Navigate to Read')} />
        <ProfileListItem label="2025 wrapped" onPress={() => console.log('Navigate to Wrapped')} />


         {/* Settings Section */}
         <Text style={styles.sectionTitle}>Settings</Text>
         <ProfileListItem label="My account" onPress={() => console.log('Navigate to Account Settings')} />

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, // More horizontal padding for profile
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#333', // Dark background for avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontFamily: 'AppBold',
    fontSize: 36,
    color: '#FFFFFF',
  },
  profileName: {
    fontFamily: 'AppBold',
    fontSize: 22,
    color: '#000',
    marginBottom: 8,
  },
   badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F9F9', // Light background for badge
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'contain',
  },
  badgeText: {
    fontFamily: 'AppRegular',
    fontSize: 13,
    color: '#555', // Darker grey text
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'AppBold',
    fontSize: 20,
    color: '#000',
  },
  statLabel: {
    fontFamily: 'AppRegular',
    fontSize: 13,
    color: '#808080', // Grey
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE', // Light grey divider
    marginHorizontal: -20, // Extend divider full width if container has padding
    marginBottom: 25,
  },
   sectionTitle: {
    fontFamily: 'AppBold',
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
   listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    // Add border bottom if needed
     borderBottomWidth: 1,
     borderBottomColor: '#F5F5F5',
  },
  listItemText: {
    fontFamily: 'AppRegular',
    fontSize: 15,
    color: '#000',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#808080', // Grey arrow
  },
});