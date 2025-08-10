'use client';

import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { ThemeContextType, ThemeProviderProps } from '../types';

export const colors = {
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

  success: { main: '#059669', light: '#10B981', dark: '#047857' },
  warning: { main: '#D97706', light: '#F59E0B', dark: '#B45309' },
  error: { main: '#DC2626', light: '#EF4444', dark: '#B91C1C' },
  info: { main: '#1E40AF', light: '#3B82F6', dark: '#1E3A8A' },

  advisories: { main: '#C084FC', light: '#E9D5FF', dark: '#A855F7' },

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
    border: {
      default: 'rgba(0, 0, 0, 0.23)',
    },
    hover: {
      primary: 'rgba(0, 0, 0, 0.05)',
      card: 'rgba(0, 0, 0, 0.04)',
    },
  },

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
    divider: 'rgba(255, 255, 255, 0.15)',
    border: {
      default: 'rgba(0, 0, 0, 0.23)',
    },
    hover: {
      primary: 'rgba(255, 255, 255, 0.05)',
      secondary: 'rgba(255, 255, 255, 0.1)',
      selected: 'rgba(255, 255, 255, 0.15)',
      card: 'rgba(255, 255, 255, 0.1)',
    },
  },

  white: '#FFFFFF',
  black: '#000000',

  tooltip: {
    text: '#1F2937',
    border: '#E2E8F0',
    background: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.15)',
  },

  tooltipDark: {
    text: '#F8FAFC',
    border: 'rgba(255, 255, 255, 0.15)',
    background: '#2D1B69',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },

  gray: {
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
  },
} as const;

declare module '@mui/material/styles' {
  interface Palette {
    advisories: import('../types').AdvisoriesColor;

    tooltip: {
      text: string;
      border: string;
      background: string;
      shadow: string;
    };

    gray: {
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
    };
  }

  interface PaletteOptions {
    advisories?: Palette['advisories'];
    tooltip?: Palette['tooltip'];
    gray?: Palette['gray'];
  }
}

const createComponentOverrides = (mode: 'light' | 'dark') => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily: 'var(--font-roboto), "Roboto", "Helvetica", "Arial", sans-serif',
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
        color: mode === 'dark' ? colors.white : colors.light.text.secondary,
        '& .MuiTypography-root': {
          color: 'inherit',
        },
        '& .MuiListItemIcon-root': {
          color: 'inherit',
        },
        '& .MuiSvgIcon-root': {
          color: 'inherit',
        },
        '&.Mui-selected': {
          backgroundColor: mode === 'dark' ? colors.dark.hover.secondary : colors.light.hover.primary,
          color: mode === 'dark' ? colors.white : colors.primary.main,
          '&:hover': {
            backgroundColor: mode === 'dark' ? colors.dark.hover.selected : colors.light.hover.card,
          },
        },
        '&:hover': {
          backgroundColor: mode === 'dark' ? colors.dark.hover.primary : colors.light.hover.primary,
        },
        '&[href="/dashboard"]': {
          backgroundColor: mode === 'dark'
            ? `${colors.primary.main}20 !important`
            : `${colors.primary.main}10 !important`,
          color: mode === 'dark'
            ? `${colors.white} !important`
            : `${colors.primary.main} !important`,
          borderRadius: '6px !important',
          margin: '4px 8px !important',
          '&:hover': {
            backgroundColor: `${colors.primary.main}30 !important`,
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
          '& .MuiListItemText-root': {
            '& .MuiTypography-root': {
              color: mode === 'dark'
                ? `${colors.white} !important`
                : `${colors.primary.main} !important`,
            },
          },
        },
      },
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: {},
    },
  },

  MuiDrawer: {
    styleOverrides: {
      root: {
        maxWidth: '250px',
      },
      paper: {
        maxWidth: '250px',
        borderRight: `1px solid ${mode === 'dark' ? colors.dark.divider : colors.light.divider}`,
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? colors.white : colors.light.text.secondary,
        minWidth: '40px',
      },
    },
  },

  MuiListItemText: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root': {
          color: 'inherit',
        },
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      caption: {
        color: mode === 'dark' ? colors.white : colors.light.text.secondary,
      },
    },
  },

  MuiSvgIcon: {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? colors.white : colors.light.text.secondary,
        '&:hover': {
          backgroundColor: mode === 'dark' ? colors.dark.hover.primary : colors.light.hover.primary,
        },
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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'var(--font-roboto), "Roboto", "Helvetica", "Arial", sans-serif',
    },
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
      tooltip: mode === 'light' ? colors.tooltip : colors.tooltipDark,
      gray: colors.gray,
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

