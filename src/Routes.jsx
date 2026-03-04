import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import Login from './pages/login';
import WardUpdates from './pages/ward-updates';
import IssueReportingPortal from './pages/issue-reporting-portal';
import Register from './pages/register';
import CouncillorProfiles from './pages/councillor-profiles';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ward-updates" element={<WardUpdates />} />
        <Route path="/issue-reporting-portal" element={<IssueReportingPortal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/councillor-profiles" element={<CouncillorProfiles />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
