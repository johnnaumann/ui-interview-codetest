import React from 'react';
import {
  Dashboard as DashboardIcon,
  BugReport as VulnerabilityIcon,
  Assessment as ComplianceIcon,
  Inventory2 as AssetsIcon,
  BarChart as ReportsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import type { Navigation } from '@toolpad/core';

export const navigation: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    kind: 'header',
    title: 'Security',
  },
  {
    segment: 'vulnerabilities',
    title: 'Vulnerabilities',
    icon: <VulnerabilityIcon fontSize="small" />,
  },
  {
    segment: 'compliance',
    title: 'Compliance',
    icon: <ComplianceIcon fontSize="small" />,
  },
  {
    segment: 'assets',
    title: 'Assets',
    icon: <AssetsIcon fontSize="small" />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Insights',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <ReportsIcon fontSize="small" />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon fontSize="small" />,
  },
];
