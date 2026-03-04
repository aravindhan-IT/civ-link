import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with bank-level encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    },
    {
      icon: 'CheckCircle',
      title: 'Government Verified',
      description: 'Official town panchayat registration portal'
    }
  ];

  return (
    <div className="bg-primary/5 rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center space-x-2 mb-4 md:mb-5 lg:mb-6">
        <Icon name="Award" size={24} color="var(--color-primary)" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Why Register with Civic Link?
        </h3>
      </div>
      <div className="space-y-3 md:space-y-4 lg:space-y-5">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base lg:text-lg font-medium text-foreground">
                {feature?.title}
              </h4>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground mt-1">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;