const synth = window.speechSynthesis;

export const speak = (text: string) => {
  if (!synth) return;
  
  // Cancel any ongoing speech
  synth.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  synth.speak(utterance);
};

export const playSound = (type: 'correct' | 'incorrect') => {
  const audio = new Audio(
    type === 'correct' 
      ? 'https://cdn.freesound.org/previews/242/242501_4414128-lq.mp3'  // Ding sound
      : 'https://cdn.freesound.org/previews/142/142608_2494344-lq.mp3'  // Buzzer
  );
  audio.play();
};
