import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentAnnouncements = ({ announcements }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return date?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'meeting':
        return 'Users';
      case 'project':
        return 'Briefcase';
      case 'announcement':
        return 'Megaphone';
      default:
        return 'Bell';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'meeting':
        return 'text-primary bg-primary/10';
      case 'project':
        return 'text-secondary bg-secondary/10';
      case 'announcement':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (!announcements || announcements?.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Recent Announcements
        </h3>
        <div className="text-center py-8 md:py-12">
          <Icon name="Megaphone" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-sm md:text-base text-muted-foreground">
            No recent announcements available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Recent Announcements
      </h3>
      <div className="space-y-4 md:space-y-6">
        {announcements?.map((announcement) => (
          <div key={announcement?.id} className="border-l-4 border-primary pl-4 md:pl-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs md:text-sm font-medium ${getCategoryColor(announcement?.category)}`}>
                  <Icon name={getCategoryIcon(announcement?.category)} size={14} className="mr-1" />
                  {announcement?.category?.charAt(0)?.toUpperCase() + announcement?.category?.slice(1)}
                </span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                {formatDate(announcement?.timestamp)}
              </span>
            </div>
            <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
              {announcement?.title}
            </h4>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
              {announcement?.description}
            </p>
            {announcement?.relatedWardUpdate && (
              <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-primary">
                <Icon name="Link" size={14} />
                <span>Related to: {announcement?.relatedWardUpdate}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnnouncements;