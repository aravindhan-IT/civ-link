import React from 'react';
import { Navigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationWrapper = ({ 
  children, 
  isAuthenticated = false,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 animate-pulse">
            <Icon name="Building2" size={32} color="var(--color-primary)" />
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationWrapper;