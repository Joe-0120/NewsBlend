// app/index.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar, // Import StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleGoToRegister = () => {
    setShowRegister(true);
  };

  const handleExplore = () => {
    // In a real app, you'd likely validate the email or perform registration here
    // before navigating.
    // Replace the current screen with the home screen in the (tabs) layout
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Set status bar style */}
       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
       {/* Optional: App Logo */}
        <View style={styles.logoContainer}>
             <Image source={require('../assets/logo.png')} style={styles.logo} />
             <Text style={styles.logoText}>NewsBlend</Text>
             <Text style={styles.logoSubText}>BLND</Text>
        </View>


      {/* Conditional Rendering based on state */}
      {!showRegister ? (
        // Screen 1: First Time Open
        <View style={styles.container}>
          <View style={styles.contentBox}>
            <Text style={styles.title}>Get your latest news and updates.</Text>
            <Text style={styles.subtitle}>Your News. Your Voice. Your Blend.</Text>
            <TouchableOpacity style={styles.button} onPress={handleGoToRegister}>
              <Text style={styles.buttonText}>Register</Text>
              <Image source={require('../assets/black-next-arrow.png')} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Screen 2: Register
        <View style={styles.container}>
          <View style={styles.contentBox}>
            <Text style={styles.registerTitle}>Register</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#808080" // Grey placeholder
              />
              {/* Clear button */}
              {email.length > 0 && (
                 <TouchableOpacity onPress={() => setEmail('')} style={styles.clearButton}>
                     <Text style={styles.clearButtonText}>✕</Text>
                 </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleExplore}>
              <Text style={styles.buttonText}>Explore</Text>
               <Image source={require('../assets/black-next-arrow.png')} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for the whole screen
  },
   logoContainer: {
       alignItems: 'center',
       marginTop: '15%', // Adjust spacing from top
       marginBottom: '10%',
   },
   logo: {
       width: 80,
       height: 80,
       resizeMode: 'contain',
       marginBottom: 5,
   },
    logoText: {
        fontFamily: 'AppBold', // Use your loaded bold font
        fontSize: 24,
        color: '#000', // Or your specific logo color
        marginBottom: 0,
    },
    logoSubText: {
        fontFamily: 'AppRegular', // Use your loaded regular font
        fontSize: 12,
        color: '#808080', // Grey subtext
        letterSpacing: 2, // Add letter spacing if needed
    },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Push content to the bottom
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50, // Spacing from bottom
  },
  contentBox: {
    width: '100%',
    backgroundColor: '#F3F9F9', // Light greyish background from PDF
    borderRadius: 20, // Rounded corners
    padding: 30,
    alignItems: 'center',
    // Add shadow if desired (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Add shadow if desired (Android)
    elevation: 3,
  },
  title: {
    fontFamily: 'AppBold', // Assuming bold for title
    fontSize: 20, // Larger title size
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'AppRegular',
    fontSize: 14, // Slightly larger subtitle
    color: '#808080', // Grey color
    textAlign: 'center',
    marginBottom: 25,
  },
  registerTitle: {
    fontFamily: 'AppBold',
    fontSize: 20,
    color: '#000',
    marginBottom: 25, // Space below title
  },
   inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White input background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light border for input
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1, // Take up available space
    fontFamily: 'AppRegular',
    fontSize: 16,
    color: '#000',
    height: 50, // Input height
  },
  clearButton: {
      padding: 5,
      marginLeft: 5,
  },
  clearButtonText: {
      fontSize: 16,
      color: '#808080',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0', // Match button color from screenshot (adjust if needed)
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20, // Pill shape
    alignItems: 'center',
    justifyContent: 'center', // Center content if needed
    minWidth: '60%', // Give button some minimum width
  },
  buttonText: {
    fontFamily: 'AppBold', // Bold button text
    fontSize: 16,
    color: '#000', // Black button text
    marginRight: 8,
  },
  buttonIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#000', // Black arrow
  },
});