'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Security as SecurityIcon,
  BugReport as VulnerabilityIcon,
  Assessment as ComplianceIcon,
  Inventory as AssetsIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Policy as PolicyIcon,
  Report as ReportsIcon,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  variant?: 'temporary' | 'permanent';
  width?: number;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, description: 'Overview & Metrics' },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: VulnerabilityIcon, description: 'CVE Management' },
  { id: 'compliance', label: 'Compliance', icon: ComplianceIcon, description: 'Framework Monitoring' },
  { id: 'assets', label: 'Assets', icon: AssetsIcon, description: 'Infrastructure Inventory' },
  { id: 'policies', label: 'Policies', icon: PolicyIcon, description: 'Security Policies' },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon, description: 'Security Analytics' },
  { id: 'reports', label: 'Reports', icon: ReportsIcon, description: 'Security Reports' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, description: 'Platform Configuration' },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  onClose, 
  currentPage, 
  onPageChange,
  variant = 'permanent',
  width = 280 
}) => {
  const theme = useTheme();

  const handleItemClick = (pageId: string) => {
    onPageChange(pageId);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold">
          Mondoo
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          Security Platform
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ px: 1, py: 2 }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleItemClick(item.id)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    py: 1.5,
                    backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                    color: isActive ? 'white' : theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: isActive 
                        ? theme.palette.primary.dark 
                        : 'rgba(107, 70, 193, 0.08)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'white' : theme.palette.primary.main,
                      minWidth: 40,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={isActive ? 600 : 500}>
                        {item.label}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: isActive ? 'rgba(255, 255, 255, 0.7)' : theme.palette.text.secondary,
                          fontSize: '0.7rem'
                        }}
                      >
                        {item.description}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Mondoo Security Platform
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            v2.0.1
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  if (variant === 'temporary') {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
