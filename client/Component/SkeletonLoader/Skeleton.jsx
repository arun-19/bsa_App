import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import CustomText from '../Text/CustomText';
import { ActivityIndicator } from 'react-native'; // Import ActivityIndicator for the icon

const SkeletonLoader = ({
  width = 200,
  height = 20,
  borderRadius = 12,  // Modern rounded corners
  color = '#E1E1E1',  // Light grey for the background
  highlightColor = '#f4f4f4',  // Lighter color for shimmer effect
  duration = 1200,  // Slower animation duration for smoother transitions
  iconSize = 24,  // Size of the loading icon
  style
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [fadeAnim, duration]);

  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius, backgroundColor: color },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.highlight,
          {
            backgroundColor: highlightColor,
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Loading Icon: Animated Spinner */}
        <ActivityIndicator
          size={iconSize}
          color="#999" // Icon color
          style={styles.icon}
        />
        {/* Optional "Loading..." Text */}
        <CustomText style={styles.loadingText}>Loading...</CustomText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    backgroundColor: '#E1E1E1',  // default background color
    borderRadius: 12,  // Modern rounded corners
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,  // Subtle shadow effect
    shadowRadius: 5,
    elevation: 3,  // For android shadow support
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f4f4f4',  // Subtle lighter highlight color
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8, // Space between icon and text
  },
  loadingText: {
    color: '#999',  // Subtle text color for "Loading..."
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Helvetica',  // Clean and modern font
  },
});

export default SkeletonLoader;
