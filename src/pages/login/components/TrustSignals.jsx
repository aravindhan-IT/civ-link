import React from 'react';
import Icon from '../../../components/AppIcon';


const TrustSignals = ({ currentLanguage }) => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: currentLanguage === 'en' ? 'Secure Login' : 'सुरक्षित लॉगिन',
      description: currentLanguage === 'en' ?'Your data is protected with encryption' :'आपका डेटा एन्क्रिप्शन से सुरक्षित है'
    },
    {
      icon: 'CheckCircle',
      title: currentLanguage === 'en' ? 'Government Verified' : 'सरकार द्वारा सत्यापित',
      description: currentLanguage === 'en' ?'Official panchayat platform' :'आधिकारिक पंचायत मंच'
    },
    {
      icon: 'Users',
      title: currentLanguage === 'en' ? 'Trusted by Citizens' : 'नागरिकों द्वारा विश्वसनीय',
      description: currentLanguage === 'en' ?'10,000+ active users' :'10,000+ सक्रिय उपयोगकर्ता'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Building2" size={48} color="var(--color-primary)" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
          {currentLanguage === 'en' ? 'Civic Link' : 'वार्ड वॉइस'}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {currentLanguage === 'en' ?'Transparent Local Governance Platform' :'पारदर्शी स्थानीय शासन मंच'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {trustBadges?.map((badge, index) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
              <Icon name={badge?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-medium text-foreground">
                {badge?.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 pt-4">
        <div className="flex items-center space-x-2">
          
          
        </div>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex items-center space-x-2">
          
          
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;