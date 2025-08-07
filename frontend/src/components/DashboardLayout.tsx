'use client';

import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Settings,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import SecurityMetricsChart from './SecurityMetricsChart';
import { VulnerabilitiesPage, CompliancePage, AssetsPage, GenericPage } from './pages/MockPages';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return children || <SecurityMetricsChart />;
      case 'vulnerabilities':
        return <VulnerabilitiesPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'assets':
        return <AssetsPage />;
      case 'policies':
        return (
          <GenericPage 
            title="Policy Management" 
            description="Define and manage security policies across your infrastructure"
          />
        );
      case 'analytics':
        return (
          <GenericPage 
            title="Security Analytics" 
            description="Advanced analytics and insights into your security posture"
          />
        );
      case 'reports':
        return (
          <GenericPage 
            title="Security Reports" 
            description="Generate comprehensive security reports for stakeholders"
          />
        );
      case 'settings':
        return (
          <GenericPage 
            title="Platform Settings" 
            description="Configure platform settings and integrations"
          />
        );
      default:
        return <SecurityMetricsChart />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Security Dashboard';
      case 'vulnerabilities': return 'Vulnerability Management';
      case 'compliance': return 'Compliance Monitoring';
      case 'assets': return 'Asset Inventory';
      case 'policies': return 'Policy Management';
      case 'analytics': return 'Security Analytics';
      case 'reports': return 'Security Reports';
      case 'settings': return 'Platform Settings';
      default: return 'Security Dashboard';
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar - only show permanent sidebar on desktop */}
      {!isMobile && (
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          variant="permanent"
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          variant="temporary"
        />
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top AppBar */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleSidebarToggle}
              sx={{ mr: 2, color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>

            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                color: theme.palette.text.primary,
                fontWeight: 600 
              }}
            >
              {getPageTitle()}
            </Typography>

            {/* Status Badge */}
            <Chip 
              label="All Systems Operational" 
              color="success" 
              size="small" 
              sx={{ mr: 2 }}
            />

            {/* Notifications */}
            <IconButton 
              color="inherit" 
              sx={{ mr: 1, color: theme.palette.text.primary }}
            >
              <Notifications />
            </IconButton>

            {/* User Menu */}
            <IconButton
              edge="end"
              aria-label="account"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
              sx={{ color: theme.palette.text.primary }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                <AccountCircle />
              </Avatar>
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={userMenuAnchor}
              keepMounted
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>
                <AccountCircle sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose}>
                <Settings sx={{ mr: 1 }} />
                Settings
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: theme.palette.background.default,
          }}
        >
          {renderPageContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
