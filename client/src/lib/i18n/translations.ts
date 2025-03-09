import { createContext, useContext } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de';

export const translations = {
  en: {
    title: "Subtraction Practice",
    minus: "Minus",
    timeLeft: "Time Left",
    submit: "Submit",
    correct: "Good!",
    level: "Level",
    exit: "Exit",
    nextLevel: "Next Level",
    levelComplete: "Level {{level}} Complete!",
    score: "Score: {{correct}} / {{total}}",
    percentageCorrect: "{{percentage}}% Correct",
    gameComplete: "Game Complete!",
    finalScore: "Final Score: {{score}} / 60",
    playAgain: "Play Again",
    language: "Language"
  },
  es: {
    title: "Práctica de Resta",
    minus: "Menos",
    timeLeft: "Tiempo Restante",
    submit: "Enviar",
    correct: "¡Bien!",
    level: "Nivel",
    exit: "Salir",
    nextLevel: "Siguiente Nivel",
    levelComplete: "¡Nivel {{level}} Completado!",
    score: "Puntuación: {{correct}} / {{total}}",
    percentageCorrect: "{{percentage}}% Correctos",
    gameComplete: "¡Juego Completado!",
    finalScore: "Puntuación Final: {{score}} / 60",
    playAgain: "Jugar de Nuevo",
    language: "Idioma"
  },
  fr: {
    title: "Exercice de Soustraction",
    minus: "Moins",
    timeLeft: "Temps Restant",
    submit: "Valider",
    correct: "Bien!",
    level: "Niveau",
    exit: "Quitter",
    nextLevel: "Niveau Suivant",
    levelComplete: "Niveau {{level}} Terminé!",
    score: "Score: {{correct}} / {{total}}",
    percentageCorrect: "{{percentage}}% Correct",
    gameComplete: "Jeu Terminé!",
    finalScore: "Score Final: {{score}} / 60",
    playAgain: "Rejouer",
    language: "Langue"
  },
  de: {
    title: "Subtraktionsübung",
    minus: "Minus",
    timeLeft: "Verbleibende Zeit",
    submit: "Bestätigen",
    correct: "Gut!",
    level: "Level",
    exit: "Beenden",
    nextLevel: "Nächstes Level",
    levelComplete: "Level {{level}} Abgeschlossen!",
    score: "Punktzahl: {{correct}} / {{total}}",
    percentageCorrect: "{{percentage}}% Richtig",
    gameComplete: "Spiel Beendet!",
    finalScore: "Endpunktzahl: {{score}} / 60",
    playAgain: "Nochmal Spielen",
    language: "Sprache"
  }
};

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}