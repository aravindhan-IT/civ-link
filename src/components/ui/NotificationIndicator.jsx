import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationIndicator = ({ notifications = [], onNotificationClick, onMarkAsRead, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications?.filter(n => !n?.read)?.length;
    setUnreadCount(count);
  }, [notifications]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (!notification?.read && onMarkAsRead) {
      onMarkAsRead(notification?.id);
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
    setIsOpen(false);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'announcement':
        return 'Megaphone';
      case 'issue':
        return 'AlertCircle';
      case 'message':
        return 'MessageSquare';
      default:
        return 'Bell';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'announcement':
        return 'text-primary';
      case 'issue':
        return 'text-warning';
      case 'message':
        return 'text-secondary';
      default:
        return 'text-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative p-2 text-foreground hover:bg-muted rounded-md transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-popover rounded-lg shadow-lg z-50 max-h-96 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-popover-foreground">
                Notifications
              </h3>
              {notifications?.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-250 ease-out"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <Icon name="BellOff" size={48} color="var(--color-muted-foreground)" />
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    No notifications yet
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications?.map((notification) => (
                    <button
                      key={notification?.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full text-left p-4 transition-colors duration-250 ease-out hover:bg-muted ${
                        !notification?.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 ${getCategoryColor(notification?.category)}`}>
                          <Icon name={getCategoryIcon(notification?.category)} size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            !notification?.read ? 'text-popover-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification?.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {notification?.message}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatTimestamp(notification?.timestamp)}
                          </p>
                        </div>
                        {!notification?.read && (
                          <div className="flex-shrink-0">
                            <span className="inline-block w-2 h-2 bg-accent rounded-full" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIndicator;