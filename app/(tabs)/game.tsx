
import CharacterSelection from '@/components/CharacterSelection';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, RotateCcw, BarChart2 } from 'lucide-react-native';
import { StoryGraphManager } from '@/utils/storyGraphManager';
import React, { useState, useCallback, useEffect } from 'react';
import StoryDisplay from '@/components/StoryDisplay';
import { trackChoice, trackGameCompletion, trackGameStart, getMetrics, LocalMetrics, trackCharacterSelection } from '@/utils/localMetrics';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AnimatedCharacter from '@/components/AnimatedCharacter';
import ProgressBar from '@/components/ProgressBar';
import { GameStateMachine } from '@/utils/gameStateMachine';
import { router } from 'expo-router';
import { gameData, storyGraph, GameState, Choice, characters, Character } from '@/data/gameData';
import SceneBackground from '@/components/SceneBackground';
import ChoiceButton from '@/components/ChoiceButton';

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
  const [stateMachine] = useState(new GameStateMachine());
  const [storyManager] = useState(new StoryGraphManager(storyGraph));
  const [currentPsychologicalState, setCurrentPsychologicalState] = useState('neutral');
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [localMetrics, setLocalMetrics] = useState<LocalMetrics | null>(null);
  const [hasTrackedCompletion, setHasTrackedCompletion] = useState(false);

  useEffect(() => {
    if (shouldResetGame) {
      setGameState(initialGameState);
      setIsGameComplete(false);
      shouldResetGame = false;
    }
  }, []);

  useEffect(() => {
    if (isGameComplete) {
      const loadMetrics = async () => {
        const metrics = await getMetrics();
        setLocalMetrics(metrics);
      };
      loadMetrics();
    }
  }, [isGameComplete]);

  const handleCharacterSelection = async (character: Character) => {
    try {
      await trackGameStart();
      await trackCharacterSelection(character.gender);
      
      setGameState({
        ...gameState,
        selectedCharacter: character,
        characterSelected: true,
      });
    } catch (error) {
      console.error('Error in handleCharacterSelection:', error);
    }
  };

  const currentScene = gameData.scenes[gameState.currentScene];
  const currentStep = currentScene?.steps[gameState.currentStep];

  const getFilteredChoices = (step: any): Choice[] => {
    if (!step) return [];
    
    const currentNodeId = step.id;
    const isFirstQuestion = gameState.currentStep === 0;
    
    if (isFirstQuestion) {
      return step.choices;
    }
    
    const availableEdges = storyManager.getAvailableEdgesFromNode(currentNodeId);
    const availableChoices = availableEdges.map(edge => edge.choice);
    
    return availableChoices;
  };

  const handleChoice = (choice: Choice) => {
    trackChoice(choice.id);
    const { newState, modifiedChoice } = stateMachine.processChoice(gameState, choice);
    setCurrentPsychologicalState(newState);

    storyManager.blockChoicesFromDecision(choice.id);
    storyManager.navigateViaEdge(choice.id);

    const personalStateChange = modifiedChoice.personalStateChange + 
      (currentPsychologicalState === 'confident' ? 5 : 0) +
      (currentPsychologicalState === 'isolated' ? -3 : 0);

    const socialRelationsChange = modifiedChoice.socialRelationsChange;

    const newPersonalState = Math.max(0, Math.min(100, gameState.personalState + personalStateChange));
    const newSocialRelations = Math.max(0, Math.min(100, gameState.socialRelations + socialRelationsChange));

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

  const resetGame = useCallback(() => {
    setIsGameComplete(false);
    setGameState(initialGameState);
    setHasTrackedCompletion(false);
    storyManager.resetBlockedChoices();
  }, [storyManager]);

  const handleIntrospection = async (isPositive: boolean) => {
    const stateChange = isPositive ? 10 : -10;
    const newPersonalState = Math.max(0, Math.min(100, gameState.personalState + stateChange));

    const nextScene = gameState.currentScene + 1;
    
    if (nextScene >= gameData.scenes.length && !hasTrackedCompletion) {
      const finalGameState = { ...gameState, personalState: newPersonalState };
      const avgState = (finalGameState.personalState + finalGameState.socialRelations) / 2;
      
      setHasTrackedCompletion(true);
      
      try {
        if (avgState >= 70) {
          await trackGameCompletion('positive');
        } else if (avgState >= 40) {
          await trackGameCompletion('neutral');
        } else {
          await trackGameCompletion('negative');
        }
      } catch (error) {
        console.error('Error tracking game completion:', error);
      }

      setIsGameComplete(true);
    } else if (nextScene < gameData.scenes.length) {
      setGameState({
        ...gameState,
        currentScene: nextScene,
        currentStep: 0,
        personalState: newPersonalState,
        introspectionMode: false,
      });
    }
  };

  const getEnding = () => {
    const avgState = (gameState.personalState + gameState.socialRelations) / 2;
    
    if (avgState >= 70) {
      return { type: 'positive', data: gameData.endings.positive };
    } else if (avgState >= 40) {
      return { type: 'neutral', data: gameData.endings.neutral };
    } else {
      return { type: 'negative', data: gameData.endings.negative };
    }
  };

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
          
          <Text style={styles.endingTitle}>{ending.data.title}</Text>
          <Text style={styles.endingText}>{ending.data.text}</Text>
          
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

          {localMetrics && (
            <View style={styles.localMetricsContainer}>
              <View style={styles.localMetricsTitleContainer}>
                <BarChart2 size={22} color="#A78BFA" />
                <Text style={styles.localMetricsTitle}>Statistici Generale</Text>
              </View>
              <Text style={styles.metricItem}>Jocuri Începute: {localMetrics.playthroughsStarted}</Text>
              <Text style={styles.metricItem}>Jocuri Terminate: {localMetrics.playthroughsCompleted}</Text>
              <Text style={styles.metricItem}>Finaluri Pozitive: {localMetrics.endings.positive}</Text>
              <Text style={styles.metricItem}>Finaluri Neutre: {localMetrics.endings.neutral}</Text>
              <Text style={styles.metricItem}>Finaluri Negative: {localMetrics.endings.negative}</Text>
              <Text style={styles.metricItem}>Personaj Masculin Ales: {localMetrics.characterSelections?.male || 0}</Text>
              <Text style={styles.metricItem}>Personaj Feminin Ales: {localMetrics.characterSelections?.female || 0}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.playAgainButton}
            onPress={() => {
              setIsGameComplete(false);
              setGameState(initialGameState);
              storyManager.resetBlockedChoices();
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
                style={styles.introspectionChoice}
                onPress={() => handleIntrospection(true)}
              >
                <Text style={styles.choiceText}>{introspection.positiveChoice}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.introspectionChoice}
                onPress={() => handleIntrospection(false)}
              >
                <Text style={styles.choiceText}>{introspection.negativeChoice}</Text>
              </TouchableOpacity>
            </View>
          </View>

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
              {getFilteredChoices(currentStep).map((choice, index) => (
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 20,
  },
  characterAvatar: {
    fontSize: 32,
    marginRight: 8,
  },
  characterName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    borderRadius: 16,
  },
  sceneTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  sceneProgress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  choicesContainer: {
    marginTop: 24,
  },
  introspectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 24,
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  introspectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  introspectionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F1F5F9',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  introspectionChoice: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  choiceText: {
    fontSize: 18,
    fontWeight: '600',
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
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  endingContainer: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  endingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  endingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F1F5F9',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  finalStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statsTitle: {
    fontSize: 22,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#F1F5F9',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  localMetricsContainer: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  localMetricsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  localMetricsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A78BFA',
    textAlign: 'center',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  metricItem: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E2E8F0',
    marginBottom: 8,
    textAlign: 'center',
  },
  playAgainButton: {
    marginBottom: 32,
  },
  playAgainGradient: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 25,
    alignItems: 'center',
  },
  playAgainButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  homeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#94A3B8',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E2E8F0',
  },
});
