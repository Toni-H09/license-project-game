
import AsyncStorage from '@react-native-async-storage/async-storage';

const METRICS_KEY = 'gameMetrics';

export interface LocalMetrics {
  playthroughsStarted: number;
  playthroughsCompleted: number;
  choices: { [key: string]: number };
  characterSelections: {
    male: number;
    female: number;
  };
  endings: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export const initialMetrics: LocalMetrics = {
  playthroughsStarted: 0,
  playthroughsCompleted: 0,
  choices: {},
  characterSelections: {
    male: 0,
    female: 0,
  },
  endings: {
    positive: 0,
    neutral: 0,
    negative: 0,
  },
};

// Function to get current metrics
export const getMetrics = async (): Promise<LocalMetrics> => {
  try {
    const jsonValue = await AsyncStorage.getItem(METRICS_KEY);
    if (jsonValue !== null) {
      const storedMetrics = JSON.parse(jsonValue);
      // Deep merge to ensure nested objects like 'endings' and 'characterSelections' are handled correctly
      return {
        ...initialMetrics,
        ...storedMetrics,
        endings: {
          ...initialMetrics.endings,
          ...(storedMetrics.endings || {}),
        },
        choices: {
          ...initialMetrics.choices,
          ...(storedMetrics.choices || {}),
        },
        characterSelections: {
          ...initialMetrics.characterSelections,
          ...(storedMetrics.characterSelections || {}),
        },
      };
    }
    return initialMetrics;
  } catch (e) {
    return initialMetrics;
  }
};

// Function to save metrics
const saveMetrics = async (metrics: LocalMetrics) => {
  try {
    const jsonValue = JSON.stringify(metrics);
    await AsyncStorage.setItem(METRICS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save metrics.', e);
  }
};

// --- Tracking Functions ---

export const trackGameStart = async () => {
  try {
    const metrics = await getMetrics();
    metrics.playthroughsStarted += 1;
    await saveMetrics(metrics);
  } catch (error) {
    console.error('Error in trackGameStart:', error);
  }
};

export const trackCharacterSelection = async (gender: 'male' | 'female') => {
  try {
    const metrics = await getMetrics();
    metrics.characterSelections[gender] += 1;
    await saveMetrics(metrics);
  } catch (error) {
    console.error('Error in trackCharacterSelection:', error);
  }
};

export const trackChoice = async (choiceId: string) => {
  const metrics = await getMetrics();
  metrics.choices[choiceId] = (metrics.choices[choiceId] || 0) + 1;
  await saveMetrics(metrics);
};

export const trackGameCompletion = async (endingType: 'positive' | 'neutral' | 'negative') => {
  try {
    const metrics = await getMetrics();
    metrics.playthroughsCompleted += 1;
    metrics.endings[endingType] += 1;
    await saveMetrics(metrics);
  } catch (error) {
    console.error('Error in trackGameCompletion:', error);
  }
};

export const resetMetrics = async () => {
  try {
    // Overwrite the metrics with initialMetrics (no need to remove the key)
    await AsyncStorage.setItem(METRICS_KEY, JSON.stringify(initialMetrics));
  } catch (e) {
    console.error('Failed to reset metrics.', e);
  }
};

export const debugMetrics = async () => {
  try {
    const rawValue = await AsyncStorage.getItem(METRICS_KEY);
    const metrics = await getMetrics();
    return metrics;
  } catch (error) {
    console.error('Error debugging metrics:', error);
  }
};
