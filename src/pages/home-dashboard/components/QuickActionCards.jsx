import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCards = ({ actions = [] }) => {
  const navigate = useNavigate();

  const handleActionClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

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

  if (actions?.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {actions?.map((action) => (
        <button
          key={action?.id}
          onClick={() => handleActionClick(action?.path)}
          className="bg-card rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 text-left group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-transform duration-250 ease-out group-hover:scale-110`}
                 style={{ backgroundColor: `${getIconColor(action?.color)}20` }}>
              <Icon name={action?.icon} size={24} color={getIconColor(action?.color)} />
            </div>
            {action?.badge > 0 && (
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-bold text-white bg-accent rounded-full">
                {action?.badge > 99 ? '99+' : action?.badge}
              </span>
            )}
          </div>

          <h4 className="text-base md:text-lg font-heading font-semibold text-card-foreground mb-2">
            {action?.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {action?.description}
          </p>

          <div className="flex items-center space-x-2 mt-4 text-sm font-medium" style={{ color: getIconColor(action?.color) }}>
            <span>{action?.actionText}</span>
            <Icon name="ArrowRight" size={16} color={getIconColor(action?.color)} />
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActionCards;