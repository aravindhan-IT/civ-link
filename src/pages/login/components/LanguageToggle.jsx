import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-1">
      <button
        onClick={() => onLanguageChange('en')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-250 ease-out ${
          currentLanguage === 'en' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        <Icon name="Languages" size={16} />
        <span>English</span>
      </button>
      <button
        onClick={() => onLanguageChange('hi')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-250 ease-out ${
          currentLanguage === 'hi' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to Hindi"
      >
        <Icon name="Languages" size={16} />
        <span>हिंदी</span>
      </button>
    </div>
  );
};

export default LanguageToggle;