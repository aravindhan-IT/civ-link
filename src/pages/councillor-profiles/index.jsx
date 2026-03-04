import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainNavigation from '../../components/ui/MainNavigation';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import Icon from '../../components/AppIcon';
import CouncillorCard from './components/CouncillorCard';
import MessageModal from './components/MessageModal';
import PerformanceMetrics from './components/PerformanceMetrics';
import RecentAnnouncements from './components/RecentAnnouncements';
import UpcomingEvents from './components/UpcomingEvents';
import FilterBar from './components/FilterBar';

const CouncillorProfiles = () => {
  const [isAuthenticated] = useState(true);
  const [userRole] = useState('resident');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedCouncillor, setSelectedCouncillor] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const councillors = [
  {
    id: 1,
    name: "Selvam",
    designation: "Ward Councillor",
    ward: "Ward 5",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12b864c72-1763296526835.png",
    profileImageAlt: "Professional headshot of middle-aged Tamil man with grey hair wearing white kurta and glasses in office setting",
    tenure: "2020 - 2025",
    education: "Master's in Public Administration, University of Madras",
    experience: "15 years in local governance and community development",
    phone: "+91-9876543210",
    email: "murugan.selvam@wardvoice.gov.in",
    officeHours: "Mon-Fri, 10:00 AM - 5:00 PM",
    responseRate: 92,
    satisfactionScore: 4.5,
    avgResponseTime: "18 hours",
    issuesResolved: 234,
    totalIssues: 267,
    isVerified: true,
    responseTime: "24-48 hours",
    achievements: [
    "Successfully implemented street lighting project covering 45 streets in Ward 5",
    "Established community health center serving 5,000+ residents",
    "Initiated waste segregation program with 78% household participation",
    "Secured ₹2.5 crore funding for road infrastructure development"]

  },
  {
    id: 2,
    name: "Lakshmi D",
    designation: "Ward Councillor",
    ward: "Ward 12",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1da646fa8-1763301069987.png",
    profileImageAlt: "Professional portrait of Tamil woman with long black hair wearing blue saree and traditional jewelry in formal setting",
    tenure: "2020 - 2025",
    education: "Bachelor's in Social Work, Bharathiar University",
    experience: "10 years in women empowerment and social welfare programs",
    phone: "+91-9876543211",
    email: "lakshmi.devi@wardvoice.gov.in",
    officeHours: "Mon-Sat, 9:00 AM - 4:00 PM",
    responseRate: 88,
    satisfactionScore: 4.7,
    avgResponseTime: "12 hours",
    issuesResolved: 189,
    totalIssues: 215,
    isVerified: true,
    responseTime: "12-24 hours",
    achievements: [
    "Launched women\'s skill development center training 200+ women annually",
    "Established 3 anganwadi centers for child nutrition and education",
    "Organized monthly health camps benefiting 1,500+ residents",
    "Implemented rainwater harvesting in 120 households"]

  },
  {
    id: 3,
    name: "Karthik Raja",
    designation: "Ward Councillor",
    ward: "Ward 8",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf987635-1763295184563.png",
    profileImageAlt: "Professional headshot of Tamil man with black beard wearing white shirt and traditional tilak mark in office environment",
    tenure: "2022 - 2027",
    education: "Bachelor's in Civil Engineering, Anna University",
    experience: "8 years in infrastructure development and urban planning",
    phone: "+91-9876543212",
    email: "karthik.raja@wardvoice.gov.in",
    officeHours: "Tue-Sat, 10:00 AM - 6:00 PM",
    responseRate: 85,
    satisfactionScore: 4.3,
    avgResponseTime: "24 hours",
    issuesResolved: 156,
    totalIssues: 184,
    isVerified: true,
    responseTime: "24-36 hours",
    achievements: [
    "Completed drainage system upgrade for 8 kilometers of roads",
    "Established public park with children\'s play area and walking track",
    "Implemented LED street lighting reducing energy costs by 40%",
    "Organized quarterly town hall meetings with 300+ average attendance"]

  }];


  const notifications = [
  {
    id: 1,
    title: "New Announcement from Murugan Selvam",
    message: "Ward 5 development meeting scheduled for next week",
    category: "announcement",
    timestamp: new Date(Date.now() - 1800000),
    read: false
  },
  {
    id: 2,
    title: "Response Received",
    message: "Lakshmi Devi has responded to your inquiry",
    category: "message",
    timestamp: new Date(Date.now() - 7200000),
    read: false
  }];


  const currentUser = {
    name: "Senthil Kumar",
    email: "senthil.kumar@example.com",
    role: userRole,
    avatar: null
  };

  const allWards = [...new Set(councillors.map((c) => c.ward))]?.sort();

  const filteredCouncillors = councillors?.filter((councillor) => {
    const matchesSearch = searchQuery === '' ||
    councillor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    councillor?.ward?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    councillor?.designation?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesWard = selectedWard === 'all' || councillor?.ward === selectedWard;

    return matchesSearch && matchesWard;
  });

  const handleMessageClick = (councillor) => {
    setSelectedCouncillor(councillor);
    setShowMessageModal(true);
  };

  const handleSendMessage = (messageData) => {
    console.log('Message sent:', messageData);
    setShowMessageModal(false);
    setSelectedCouncillor(null);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark as read:', notificationId);
  };

  const handleClearAll = () => {
    console.log('Clear all notifications');
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const featuredCouncillor = councillors?.[0];

  const recentAnnouncements = [
  {
    id: 1,
    title: "Ward Development Meeting - January 2026",
    description: "Quarterly ward development meeting to discuss ongoing projects, budget allocation, and citizen feedback. All residents are welcome to attend and participate in the discussion.",
    category: "meeting",
    timestamp: new Date(Date.now() - 86400000),
    relatedWardUpdate: "Q4 2025 Budget Review"
  },
  {
    id: 2,
    title: "New Street Lighting Project Approved",
    description: "The town panchayat has approved the installation of LED street lights in 15 additional streets. Work will commence from February 2026 with expected completion in 3 months.",
    category: "project",
    timestamp: new Date(Date.now() - 172800000),
    relatedWardUpdate: "Infrastructure Development Plan 2026"
  },
  {
    id: 3,
    title: "Community Health Camp - 15th January",
    description: "Free health checkup camp organized at Ward Community Center. Services include general health screening, blood pressure monitoring, diabetes testing, and consultation with doctors.",
    category: "announcement",
    timestamp: new Date(Date.now() - 259200000),
    relatedWardUpdate: null
  }];


  const upcomingEvents = [
  {
    id: 1,
    title: "Ward Development Committee Meeting",
    description: "Monthly meeting to review ongoing projects and discuss new development proposals for the ward",
    type: "meeting",
    date: new Date('2026-01-05T10:00:00'),
    location: "Ward Office, Main Street",
    attendees: 45,
    registrationRequired: false
  },
  {
    id: 2,
    title: "Public Grievance Redressal Day",
    description: "Special session for residents to meet councillor and discuss issues, complaints, and suggestions",
    type: "visit",
    date: new Date('2026-01-08T14:00:00'),
    location: "Community Hall, Ward 5",
    attendees: null,
    registrationRequired: false
  },
  {
    id: 3,
    title: "Swachh Bharat Awareness Campaign",
    description: "Community cleanliness drive and awareness program about waste management and sanitation",
    type: "event",
    date: new Date('2026-01-12T08:00:00'),
    location: "Ward 5 Market Area",
    attendees: 120,
    registrationRequired: true
  }];


  return (
    <AuthenticationWrapper isAuthenticated={isAuthenticated}>
      <Helmet>
        <title>Councillor Profiles - Ward Voice</title>
        <meta name="description" content="Connect with your elected ward councillors, view their profiles, performance metrics, and send direct messages for governance inquiries" />
      </Helmet>
      <MainNavigation userRole={userRole} notificationCount={2} isAuthenticated={isAuthenticated} />
      <div className="min-h-screen bg-background pt-4 md:pt-6 lg:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
                Councillor Profiles
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                Connect with your elected representatives and stay informed about ward governance
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <NotificationIndicator
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll} />

              <UserProfileDropdown
                user={currentUser}
                onLogout={handleLogout}
                onLanguageChange={handleLanguageChange} />

            </div>
          </div>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedWard={selectedWard}
            onWardChange={setSelectedWard}
            wards={allWards} />


          {filteredCouncillors?.length === 0 ?
          <div className="bg-card rounded-lg shadow-md p-8 md:p-12 text-center">
              <Icon name="UserX" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                No Councillors Found
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div> :

          <>
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                {filteredCouncillors?.map((councillor) =>
              <CouncillorCard
                key={councillor?.id}
                councillor={councillor}
                onMessageClick={handleMessageClick} />

              )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                <div className="space-y-6 md:space-y-8">
                  <PerformanceMetrics councillor={featuredCouncillor} />
                  <RecentAnnouncements announcements={recentAnnouncements} />
                </div>
                <div>
                  <UpcomingEvents events={upcomingEvents} />
                </div>
              </div>
            </>
          }
        </div>
      </div>
      {showMessageModal && selectedCouncillor &&
      <MessageModal
        councillor={selectedCouncillor}
        onClose={() => {
          setShowMessageModal(false);
          setSelectedCouncillor(null);
        }}
        onSend={handleSendMessage} />

      }
    </AuthenticationWrapper>);

};

export default CouncillorProfiles;