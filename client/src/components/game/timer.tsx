import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeLeft: number;
  maxTime: number;
  onTimeUp: () => void;
  isPaused: boolean;
}

export function Timer({ timeLeft, maxTime, onTimeUp, isPaused }: TimerProps) {
  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      onTimeUp();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const progress = (timeLeft / maxTime) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Time Left:</span>
        <span>{Math.ceil(timeLeft)}s</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
}
