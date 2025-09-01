import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Choice } from '@/data/gameData';
import { ChevronRight } from 'lucide-react-native';

interface ChoiceButtonProps {
  choice: Choice;
  onPress: () => void;
}

export default function ChoiceButton({ choice, onPress }: ChoiceButtonProps) {
  return (
    <TouchableOpacity
      style={styles.choice}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.choiceText}>{choice.text}</Text>
      <ChevronRight size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderColor: '#3B82F6',
  },
  choiceText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
});
