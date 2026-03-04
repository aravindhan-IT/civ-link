import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import LanguageToggle from './components/LanguageToggle';
import CredentialsInfo from './components/CredentialsInfo';

const Login = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  return (
    <>
      <Helmet>
        <title>Login -  Civic Link | Transparent Local Governance Platform</title>
        <meta name="description" content="Secure login to Civic Link platform for residents, councillors, and ward representatives to access local governance services and updates." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="absolute top-4 right-4 z-10">
          <LanguageToggle 
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <TrustSignals currentLanguage={currentLanguage} />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                        {currentLanguage === 'en' ? 'Welcome Back' : 'वापसी पर स्वागत है'}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage === 'en' ?'Sign in to access your ward governance portal' :'अपने वार्ड शासन पोर्टल तक पहुंचने के लिए साइन इन करें'}
                      </p>
                    </div>

                    <LoginForm 
                      onLanguageChange={handleLanguageChange}
                      currentLanguage={currentLanguage}
                    />

                    <CredentialsInfo currentLanguage={currentLanguage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-6 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                {currentLanguage === 'en'
                  ? `© ${new Date()?.getFullYear()} Civic Link. All rights reserved.`
                  : `© ${new Date()?.getFullYear()} वार्ड वॉइस। सर्वाधिकार सुरक्षित।`}
              </p>
              <div className="flex items-center space-x-4 text-xs md:text-sm">
                <button className="text-muted-foreground hover:text-foreground transition-colors duration-250 ease-out">
                  {currentLanguage === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
                </button>
                <span className="text-border">|</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors duration-250 ease-out">
                  {currentLanguage === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}
                </button>
                <span className="text-border">|</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors duration-250 ease-out">
                  {currentLanguage === 'en' ? 'Help' : 'मदद'}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;