import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainNavigation from '../../components/ui/MainNavigation';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import IssueForm from './components/IssueForm';
import IssueCard from './components/IssueCard';
import IssueDetailModal from './components/IssueDetailModal';
import IssueFilters from './components/IssueFilters';
import { useAuth } from '../../contexts/AuthContext';

const IssueReportingPortal = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    priority: ''
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    try {
      const savedIssues = localStorage.getItem('civicLinkIssues');
      if (savedIssues) {
        const parsedIssues = JSON.parse(savedIssues);
        // Validate that parsedIssues is an array
        if (Array.isArray(parsedIssues)) {
          // Filter out invalid issue objects
          const validIssues = parsedIssues.filter(issue =>
            issue &&
            typeof issue === 'object' &&
            issue.id &&
            issue.title &&
            issue.description
          );
          setIssues(validIssues);
        } else {
          console.warn('Invalid issues data in localStorage, resetting to default');
          localStorage.removeItem('civicLinkIssues');
          setIssues([]);
        }
      } else {
        // Set default mock data if no saved issues
        setIssues([
          {
            id: 1,
            referenceNumber: "WV2025001234",
            category: "infrastructure",
            title: "Large pothole on Main Street",
            description: "There is a large pothole near the intersection of Main Street and Park Avenue.",
            location: "Main Street, Ward 12",
            priority: "high",
            status: "in-progress",
            submittedDate: "2025-12-20T10:30:00",
            assignedTo: "Municipal Maintenance Team",
            estimatedResolution: "2025-12-28T17:00:00",
            images: [
              {
                url: "https://images.unsplash.com/photo-1728340964368-59c3192e44e6",
                alt: "Large pothole on asphalt road"
              }
            ],
            progressHistory: [
              {
                status: "Issue Assigned",
                message: "Issue has been assigned to Municipal Maintenance Team",
                timestamp: "2025-12-21T09:00:00",
                updatedBy: "Ward Officer"
              }
            ]
          },
          {
            id: 2,
            referenceNumber: "WV2025001235",
            category: "sanitation",
            title: "Overflowing garbage bins",
            description: "The garbage bins at Market Square have been overflowing.",
            location: "Market Square, Central Ward",
            priority: "urgent",
            status: "pending",
            submittedDate: "2025-12-23T08:15:00",
            assignedTo: null,
            estimatedResolution: null,
            images: [],
            progressHistory: []
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading saved issues:', error);
      // Clear corrupted localStorage data
      localStorage.removeItem('civicLinkIssues');
      // Reset to empty array
      setIssues([]);
    }
  }, []);

  // Save issues to localStorage whenever issues change
  useEffect(() => {
    try {
      if (issues.length > 0) {
        localStorage.setItem('civicLinkIssues', JSON.stringify(issues));
      }
    } catch (error) {
      console.error('Error saving issues to localStorage:', error);
    }
  }, [issues]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('wardVoiceLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const mockUser = (() => {
    try {
      if (user && typeof user === 'object') {
        return {
          name: user.displayName || user.name || 'User',
          email: user.email,
          role: user.role || 'resident',
          avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.name || 'User')}&background=random`
        };
      } else {
        return {
          name: 'Guest User',
          email: null,
          role: 'guest',
          avatar: 'https://ui-avatars.com/api/?name=Guest%20User&background=gray'
        };
      }
    } catch (error) {
      console.error('Error creating mockUser:', error);
      return {
        name: 'Guest User',
        email: null,
        role: 'guest',
        avatar: 'https://ui-avatars.com/api/?name=Guest%20User&background=gray'
      };
    }
  })();

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

  const handleFormSubmit = async (formData) => {
    try {
      // Convert files to base64 data URLs
      const images = [];
      if (formData.files && formData.files.length > 0) {
        for (const fileObj of formData.files) {
          try {
            const base64 = await fileToBase64(fileObj.file);
            images.push({
              url: base64,
              alt: fileObj.name
            });
          } catch (error) {
            console.error('Error converting file to base64:', error);
            // Continue without this image
          }
        }
      }

      const newIssue = {
        id: Date.now(),
        referenceNumber: `WV${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        priority: formData.priority,
        status: 'pending',
        submittedDate: new Date().toISOString(),
        assignedTo: null,
        estimatedResolution: null,
        images: images,
        progressHistory: []
      };

      const updatedIssues = [newIssue, ...issues];
      setIssues(updatedIssues);

      // Save to localStorage
      try {
        localStorage.setItem('civicLinkIssues', JSON.stringify(updatedIssues));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You could show an error message to the user here
    }
  };

  // Helper function to convert file to base64 with size limit
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        reject(new Error('File size too large. Please choose a file smaller than 2MB.'));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        // If it's an image and base64 is too long, try to compress it
        if (file.type.startsWith('image/') && base64.length > 100000) { // ~75KB
          // For now, just return the base64. In a real app, you'd compress the image
          resolve(base64);
        } else {
          resolve(base64);
        }
      };
      reader.onerror = error => reject(error);
    });
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

  const filteredIssues = issues?.filter((issue) => {
    try {
      if (!issue || typeof issue !== 'object') return false;

      const matchesSearch = !filters?.search ||
        (issue?.referenceNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase())) ||
        (issue?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()));
      const matchesCategory = !filters?.category || issue?.category === filters?.category;
      const matchesStatus = !filters?.status || issue?.status === filters?.status;
      const matchesPriority = !filters?.priority || issue?.priority === filters?.priority;

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    } catch (error) {
      console.error('Error filtering issue:', error, issue);
      return false;
    }
  });

  const getStatusCounts = () => {
    try {
      return {
        total: issues?.length || 0,
        pending: issues?.filter((i) => i?.status === 'pending')?.length || 0,
        inProgress: issues?.filter((i) => i?.status === 'in-progress')?.length || 0,
        resolved: issues?.filter((i) => i?.status === 'resolved')?.length || 0
      };
    } catch (error) {
      console.error('Error calculating status counts:', error);
      return {
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
      };
    }
  };

  const statusCounts = getStatusCounts();

  return (
    <>
      <Helmet>
        <title>Issue Reporting Portal - Civic Link</title>
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
            {(() => {
              try {
                return (
                  <>
                    <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex items-center justify-center">
                          <Icon name="FileText" size={20} color="var(--color-primary)" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-muted-foreground">Total Issues</p>
                          <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                            {statusCounts?.total || 0}
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
                            {statusCounts?.pending || 0}
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
                            {statusCounts?.inProgress || 0}
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
                            {statusCounts?.resolved || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              } catch (error) {
                console.error('Error rendering status cards:', error);
                return null;
              }
            })()}
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
                    {filteredIssues?.filter(issue => issue && typeof issue === 'object' && issue.id)?.map((issue) => {
                      try {
                        return (
                          <IssueCard
                            key={issue?.id}
                            issue={issue}
                            onClick={handleIssueClick}
                          />
                        );
                      } catch (error) {
                        console.error('Error rendering issue card:', error, issue);
                        return null;
                      }
                    })}
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
    </>
  );

};

export default IssueReportingPortal;