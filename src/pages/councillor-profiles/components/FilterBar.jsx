import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const FilterBar = ({ searchQuery, onSearchChange, selectedWard, onWardChange, wards }) => {
  return (
    <div className="bg-card rounded-lg shadow-md p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
            <Input
              type="search"
              placeholder="Search by name, ward, or designation..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full lg:w-64">
          <select
            value={selectedWard}
            onChange={(e) => onWardChange(e?.target?.value)}
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-md border border-border bg-background text-sm md:text-base text-foreground transition-colors duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
          >
            <option value="all">All Wards</option>
            {wards?.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;