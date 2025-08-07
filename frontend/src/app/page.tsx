'use client';

import React from 'react';
import { useActivePage } from '@toolpad/core/useActivePage';
import SecurityMetricsChart from '../components/SecurityMetricsChart';
import { GenericPage, VulnerabilitiesPage, CompliancePage, AssetsPage } from '../components/pages/MockPages';

export default function Home() {
  const activePage = useActivePage();

  const renderPageContent = () => {
    const segment = activePage?.path?.replace('/', '') || 'dashboard';
    
    switch (segment) {
      case 'dashboard':
        return <SecurityMetricsChart />;
      case 'vulnerabilities':
        return <VulnerabilitiesPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'assets':
        return <AssetsPage />;
      case 'reports':
        return <GenericPage title="Reports" description="View security reports and analytics." />;
      case 'settings':
        return <GenericPage title="Settings" description="Configure your security platform settings." />;
      default:
        return <SecurityMetricsChart />;
    }
  };

  return <>{renderPageContent()}</>;
}
