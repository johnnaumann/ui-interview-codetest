'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import client from '../api/apollo-client';
import { navigation } from '../lib/navigation';
import { router } from '../lib/router';
import { branding } from '../lib/branding';
import { ThemeProvider, useTheme, colors } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { WrapperProps } from '../types';

function AppContent({ children }: WrapperProps) {
  const { theme, mode } = useTheme();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          // Target Dashboard menu item specifically
          '& .MuiDrawer-paper [href="/dashboard"]': {
            backgroundColor: mode === 'dark'
              ? `rgba(107, 70, 193, 0.2) !important` // 20% opacity purple in dark mode
              : `rgba(107, 70, 193, 0.1) !important`, // 10% opacity purple in light mode
            color: mode === 'dark'
              ? `${colors.white} !important`
              : `${colors.primary.main} !important`,
            borderRadius: '6px !important',
            margin: '4px 8px !important',
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? `rgba(107, 70, 193, 0.3) !important` // 30% opacity on hover in dark mode
                : `rgba(107, 70, 193, 0.3) !important`, // 30% opacity on hover in light mode
            },
            '& .MuiListItemIcon-root': {
              color: mode === 'dark'
                ? `${colors.white} !important`
                : `${colors.primary.main} !important`,
            },
            '& .MuiSvgIcon-root': {
              color: mode === 'dark'
                ? `${colors.white} !important`
                : `${colors.primary.main} !important`,
            },
            '& .MuiTypography-root': {
              color: mode === 'dark'
                ? `${colors.white} !important`
                : `${colors.primary.main} !important`,
            },
          },
        }}
      >
        <AppProvider
          navigation={navigation}
          router={router}
          branding={branding}
          theme={theme}
        >
          <DashboardLayout
            slots={{
              toolbarActions: () => <ThemeToggle />,
            }}
          >
            {children}
          </DashboardLayout>
        </AppProvider>
      </Box>
    </>
  );
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AppContent>
          {children}
        </AppContent>
      </ThemeProvider>
    </ApolloProvider>
  );
}
