const synth = window.speechSynthesis;

export const speak = (text: string) => {
  try {
    if (!synth) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    synth.speak(utterance);
  } catch (error) {
    console.warn('Speech synthesis error:', error);
  }
};

export const playSound = async (type: 'correct' | 'incorrect') => {
  try {
    const audio = new Audio(
      type === 'correct' 
        ? 'https://cdn.freesound.org/previews/242/242501_4414128-lq.mp3'  // Ding sound
        : 'https://cdn.freesound.org/previews/142/142608_2494344-lq.mp3'  // Buzzer
    );

    // Wait for the audio to load before playing
    await new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', resolve);
      audio.addEventListener('error', reject);
      // Set a timeout in case the audio fails to load
      setTimeout(reject, 3000);
    });

    await audio.play();
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
};