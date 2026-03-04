import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OngoingProjectsGrid = ({ projects = [] }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on track':
        return 'bg-success text-success-foreground';
      case 'delayed':
        return 'bg-warning text-warning-foreground';
      case 'at risk':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (projects?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 md:p-8 lg:p-10 text-center">
        <Icon name="Construction" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">No ongoing projects</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {projects?.map((project) => (
        <div
          key={project?.id}
          className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-250 ease-out"
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={project?.image}
              alt={project?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 md:p-5 lg:p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-base md:text-lg font-heading font-semibold text-card-foreground line-clamp-2 flex-1">
                {project?.title}
              </h4>
              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(project?.status)}`}>
                {project?.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {project?.description}
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-muted-foreground">Progress</span>
                  <span className="text-xs md:text-sm font-medium text-card-foreground">
                    {project?.completionPercentage}%
                  </span>
                </div>
                <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${project?.completionPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs md:text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>Est. Completion</span>
                </div>
                <span className="font-medium text-card-foreground whitespace-nowrap">
                  {formatDate(project?.estimatedCompletion)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs md:text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="IndianRupee" size={14} />
                  <span>Budget</span>
                </div>
                <span className="font-medium text-card-foreground whitespace-nowrap">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  })?.format(project?.budget)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingProjectsGrid;