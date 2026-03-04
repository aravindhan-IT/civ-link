import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Personal Info', icon: 'User' },
    { id: 2, label: 'Address', icon: 'MapPin' },
    { id: 3, label: 'Verification', icon: 'Shield' }
  ];

  return (
    <div className="w-full bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step?.id ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm lg:text-base font-medium text-center ${
                  currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-1 mx-2 md:mx-4">
                <div
                  className={`h-full rounded transition-all duration-300 ${
                    currentStep > step?.id ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegistrationProgress;