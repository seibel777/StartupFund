import { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

type SupportedLanguage = 'en' | 'pt' | 'es';

export function useLanguage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'pt' || browserLang === 'es') {
      setLanguage(browserLang as SupportedLanguage);
    }
  }, []);

  const t = translations[language];

  return { language, t };
}