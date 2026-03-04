import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ councillor }) => {
  const metrics = [
    {
      label: 'Issues Resolved',
      value: councillor?.issuesResolved || 0,
      total: councillor?.totalIssues || 0,
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Response Rate',
      value: `${councillor?.responseRate || 0}%`,
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Avg Response Time',
      value: councillor?.avgResponseTime || 'N/A',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Satisfaction Score',
      value: `${councillor?.satisfactionScore || 0}/5.0`,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-md p-4 md:p-6 lg:p-8">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Performance Metrics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-1">
              {metric?.label}
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
              {metric?.value}
            </p>
            {metric?.total && (
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                out of {metric?.total}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;