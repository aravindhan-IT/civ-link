import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MainNavigation = ({ userRole = 'resident', notificationCount = 0, isAuthenticated = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/home-dashboard',
      icon: 'LayoutDashboard',
      roleAccess: ['resident', 'councillor', 'representative', 'guest']
    },
    {
      label: 'Ward Info',
      path: '/ward-updates',
      icon: 'Info',
      roleAccess: ['resident', 'councillor', 'representative', 'guest']
    },
    {
      label: 'Report Issue',
      path: '/issue-reporting-portal',
      icon: 'AlertCircle',
      roleAccess: ['resident', 'councillor', 'representative', 'guest']
    },
    {
      label: 'Representatives',
      path: '/councillor-profiles',
      icon: 'Users',
      roleAccess: ['resident', 'councillor', 'representative', 'guest']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roleAccess?.includes(userRole)
  );

  const isActive = (path) => location?.pathname === path;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleMobileMenuToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card text-foreground p-3 rounded-md shadow-md transition-transform duration-250 ease-out hover:scale-105 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-card shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/home-dashboard" 
                className="flex items-center space-x-3 transition-opacity duration-250 ease-out hover:opacity-80"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="Building2" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">Civic Link</span>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {filteredNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-250 ease-out ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <button
                className="relative p-2 text-foreground hover:bg-muted rounded-md transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background lg:hidden"
          onClick={handleMobileMenuToggle}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-card shadow-xl overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="Building2" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">Ward Voice</span>
              </div>

              <nav className="space-y-2">
                {filteredNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={handleNavItemClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-250 ease-out ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={22} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-border">
                <button
                  className="flex items-center space-x-3 w-full px-4 py-3 text-foreground hover:bg-muted rounded-md transition-all duration-250 ease-out"
                  aria-label="Notifications"
                >
                  <Icon name="Bell" size={22} />
                  <span className="text-base font-medium">Notifications</span>
                  {notificationCount > 0 && (
                    <span className="ml-auto inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent rounded-full">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;