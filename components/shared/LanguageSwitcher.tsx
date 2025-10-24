import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = i18n.dir(lng);
    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', lng);
  };

  React.useEffect(() => {
    // Load saved language preference on mount
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      changeLanguage(savedLang);
    }
  }, []);

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-black border-2 border-neon-red/30 text-foreground rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-neon-red transition-all cursor-pointer hover:border-neon-red/50"
        style={{ minWidth: '120px' }}
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
