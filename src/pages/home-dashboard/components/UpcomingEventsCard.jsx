import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingEventsCard = ({ events = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventIcon = (type) => {
    const iconMap = {
      meeting: 'Users',
      announcement: 'Megaphone',
      project: 'Construction',
      survey: 'ClipboardList'
    };
    return iconMap?.[type] || 'Calendar';
  };

  const getEventColor = (type) => {
    const colorMap = {
      meeting: 'primary',
      announcement: 'accent',
      project: 'secondary',
      survey: 'warning'
    };
    return colorMap?.[type] || 'primary';
  };

  const getIconColor = (color) => {
    const colorMap = {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
      warning: 'var(--color-warning)'
    };
    return colorMap?.[color] || 'var(--color-primary)';
  };

  if (events?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 md:p-8 text-center">
        <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-card-foreground">
          Upcoming Events
        </h3>
        <Icon name="Calendar" size={24} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {events?.map((event) => {
          const eventColor = getEventColor(event?.type);
          return (
            <div
              key={event?.id}
              className="flex items-start space-x-4 p-3 md:p-4 rounded-lg hover:bg-muted transition-colors duration-250 ease-out cursor-pointer"
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getIconColor(eventColor)}20` }}
              >
                <Icon name={getEventIcon(event?.type)} size={24} color={getIconColor(eventColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-medium text-card-foreground mb-1 line-clamp-1">
                  {event?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2">
                  {event?.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{formatTime(event?.date)}</span>
                  </div>
                  {event?.location && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span className="line-clamp-1">{event?.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEventsCard;