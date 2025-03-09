import { ReactNode, useState } from 'react';
import { I18nContext, Language, translations, TranslationKey } from './translations';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    let text = translations[language][key] || translations.en[key];
    
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        text = text.replace(`{{${key}}}`, String(value));
      });
    }
    
    return text;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
