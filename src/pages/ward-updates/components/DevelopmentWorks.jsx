import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DevelopmentWorks = ({ projects }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/10 text-success';
      case 'In Progress':
        return 'bg-primary/10 text-primary';
      case 'Planned':
        return 'bg-warning/10 text-warning';
      case 'On Hold':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return 'CheckCircle';
      case 'In Progress':
        return 'Clock';
      case 'Planned':
        return 'Calendar';
      case 'On Hold':
        return 'PauseCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {projects?.map((project) => (
        <div key={project?.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-250">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-1 h-48 lg:h-auto overflow-hidden">
              <Image
                src={project?.image}
                alt={project?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-2 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                    {project?.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {project?.description}
                  </p>
                </div>
                <div className={`flex-shrink-0 flex items-center space-x-2 px-3 py-1.5 rounded-full ${getStatusColor(project?.status)}`}>
                  <Icon name={getStatusIcon(project?.status)} size={16} />
                  <span className="text-xs font-medium whitespace-nowrap">{project?.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="text-sm font-medium text-foreground">{project?.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="IndianRupee" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium text-foreground whitespace-nowrap">
                        ₹{project?.budget?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="Building2" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contractor</p>
                      <p className="text-sm font-medium text-foreground">{project?.contractor}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{project?.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm font-semibold text-primary">{project?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${project?.progress}%` }}
                  />
                </div>
              </div>

              {project?.milestones && project?.milestones?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Key Milestones:</p>
                  <div className="space-y-2">
                    {project?.milestones?.map((milestone, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Icon 
                          name={milestone?.completed ? 'CheckCircle' : 'Circle'} 
                          size={16} 
                          color={milestone?.completed ? 'var(--color-success)' : 'var(--color-muted-foreground)'} 
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span className={`text-sm ${milestone?.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {milestone?.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Image"
                  iconPosition="left"
                >
                  View Photos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Project Report
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="left"
                >
                  More Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DevelopmentWorks;