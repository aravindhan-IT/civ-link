import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BudgetDetails = ({ budgetData }) => {
  const COLORS = ['#1E40AF', '#059669', '#DC2626', '#F59E0B', '#8B5CF6', '#EC4899'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-popover-foreground">{payload?.[0]?.name}</p>
          <p className="text-sm text-primary font-semibold">₹{payload?.[0]?.value?.toLocaleString('en-IN')}</p>
        </div>);

    }
    return null;
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
              Budget Overview FY 2024-25
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Total allocated budget and spending breakdown
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-success/10 px-3 py-2 rounded-md">
            <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Wallet" size={20} color="var(--color-primary)" />
              <span className="text-sm text-muted-foreground">Total Budget</span>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              ₹{budgetData?.totalBudget?.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-secondary/5 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={20} color="var(--color-secondary)" />
              <span className="text-sm text-muted-foreground">Spent</span>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              ₹{budgetData?.spent?.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {(budgetData?.spent / budgetData?.totalBudget * 100)?.toFixed(1)}% utilized
            </p>
          </div>

          <div className="bg-warning/5 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
              <span className="text-sm text-muted-foreground">Committed</span>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              ₹{budgetData?.committed?.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-accent/5 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="PiggyBank" size={20} color="var(--color-accent)" />
              <span className="text-sm text-muted-foreground">Available</span>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              ₹{budgetData?.available?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
              Budget Allocation by Category
            </h3>
            <div className="w-full h-64 md:h-80" aria-label="Budget allocation pie chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData?.allocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value">

                    {budgetData?.allocation?.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                    )}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
              Spending Comparison (Last 6 Months)
            </h3>
            <div className="w-full h-64 md:h-80" aria-label="Monthly spending bar chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData?.monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="spent" fill="var(--color-primary)" name="Spent" />
                  <Bar dataKey="allocated" fill="var(--color-secondary)" name="Allocated" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
          Detailed Category Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Allocated</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Spent</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Remaining</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {budgetData?.allocation?.map((item, index) => {
                const spent = item?.value * 0.65;
                const remaining = item?.value - spent;
                const utilization = spent / item?.value * 100;

                return (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{item?.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right whitespace-nowrap">
                      ₹{item?.value?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground text-right whitespace-nowrap">
                      ₹{spent?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground text-right whitespace-nowrap">
                      ₹{remaining?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${utilization}%` }} />

                        </div>
                        <span className="text-sm text-foreground whitespace-nowrap">
                          {utilization?.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Official Verification
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} color="var(--color-success)" />
            <span className="text-sm text-success font-medium">Authenticated</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1b686b60e-1763292151580.png"
                alt="Professional headshot of Indian male councillor with grey hair wearing white kurta and glasses"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary" />

              <div>
                <p className="text-sm font-medium text-foreground">Approved by</p>
                <p className="text-base font-heading font-semibold text-foreground">Rajesh Kumar</p>
                <p className="text-sm text-muted-foreground">Ward Councillor</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Approved on: 15/12/2024</span>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-2">
                <Icon name="FileCheck" size={48} color="var(--color-primary)" />
              </div>
              <p className="text-xs text-muted-foreground">Official Seal</p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default BudgetDetails;