
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface AnimatedCharacterProps {
  character: {
    avatar: string;
    name: string;
  };
}

export default function AnimatedCharacter({ character }: AnimatedCharacterProps) {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Animația de mișcare orizontală
    translateX.value = withRepeat(
      withSequence(
        withTiming(50, { duration: 3000, easing: Easing.inOut(Easing.quad) }),
        withTiming(-50, { duration: 3000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.quad) })
      ),
      -1, // repetă la infinit
      false
    );

    // Animația de "respirație" (scale)
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
    };
  });

  // Folosește numele personalizat dacă există, altfel numele default
  const displayName = character.name;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.characterContainer, animatedStyle]}>
        <Text style={styles.characterAvatar}>{character.avatar}</Text>
        <Text style={styles.characterName}>{displayName}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  characterAvatar: {
    fontSize: 40,
    marginRight: 8,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
