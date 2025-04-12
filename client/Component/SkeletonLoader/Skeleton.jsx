import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import CustomText from '../Text/CustomText';

const SkeletonLoader = ({
  width = 200,
  height = 20,
  borderRadius = 4,
  color = '#E1E1E1',
  highlightColor = '#e8eaeb',
  duration = 1000,
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
        
        <CustomText style={{color:"gray",fontSize:10,textAlien:"center"}}>Loading...</CustomText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    height:"100%"
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign:"center"
  },
});

export default SkeletonLoader;