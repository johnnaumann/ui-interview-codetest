'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    advisories: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    advisories?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

const mondooColors = {
  primary: {
    main: '#6B46C1',
    light: '#8B5CF6',
    dark: '#553C9A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#1E40AF',
    light: '#3B82F6',
    dark: '#1E3A8A',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FAFBFC',
    paper: '#FFFFFF',
    elevated: '#F8FAFC',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    disabled: '#94A3B8',
  },
  divider: '#E2E8F0',
  success: { main: '#059669', light: '#10B981', dark: '#047857' },
  warning: { main: '#D97706', light: '#F59E0B', dark: '#B45309' },
  error: { main: '#DC2626', light: '#EF4444', dark: '#B91C1C' },
  info: { main: '#1E40AF', light: '#3B82F6', dark: '#1E3A8A' },
  advisories: { main: '#C084FC', light: '#E9D5FF', dark: '#A855F7' },
};

const darkColors = {
  primary: mondooColors.primary,
  secondary: mondooColors.secondary,
  background: {
    default: '#2D1B69',
    paper: '#2D1B69',
    elevated: '#2D1B69',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    disabled: '#64748B',
  },
  divider: '#334155',
  success: mondooColors.success,
  warning: mondooColors.warning,
  error: mondooColors.error,
  info: mondooColors.info,
  advisories: mondooColors.advisories,
};

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
  theme: Theme; // Export the theme object
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  // Create theme based on current mode
  const theme = createTheme({
    palette: {
      mode,
      primary: mondooColors.primary,
      secondary: mondooColors.secondary,
      background: mode === 'light' ? mondooColors.background : darkColors.background,
      text: mode === 'light' ? mondooColors.text : darkColors.text,
      divider: mode === 'light' ? mondooColors.divider : darkColors.divider,
      success: mondooColors.success,
      warning: mondooColors.warning,
      error: mondooColors.error,
      info: mondooColors.info,
      advisories: mondooColors.advisories,
    },
    shape: {
      borderRadius: 0,
    },
    shadows: [
      'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
      'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
      'none', 'none', 'none', 'none', 'none', 'none', 'none'
    ] as [
      'none',
      string, string, string, string, string, string, string, string,
      string, string, string, string, string, string, string, string,
      string, string, string, string, string, string, string, string
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
          elevation1: {
            boxShadow: 'none',
          },
          elevation2: {
            boxShadow: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backgroundColor: mode === 'dark' ? '#2D1B69' : undefined,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : undefined,
            '& .MuiTypography-root': {
              color: mode === 'dark' ? '#FFFFFF' : undefined,
            },
            '&.Mui-selected': {
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
              color: mode === 'dark' ? '#FFFFFF' : undefined,
              '& .MuiTypography-root': {
                color: mode === 'dark' ? '#FFFFFF' : undefined,
              },
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : undefined,
              },
            },
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : undefined,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : undefined,
            '& .Mui-selected &': {
              color: mode === 'dark' ? '#FFFFFF' : undefined,
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            '& .MuiTypography-root': {
              color: mode === 'dark' ? '#FFFFFF' : undefined,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          caption: {
            color: mode === 'dark' ? '#FFFFFF' : undefined,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
