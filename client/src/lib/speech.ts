const synth = window.speechSynthesis;

export const speak = async (text: string) => {
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

    console.log('Speaking:', text); // Debug log

    return new Promise((resolve) => {
      utterance.onend = () => {
        console.log('Speech ended'); // Debug log
        resolve();
      };
      synth.speak(utterance);
    });
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
};

export const playSound = async (type: 'correct' | 'incorrect') => {
  try {
    const soundUrl = type === 'correct'
      ? 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3' // Simple ding
      : 'https://assets.mixkit.co/active_storage/sfx/2947/2947-preview.mp3'; // Error buzz

    console.log('Playing sound:', type); // Debug log

    const audio = new Audio();
    audio.src = soundUrl;
    audio.volume = 0.5;

    return new Promise((resolve, reject) => {
      audio.onended = () => {
        console.log('Sound ended'); // Debug log
        resolve();
      };
      audio.onerror = (e) => {
        console.error('Audio error:', e);
        reject(e);
      };
      audio.play().catch(error => {
        console.error('Audio playback error:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('Audio playback error:', error);
  }
};