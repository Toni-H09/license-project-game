
import { User, Check } from 'lucide-react-native';
import { Character } from '@/data/gameData';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

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
        <View style={styles.nameInputLabelRow}>
          <User size={16} color="#FFFFFF" />
          <Text style={styles.nameInputLabel}>Introdu-ți numele:</Text>
        </View>
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
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  charactersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  characterCard: {
    width: 600,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  selectedCharacterCard: {
    transform: [{ scale: 1.08 }],
  },
  characterGradient: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    fontSize: 100,
    marginBottom: 20,
  },
  characterDescription: {
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  nameInputContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  nameInputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  nameInputLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 10,
  },
  nameInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 18,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    fontWeight: '500',
  },
  nameHint: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  confirmButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 30,
    marginHorizontal: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    marginHorizontal: 10,
  },
  infoText: {
    color: '#93C5FD',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});
