// app/(tabs)/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Tabs, usePathname } from 'expo-router';
import { Image, StyleSheet, Text, View, Dimensions, Animated, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TabLayout() {
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop() || 'home';
  const [animatedValues] = useState({
    home: new Animated.Value(activeTab === 'home' ? 1 : 0),
    explore: new Animated.Value(activeTab === 'explore' ? 1 : 0),
    saved: new Animated.Value(activeTab === 'saved' ? 1 : 0),
    profile: new Animated.Value(activeTab === 'profile' ? 1 : 0),
  });

  useEffect(() => {
    // Animate transitions when tab changes
    Object.keys(animatedValues).forEach(tab => {
      Animated.timing(animatedValues[tab], {
        toValue: activeTab === tab ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [activeTab]);

  const getTabStyle = (tabName) => {
    const isActive = activeTab === tabName;
    
    // Calculate dynamic spacing and width based on active state
    const tabWidth = animatedValues[tabName].interpolate({
      inputRange: [0, 1],
      outputRange: [40, 110] // width expands when active
    });
    
    const marginHorizontal = animatedValues[tabName].interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0] // reduce margins when active
    });

    return {
      width: tabWidth,
      marginHorizontal,
      backgroundColor: isActive ? '#000000' : 'transparent',
    };
  };

  const renderTabIcon = (tabName, label, iconSource, activeIconSource = null) => {
    const isActive = activeTab === tabName;
    
    return (
      <Animated.View style={[styles.tabItem, getTabStyle(tabName)]}>
        <Image
          source={activeIconSource && isActive ? activeIconSource : iconSource}
          resizeMode="contain"
          style={[
            styles.tabIcon,
            { tintColor: isActive ? '#FFFFFF' : '#808080' }
          ]}
        />
        {isActive && (
          <Text style={styles.tabLabel}>
            {label}
          </Text>
        )}
      </Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => renderTabIcon(
            'home',
            'Home',
            require('../../assets/white-home-menu.png')
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: () => renderTabIcon(
            'explore',
            'Explore',
            require('../../assets/white-loop.png')
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarIcon: () => renderTabIcon(
            'saved',
            'Saved',
            require('../../assets/white-outline-bookmark.png'),
            require('../../assets/black-filled-bookmark.png')
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => renderTabIcon(
            'profile',
            'Profile',
            require('../../assets/white-outline-profile-icon.png')
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F3F9F9',
    borderTopWidth: 0,
    height: 100,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    height: 40,
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'SchibstedGrotesk-Medium',
    marginLeft: 8,
  },
});
