import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AnnouncementCarousel = ({ announcements = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || announcements?.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, announcements?.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements?.length) % announcements?.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements?.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (announcements?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 md:p-8 lg:p-10 text-center">
        <Icon name="Megaphone" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">No announcements available</p>
      </div>
    );
  }

  const currentAnnouncement = announcements?.[currentIndex];

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] overflow-hidden bg-muted">
          <Image
            src={currentAnnouncement?.image}
            alt={currentAnnouncement?.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {currentAnnouncement?.isUrgent && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-md flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">Urgent</span>
          </div>
        )}

        {announcements?.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary"
              aria-label="Previous announcement"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary"
              aria-label="Next announcement"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </>
        )}
      </div>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-card-foreground mb-2">
              {currentAnnouncement?.title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
              {currentAnnouncement?.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(currentAnnouncement?.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} />
            <span>{currentAnnouncement?.postedBy}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Tag" size={16} />
            <span className="capitalize">{currentAnnouncement?.category}</span>
          </div>
        </div>

        {announcements?.length > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            {announcements?.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-250 ease-out ${
                  index === currentIndex
                    ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementCarousel;