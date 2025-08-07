'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import client from '../lib/apollo-client';
import { mondooTheme } from '../theme/mondooTheme';

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mondooTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
};
