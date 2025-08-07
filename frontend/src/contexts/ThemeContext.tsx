'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { ThemeContextType, ThemeProviderProps } from '../interfaces';

// Centralized color definitions
const colors = {
  // Primary brand colors
  primary: {
    main: '#6B46C1',
    light: '#8B5CF6',
    dark: '#553C9A',
  },
  secondary: {
    main: '#1E40AF',
    light: '#3B82F6',
    dark: '#1E3A8A',
  },
  
  // Semantic colors
  success: { main: '#059669', light: '#10B981', dark: '#047857' },
  warning: { main: '#D97706', light: '#F59E0B', dark: '#B45309' },
  error: { main: '#DC2626', light: '#EF4444', dark: '#B91C1C' },
  info: { main: '#1E40AF', light: '#3B82F6', dark: '#1E3A8A' },
  
  // Custom colors
  advisories: { main: '#C084FC', light: '#E9D5FF', dark: '#A855F7' },
  
  // Light theme colors
  light: {
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
  },
  
  // Dark theme colors
  dark: {
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
  },
  
  // Common colors
  white: '#FFFFFF',
  black: '#000000',
} as const;

// Type declarations for MUI theme extension
declare module '@mui/material/styles' {
  interface Palette {
    advisories: import('../interfaces').AdvisoriesColor;
  }
  interface PaletteOptions {
    advisories?: Palette['advisories'];
  }
}

// Helper function to create component overrides
const createComponentOverrides = (mode: 'light' | 'dark') => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        // Sidebar navigation overrides
        '& .MuiDrawer-root .MuiListItemButton-root, & [data-segment="dashboard"], & .MuiListItemButton-root, & .MuiListItem-root .MuiListItemButton-root, & nav .MuiListItemButton-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
          '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root, & svg': {
            color: mode === 'dark' ? `${colors.white} !important` : undefined,
          },
        },
      },
    },
  },
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
        borderRadius: 2,
        border: mode === 'dark' ? `1px solid ${colors.dark.divider}` : 'none',
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
        borderRadius: 2,
        border: mode === 'dark' ? `1px solid ${colors.dark.divider}` : 'none',
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
        backgroundColor: mode === 'dark' ? colors.dark.background.default : undefined,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : undefined,
        '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
        },
        '&.Mui-selected': {
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
          '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
            color: mode === 'dark' ? `${colors.white} !important` : undefined,
          },
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : undefined,
          },
        },
        '&:hover': {
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : undefined,
          '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
            color: mode === 'dark' ? `${colors.white} !important` : undefined,
          },
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        '& .MuiListItemButton-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
          '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
            color: mode === 'dark' ? `${colors.white} !important` : undefined,
          },
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        border: mode === 'dark' ? `1px solid ${colors.dark.divider}` : 'none',
        '& .MuiListItemButton-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
          '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
            color: mode === 'dark' ? `${colors.white} !important` : undefined,
          },
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : undefined,
        '& .Mui-selected &, &.Mui-selected, & .MuiSvgIcon-root, & svg': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
        },
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      caption: {
        color: mode === 'dark' ? `${colors.white} !important` : undefined,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : undefined,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        height: '1px',
        border: 'none',
        backgroundColor: mode === 'dark' ? colors.dark.divider : colors.light.divider,
      },
    },
  },
});

// Context setup
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: mode === 'light' ? colors.light.background : colors.dark.background,
      text: mode === 'light' ? colors.light.text : colors.dark.text,
      divider: mode === 'light' ? colors.light.divider : colors.dark.divider,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      advisories: colors.advisories,
    },
    shadows: Array(25).fill('none') as Theme['shadows'],
    components: createComponentOverrides(mode),
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
