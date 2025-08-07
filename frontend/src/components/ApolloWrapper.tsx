'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import client from '../lib/apollo-client';
import { mondooTheme } from '../theme/mondooTheme';
import { NAVIGATION } from '../lib/navigation';
interface ApolloWrapperProps {
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
  logo: (
    <Image
      src="/logo.svg"
      alt="Mondoo Logo"
      width={108}
      height={19}
      className="mondoo-logo-header"
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  ),
  title: '',
  homeUrl: '/dashboard',
};

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mondooTheme}>
        <CssBaseline />
        <AppProvider
          navigation={NAVIGATION}
          router={router}
          theme={mondooTheme}
          branding={branding}
        >
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
