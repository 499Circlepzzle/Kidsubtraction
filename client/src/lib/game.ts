export type GameLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type SubtractionTest = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
  usedNumbers: number[]; // Track used numbers
}

const BASE_NUMBERS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export const getTimeForLevel = (level: GameLevel): number => {
  const times = {
    1: 12,
    2: 10,
    3: 8,
    4: 6,
    5: 4,
    6: 2
  };
  return times[level];
};

export const generateProblem = (subtractor: SubtractionTest, usedNumbers: number[]): Problem => {
  // Filter out already used numbers
  const availableNumbers = BASE_NUMBERS.filter(num => !usedNumbers.includes(num));

  // If all numbers have been used, this shouldn't happen in normal gameplay
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

export const getInitialGameState = (test: SubtractionTest): GameState => {
  const initialScores: Record<GameLevel, LevelScore> = {
    1: { correct: 0, total: 0, timePerProblem: 12 },
    2: { correct: 0, total: 0, timePerProblem: 10 },
    3: { correct: 0, total: 0, timePerProblem: 8 },
    4: { correct: 0, total: 0, timePerProblem: 6 },
    5: { correct: 0, total: 0, timePerProblem: 4 },
    6: { correct: 0, total: 0, timePerProblem: 2 }
  };

  return {
    test,
    level: 1,
    scores: initialScores,
    timeLeft: 12,
    gameStarted: false,
    gameEnded: false,
    usedNumbers: [] // Initialize empty array of used numbers
  };
};