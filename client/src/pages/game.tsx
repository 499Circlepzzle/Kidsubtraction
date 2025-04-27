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
  getInitialGameState,
  type DifficultySettings,
  DEFAULT_DIFFICULTY
} from '@/lib/game';
import { useTranslation } from '@/lib/i18n/translations';
import { LanguageSelector } from '@/components/language-selector';
import { DifficultySettingsPanel } from '@/components/game/difficulty-settings';

const PROBLEMS_PER_LEVEL = 10;

export default function Game() {
  const { t, language } = useTranslation();
  const [, setLocation] = useLocation();
  const [gameState, setGameState] = useState<GameState>();
  const [showingScore, setShowingScore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [difficultySettings, setDifficultySettings] = useState(DEFAULT_DIFFICULTY);

  const resetGame = useCallback(() => {
    setGameState(undefined);
    setShowingScore(false);
    setLocation('/');
  }, [setLocation]);

  const handleSaveSettings = (newSettings: DifficultySettings) => {
    setDifficultySettings(newSettings);
    setShowSettings(false);
  };

  const startGame = (test: SubtractionTest) => {
    try {
      const state = getInitialGameState(test, difficultySettings);
      const problem = generateProblem(test, []);
      setGameState({
        ...state,
        currentProblem: problem,
        gameStarted: true,
        usedNumbers: [problem.first]
      });
      if (difficultySettings.voiceEnabled) {
        speak(`${problem.first} ${t('minus')} ${problem.second}`, language);
      }
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleAnswer = useCallback((answer: number) => {
    if (!gameState?.currentProblem) return;

    const isCorrect = answer === gameState.currentProblem.answer;
    const currentScore = gameState.scores[gameState.level];

    if (isCorrect) {
      if (difficultySettings.voiceEnabled) {
        speak(t('correct'), language);
      }
      if (difficultySettings.soundEnabled) {
        setTimeout(() => playSound('correct'), 800);
      }
    } else if (difficultySettings.soundEnabled) {
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
      try {
        const nextProblem = generateProblem(gameState.test, gameState.usedNumbers);
        setGameState(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            currentProblem: nextProblem,
            timeLeft: getTimeForLevel(prev.level, difficultySettings),
            usedNumbers: [...prev.usedNumbers, nextProblem.first]
          };
        });
        if (difficultySettings.voiceEnabled) {
          speak(`${nextProblem.first} ${t('minus')} ${nextProblem.second}`, language);
        }
      } catch (error) {
        console.error('Error generating next problem:', error);
      }
    }
  }, [gameState, difficultySettings, t, language]);

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
      handleAnswer(-1);
    }
  }, [gameState, showingScore, handleAnswer]);

  const continueToNextLevel = () => {
    if (!gameState) return;

    const nextLevel = (gameState.level + 1) as GameLevel;
    const problem = generateProblem(gameState.test, []);

    setShowingScore(false);
    setGameState({
      ...gameState,
      level: nextLevel,
      currentProblem: problem,
      timeLeft: getTimeForLevel(nextLevel, difficultySettings),
      usedNumbers: [problem.first]
    });
    if (difficultySettings.voiceEnabled) {
      speak(`${problem.first} ${t('minus')} ${problem.second}`, language);
    }
  };

  if (!gameState?.gameStarted) {
    return (
      <div className="container max-w-2xl mx-auto p-6">
        <Card className="p-8 text-center">
          <div className="flex justify-end mb-4 gap-2">
            <LanguageSelector />
            <Button variant="outline" onClick={() => setShowSettings(true)}>
              {t('settings')}
            </Button>
          </div>
          {showSettings ? (
            <DifficultySettingsPanel
              settings={difficultySettings}
              onSave={handleSaveSettings}
              onCancel={() => setShowSettings(false)}
            />
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                  <Button
                    key={num}
                    onClick={() => startGame(num as SubtractionTest)}
                    size="lg"
                    className="text-xl h-16 text-black hover:text-black"
                  >
                    {t('minus')} {num}
                  </Button>
                ))}
              </div>
            </>
          )}
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
        <h2 className="text-2xl font-bold">{t('level')} {gameState.level}</h2>
        <div className="flex gap-2">
          <LanguageSelector />
          <Button variant="outline" onClick={resetGame}>
            {t('exit')}
          </Button>
        </div>
      </div>

      <Timer
        timeLeft={gameState.timeLeft}
        maxTime={getTimeForLevel(gameState.level, difficultySettings)}
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