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
import { router } from '../lib/router';
import { branding } from '../lib/branding';
import ThemeToggle from './ThemeToggle';

interface WrapperProps {
  children: React.ReactNode;
}

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
