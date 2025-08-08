'use client';

import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { ThemeContextType, ThemeProviderProps } from '../types';

/**
 * Theme Context and Provider
 * 
 * This file provides a comprehensive theming system for the application with:
 * - Light and dark mode support
 * - Custom color palette with semantic naming
 * - Material-UI component overrides for consistent styling
 * - Type-safe theme context with custom hooks
 * 
 * The theme system is designed to be:
 * - Accessible: Proper contrast ratios and color semantics
 * - Consistent: Unified color palette across all components
 * - Flexible: Easy to extend with new colors and component styles
 * - Type-safe: Full TypeScript support with proper type definitions
 */

/**
 * Application Color Palette
 * 
 * Defines all colors used throughout the application with semantic naming.
 * Colors are organized by purpose and include both light and dark variants.
 */
export const colors = {
  // Primary brand colors - used for main actions and branding
  primary: {
    main: '#6B46C1',    // Purple - main brand color
    light: '#8B5CF6',   // Lighter purple for hover states
    dark: '#553C9A',    // Darker purple for active states
  },
  
  // Secondary brand colors - used for secondary actions and accents
  secondary: {
    main: '#1E40AF',    // Blue - secondary brand color
    light: '#3B82F6',   // Lighter blue for hover states
    dark: '#1E3A8A',    // Darker blue for active states
  },
  
  // Semantic colors for status indicators and feedback
  success: { main: '#059669', light: '#10B981', dark: '#047857' }, // Green
  warning: { main: '#D97706', light: '#F59E0B', dark: '#B45309' }, // Orange
  error: { main: '#DC2626', light: '#EF4444', dark: '#B91C1C' },   // Red
  info: { main: '#1E40AF', light: '#3B82F6', dark: '#1E3A8A' },    // Blue
  
  // Custom color for advisory data visualization
  advisories: { main: '#C084FC', light: '#E9D5FF', dark: '#A855F7' }, // Purple variant
  
  // Light mode color scheme
  light: {
    background: {
      default: '#FAFBFC',  // Main background
      paper: '#FFFFFF',    // Card/paper background
      elevated: '#F8FAFC', // Elevated surface background
    },
    text: {
      primary: '#0F172A',   // Primary text color
      secondary: '#475569', // Secondary text color
      disabled: '#94A3B8',  // Disabled text color
    },
    divider: '#E2E8F0',     // Border/divider color
  },
  
  // Dark mode color scheme
  dark: {
    background: {
      default: '#2D1B69',   // Main background (dark purple)
      paper: '#2D1B69',     // Card/paper background
      elevated: '#2D1B69',  // Elevated surface background
    },
    text: {
      primary: '#F8FAFC',   // Primary text color (light)
      secondary: '#CBD5E1', // Secondary text color
      disabled: '#64748B',  // Disabled text color
    },
    divider: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white divider
  },
  
  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Tooltip-specific colors for consistent tooltip styling
  tooltip: {
    text: '#1F2937',        // Tooltip text color
    border: '#E2E8F0',      // Tooltip border color
    background: '#FFFFFF',  // Tooltip background color
  },
  
  // Gray scale for various UI elements
  gray: {
    300: '#D1D5DB', // Light gray
    400: '#9CA3AF', // Medium light gray
    500: '#6B7280', // Medium gray
    600: '#4B5563', // Medium dark gray
    700: '#374151', // Dark gray
    800: '#1F2937', // Very dark gray
  },
} as const;

/**
 * Material-UI Theme Extension
 * 
 * Extends the default Material-UI theme with custom color properties.
 * This ensures type safety when accessing custom colors throughout the application.
 */
declare module '@mui/material/styles' {
  interface Palette {
    // Custom advisories color for data visualization
    advisories: import('../types').AdvisoriesColor;
    
    // Custom tooltip colors for consistent tooltip styling
    tooltip: {
      text: string;
      border: string;
      background: string;
    };
    
