
import { Choice, GameState } from '@/data/gameData';

interface GameStateNode {
  id: string;
  name: string;
  description: string;
  effects: {
    personalStateMultiplier: number;
    socialRelationsMultiplier: number;
    availableChoices: string[];
  };
}

interface StateTransition {
  from: string;
  to: string;
  condition: (gameState: GameState, choice: Choice) => boolean;
}

export class GameStateMachine {
  private states: Map<string, GameStateNode> = new Map();
  private transitions: StateTransition[] = [];
  private currentState: string = 'neutral';

  constructor() {
    this.initializeStates();
    this.initializeTransitions();
  }

  private initializeStates() {
    this.states.set('neutral', {
      id: 'neutral',
      name: 'Balanced State',
      description: 'You maintain a balanced approach to situations',
      effects: {
        personalStateMultiplier: 1.0,
        socialRelationsMultiplier: 1.0,
        availableChoices: ['standard_choices']
      }
    });

    this.states.set('confident', {
      id: 'confident',
      name: 'Confident & Assertive',
      description: 'You feel empowered to advocate for yourself',
      effects: {
        personalStateMultiplier: 1.2,
        socialRelationsMultiplier: 0.9,
        availableChoices: ['leadership_choices', 'advocacy_choices']
      }
    });

    this.states.set('isolated', {
      id: 'isolated',
      name: 'Socially Withdrawn',
      description: 'You tend to avoid social interactions',
      effects: {
        personalStateMultiplier: 0.8,
        socialRelationsMultiplier: 0.7,
        availableChoices: ['avoidance_choices', 'internal_choices']
      }
    });

    this.states.set('adaptive', {
      id: 'adaptive',
      name: 'Socially Adaptive',
      description: 'You find creative ways to connect with others',
      effects: {
        personalStateMultiplier: 1.1,
        socialRelationsMultiplier: 1.3,
        availableChoices: ['creative_choices', 'collaborative_choices']
      }
    });
  }

  private initializeTransitions() {
    this.transitions = [
      {
        from: 'neutral',
        to: 'confident',
        condition: (gameState, choice) => 
          choice.personalStateChange > 5 && choice.socialRelationsChange >= 0
      },
      {
        from: 'neutral',
        to: 'isolated',
        condition: (gameState, choice) => 
          choice.socialRelationsChange < -5
      },
      {
        from: 'confident',
        to: 'adaptive',
        condition: (gameState, choice) => 
          choice.socialRelationsChange > 10
      },
      {
        from: 'isolated',
        to: 'neutral',
        condition: (gameState, choice) => 
          choice.socialRelationsChange > 5
      }
    ];
  }

  processChoice(gameState: GameState, choice: Choice): {
    newState: string;
    modifiedChoice: Choice;
  } {
    // Find applicable transition
    const transition = this.transitions.find(t => 
      t.from === this.currentState && t.condition(gameState, choice)
    );

    if (transition) {
      this.currentState = transition.to;
    }

    // Apply state effects to choice
    const currentStateNode = this.states.get(this.currentState);
    const modifiedChoice: Choice = {
      ...choice,
      personalStateChange: Math.round(
        choice.personalStateChange * (currentStateNode?.effects.personalStateMultiplier || 1)
      ),
      socialRelationsChange: Math.round(
        choice.socialRelationsChange * (currentStateNode?.effects.socialRelationsMultiplier || 1)
      )
    };

    return {
      newState: this.currentState,
      modifiedChoice
    };
  }
}
