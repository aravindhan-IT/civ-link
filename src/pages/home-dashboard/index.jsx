import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import AnnouncementCarousel from './components/AnnouncementCarousel';
import FundUtilizationCard from './components/FundUtilizationCard';
import OngoingProjectsGrid from './components/OngoingProjectsGrid';
import QuickActionCards from './components/QuickActionCards';
import WardStatisticsPanel from './components/WardStatisticsPanel';
import RecentForumActivity from './components/RecentForumActivity';
import UpcomingEventsCard from './components/UpcomingEventsCard';

const HomeDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('wardVoiceLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('wardVoiceLanguage', newLanguage);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wardVoiceAuth');
  };

  const mockUser = {
    name: "Aravindhan",
    email: "aravindhan@wardvoice.gov.in",
    role: "resident",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112d3ad6f-1764686377891.png"
  };

  const mockAnnouncements = [
  {
    id: 1,
    title: "New Road Construction Project Approved",
    description: "The town panchayat has approved the construction of a new 2-kilometer road connecting Anna Salai to the industrial area. Work will commence from 05/01/2026 with an estimated completion time of 6 months.",
    image: "https://images.unsplash.com/photo-1633361041596-38cdf419483d",
    imageAlt: "Construction workers in yellow safety vests and hard hats working on road infrastructure with heavy machinery and equipment in urban setting",
    date: "2025-12-20T10:30:00",
    postedBy: "Councillor Lakshmi Devi",
    category: "infrastructure",
    isUrgent: true
  },
  {
    id: 2,
    title: "Community Health Camp on 28th December",
    description: "Free health check-up camp will be organized at Ward Community Center. Services include blood pressure monitoring, diabetes screening, and general health consultation by qualified doctors.",
    image: "https://images.unsplash.com/photo-1666886573600-61c634663827",
    imageAlt: "Medical professionals in white coats conducting health screening with stethoscopes and medical equipment in bright community health center",
    date: "2025-12-22T14:00:00",
    postedBy: "Councillor Karthik Raja",
    category: "health",
    isUrgent: false
  },
  {
    id: 3,
    title: "Water Supply Maintenance Notice",
    description: "Water supply will be temporarily suspended on 26/12/2025 from 10:00 AM to 4:00 PM for pipeline maintenance work. Residents are advised to store adequate water in advance.",
    image: "https://images.unsplash.com/photo-1710661184714-8da83aaf8ecc",
    imageAlt: "Blue water pipeline system with metal valves and joints being maintained by workers in industrial water treatment facility",
    date: "2025-12-23T09:00:00",
    postedBy: "Ward Representative Meenakshi Sundaram",
    category: "utilities",
    isUrgent: true
  }];


  const mockFundData = {
    totalBudget: 5000000,
    totalSpent: 3250000,
    categories: [
    { name: "Infrastructure", allocated: 2000000, spent: 1500000 },
    { name: "Sanitation", allocated: 1000000, spent: 750000 },
    { name: "Education", allocated: 800000, spent: 500000 },
    { name: "Healthcare", allocated: 700000, spent: 350000 },
    { name: "Street Lighting", allocated: 500000, spent: 150000 }]

  };

  const mockProjects = [
  {
    id: 1,
    title: "Community Park Development",
    description: "Construction of a new community park with children's play area, walking tracks, and green spaces for residents.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13049b24a-1765646426346.png",
    imageAlt: "Modern community park with green grass lawns, colorful playground equipment, walking paths, and families enjoying outdoor activities",
    status: "On Track",
    completionPercentage: 65,
    estimatedCompletion: "2026-03-15T00:00:00",
    budget: 1500000
  },
  {
    id: 2,
    title: "Street Light Installation",
    description: "Installation of LED street lights across 15 streets to improve safety and visibility during night hours.",
    image: "https://images.unsplash.com/photo-1681935928258-fb6a49f52d7f",
    imageAlt: "Modern LED street lights illuminating urban road at dusk with warm yellow glow creating safe well-lit pathway",
    status: "Delayed",
    completionPercentage: 40,
    estimatedCompletion: "2026-02-28T00:00:00",
    budget: 800000
  },
  {
    id: 3,
    title: "Drainage System Upgrade",
    description: "Modernization of drainage infrastructure to prevent waterlogging during monsoon season.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc80b4ef-1764745341069.png",
    imageAlt: "Underground drainage system construction with concrete pipes and workers in safety gear installing modern water management infrastructure",
    status: "On Track",
    completionPercentage: 80,
    estimatedCompletion: "2026-01-20T00:00:00",
    budget: 1200000
  }];


  const mockQuickActions = [
  {
    id: 1,
    title: "Report Issue",
    description: "Submit complaints about civic issues in your area",
    icon: "AlertCircle",
    color: "accent",
    badge: 3,
    actionText: "Report Now",
    path: "/issue-reporting-portal"
  },
  {
    id: 2,
    title: "Forum Discussions",
    description: "Participate in community discussions and polls",
    icon: "MessageSquare",
    color: "primary",
    badge: 12,
    actionText: "Join Discussion",
    path: "/ward-updates"
  },
  {
    id: 3,
    title: "View Representatives",
    description: "Contact your ward councillor and representatives",
    icon: "Users",
    color: "secondary",
    badge: 0,
    actionText: "View Profiles",
    path: "/councillor-profiles"
  },
  {
    id: 4,
    title: "Upcoming Meetings",
    description: "Check schedule of panchayat meetings and events",
    icon: "Calendar",
    color: "warning",
    badge: 2,
    actionText: "View Schedule",
    path: "/ward-updates"
  }];


  const mockStatistics = {
    totalResidents: 15420,
    activeIssues: 47,
    resolvedIssues: 312,
    upcomingMeetings: 3,
    forumDiscussions: 89,
    completedProjects: 24
  };

  const mockForumActivities = [
  {
    id: 1,
    userName: "Priya Raman",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_150306d43-1763295935350.png",
    userAvatarAlt: "Professional woman with long black hair wearing blue traditional attire smiling at camera",
    content: "The new street lights on Kamarajar Salai are working great! Much safer to walk at night now. Thank you to the panchayat team.",
    category: "discussion",
    timestamp: new Date(Date.now() - 1800000),
    replies: 8,
    likes: 24
  },
  {
    id: 2,
    userName: "Senthil Kumar",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_138fce0b7-1763292976252.png",
    userAvatarAlt: "Middle-aged man with short grey hair and beard wearing white shirt in professional setting",
    content: "When will the drainage work on Periyar Road be completed? It\'s been causing traffic issues for weeks.",
    category: "feedback",
    timestamp: new Date(Date.now() - 3600000),
    replies: 5,
    likes: 15
  },
  {
    id: 3,
    userName: "Kavitha Subramanian",
    userAvatar: "https://images.unsplash.com/photo-1575090973814-063b180ffef9",
    userAvatarAlt: "Young woman with shoulder-length black hair wearing red traditional dress with warm smile",
    content: "Participated in the health camp today. Excellent organization and very helpful medical staff. More such initiatives needed!",
    category: "announcement",
    timestamp: new Date(Date.now() - 7200000),
    replies: 12,
    likes: 45
  }];


  const mockUpcomingEvents = [
  {
    id: 1,
    title: "Monthly Panchayat Meeting",
    description: "Discussion on upcoming projects and budget allocation for Q1 2026",
    type: "meeting",
    date: "2025-12-28T15:00:00",
    location: "Ward Community Hall"
  },
  {
    id: 2,
    title: "Cleanliness Drive",
    description: "Community participation drive for ward cleanliness and waste segregation awareness",
    type: "announcement",
    date: "2026-01-05T08:00:00",
    location: "Ward Office Premises"
  },
  {
    id: 3,
    title: "Road Safety Survey",
    description: "Feedback collection on road safety measures and traffic management improvements",
    type: "survey",
    date: "2026-01-10T10:00:00",
    location: "Online Survey"
  }];


  const mockNotifications = [
  {
    id: 1,
    title: "New Announcement Posted",
    message: "Road construction project approved for Anna Salai area",
    category: "announcement",
    timestamp: new Date(Date.now() - 600000),
    read: false
  },
  {
    id: 2,
    title: "Issue Status Updated",
    message: "Your reported drainage issue has been marked as resolved",
    category: "issue",
    timestamp: new Date(Date.now() - 1800000),
    read: false
  },
  {
    id: 3,
    title: "New Forum Reply",
    message: "Councillor Lakshmi Devi replied to your discussion thread",
    category: "message",
    timestamp: new Date(Date.now() - 3600000),
    read: true
  }];


  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark as read:', notificationId);
  };

  const handleClearAllNotifications = () => {
    console.log('Clear all notifications');
  };

  return (
    <AuthenticationWrapper isAuthenticated={isAuthenticated} isLoading={isLoading}>
      <MainNavigation userRole={mockUser?.role} notificationCount={2} isAuthenticated={isAuthenticated} />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                Welcome back, {mockUser?.name?.split(' ')?.[0]}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Stay updated with your ward's latest developments and activities
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <NotificationIndicator
                notifications={mockNotifications}
                onNotificationClick={handleNotificationClick}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAllNotifications} />

              <UserProfileDropdown
                user={mockUser}
                onLogout={handleLogout}
                onLanguageChange={handleLanguageChange} />

            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <section>
              <AnnouncementCarousel announcements={mockAnnouncements} />
            </section>

            <section>
              <QuickActionCards actions={mockQuickActions} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <FundUtilizationCard fundData={mockFundData} />
              </div>
              <div>
                <WardStatisticsPanel statistics={mockStatistics} />
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
                Ongoing Projects
              </h2>
              <OngoingProjectsGrid projects={mockProjects} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <RecentForumActivity activities={mockForumActivities} />
              <UpcomingEventsCard events={mockUpcomingEvents} />
            </section>
          </div>
        </div>
      </div>
    </AuthenticationWrapper>);

};

export default HomeDashboard;