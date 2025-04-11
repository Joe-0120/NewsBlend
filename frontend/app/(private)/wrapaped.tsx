import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';

export default function WrappedVideo() {
  const videoRef = useRef<Video>(null);
  const router = useRouter();

  // Handler to check the playback status of the video.
  // When the video finishes (after 20 seconds), navigate to the profile page.
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.didJustFinish) {
      router.push('/profile'); // Adjust the route path to match your project structure.
    }
  };

  useEffect(() => {
    // Start playing the video automatically.
    videoRef.current?.playAsync().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={require('./wrapped.mp4')}
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          isLooping={false} // Ensure the video does not loop so that it can finish.
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // Centers the video box if there's extra space
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: '100%',                 // Fill the screen’s width
    aspectRatio: 1080 / 1920,        // Maintain 9:16 ratio
    backgroundColor: 'black',
  },
});
