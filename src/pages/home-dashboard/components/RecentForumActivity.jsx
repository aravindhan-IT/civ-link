import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentForumActivity = ({ activities = [] }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      discussion: 'MessageSquare',
      announcement: 'Megaphone',
      poll: 'BarChart3',
      feedback: 'MessageCircle'
    };
    return iconMap?.[category] || 'MessageSquare';
  };

  if (activities?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 md:p-8 text-center">
        <Icon name="MessageSquare" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">No recent forum activity</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-card-foreground">
          Recent Forum Activity
        </h3>
        <Icon name="MessageSquare" size={24} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-3 p-3 md:p-4 rounded-lg hover:bg-muted transition-colors duration-250 ease-out cursor-pointer"
          >
            <div className="flex-shrink-0">
              {activity?.userAvatar ? (
                <Image
                  src={activity?.userAvatar}
                  alt={activity?.userAvatarAlt}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm md:text-base font-medium text-card-foreground">
                  {activity?.userName}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(activity?.timestamp)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {activity?.content}
              </p>

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name={getCategoryIcon(activity?.category)} size={14} />
                  <span className="capitalize">{activity?.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={14} />
                  <span>{activity?.replies} replies</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="ThumbsUp" size={14} />
                  <span>{activity?.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentForumActivity;