
import { Character } from '@/data/gameData';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { User, Check } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';

interface CharacterSelectionProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const isLargeScreen = screenWidth >= 1024;

export default function CharacterSelection({ characters, onSelectCharacter }: CharacterSelectionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [name, setName] = useState('');

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleConfirm = () => {
    if (!selectedCharacter || !name.trim()) {
      return;
    }

    const finalCharacter: Character = {
      ...selectedCharacter,
      name: name.trim()
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
            key={character.gender}
            style={[
              styles.characterCard,
              selectedCharacter?.gender === character.gender && styles.selectedCharacterCard
            ]}
            onPress={() => handleCharacterSelect(character)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                character.gender === 'male' 
                  ? ['#3B82F6', '#2563EB'] 
                  : ['#EC4899', '#BE185D']
              }
              style={styles.characterGradient}
            >
              <Text style={styles.avatar}>{character.avatar}</Text>
              <Text style={styles.characterDescription}>{character.description}</Text>
              {selectedCharacter?.gender === character.gender && (
                <View style={styles.selectedIndicator}>
                  <Check size={isTablet ? 24 : 20} color="#FFFFFF" />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.nameInputContainer}>
        <View style={styles.nameInputLabelRow}>
          <User size={isTablet ? 20 : 16} color="#FFFFFF" />
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
            <Check size={isTablet ? 24 : 20} color="#FFFFFF" />
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
    padding: isTablet ? 32 : 24,
    justifyContent: 'center',
    maxWidth: isLargeScreen ? 1200 : '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: isLargeScreen ? 40 : isTablet ? 36 : 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: isTablet ? 16 : 12,
  },
  subtitle: {
    fontSize: isLargeScreen ? 22 : isTablet ? 20 : 16,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: isTablet ? 50 : 40,
    lineHeight: isTablet ? 32 : 24,
    paddingHorizontal: isTablet ? 40 : 20,
  },
  charactersContainer: {
    flexDirection: screenWidth < 600 ? 'column' : 'row',
    justifyContent: screenWidth < 600 ? 'center' : 'space-between',
    alignItems: 'center',
    marginBottom: isTablet ? 50 : 40,
    paddingHorizontal: isTablet ? 20 : 5,
    gap: screenWidth < 600 ? 20 : isLargeScreen ? 40 : isTablet ? 30 : 20,
  },
  characterCard: {
    width: screenWidth < 600 
      ? Math.min(screenWidth - 80, 300)
      : isLargeScreen 
        ? 400 
        : isTablet 
          ? Math.min((screenWidth - 160) / 2, 350)
          : Math.min((screenWidth - 100) / 2, 180),
    height: screenWidth < 600 
      ? Math.min(screenWidth - 80, 300) * 0.8
      : isLargeScreen 
        ? 320 
        : isTablet 
          ? Math.min((screenWidth - 160) / 2, 350) * 0.8
          : Math.min((screenWidth - 100) / 2, 180) * 1.2,
    borderRadius: isTablet ? 24 : 20,
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
    transform: [{ scale: 1.05 }],
  },
  characterGradient: {
    flex: 1,
    padding: isTablet ? 30 : 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    fontSize: isLargeScreen ? 120 : isTablet ? 100 : screenWidth < 600 ? 80 : 60,
    marginBottom: isTablet ? 24 : 16,
  },
  characterDescription: {
    color: '#FFFFFF',
    fontSize: isLargeScreen ? 20 : isTablet ? 18 : screenWidth < 600 ? 16 : 14,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: isTablet ? 28 : 22,
  },
  selectedIndicator: {
    position: 'absolute',
    top: isTablet ? 20 : 15,
    right: isTablet ? 20 : 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: isTablet ? 24 : 20,
    padding: isTablet ? 10 : 8,
  },
  nameInputContainer: {
    marginBottom: isTablet ? 50 : 40,
    paddingHorizontal: isTablet ? 20 : 10,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  nameInputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isTablet ? 20 : 15,
  },
  nameInputLabel: {
    fontSize: isLargeScreen ? 22 : isTablet ? 20 : 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: isTablet ? 12 : 10,
  },
  nameInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: isTablet ? 20 : 15,
    padding: isTablet ? 24 : 18,
    fontSize: isLargeScreen ? 22 : isTablet ? 20 : 18,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    fontWeight: '500',
  },
  nameHint: {
    fontSize: isLargeScreen ? 18 : isTablet ? 16 : 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: isTablet ? 16 : 12,
    fontStyle: 'italic',
    lineHeight: isTablet ? 24 : 20,
  },
  confirmButton: {
    borderRadius: isTablet ? 20 : 15,
    overflow: 'hidden',
    marginBottom: isTablet ? 40 : 30,
    marginHorizontal: isTablet ? 20 : 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    maxWidth: isTablet ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isTablet ? 24 : 18,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: isLargeScreen ? 22 : isTablet ? 20 : 18,
    fontWeight: 'bold',
    marginLeft: isTablet ? 12 : 10,
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: isTablet ? 20 : 15,
    padding: isTablet ? 24 : 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    marginHorizontal: isTablet ? 20 : 10,
    maxWidth: isTablet ? 700 : '100%',
    alignSelf: 'center',
  },
  infoText: {
    color: '#93C5FD',
    fontSize: isLargeScreen ? 20 : isTablet ? 18 : 16,
    textAlign: 'center',
    lineHeight: isTablet ? 28 : 24,
    fontWeight: '500',
  },
});
