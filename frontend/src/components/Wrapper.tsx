'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import CssBaseline from '@mui/material/CssBaseline';
import client from '../api/apollo-client';
import { navigation } from '../lib/navigation';
import { router } from '../lib/router';
import { branding } from '../lib/branding';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { WrapperProps } from '../types';

function AppContent({ children }: WrapperProps) {
  const { theme } = useTheme();
  
  return (
    <>
      <CssBaseline />
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
