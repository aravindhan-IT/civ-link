import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CouncillorCard = ({ councillor, onMessageClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContactClick = (type, value) => {
    if (type === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-250 ease-out hover:shadow-lg">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative">
              <Image
                src={councillor?.profileImage}
                alt={councillor?.profileImageAlt}
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg object-cover"
              />
              {councillor?.isVerified && (
                <div className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-full p-1.5 md:p-2 shadow-md">
                  <Icon name="BadgeCheck" size={16} className="md:w-5 md:h-5" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 md:mb-4">
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                  {councillor?.name}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  {councillor?.designation}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-md bg-primary/10 text-primary text-xs md:text-sm font-medium">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {councillor?.ward}
                </span>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex items-start gap-2">
                <Icon name="Calendar" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-base text-foreground">
                    <span className="font-medium">Tenure:</span> {councillor?.tenure}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon name="GraduationCap" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-base text-foreground">
                    <span className="font-medium">Education:</span> {councillor?.education}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon name="Briefcase" size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-base text-foreground">
                    <span className="font-medium">Experience:</span> {councillor?.experience}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <Button
                variant="default"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
                onClick={() => onMessageClick(councillor)}
                className="flex-1 sm:flex-initial"
              >
                Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => handleContactClick('phone', councillor?.phone)}
                className="flex-1 sm:flex-initial"
              >
                Call
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                onClick={() => handleContactClick('email', councillor?.email)}
                className="flex-1 sm:flex-initial"
              >
                Email
              </Button>
            </div>

            {councillor?.achievements && councillor?.achievements?.length > 0 && (
              <div className="mt-4 md:mt-6">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-colors duration-250 ease-out"
                >
                  <span>Key Achievements</span>
                  <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={18} />
                </button>
                
                {isExpanded && (
                  <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                    {councillor?.achievements?.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={16} className="text-success flex-shrink-0 mt-1" />
                        <span className="text-sm md:text-base text-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted px-4 py-3 md:px-6 md:py-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-xs md:text-sm text-muted-foreground">
                Office Hours: {councillor?.officeHours}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-xs md:text-sm text-foreground font-medium">
                {councillor?.responseRate}% Response Rate
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Star" size={16} className="text-warning fill-warning" />
            <span className="text-xs md:text-sm text-foreground font-medium">
              {councillor?.satisfactionScore}/5.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouncillorCard;