import React from 'react';
import Icon from '../../../components/AppIcon';

const FundUtilizationCard = ({ fundData = {} }) => {
  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const calculatePercentage = (spent, total) => {
    return Math.round((spent / total) * 100);
  };

  const {
    totalBudget = 0,
    totalSpent = 0,
    categories = []
  } = fundData;

  const overallPercentage = calculatePercentage(totalSpent, totalBudget);

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-card-foreground">
          Fund Utilization
        </h3>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-full flex items-center justify-center">
          <Icon name="IndianRupee" size={24} color="var(--color-secondary)" />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm md:text-base text-muted-foreground">Total Budget</span>
          <span className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-card-foreground">
            {formatIndianCurrency(totalBudget)}
          </span>
        </div>
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-sm md:text-base text-muted-foreground">Total Spent</span>
          <span className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-secondary">
            {formatIndianCurrency(totalSpent)}
          </span>
        </div>

        <div className="relative w-full h-3 md:h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs md:text-sm text-muted-foreground">
            {overallPercentage}% Utilized
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            Remaining: {formatIndianCurrency(totalBudget - totalSpent)}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm md:text-base font-medium text-card-foreground">Category Breakdown</h4>
        {categories?.map((category, index) => {
          const percentage = calculatePercentage(category?.spent, category?.allocated);
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-card-foreground">{category?.name}</span>
                <span className="text-sm md:text-base font-medium text-card-foreground whitespace-nowrap">
                  {formatIndianCurrency(category?.spent)} / {formatIndianCurrency(category?.allocated)}
                </span>
              </div>
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${
                    percentage >= 90 ? 'bg-warning' : percentage >= 75 ? 'bg-accent' : 'bg-primary'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{percentage}% utilized</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FundUtilizationCard;