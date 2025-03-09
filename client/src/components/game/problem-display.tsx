import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Problem } from '@/lib/game';
import { useState, useRef, useEffect } from 'react';

interface ProblemDisplayProps {
  problem: Problem;
  onAnswer: (answer: number) => void;
  disabled?: boolean;
}

export function ProblemDisplay({ problem, onAnswer, disabled }: ProblemDisplayProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue('');
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem, disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !inputValue) return;
    
    const numAnswer = parseInt(inputValue, 10);
    if (!isNaN(numAnswer)) {
      onAnswer(numAnswer);
    }
  };

  return (
    <Card className="p-8 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <p className="text-6xl font-bold mb-4">
            {problem.first} - {problem.second} = ?
          </p>
          <div className="flex items-center justify-center gap-4">
            <Input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-4xl text-center w-32 h-16"
              disabled={disabled}
              placeholder="?"
            />
            <Button 
              type="submit"
              size="lg"
              disabled={disabled || !inputValue}
              className="h-16 px-8 text-xl"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
