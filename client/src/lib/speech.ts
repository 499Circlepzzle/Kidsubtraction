const synth = window.speechSynthesis;

export const speak = (text: string) => {
  try {
    if (!synth) {
      console.warn('Speech synthesis not available');
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    synth.speak(utterance);
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
};

export const playSound = (type: 'correct' | 'incorrect') => {
  try {
    const soundUrl = type === 'correct'
      ? 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3' // Simple ding
      : 'https://assets.mixkit.co/active_storage/sfx/2947/2947-preview.mp3'; // Error buzz

    const audio = new Audio(soundUrl);
    audio.volume = 0.5;
    audio.play();
  } catch (error) {
    console.error('Audio playback error:', error);
  }
};