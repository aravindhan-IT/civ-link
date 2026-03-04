import React from 'react';
import Icon from '../../../components/AppIcon';

const WardStatisticsPanel = ({ statistics = {} }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN')?.format(num);
  };

  const {
    totalResidents = 0,
    activeIssues = 0,
    resolvedIssues = 0,
    upcomingMeetings = 0,
    forumDiscussions = 0,
    completedProjects = 0
  } = statistics;

  const stats = [
    {
      id: 1,
      label: 'Total Residents',
      value: formatNumber(totalResidents),
      icon: 'Users',
      color: 'primary'
    },
    {
      id: 2,
      label: 'Active Issues',
      value: formatNumber(activeIssues),
      icon: 'AlertCircle',
      color: 'warning'
    },
    {
      id: 3,
      label: 'Resolved Issues',
      value: formatNumber(resolvedIssues),
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 4,
      label: 'Upcoming Meetings',
      value: formatNumber(upcomingMeetings),
      icon: 'Calendar',
      color: 'accent'
    },
    {
      id: 5,
      label: 'Forum Discussions',
      value: formatNumber(forumDiscussions),
      icon: 'MessageSquare',
      color: 'secondary'
    },
    {
      id: 6,
      label: 'Completed Projects',
      value: formatNumber(completedProjects),
      icon: 'CheckSquare',
      color: 'success'
    }
  ];

  const getIconColor = (color) => {
    const colorMap = {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)'
    };
    return colorMap?.[color] || 'var(--color-primary)';
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-card-foreground mb-6">
        Ward Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-250 ease-out"
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${getIconColor(stat?.color)}20` }}
            >
              <Icon name={stat?.icon} size={24} color={getIconColor(stat?.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">
                {stat?.label}
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-card-foreground whitespace-nowrap">
                {stat?.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardStatisticsPanel;