import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IssueDetailModal = ({ issue, onClose }) => {
  if (!issue) return null;

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
        return 'text-destructive bg-destructive/10';
      case 'high':
        return 'text-warning bg-warning/10';
      case 'medium':
        return 'text-secondary bg-secondary/10';
      case 'low':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground">
            Issue Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                issue?.status
              )}`}
            >
              {issue?.status?.charAt(0)?.toUpperCase() + issue?.status?.slice(1)?.replace('-', ' ')}
            </span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(
                issue?.priority
              )}`}
            >
              {issue?.priority?.charAt(0)?.toUpperCase() + issue?.priority?.slice(1)} Priority
            </span>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground mb-2">
              {issue?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Reference Number: {issue?.referenceNumber}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Icon name="Tag" size={20} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-sm font-medium text-foreground">Category</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {issue?.category?.replace('-', ' ')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={20} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">{issue?.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-sm font-medium text-foreground">Submitted</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(issue?.submittedDate)}
                </p>
              </div>
            </div>

            {issue?.assignedTo && (
              <div className="flex items-start space-x-3">
                <Icon name="User" size={20} color="var(--color-muted-foreground)" />
                <div>
                  <p className="text-sm font-medium text-foreground">Assigned To</p>
                  <p className="text-sm text-muted-foreground">{issue?.assignedTo}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-base font-medium text-foreground mb-2">Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {issue?.description}
            </p>
          </div>

          {issue?.images && issue?.images?.length > 0 && (
            <div>
              <h4 className="text-base font-medium text-foreground mb-3">Attachments</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {issue?.images?.map((img, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={img?.url}
                      alt={img?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {issue?.progressHistory && issue?.progressHistory?.length > 0 && (
            <div>
              <h4 className="text-base font-medium text-foreground mb-3">Progress History</h4>
              <div className="space-y-3">
                {issue?.progressHistory?.map((update, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{update?.status}</p>
                      <p className="text-sm text-muted-foreground">{update?.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(update?.timestamp)} • {update?.updatedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {issue?.estimatedResolution && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={20} color="var(--color-primary)" />
                <h4 className="text-base font-medium text-foreground">
                  Estimated Resolution
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(issue?.estimatedResolution)}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 border-t border-border">
          <Button variant="outline" size="lg" onClick={onClose} fullWidth>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailModal;