
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Character } from '@/data/gameData';
import { User, Check } from 'lucide-react-native';

interface CharacterSelectionProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

export default function CharacterSelection({ characters, onSelectCharacter }: CharacterSelectionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [name, setName] = useState('');

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    // Nu mai setăm numele default
  };

  const handleConfirm = () => {
    if (!selectedCharacter) {
      Alert.alert('Eroare', 'Te rugăm să selectezi un caracter');
      return;
    }

    if (!name.trim()) {
      Alert.alert('Eroare', 'Te rugăm să introduci un nume');
      return;
    }

    const finalCharacter: Character = {
      ...selectedCharacter,
      name: name.trim() // Actualizează numele pentru afișare
    };

    onSelectCharacter(finalCharacter);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alege-ți Caracterul</Text>
      <Text style={styles.subtitle}>
        Selectează personajul și introdu-ți numele pentru această experiență
      </Text>

      <View style={styles.charactersContainer}>
        {characters.map((character) => (
          <TouchableOpacity
            key={character.id}
            style={[
              styles.characterCard,
              selectedCharacter?.id === character.id && styles.selectedCharacterCard
            ]}
            onPress={() => handleCharacterSelect(character)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedCharacter?.id === character.id
                  ? ['#10B981', '#059669']
                  : character.id === 'male' 
                    ? ['#3B82F6', '#2563EB'] 
                    : ['#EC4899', '#BE185D']
              }
              style={styles.characterGradient}
            >
              <Text style={styles.avatar}>{character.avatar}</Text>
              <Text style={styles.characterDescription}>{character.description}</Text>
              {selectedCharacter?.id === character.id && (
                <View style={styles.selectedIndicator}>
                  <Check size={20} color="#FFFFFF" />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.nameInputContainer}>
        <Text style={styles.nameInputLabel}>
          <User size={16} color="#FFFFFF" /> Introdu-ți numele:
        </Text>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="Cum te cheamă?"
          placeholderTextColor="#94A3B8"
          maxLength={20}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <Text style={styles.nameHint}>
          Acest nume va fi folosit pe parcursul întregii povești
        </Text>
      </View>

      {selectedCharacter && name.trim() && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.confirmGradient}
          >
            <Check size={20} color="#FFFFFF" />
            <Text style={styles.confirmButtonText}>Începe Aventura ca {name.trim()}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Alege caracterul care ți se potrivește și introdu numele cu care vrei să fii cunoscut în poveste
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  charactersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 16,
  },
  characterCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedCharacterCard: {
    transform: [{ scale: 1.05 }],
    elevation: 8,
    shadowOpacity: 0.4,
  },
  characterGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    fontSize: 96,
    marginBottom: 16,
  },
  characterDescription: {
    fontSize: 14,
    color: '#F1F5F9',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 5,
  },
  nameInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#475569',
  },
  nameInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#64748B',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  nameHint: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  confirmButton: {
    marginBottom: 24,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoText: {
    fontSize: 14,
    color: '#93C5FD',
    lineHeight: 20,
    textAlign: 'center',
  },
});
