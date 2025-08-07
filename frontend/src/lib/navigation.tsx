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

export const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Security',
  },
  {
    segment: 'vulnerabilities',
    title: 'Vulnerabilities',
    icon: <VulnerabilityIcon />,
  },
  {
    segment: 'compliance',
    title: 'Compliance',
    icon: <ComplianceIcon />,
  },
  {
    segment: 'assets',
    title: 'Assets',
    icon: <AssetsIcon />,
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
    icon: <ReportsIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
];
