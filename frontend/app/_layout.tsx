// app/_layout.tsx
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'AppRegular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'AppBold': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Define the stack navigator. Index is the first screen.
  // The header is hidden for all screens in this root stack.
  return (
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define the index screen first */}
        <Stack.Screen name="index" />
        {/* Define the group for the tab navigator */}
        <Stack.Screen name="(tabs)" />
      </Stack>
  );
}

// Optional: Define global styles if needed (keep if you defined them before)
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9F9',
  },
  textRegular: {
    fontFamily: 'AppRegular',
    fontSize: 12,
    color: '#000',
  },
  textTitle: {
    fontFamily: 'AppBold',
    fontSize: 16,
    color: '#000',
  },
  textSecondary: {
      fontFamily: 'AppRegular',
      fontSize: 12,
      color: '#808080',
  }
});