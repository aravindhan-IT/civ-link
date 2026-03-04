import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ 
  user = { 
    name: 'Guest User', 
    email: 'guest@wardvoice.gov.in', 
    role: 'resident',
    avatar: null
  },
  onLogout,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  const handleLanguageToggle = () => {
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'councillor':
        return 'Councillor';
      case 'representative':
        return 'Representative';
      case 'resident':
      default:
        return 'Resident';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'councillor':
        return 'Shield';
      case 'representative':
        return 'UserCheck';
      case 'resident':
      default:
        return 'User';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-all duration-250 ease-out focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        {user?.avatar ? (
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={18} color="var(--color-primary)" />
          </div>
        )}
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-popover rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} color="var(--color-primary)" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-popover-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name={getRoleIcon(user?.role)} size={12} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">
                      {getRoleLabel(user?.role)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-250 ease-out"
              >
                <Icon name="User" size={18} />
                <span>My Profile</span>
              </button>

              <button
                onClick={handleSettingsClick}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-250 ease-out"
              >
                <Icon name="Settings" size={18} />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLanguageToggle}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-250 ease-out"
              >
                <Icon name="Languages" size={18} />
                <span>Language</span>
              </button>
            </div>

            <div className="border-t border-border py-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-250 ease-out"
              >
                <Icon name="LogOut" size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileDropdown;