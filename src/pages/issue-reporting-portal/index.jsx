import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainNavigation from '../../components/ui/MainNavigation';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import IssueForm from './components/IssueForm';
import IssueCard from './components/IssueCard';
import IssueDetailModal from './components/IssueDetailModal';
import IssueFilters from './components/IssueFilters';

const IssueReportingPortal = () => {
  const [isAuthenticated] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    priority: ''
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('wardVoiceLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const mockUser = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    role: "resident",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  const mockNotifications = [
  {
    id: 1,
    category: "issue",
    title: "Issue Update",
    message: "Your reported pothole issue has been assigned to maintenance team",
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: 2,
    category: "announcement",
    title: "New Feature",
    message: "You can now track issue resolution progress in real-time",
    timestamp: new Date(Date.now() - 7200000),
    read: false
  }];


  const mockIssues = [
  {
    id: 1,
    referenceNumber: "WV2025001234",
    category: "infrastructure",
    title: "Large pothole on Main Street causing traffic issues",
    description: "There is a large pothole near the intersection of Main Street and Park Avenue. It has been causing significant traffic disruption and poses a safety hazard to vehicles and pedestrians. The pothole is approximately 2 feet wide and 6 inches deep.",
    location: "Main Street, Near Park Avenue Intersection, Ward 12",
    priority: "high",
    status: "in-progress",
    submittedDate: "2025-12-20T10:30:00",
    assignedTo: "Municipal Maintenance Team",
    estimatedResolution: "2025-12-28T17:00:00",
    images: [
    {
      url: "https://images.unsplash.com/photo-1728340964368-59c3192e44e6",
      alt: "Large pothole on asphalt road with visible cracks and damaged surface near intersection"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd30850c-1765208174343.png",
      alt: "Close-up view of deep road pothole showing deteriorated pavement and exposed base layer"
    }],

    progressHistory: [
    {
      status: "Issue Assigned",
      message: "Issue has been assigned to Municipal Maintenance Team for inspection",
      timestamp: "2025-12-21T09:00:00",
      updatedBy: "Ward Officer"
    },
    {
      status: "Inspection Completed",
      message: "Site inspection completed. Repair work scheduled for next week",
      timestamp: "2025-12-22T14:30:00",
      updatedBy: "Maintenance Inspector"
    }]

  },
  {
    id: 2,
    referenceNumber: "WV2025001235",
    category: "sanitation",
    title: "Overflowing garbage bins at Market Square",
    description: "The garbage bins at Market Square have been overflowing for the past three days. This is creating unhygienic conditions and attracting stray animals. Immediate attention required.",
    location: "Market Square, Central Ward",
    priority: "urgent",
    status: "pending",
    submittedDate: "2025-12-23T08:15:00",
    assignedTo: null,
    estimatedResolution: null,
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_139a3613b-1765545055009.png",
      alt: "Overflowing public garbage bins with waste scattered around in urban market area"
    }],

    progressHistory: []
  },
  {
    id: 3,
    referenceNumber: "WV2025001236",
    category: "water",
    title: "Water leakage from underground pipe",
    description: "Continuous water leakage observed from underground pipe near residential area. Water is being wasted and creating muddy conditions on the road.",
    location: "Gandhi Nagar, Sector 4",
    priority: "high",
    status: "in-progress",
    submittedDate: "2025-12-19T16:45:00",
    assignedTo: "Water Supply Department",
    estimatedResolution: "2025-12-26T12:00:00",
    images: [
    {
      url: "https://images.unsplash.com/photo-1566687952848-e2cf82d3144c",
      alt: "Water leaking from underground pipe creating puddle on residential street"
    }],

    progressHistory: [
    {
      status: "Under Investigation",
      message: "Team dispatched to locate exact source of leakage",
      timestamp: "2025-12-20T10:00:00",
      updatedBy: "Water Department"
    }]

  },
  {
    id: 4,
    referenceNumber: "WV2025001237",
    category: "electricity",
    title: "Street light not working for two weeks",
    description: "The street light pole number SL-234 has not been working for the past two weeks. This is causing safety concerns for residents during night time.",
    location: "Nehru Road, Near Bus Stand",
    priority: "medium",
    status: "resolved",
    submittedDate: "2025-12-10T19:30:00",
    assignedTo: "Electrical Maintenance",
    estimatedResolution: "2025-12-18T17:00:00",
    images: [],
    progressHistory: [
    {
      status: "Repair Completed",
      message: "Faulty bulb and wiring replaced. Street light is now functional",
      timestamp: "2025-12-18T15:30:00",
      updatedBy: "Electrician Team"
    }]

  },
  {
    id: 5,
    referenceNumber: "WV2025001238",
    category: "safety",
    title: "Broken footpath creating pedestrian hazard",
    description: "The footpath near school area has multiple broken sections with exposed rebar. This poses a serious safety risk to children and elderly pedestrians.",
    location: "School Road, Ward 8",
    priority: "urgent",
    status: "pending",
    submittedDate: "2025-12-24T11:20:00",
    assignedTo: null,
    estimatedResolution: null,
    images: [
    {
      url: "https://images.unsplash.com/photo-1718286704840-1557768de0f9",
      alt: "Damaged concrete footpath with broken sections and exposed metal rebar near school zone"
    }],

    progressHistory: []
  },
  {
    id: 6,
    referenceNumber: "WV2025001239",
    category: "health",
    title: "Stagnant water breeding mosquitoes",
    description: "Large area of stagnant water has accumulated in the vacant plot. This has become a breeding ground for mosquitoes, increasing health risks in the neighborhood.",
    location: "Plot No. 45, Residential Area",
    priority: "high",
    status: "in-progress",
    submittedDate: "2025-12-22T07:45:00",
    assignedTo: "Health Department",
    estimatedResolution: "2025-12-27T16:00:00",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_139033256-1766640222223.png",
      alt: "Stagnant water pool in vacant urban plot with visible mosquito larvae breeding"
    }],

    progressHistory: [
    {
      status: "Inspection Scheduled",
      message: "Health inspector will visit the site tomorrow for assessment",
      timestamp: "2025-12-23T10:00:00",
      updatedBy: "Health Officer"
    }]

  }];


  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      priority: ''
    });
  };

  const handleFormSubmit = (formData) => {
    console.log('Issue submitted:', formData);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseModal = () => {
    setSelectedIssue(null);
  };

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('wardVoiceLanguage', newLanguage);
  };

  const filteredIssues = mockIssues?.filter((issue) => {
    const matchesSearch = filters?.search === '' ||
    issue?.referenceNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
    issue?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    const matchesCategory = filters?.category === '' || issue?.category === filters?.category;
    const matchesStatus = filters?.status === '' || issue?.status === filters?.status;
    const matchesPriority = filters?.priority === '' || issue?.priority === filters?.priority;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const getStatusCounts = () => {
    return {
      total: mockIssues?.length,
      pending: mockIssues?.filter((i) => i?.status === 'pending')?.length,
      inProgress: mockIssues?.filter((i) => i?.status === 'in-progress')?.length,
      resolved: mockIssues?.filter((i) => i?.status === 'resolved')?.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <AuthenticationWrapper isAuthenticated={isAuthenticated}>
      <Helmet>
        <title>Issue Reporting Portal - Ward Voice</title>
        <meta
          name="description"
          content="Report and track civic issues in your ward. Submit complaints about infrastructure, sanitation, water supply, and more with photo and video documentation." />

      </Helmet>
      <MainNavigation userRole={mockUser?.role} notificationCount={2} />
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                Issue Reporting Portal
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Report civic issues and track their resolution progress
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <NotificationIndicator
                notifications={mockNotifications}
                onNotificationClick={(notification) => console.log('Notification clicked:', notification)}
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
                onClearAll={() => console.log('Clear all notifications')} />

              <UserProfileDropdown
                user={mockUser}
                onLanguageChange={handleLanguageChange} />

            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="FileText" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    {statusCounts?.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-md flex items-center justify-center">
                  <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    {statusCounts?.pending}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-warning/10 rounded-md flex items-center justify-center">
                  <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
                  <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    {statusCounts?.inProgress}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-success/10 rounded-md flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Resolved</p>
                  <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    {statusCounts?.resolved}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!showForm &&
          <div className="mb-6 md:mb-8">
              <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowForm(true)}
              fullWidth
              className="sm:w-auto">

                Report New Issue
              </Button>
            </div>
          }

          {showForm ?
          <IssueForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} /> :

          <>
              <IssueFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters} />


              <div className="mt-6 md:mt-8">
                {filteredIssues?.length === 0 ?
              <div className="bg-card rounded-lg p-8 md:p-12 text-center shadow-sm border border-border">
                    <Icon
                  name="Search"
                  size={48}
                  color="var(--color-muted-foreground)"
                  className="mx-auto mb-4" />

                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                      No Issues Found
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Try adjusting your filters or report a new issue
                    </p>
                  </div> :

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {filteredIssues?.map((issue) =>
                <IssueCard
                  key={issue?.id}
                  issue={issue}
                  onClick={handleIssueClick} />

                )}
                  </div>
              }
              </div>
            </>
          }
        </div>
      </div>
      {selectedIssue &&
      <IssueDetailModal issue={selectedIssue} onClose={handleCloseModal} />
      }
    </AuthenticationWrapper>);

};

export default IssueReportingPortal;