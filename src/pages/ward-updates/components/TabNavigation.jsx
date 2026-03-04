import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-2 overflow-x-auto scrollbar-hide" aria-label="Ward updates tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-all duration-250 ease-out whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
              aria-current={activeTab === tab?.id ? 'page' : undefined}
            >
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;