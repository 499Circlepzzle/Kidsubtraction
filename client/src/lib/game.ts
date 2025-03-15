export type GameLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type SubtractionTest = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface DifficultySettings {
  timePerProblem: number;
  voiceEnabled: boolean;
  soundEnabled: boolean;
  autoAdvance: boolean;
}

export interface Problem {
  first: number;
  second: number;
  answer: number;
}

export interface LevelScore {
  correct: number;
  total: number;
  timePerProblem: number;
}

export interface GameState {
  test: SubtractionTest;
  level: GameLevel;
  scores: Record<GameLevel, LevelScore>;
  currentProblem?: Problem;
  timeLeft: number;
  gameStarted: boolean;
  gameEnded: boolean;
  usedNumbers: number[];
  difficultySettings: DifficultySettings;
}

const BASE_NUMBERS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export const DEFAULT_DIFFICULTY: DifficultySettings = {
  timePerProblem: 15, // Increased from 12 to 15 seconds
  voiceEnabled: true,
  soundEnabled: true,
  autoAdvance: false
};

export const getTimeForLevel = (level: GameLevel, settings: DifficultySettings): number => {
  const baseTime = settings.timePerProblem;
  const reduction = (level - 1) * 1.5; // Reduced time decrease per level
  return Math.max(5, baseTime - reduction); // Increased minimum time from 2 to 5
};

export const generateProblem = (subtractor: SubtractionTest, usedNumbers: number[]): Problem => {
  const availableNumbers = BASE_NUMBERS.filter(num => !usedNumbers.includes(num));

  if (availableNumbers.length === 0) {
    throw new Error('No more available numbers for this level');
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const first = availableNumbers[randomIndex];

  return {
    first,
    second: subtractor,
    answer: first - subtractor
  };
};

export const calculateTotalScore = (scores: Record<GameLevel, LevelScore>): number => {
  return Object.values(scores).reduce((total, levelScore) => {
    return total + levelScore.correct;
  }, 0);
};

export const getInitialGameState = (test: SubtractionTest, settings: DifficultySettings = DEFAULT_DIFFICULTY): GameState => {
  const initialScores: Record<GameLevel, LevelScore> = {
    1: { correct: 0, total: 0, timePerProblem: settings.timePerProblem },
    2: { correct: 0, total: 0, timePerProblem: settings.timePerProblem },
    3: { correct: 0, total: 0, timePerProblem: settings.timePerProblem },
    4: { correct: 0, total: 0, timePerProblem: settings.timePerProblem },
    5: { correct: 0, total: 0, timePerProblem: settings.timePerProblem },
    6: { correct: 0, total: 0, timePerProblem: settings.timePerProblem }
  };

  return {
    test,
    level: 1,
    scores: initialScores,
    timeLeft: settings.timePerProblem,
    gameStarted: false,
    gameEnded: false,
    usedNumbers: [],
    difficultySettings: settings
  };
};