// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

// Define Icon component for cleaner code
const TabBarIcon = ({ source, focused, size = 26 }) => (
  <Image
    source={source}
    style={[styles.icon, { width: size, height: size, tintColor: focused ? '#FFFFFF' : '#808080' }]}
    resizeMode="contain"
  />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF', // White for active icon/text
        tabBarInactiveTintColor: '#808080', // Grey for inactive icon/text
        tabBarStyle: {
          backgroundColor: '#1C1C1E', // Dark background for tab bar
          borderTopWidth: 0, // Remove top border
          height: 90, // Adjust height if needed
          paddingBottom: 30, // Padding for safe area / home indicator
        },
        tabBarLabelStyle: {
          fontFamily: 'AppRegular', // Use loaded font
          fontSize: 10,
          marginTop: -5, // Adjust label position relative to icon
        },
        headerShown: false, // We'll handle headers within each screen
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={require('../../assets/white-home-menu.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
           tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={require('../../assets/white-loop.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
           tabBarIcon: ({ focused }) => (
             // Use filled icon when focused, outline when not
            <TabBarIcon focused={focused} source={focused ? require('../../assets/black-filled-bookmark.png') : require('../../assets/white-outline-bookmark.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
           tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={require('../../assets/white-outline-profile-icon.png')} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3, // Adjust icon position
  },
});