import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <View style={styles.container}>
      {/* Base solid color */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#178B3E' }]} />
      
        {/* Dynamic background particles (simulated) */}
        <View style={[styles.particle, { top: 80, left: 40, width: 8, height: 8, backgroundColor: '#14b8a6', opacity: 0.4 }]} />
        <View style={[styles.particle, { top: 160, right: 80, width: 12, height: 12, backgroundColor: '#a855f7', opacity: 0.3 }]} />
        <View style={[styles.particle, { bottom: 240, left: '25%', width: 8, height: 8, backgroundColor: '#2dd4bf', opacity: 0.2 }]} />
        <View style={[styles.particle, { top: '50%', right: 40, width: 8, height: 8, backgroundColor: '#c084fc', opacity: 0.25 }]} />
        <View style={[styles.particle, { top: '75%', left: 40, width: 4, height: 4, backgroundColor: '#5eead4', opacity: 0.5 }]} />
      
      {/* Gradient overlay based on Figma properties */}
      <LinearGradient
        // Using #030705 as the dark color with varying opacities
        colors={[
          'rgba(3, 7, 5, 1)',
          'rgba(3, 7, 5, 0.90)',
          'rgba(3, 7, 5, 0.70)',
          'rgba(3, 7, 5, 0)',
        ]}
        locations={[0, 0.20, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  particle: {
    position: 'absolute',
    borderRadius: 9999,
  }
});
