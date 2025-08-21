import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface StoryDisplayProps {
  text: string;
  situation?: string;
}

export default function StoryDisplay({ text, situation }: StoryDisplayProps) {
  return (
    <View style={styles.container}>
      {situation && (
        <View style={styles.situationContainer}>
          <MapPin size={16} color="#F59E0B" />
          <Text style={styles.situation}>{situation}</Text>
        </View>
      )}

      <Text style={styles.storyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  situationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 8,
    borderRadius: 8,
  },
  situation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 8,
  },
  storyText: {
    fontSize: 16,
    color: '#F8FAFC',
    lineHeight: 24,
  },
});