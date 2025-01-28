import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
        <Globe className="h-5 w-5" />
        <span className="text-sm uppercase">{currentLanguage}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1" role="menu">
          <button
            onClick={() => onLanguageChange('en')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              currentLanguage === 'en' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('pt')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              currentLanguage === 'pt' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Português
          </button>
          <button
            onClick={() => onLanguageChange('es')}
            className={`block px-4 py-2 text-sm w-full text-left ${
              currentLanguage === 'es' ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Español
          </button>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelector;