import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainNavigation from '../../components/ui/MainNavigation';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import TabNavigation from './components/TabNavigation';
import FilterControls from './components/FilterControls';
import BudgetDetails from './components/BudgetDetails';
import MeetingResolutions from './components/MeetingResolutions';
import DevelopmentWorks from './components/DevelopmentWorks';

const WardUpdates = () => {
  const [activeTab, setActiveTab] = useState('budget');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [category, setCategory] = useState('');
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

  const tabs = [
  { id: 'budget', label: 'Budget Details' },
  { id: 'resolutions', label: 'Meeting Resolutions' },
  { id: 'development', label: 'Development Works' }];


  const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'sanitation', label: 'Sanitation' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'welfare', label: 'Social Welfare' }];


  const budgetData = {
    totalBudget: 50000000,
    spent: 32500000,
    committed: 8750000,
    available: 8750000,
    allocation: [
    { name: 'Infrastructure', value: 15000000 },
    { name: 'Sanitation', value: 12000000 },
    { name: 'Education', value: 8000000 },
    { name: 'Healthcare', value: 7000000 },
    { name: 'Social Welfare', value: 5000000 },
    { name: 'Others', value: 3000000 }],

    monthlySpending: [
    { month: 'Jul', spent: 4200000, allocated: 5000000 },
    { month: 'Aug', spent: 5800000, allocated: 6000000 },
    { month: 'Sep', spent: 5200000, allocated: 5500000 },
    { month: 'Oct', spent: 6100000, allocated: 6500000 },
    { month: 'Nov', spent: 5900000, allocated: 6000000 },
    { month: 'Dec', spent: 5300000, allocated: 5500000 }]

  };

  const resolutions = [
  {
    id: 1,
    title: "Approval of Road Widening Project on MG Road",
    date: "15/12/2024",
    location: "Ward Office Conference Hall",
    meetingNumber: "24/2024",
    summary: "The council unanimously approved the road widening project on MG Road from 20 feet to 30 feet to ease traffic congestion. The project will be completed in three phases over six months with minimal disruption to residents.",
    decisions: [
    "Approved budget allocation of ₹12,50,000 for the project",
    "Contractor M/s Reliable Constructions awarded the tender",
    "Work to commence from 01/01/2025 with Phase 1 completion by 28/02/2025",
    "Traffic diversion plan approved with alternate routes designated"],

    attendees: 18,
    status: "Approved",
    approver: "Rajesh Kumar",
    approverRole: "Ward Councillor",
    approverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b686b60e-1763292151580.png",
    approverImageAlt: "Professional headshot of Indian male councillor with grey hair wearing white kurta and glasses"
  },
  {
    id: 2,
    title: "Installation of LED Street Lights in Residential Areas",
    date: "08/12/2024",
    location: "Ward Office Conference Hall",
    meetingNumber: "23/2024",
    summary: "Resolution passed to replace all conventional street lights with energy-efficient LED lights across 15 residential streets. This initiative aims to reduce electricity consumption by 60% and improve nighttime visibility for residents.",
    decisions: [
    "Approved installation of 250 LED street lights",
    "Budget sanctioned: ₹8,75,000 from energy conservation fund",
    "Installation to be completed by 31/01/2025",
    "Annual maintenance contract to be signed with supplier"],

    attendees: 16,
    status: "Approved",
    approver: "Priya Sharma",
    approverRole: "Deputy Councillor",
    approverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_176466544-1763300999354.png",
    approverImageAlt: "Professional headshot of Indian female deputy councillor with long black hair wearing blue saree"
  },
  {
    id: 3,
    title: "Establishment of Community Health Center",
    date: "01/12/2024",
    location: "Ward Office Conference Hall",
    meetingNumber: "22/2024",
    summary: "Proposal to establish a community health center in the ward to provide basic healthcare services including OPD, diagnostic facilities, and emergency care. The center will serve approximately 5,000 residents.",
    decisions: [
    "Land allocation approved at Survey No. 145/2",
    "Construction budget: ₹45,00,000 sanctioned",
    "Partnership with District Health Department finalized",
    "Expected completion: December 2025"],

    attendees: 20,
    status: "Pending",
    approver: "Dr. Anil Verma",
    approverRole: "Health Committee Chairman",
    approverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c36e01f2-1763299061563.png",
    approverImageAlt: "Professional headshot of Indian male doctor with short grey hair wearing white coat and stethoscope"
  }];


  const projects = [
  {
    id: 1,
    title: "Underground Drainage System Installation",
    description: "Installation of modern underground drainage system covering 2.5 km area in residential zones to prevent waterlogging during monsoon season and improve sanitation standards.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16bbdf9ee-1766605417975.png",
    imageAlt: "Construction workers installing large concrete drainage pipes in excavated trench with heavy machinery in background",
    status: "In Progress",
    timeline: "Jan 2024 - Jun 2025",
    budget: 18500000,
    contractor: "M/s Urban Infrastructure Ltd",
    location: "Sectors 4, 5, and 6",
    progress: 45,
    milestones: [
    { title: "Site survey and planning completed", completed: true },
    { title: "Phase 1 excavation completed", completed: true },
    { title: "Pipe laying in Sector 4 ongoing", completed: false },
    { title: "Connection to main drainage line", completed: false }]

  },
  {
    id: 2,
    title: "Community Park Development",
    description: "Development of 2-acre community park with children's play area, walking tracks, outdoor gym equipment, landscaping, and seating arrangements for residents of all age groups.",
    image: "https://images.unsplash.com/photo-1651293938406-02d193a059e7",
    imageAlt: "Beautiful landscaped community park with green lawns, colorful flower beds, paved walking paths, and children playing on modern playground equipment",
    status: "Completed",
    timeline: "Mar 2024 - Nov 2024",
    budget: 6500000,
    contractor: "M/s Green Spaces Pvt Ltd",
    location: "Near Ward Office",
    progress: 100,
    milestones: [
    { title: "Land preparation and leveling", completed: true },
    { title: "Installation of play equipment", completed: true },
    { title: "Landscaping and plantation", completed: true },
    { title: "Lighting and seating arrangement", completed: true }]

  },
  {
    id: 3,
    title: "Smart Water Supply Management System",
    description: "Implementation of IoT-based smart water supply system with automated monitoring, leak detection, and equitable distribution to ensure 24x7 water supply to all households.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12757b9db-1765091839754.png",
    imageAlt: "Modern water treatment facility with large blue water storage tanks, control panels, and monitoring equipment under clear sky",
    status: "Planned",
    timeline: "Apr 2025 - Dec 2025",
    budget: 22000000,
    contractor: "Tender Process Ongoing",
    location: "Ward-wide Implementation",
    progress: 15,
    milestones: [
    { title: "Feasibility study completed", completed: true },
    { title: "Technical specifications finalized", completed: false },
    { title: "Tender process", completed: false },
    { title: "System installation", completed: false }]

  },
  {
    id: 4,
    title: "School Building Renovation",
    description: "Complete renovation of Government Primary School including new classrooms, library, computer lab, toilet facilities, and playground to accommodate 500 students with modern amenities.",
    image: "https://images.unsplash.com/photo-1640958468317-573558f3459b",
    imageAlt: "Renovated school building exterior with fresh yellow paint, large windows, children in uniforms playing in courtyard with basketball court visible",
    status: "In Progress",
    timeline: "Aug 2024 - Mar 2025",
    budget: 9800000,
    contractor: "M/s Education Infrastructure Co",
    location: "Government Primary School, Sector 3",
    progress: 65,
    milestones: [
    { title: "Structural repairs completed", completed: true },
    { title: "New classroom construction", completed: true },
    { title: "Interior finishing work ongoing", completed: false },
    { title: "Furniture and equipment installation", completed: false }]

  }];


  const notifications = [
  {
    id: 1,
    category: 'announcement',
    title: 'New Budget Approved',
    message: 'FY 2024-25 budget has been approved with increased allocation for infrastructure.',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: 2,
    category: 'issue',
    title: 'Meeting Scheduled',
    message: 'Ward meeting scheduled for 28/12/2024 at 10:00 AM.',
    timestamp: new Date(Date.now() - 7200000),
    read: false
  }];


  const currentUser = {
    name: 'Amit Patel',
    email: 'amit.patel@wardvoice.gov.in',
    role: 'resident',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bafb5581-1765266098370.png"
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const handleClearAll = () => {
    console.log('Clearing all notifications');
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <AuthenticationWrapper isAuthenticated={true}>
      <Helmet>
        <title>Ward Updates - Ward Voice</title>
        <meta name="description" content="Access detailed budget information, meeting resolutions, and development progress with full transparency in your ward." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainNavigation
          userRole={currentUser?.role}
          notificationCount={notifications?.filter((n) => !n?.read)?.length}
          isAuthenticated={true} />


        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
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

        <div className="pt-16">
          <div className="bg-primary text-primary-foreground py-6 md:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2">
                Ward Updates
              </h1>
              <p className="text-sm md:text-base lg:text-lg opacity-90">
                Transparent access to budget details, meeting resolutions, and development progress
              </p>
            </div>
          </div>

          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs} />


          <FilterControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            category={category}
            onCategoryChange={setCategory}
            onExport={handleExport}
            categoryOptions={categoryOptions} />


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
            {activeTab === 'budget' && <BudgetDetails budgetData={budgetData} />}
            {activeTab === 'resolutions' && <MeetingResolutions resolutions={resolutions} />}
            {activeTab === 'development' && <DevelopmentWorks projects={projects} />}
          </div>
        </div>
      </div>
    </AuthenticationWrapper>);

};

export default WardUpdates;