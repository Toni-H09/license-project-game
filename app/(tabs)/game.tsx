
import React, { useState, useCallback, useEffect } from 'react';
import { gameData, GameState, Choice, characters, Character } from '@/data/gameData';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ProgressBar from '@/components/ProgressBar';
import StoryDisplay from '@/components/StoryDisplay';
import { Heart, Users, RotateCcw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AnimatedCharacter from '@/components/AnimatedCharacter';
import ChoiceButton from '@/components/ChoiceButton';
import CharacterSelection from '@/components/CharacterSelection';
import SceneBackground from '@/components/SceneBackground';

const initialGameState: GameState = {
  currentScene: 0,
  currentStep: 0,
  personalState: 50,
  socialRelations: 50,
  decisions: [],
  introspectionMode: false,
  selectedCharacter: undefined,
  characterSelected: false,
};

// Flag global pentru resetare
let shouldResetGame = false;

export function triggerGameReset() {
  shouldResetGame = true;
}

export default function GameScreen() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isGameComplete, setIsGameComplete] = useState(false);

  // Verifică dacă trebuie să reseteze jocul
  useEffect(() => {
    if (shouldResetGame) {
      console.log('Resetting game due to global flag');
      setGameState(initialGameState);
      setIsGameComplete(false);
      shouldResetGame = false;
    }
  }, []);

  const handleCharacterSelection = (character: Character) => {
    setGameState({
      ...gameState,
      selectedCharacter: character,
      characterSelected: true,
    });
  };

  const currentScene = gameData.scenes[gameState.currentScene];
  const currentStep = currentScene?.steps[gameState.currentStep];

  const handleChoice = (choice: Choice) => {
    const newPersonalState = Math.max(0, Math.min(100, gameState.personalState + choice.personalStateChange));
    const newSocialRelations = Math.max(0, Math.min(100, gameState.socialRelations + choice.socialRelationsChange));

    const newDecisions = [...gameState.decisions, choice.id];

    const isLastStep = gameState.currentStep >= currentScene.steps.length - 1;

    if (isLastStep) {
      setGameState({
        ...gameState,
        personalState: newPersonalState,
        socialRelations: newSocialRelations,
        decisions: newDecisions,
        introspectionMode: true,
      });
    } else {
      setGameState({
        ...gameState,
        currentStep: gameState.currentStep + 1,
        personalState: newPersonalState,
        socialRelations: newSocialRelations,
        decisions: newDecisions,
      });
    }
  };

  const handleIntrospection = (isPositive: boolean) => {
    const stateChange = isPositive ? 10 : -10;
    const newPersonalState = Math.max(0, Math.min(100, gameState.personalState + stateChange));

    const nextScene = gameState.currentScene + 1;
    
    if (nextScene >= gameData.scenes.length) {
      setIsGameComplete(true);
    } else {
      setGameState({
        ...gameState,
        currentScene: nextScene,
        currentStep: 0,
        personalState: newPersonalState,
        introspectionMode: false,
      });
    }
  };

  const resetGame = useCallback(() => {
    Alert.alert(
      'Resetează Jocul',
      'Ești sigur că vrei să reîncepi povestea?',
      [
        { text: 'Anulează', style: 'cancel' },
        { 
          text: 'Resetează', 
          style: 'destructive',
          onPress: () => {
            console.log('Resetare începută...');
            setIsGameComplete(false);
            setGameState(initialGameState);
            console.log('Resetare completă!');
          }
        },
      ]
    );
  }, []);

  const getEnding = () => {
    const avgState = (gameState.personalState + gameState.socialRelations) / 2;
    
    if (avgState >= 70) {
      return gameData.endings.positive;
    } else if (avgState >= 40) {
      return gameData.endings.neutral;
    } else {
      return gameData.endings.negative;
    }
  };

  // Afișează selecția de caracter dacă nu a fost selectat încă
  if (!gameState.characterSelected) {
    return (
      <SceneBackground sceneIndex={-1}>
        <ScrollView contentContainerStyle={styles.characterSelectionContainer}>
          <CharacterSelection
            characters={characters}
            onSelectCharacter={handleCharacterSelection}
          />
        </ScrollView>
      </SceneBackground>
    );
  }

  if (isGameComplete) {
    const ending = getEnding();
    return (
      <SceneBackground sceneIndex={gameState.currentScene}>
        <ScrollView contentContainerStyle={styles.endingContainer}>
          <View style={styles.staticCharacterHeader}>
            <Text style={styles.characterAvatar}>{gameState.selectedCharacter?.avatar}</Text>
            <Text style={styles.characterName}>{gameState.selectedCharacter?.name}</Text>
          </View>
          
          <Text style={styles.endingTitle}>{ending.title}</Text>
          <Text style={styles.endingText}>{ending.text}</Text>
          
          <View style={styles.finalStats}>
            <Text style={styles.statsTitle}>Statistica Finală:</Text>
            <View style={styles.statRow}>
              <Heart size={20} color="#10B981" />
              <Text style={styles.statText}>Stare Personală: {gameState.personalState}%</Text>
            </View>
            <View style={styles.statRow}>
              <Users size={20} color="#3B82F6" />
              <Text style={styles.statText}>Relații Sociale: {gameState.socialRelations}%</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.playAgainButton}
            onPress={() => {
              console.log('Reset button pressed directly!');
              setIsGameComplete(false);
              setGameState(initialGameState);
            }}
          >
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.playAgainGradient}
            >
              <Text style={styles.playAgainButtonText}>Joacă Din Nou</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.homeButtonText}>Înapoi Acasă</Text>
          </TouchableOpacity>
        </ScrollView>
      </SceneBackground>
    );
  }

  if (gameState.introspectionMode) {
    const introspection = currentScene.introspection;
    return (
      <SceneBackground sceneIndex={gameState.currentScene}>
        <ScrollView contentContainerStyle={styles.gameContent}>
          {gameState.selectedCharacter && (
            <AnimatedCharacter character={gameState.selectedCharacter} />
          )}

          <View style={styles.progressBars}>
            <ProgressBar
              label="Stare Personală"
              value={gameState.personalState}
              color="#10B981"
              icon={<Heart size={16} color="#10B981" />}
            />
            <ProgressBar
              label="Relații Sociale"
              value={gameState.socialRelations}
              color="#3B82F6"
              icon={<Users size={16} color="#3B82F6" />}
            />
          </View>

          <View style={styles.introspectionContainer}>
            <Text style={styles.introspectionTitle}>Moment de reflecție</Text>
            <Text style={styles.introspectionText}>{introspection.text}</Text>

            <View style={styles.choicesContainer}>
              <TouchableOpacity
                style={[styles.introspectionChoice, styles.positiveChoice]}
                onPress={() => handleIntrospection(true)}
              >
                <Text style={styles.choiceText}>{introspection.positiveChoice}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.introspectionChoice, styles.negativeChoice]}
                onPress={() => handleIntrospection(false)}
              >
                <Text style={styles.choiceText}>{introspection.negativeChoice}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SceneBackground>
    );
  }

  return (
    <SceneBackground sceneIndex={gameState.currentScene}>
      <ScrollView contentContainerStyle={styles.gameContent}>
        {gameState.selectedCharacter && (
          <AnimatedCharacter character={gameState.selectedCharacter} />
        )}

        <View style={styles.progressBars}>
          <ProgressBar
            label="Stare Personală"
            value={gameState.personalState}
            color="#10B981"
            icon={<Heart size={16} color="#10B981" />}
          />
          <ProgressBar
            label="Relații Sociale"
            value={gameState.socialRelations}
            color="#3B82F6"
            icon={<Users size={16} color="#3B82F6" />}
          />
        </View>

        <View style={styles.sceneHeader}>
          <Text style={styles.sceneTitle}>{currentScene.title}</Text>
          <Text style={styles.sceneProgress}>
            Scena {gameState.currentScene + 1} din {gameData.scenes.length}
          </Text>
        </View>

        {currentStep && (
          <>
            <StoryDisplay
              text={currentStep.text}
              situation={currentStep.situation}
            />

            <View style={styles.choicesContainer}>
              {currentStep.choices.map((choice, index) => (
                <ChoiceButton
                  key={index}
                  choice={choice}
                  onPress={() => handleChoice(choice)}
                />
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetGame}
        >
          <RotateCcw size={16} color="#64748B" />
          <Text style={styles.resetText}>Resetează</Text>
        </TouchableOpacity>
      </ScrollView>
    </SceneBackground>
  );
}

const styles = StyleSheet.create({
  characterSelectionContainer: {
    flexGrow: 1,
  },
  staticCharacterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Increased opacity
    padding: 16, // Increased padding
    borderRadius: 20,
  },
  characterAvatar: {
    fontSize: 32, // Increased from 24
    marginRight: 8,
  },
  characterName: {
    fontSize: 22, // Increased from 18
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added text shadow
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  gameContent: {
    padding: 20,
    paddingTop: 60,
  },
  progressBars: {
    marginBottom: 24,
  },
  sceneHeader: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Added background
    padding: 16,
    borderRadius: 16,
  },
  sceneTitle: {
    fontSize: 28, // Increased from 24
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added text shadow
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  sceneProgress: {
    fontSize: 16, // Increased from 14
    fontWeight: '600', // Made bolder
    color: '#E2E8F0', // Lighter color
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  choicesContainer: {
    marginTop: 24,
  },
  introspectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Increased opacity
    padding: 24, // Increased padding
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  introspectionTitle: {
    fontSize: 24, // Increased from 20
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  introspectionText: {
    fontSize: 18, // Increased from 16
    fontWeight: '500', // Made bolder
    color: '#F1F5F9', // Lighter color
    textAlign: 'center',
    lineHeight: 26, // Increased line height
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  introspectionChoice: {
    padding: 20, // Increased padding
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  positiveChoice: {
    backgroundColor: '#065F46',
    borderWidth: 2, // Increased border width
    borderColor: '#10B981',
  },
  negativeChoice: {
    backgroundColor: '#7F1D1D',
    borderWidth: 2, // Increased border width
    borderColor: '#EF4444',
  },
  choiceText: {
    fontSize: 18, // Increased from 16
    fontWeight: '600', // Made bolder
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  resetText: {
    color: '#94A3B8', // Lighter color
    fontSize: 16, // Increased from 14
    fontWeight: '600', // Made bolder
    marginLeft: 8,
  },
  endingContainer: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  endingTitle: {
    fontSize: 32, // Increased from 28
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  endingText: {
    fontSize: 18, // Increased from 16
    fontWeight: '500', // Made bolder
    color: '#F1F5F9', // Lighter color
    textAlign: 'center',
    lineHeight: 26, // Increased line height
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  finalStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Increased opacity
    padding: 24, // Increased padding
    borderRadius: 16,
    marginBottom: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statsTitle: {
    fontSize: 22, // Increased from 18
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statText: {
    fontSize: 18, // Increased from 16
    fontWeight: '600', // Made bolder
    color: '#F1F5F9', // Lighter color
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  playAgainButton: {
    marginBottom: 32,
  },
  playAgainGradient: {
    paddingVertical: 18, // Increased padding
    paddingHorizontal: 36, // Increased padding
    borderRadius: 25,
    alignItems: 'center',
  },
  playAgainButtonText: {
    fontSize: 20, // Increased from 18
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  homeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Increased opacity
    paddingVertical: 14, // Increased padding
    paddingHorizontal: 28, // Increased padding
    borderRadius: 20,
    borderWidth: 2, // Increased border width
    borderColor: '#94A3B8',
  },
  homeButtonText: {
    fontSize: 18, // Increased from 16
    fontWeight: '600', // Made bolder
    color: '#E2E8F0', // Lighter color
  },
});
