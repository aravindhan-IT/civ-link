import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CredentialsInfo = ({ currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    {
      role: currentLanguage === 'en' ? 'Resident' : 'निवासी',
      username: 'resident@wardvoice.gov.in',
      password: 'Resident@123'
    },
    {
      role: currentLanguage === 'en' ? 'Councillor' : 'पार्षद',
      username: 'councillor@wardvoice.gov.in',
      password: 'Council@456'
    },
    {
      role: currentLanguage === 'en' ? 'Representative' : 'प्रतिनिधि',
      username: 'representative@wardvoice.gov.in',
      password: 'Rep@789'
    }
  ];

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/10 transition-colors duration-250 ease-out"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Demo Credentials' : 'डेमो क्रेडेंशियल'}
          </span>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
          color="var(--color-primary)" 
        />
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 space-y-3">
          {mockCredentials?.map((cred, index) => (
            <div 
              key={index}
              className="bg-card rounded-md p-3 space-y-2 border border-border"
            >
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} color="var(--color-primary)" />
                <span className="text-xs font-medium text-foreground">{cred?.role}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <span className="text-xs text-muted-foreground min-w-[60px]">
                    {currentLanguage === 'en' ? 'Email:' : 'ईमेल:'}
                  </span>
                  <span className="text-xs text-foreground font-mono break-all">
                    {cred?.username}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-xs text-muted-foreground min-w-[60px]">
                    {currentLanguage === 'en' ? 'Password:' : 'पासवर्ड:'}
                  </span>
                  <span className="text-xs text-foreground font-mono">
                    {cred?.password}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialsInfo;