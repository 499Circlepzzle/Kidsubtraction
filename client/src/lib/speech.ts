const synth = window.speechSynthesis;

export const speak = (text: string, lang: string = 'en') => {
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

    // Map language codes to speech synthesis language codes
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'nl': 'nl-NL',
      'ja': 'ja-JP',
      'zh': 'zh-CN',
      'ru': 'ru-RU',
      'hi': 'hi-IN',
      'sw': 'sw-KE',
      'am': 'am-ET',
      'yo': 'yo-NG',
      'zu': 'zu-ZA',
      'ar': 'ar-SA'
    };
    
    // Make sure we're using the correct language code
    utterance.lang = langMap[lang] || 'en-US';
    
    console.log(`Speaking in language: ${lang}, using voice language: ${utterance.lang}`);
    
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