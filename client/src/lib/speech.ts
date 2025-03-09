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

    // Return a promise that resolves when speech is done
    return new Promise((resolve) => {
      utterance.onend = resolve;
      synth.speak(utterance);
    });
  } catch (error) {
    console.warn('Speech synthesis error:', error);
  }
};

export const playSound = async (type: 'correct' | 'incorrect') => {
  try {
    const soundUrl = type === 'correct'
      ? 'https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3' // Success ding
      : 'https://assets.mixkit.co/active_storage/sfx/2947/2947-preview.mp3'; // Error buzz

    const audio = new Audio(soundUrl);
    audio.volume = 0.5; // Reduce volume slightly

    await audio.play();

    return new Promise((resolve) => {
      audio.onended = resolve;
    });
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
};