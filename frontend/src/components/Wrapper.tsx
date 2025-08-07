'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import client from '../api/apollo-client';
import { theme } from '../theme/theme';
import { navigation } from '../lib/navigation';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface WrapperProps {
  children: React.ReactNode;
}

// Simple router for MUI Toolpad Core
const router = {
  pathname: '/dashboard',
  searchParams: new URLSearchParams(),
  navigate: (url: string | URL) => {
    const path = typeof url === 'string' ? url : url.pathname;
    console.log('Navigating to:', path);
  },
};

// Branding configuration
const branding = {
  logo: <Logo width={108} height={19} />,
  title: '',
  homeUrl: '/dashboard',
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider
          navigation={navigation}
          router={router}
          theme={theme}
          branding={branding}
        >
          <DashboardLayout
            slots={{
              toolbarActions: () => <ThemeToggle />,
            }}
          >
            {children}
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
