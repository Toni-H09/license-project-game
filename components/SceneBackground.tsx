
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SceneBackgroundProps {
  sceneIndex: number;
  children: React.ReactNode;
}

export default function SceneBackground({ sceneIndex, children }: SceneBackgroundProps) {
  const getSceneBackground = () => {
    switch (sceneIndex) {
      case 0: // Facultatea
        return {
          image: require('@/assets/images/university-background.jpg'),
          overlay: 'rgba(56,80,158,0.5)',
          gradientColors: ['rgba(30, 58, 138, 0.4)', 'rgba(59, 130, 246, 0.2)'] as const // Reduced opacity
        };
      case 1: // Locul de Muncă
        return {
          image: require('@/assets/images/office-background.jpg'),
          overlay: 'rgba(55, 65, 81, 0.5)',
          gradientColors: ['rgba(55, 65, 81, 0.4)', 'rgba(107, 114, 128, 0.2)'] as const // Reduced opacity
        };
      case 2: // Locuința
        return {
          image: require('@/assets/images/home-background.jpg'),
          overlay: 'rgba(48,6,33,0.5)',
          gradientColors: ['rgba(168,92,164,0.4)', 'rgba(198,190,205,0.2)'] as const // Reduced opacity
        };
      default: // Default/Character Selection
        return {
          image: null,
          overlay: 'rgba(30, 41, 59, 0.75)',
          gradientColors: ['rgba(30, 41, 59, 0.8)', 'rgba(51, 65, 85, 0.6)'] as const
        };
    }
  };

  const scene = getSceneBackground();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={scene.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient overlay pentru contrast și lizibilitate */}
        <LinearGradient
          colors={scene.gradientColors}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Overlay suplimentar pentru a asigura lizibilitatea textului */}
          <View style={[styles.overlay, { backgroundColor: scene.overlay }]}>
            {children}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});
