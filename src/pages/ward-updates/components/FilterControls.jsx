import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  searchQuery, 
  onSearchChange, 
  dateRange, 
  onDateRangeChange,
  category,
  onCategoryChange,
  onExport,
  categoryOptions 
}) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <Input
              type="search"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>

          <Select
            placeholder="Select category"
            options={categoryOptions}
            value={category}
            onChange={onCategoryChange}
          />

          <div className="flex items-center space-x-2">
            <Input
              type="date"
              value={dateRange?.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
              className="flex-1"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              value={dateRange?.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileSpreadsheet"
            iconPosition="left"
            onClick={() => onExport('excel')}
          >
            Export Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={() => onExport('csv')}
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;