import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Choice } from '@/data/gameData';
import { ChevronRight } from 'lucide-react-native';

interface ChoiceButtonProps {
  choice: Choice;
  onPress: () => void;
}

export default function ChoiceButton({ choice, onPress }: ChoiceButtonProps) {
  const getChoiceStyle = () => {
    const positiveChange = choice.personalStateChange + choice.socialRelationsChange;
    
    if (positiveChange > 10) {
      return [styles.choice, styles.positiveChoice];
    } else if (positiveChange < -10) {
      return [styles.choice, styles.negativeChoice];
    } else {
      return [styles.choice, styles.neutralChoice];
    }
  };

  return (
    <TouchableOpacity 
      style={getChoiceStyle()}
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
  },
  positiveChoice: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10B981',
  },
  negativeChoice: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#EF4444',
  },
  neutralChoice: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
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