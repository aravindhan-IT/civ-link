import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const IssueFilters = ({ filters, onFilterChange, onReset }) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'infrastructure', label: 'Infrastructure & Roads' },
    { value: 'sanitation', label: 'Sanitation & Waste Management' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Street Lighting & Electricity' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'health', label: 'Health & Hygiene' },
    { value: 'administrative', label: 'Administrative Issues' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-card-foreground">
          Filter Issues
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by reference or title..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          placeholder="Category"
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Status"
        />

        <Select
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => onFilterChange('priority', value)}
          placeholder="Priority"
        />
      </div>
    </div>
  );
};

export default IssueFilters;