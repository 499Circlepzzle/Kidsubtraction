import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GameLevel, LevelScore } from '@/lib/game';
import { useTranslation } from '@/lib/i18n/translations';

interface ScoreDisplayProps {
  level: GameLevel;
  score: LevelScore;
  onContinue?: () => void;
  onExit?: () => void;
  isLastLevel?: boolean;
}

export function ScoreDisplay({ level, score, onContinue, onExit, isLastLevel }: ScoreDisplayProps) {
  const { t } = useTranslation();
  const percentage = (score.correct / score.total) * 100;

  return (
    <Card className="p-8 max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">{t('levelComplete', { level })}</h2>

      <div className="space-y-4 mb-8">
        <p className="text-2xl">
          {t('score', { correct: score.correct, total: score.total })}
        </p>
        <p className="text-xl text-muted-foreground">
          {t('percentageCorrect', { percentage })}
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        {!isLastLevel && onContinue && (
          <Button onClick={onContinue} size="lg" className="px-8">
            {t('nextLevel')}
          </Button>
        )}
        <Button onClick={onExit} variant="outline" size="lg" className="px-8">
          {t('exit')}
        </Button>
      </div>
    </Card>
  );
}

interface FinalScoreProps {
  scores: Record<GameLevel, LevelScore>;
  totalScore: number;
  onExit: () => void;
}

export function FinalScore({ scores, totalScore, onExit }: FinalScoreProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{t('gameComplete')}</h2>

      <div className="space-y-4 mb-8">
        <p className="text-2xl text-center">
          {t('finalScore', { score: totalScore })}
        </p>

        <div className="space-y-2">
          {Object.entries(scores).map(([level, score]) => (
            <div key={level} className="flex justify-between text-lg">
              <span>{t('level')} {level}:</span>
              <span>{score.correct} / {score.total}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onExit} size="lg" className="px-8">
          {t('playAgain')}
        </Button>
      </div>
    </Card>
  );
}