    // Extended gray scale for various UI elements
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

/**
 * Component Style Overrides
 * 
 * Provides custom styling for Material-UI components to ensure consistency
 * across the application and proper theming support.
 * 
 * @param mode - Current theme mode ('light' or 'dark')
 * @returns Object containing component style overrides
 */
const createComponentOverrides = (mode: 'light' | 'dark') => ({
  // Global CSS baseline overrides
  MuiCssBaseline: {
    styleOverrides: `
      body {
        font-family: var(--font-roboto), "Roboto", "Helvetica", "Arial", sans-serif;
      }
      
      body .MuiDrawer-root .MuiListItemButton-root, 
      body [data-segment="dashboard"], 
      body .MuiListItemButton-root, 
      body .MuiListItem-root .MuiListItemButton-root, 
      body nav .MuiListItemButton-root {
        color: ${mode === 'dark' ? `${colors.white} !important` : 'inherit'};
      }
      
      body .MuiDrawer-root .MuiListItemButton-root .MuiTypography-root, 
      body .MuiDrawer-root .MuiListItemButton-root .MuiListItemIcon-root, 
      body .MuiDrawer-root .MuiListItemButton-root .MuiSvgIcon-root, 
      body .MuiDrawer-root .MuiListItemButton-root svg,
      body [data-segment="dashboard"] .MuiTypography-root, 
      body [data-segment="dashboard"] .MuiListItemIcon-root, 
      body [data-segment="dashboard"] .MuiSvgIcon-root, 
      body [data-segment="dashboard"] svg,
      body .MuiListItemButton-root .MuiTypography-root, 
      body .MuiListItemButton-root .MuiListItemIcon-root, 
      body .MuiListItemButton-root .MuiSvgIcon-root, 
      body .MuiListItemButton-root svg,
      body .MuiListItem-root .MuiListItemButton-root .MuiTypography-root, 
      body .MuiListItem-root .MuiListItemButton-root .MuiListItemIcon-root, 
      body .MuiListItem-root .MuiListItemButton-root .MuiSvgIcon-root, 
      body .MuiListItem-root .MuiListItemButton-root svg,
      body nav .MuiListItemButton-root .MuiTypography-root, 
      body nav .MuiListItemButton-root .MuiListItemIcon-root, 
      body nav .MuiListItemButton-root .MuiSvgIcon-root, 
      body nav .MuiListItemButton-root svg {
        color: ${mode === 'dark' ? `${colors.white} !important` : 'inherit'};
      }
    `,
  },
  
  // Button component overrides - remove default shadows
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
  
  // Card component overrides - flat design with borders in dark mode
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
  
  // Paper component overrides - flat design with borders in dark mode
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
  
  // AppBar component overrides - remove shadow and set background
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        backgroundColor: mode === 'dark' ? colors.dark.background.default : undefined,
      },
    },
  },
  
  // ListItemButton component overrides - proper dark mode styling
  MuiListItemButton: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
        '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
          color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
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
  
  // ListItem component overrides - ensure proper text color inheritance
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
  
  // Drawer component overrides - set max width and proper borders
  MuiDrawer: {
    styleOverrides: {
      root: {
        maxWidth: '250px', // Limit drawer width for better UX
      },
      paper: {
        maxWidth: '250px',
        borderRight: `1px solid ${mode === 'dark' ? colors.dark.divider : colors.light.divider}`,
        '& .MuiListItemButton-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
          '& .MuiTypography-root, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
            color: mode === 'dark' ? `${colors.white} !important` : undefined,
          },
        },
      },
    },
  },
  
  // ListItemIcon component overrides - ensure proper icon colors
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
        '& .Mui-selected &, &.Mui-selected, & .MuiSvgIcon-root, & svg': {
          color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
        },
      },
    },
  },
  
  // ListItemText component overrides - ensure proper text colors
  MuiListItemText: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root': {
          color: mode === 'dark' ? `${colors.white} !important` : undefined,
        },
      },
    },
  },
  
  // Typography component overrides - ensure proper caption colors
  MuiTypography: {
    styleOverrides: {
      caption: {
        color: mode === 'dark' ? `${colors.white} !important` : undefined,
      },
    },
  },
  
  // SvgIcon component overrides - ensure proper icon colors
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
      },
    },
  },
  
  // IconButton component overrides - ensure proper icon colors for theme toggle and menu buttons
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
        '& .MuiSvgIcon-root, & svg': {
          color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
        },
        '&:hover': {
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          '& .MuiSvgIcon-root, & svg': {
            color: mode === 'dark' ? `${colors.white} !important` : `${colors.light.text.secondary} !important`,
          },
        },
      },
    },
  },
  
  // Divider component overrides - ensure proper divider styling
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

/**
 * Theme Context
 * 
 * React context for providing theme state and functions throughout the application.
 * This context is undefined by default and must be provided by ThemeProvider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * useTheme Hook
 * 
 * Custom hook for accessing the theme context.
 * Provides type-safe access to theme mode, toggle function, and Material-UI theme.
 * 
 * @throws Error if used outside of ThemeProvider
 * @returns ThemeContextType with mode, toggleColorMode, and theme
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * ThemeProvider Component
 * 
 * Provides theme context and Material-UI theme to the application.
 * Manages theme state (light/dark mode) and creates the Material-UI theme
 * with custom colors and component overrides.
 * 
 * @param children - React children to be wrapped with theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Theme mode state - defaults to light mode
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  /**
   * Toggle between light and dark mode
   * 
   * Switches the theme mode and triggers a re-render of all themed components.
   */
  const toggleColorMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  // Create Material-UI theme with custom configuration
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
      // Custom colors for tooltips and UI elements
      tooltip: colors.tooltip,
      gray: colors.gray,
    },
    // Remove all default shadows for flat design
    shadows: Array(25).fill('none') as Theme['shadows'],
    // Apply custom component overrides
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
