import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IssueCard = ({ issue, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'text-success bg-success/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      case 'rejected':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-destructive';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-secondary';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'infrastructure':
        return 'Construction';
      case 'sanitation':
        return 'Trash2';
      case 'water':
        return 'Droplet';
      case 'electricity':
        return 'Lightbulb';
      case 'safety':
        return 'Shield';
      case 'health':
        return 'Heart';
      case 'administrative':
        return 'FileText';
      default:
        return 'AlertCircle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onClick(issue)}
      className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border hover:shadow-md transition-all duration-250 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className={`flex-shrink-0 ${getPriorityColor(issue?.priority)}`}>
            <Icon name={getCategoryIcon(issue?.category)} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-medium text-card-foreground line-clamp-2 mb-1">
              {issue?.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Ref: {issue?.referenceNumber}
            </p>
          </div>
        </div>
        <span
          className={`flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            issue?.status
          )}`}
        >
          {issue?.status?.charAt(0)?.toUpperCase() + issue?.status?.slice(1)?.replace('-', ' ')}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {issue?.description}
      </p>
      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span className="line-clamp-1">{issue?.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>{formatDate(issue?.submittedDate)}</span>
        </div>
        {issue?.assignedTo && (
          <div className="flex items-center space-x-1">
            <Icon name="User" size={14} />
            <span className="line-clamp-1">{issue?.assignedTo}</span>
          </div>
        )}
      </div>
      {issue?.images && issue?.images?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {issue?.images?.slice(0, 3)?.map((img, index) => (
            <div key={index} className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden">
              <Image
                src={img?.url}
                alt={img?.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {issue?.images?.length > 3 && (
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                +{issue?.images?.length - 3}
              </span>
            </div>
          )}
        </div>
      )}
      {issue?.estimatedResolution && (
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Est. Resolution:</span>
          <span className="font-medium text-foreground">
            {formatDate(issue?.estimatedResolution)}
          </span>
        </div>
      )}
    </div>
  );
};

export default IssueCard;