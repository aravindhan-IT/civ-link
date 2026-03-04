import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MeetingResolutions = ({ resolutions }) => {
  const handleDownload = (resolutionId) => {
    console.log(`Downloading resolution ${resolutionId}`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {resolutions?.map((resolution) => (
        <div key={resolution?.id} className="bg-card rounded-lg border border-border p-4 md:p-6 hover:shadow-md transition-shadow duration-250">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-start space-x-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="FileText" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
                    {resolution?.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{resolution?.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{resolution?.location}</span>
                    </div>
                    <span>•</span>
                    <span className="font-medium">Meeting #{resolution?.meetingNumber}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Resolution Summary:</p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {resolution?.summary}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Key Decisions:</p>
                  <ul className="space-y-1">
                    {resolution?.decisions?.map((decision, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm md:text-base text-muted-foreground">
                        <Icon name="CheckCircle" size={16} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
                    <span className="text-sm text-muted-foreground">
                      {resolution?.attendees} attendees
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    resolution?.status === 'Approved' ?'bg-success/10 text-success' 
                      : resolution?.status === 'Pending' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon 
                      name={resolution?.status === 'Approved' ? 'CheckCircle' : 'Clock'} 
                      size={14} 
                    />
                    <span className="text-xs font-medium">{resolution?.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => handleDownload(resolution?.id)}
                className="flex-1 lg:flex-none"
              >
                Download PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                iconPosition="left"
                className="flex-1 lg:flex-none"
              >
                View Details
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={resolution?.approverImage}
                  alt={resolution?.approverImageAlt}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{resolution?.approver}</p>
                  <p className="text-xs text-muted-foreground">{resolution?.approverRole}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-xs text-success font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingResolutions;