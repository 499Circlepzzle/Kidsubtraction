import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Timer } from '@/components/game/timer';
import { ProblemDisplay } from '@/components/game/problem-display';
import { ScoreDisplay, FinalScore } from '@/components/game/score-display';
import { speak, playSound } from '@/lib/speech';
import {
  type GameState,
  type SubtractionTest,
  type GameLevel,
  getTimeForLevel,
  generateProblem,
  calculateTotalScore,
  getInitialGameState
} from '@/lib/game';

const PROBLEMS_PER_LEVEL = 10;

export default function Game() {
  const [, setLocation] = useLocation();
  const [gameState, setGameState] = useState<GameState>();
  const [showingScore, setShowingScore] = useState(false);

  const resetGame = useCallback(() => {
    setGameState(undefined);
    setShowingScore(false);
    setLocation('/');
  }, [setLocation]);

  const startGame = (test: SubtractionTest) => {
    const state = getInitialGameState(test);
    const problem = generateProblem(test);
    setGameState({ ...state, currentProblem: problem, gameStarted: true });
    speak(`${problem.first} minus ${problem.second}`);
  };

  const handleAnswer = useCallback((answer: number) => {
    if (!gameState?.currentProblem) return;

    const isCorrect = answer === gameState.currentProblem.answer;
    const currentScore = gameState.scores[gameState.level];

    if (isCorrect) {
      playSound('correct');
      speak('Good!');
    } else {
      playSound('incorrect');
    }

    const newScore = {
      ...currentScore,
      correct: currentScore.correct + (isCorrect ? 1 : 0),
      total: currentScore.total + 1
    };

    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        scores: {
          ...prev.scores,
          [prev.level]: newScore
        }
      };
    });

    if (newScore.total >= PROBLEMS_PER_LEVEL) {
      setShowingScore(true);
    } else {
      const nextProblem = generateProblem(gameState.test);
      setGameState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          currentProblem: nextProblem,
          timeLeft: getTimeForLevel(prev.level)
        };
      });
      speak(`${nextProblem.first} minus ${nextProblem.second}`);
    }
  }, [gameState]);

  const handleTimeUp = useCallback(() => {
    if (!gameState?.currentProblem || showingScore) return;

    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1)
      };
    });

    if (gameState.timeLeft <= 1) {
      handleAnswer(-1); // Force incorrect answer on timeout
    }
  }, [gameState, showingScore, handleAnswer]);

  const continueToNextLevel = () => {
    if (!gameState) return;

    const nextLevel = (gameState.level + 1) as GameLevel;
    const problem = generateProblem(gameState.test);

    setShowingScore(false);
    setGameState({
      ...gameState,
      level: nextLevel,
      currentProblem: problem,
      timeLeft: getTimeForLevel(nextLevel)
    });
    speak(`${problem.first} minus ${nextProblem.second}`);
  };

  if (!gameState?.gameStarted) {
    return (
      <div className="container max-w-2xl mx-auto p-6">
        <Card className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-8">Subtraction Practice</h1>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                onClick={() => startGame(num as SubtractionTest)}
                size="lg"
                className="text-xl h-16"
              >
                Minus {num}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (showingScore) {
    const isLastLevel = gameState.level === 6;
    if (isLastLevel) {
      return (
        <div className="container max-w-2xl mx-auto p-6">
          <FinalScore
            scores={gameState.scores}
            totalScore={calculateTotalScore(gameState.scores)}
            onExit={resetGame}
          />
        </div>
      );
    }

    return (
      <div className="container max-w-2xl mx-auto p-6">
        <ScoreDisplay
          level={gameState.level}
          score={gameState.scores[gameState.level]}
          onContinue={continueToNextLevel}
          onExit={resetGame}
        />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Level {gameState.level}</h2>
        <Button variant="outline" onClick={resetGame}>
          Exit
        </Button>
      </div>

      <Timer
        timeLeft={gameState.timeLeft}
        maxTime={getTimeForLevel(gameState.level)}
        onTimeUp={handleTimeUp}
        isPaused={showingScore}
      />

      {gameState.currentProblem && (
        <ProblemDisplay
          problem={gameState.currentProblem}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}