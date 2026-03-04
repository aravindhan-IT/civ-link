import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEvents = ({ events }) => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date?.getDate(),
      month: date?.toLocaleDateString('en-IN', { month: 'short' }),
      time: date?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting':
        return 'Users';
      case 'visit':
        return 'MapPin';
      case 'event':
        return 'Calendar';
      default:
        return 'Clock';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-primary/10 text-primary';
      case 'visit':
        return 'bg-secondary/10 text-secondary';
      case 'event':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!events || events?.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Upcoming Events
        </h3>
        <div className="text-center py-8 md:py-12">
          <Icon name="CalendarX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-sm md:text-base text-muted-foreground">
            No upcoming events scheduled
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Upcoming Events
      </h3>
      <div className="space-y-4 md:space-y-6">
        {events?.map((event) => {
          const dateInfo = formatEventDate(event?.date);
          return (
            <div key={event?.id} className="flex gap-4 md:gap-6 p-4 md:p-5 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-250 ease-out">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-card rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xl md:text-2xl font-heading font-bold text-foreground">
                    {dateInfo?.day}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground uppercase">
                    {dateInfo?.month}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-base md:text-lg font-heading font-semibold text-foreground">
                    {event?.title}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getEventColor(event?.type)} flex-shrink-0`}>
                    <Icon name={getEventIcon(event?.type)} size={12} className="mr-1" />
                    {event?.type?.charAt(0)?.toUpperCase() + event?.type?.slice(1)}
                  </span>
                </div>

                <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-2">
                  {event?.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={14} />
                    <span>{dateInfo?.time}</span>
                  </div>
                  {event?.location && (
                    <div className="flex items-center gap-1.5">
                      <Icon name="MapPin" size={14} />
                      <span className="line-clamp-1">{event?.location}</span>
                    </div>
                  )}
                  {event?.attendees && (
                    <div className="flex items-center gap-1.5">
                      <Icon name="Users" size={14} />
                      <span>{event?.attendees} attending</span>
                    </div>
                  )}
                </div>

                {event?.registrationRequired && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;