import { createTheme } from '@mui/material/styles';

// Mondoo-inspired color palette based on their platform design
const mondooColors = {
  primary: {
    main: '#6B46C1', // Mondoo brand purple (primary brand color)
    light: '#8B5CF6',
    dark: '#553C9A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#1E40AF', // Mondoo blue (secondary brand color)
    light: '#3B82F6',
    dark: '#1E3A8A',
    contrastText: '#FFFFFF',
  },
  tertiary: {
    main: '#0F172A', // Deep navy for text and UI elements
    light: '#334155',
    dark: '#020617',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FAFBFC', // Slightly cooler background to match Mondoo
    paper: '#FFFFFF',
    elevated: '#F8FAFC', // Subtle elevation with cool tone
    gradient: 'linear-gradient(135deg, #6B46C1 0%, #1E40AF 100%)', // Brand gradient
  },
  text: {
    primary: '#0F172A', // Deep navy matching Mondoo's text
    secondary: '#475569', // Balanced gray for readability
    disabled: '#94A3B8',
    accent: '#6B46C1', // Brand purple for accents
  },
  divider: '#E2E8F0',
  success: {
    main: '#059669', // Emerald green matching platform
    light: '#10B981',
    dark: '#047857',
  },
  warning: {
    main: '#D97706', // Amber for warnings
    light: '#F59E0B',
    dark: '#B45309',
  },
  error: {
    main: '#DC2626', // Red for critical alerts
    light: '#EF4444',
    dark: '#B91C1C',
  },
  info: {
    main: '#1E40AF', // Mondoo blue for info
    light: '#3B82F6',
    dark: '#1E3A8A',
  },
  // Mondoo-specific accent colors
  accent: {
    purple: {
      main: '#6B46C1',
      light: '#8B5CF6',
      dark: '#553C9A',
      subtle: 'rgba(107, 70, 193, 0.08)',
    },
    blue: {
      main: '#1E40AF',
      light: '#3B82F6',
      dark: '#1E3A8A',
      subtle: 'rgba(30, 64, 175, 0.08)',
    },
    slate: {
      main: '#334155',
      light: '#64748B',
      dark: '#1E293B',
      subtle: 'rgba(51, 65, 85, 0.08)',
    },
  },
};

// Custom shadows inspired by Mondoo's clean, modern design
const mondooShadows = [
  'none',
  '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1)',
  '0px 10px 15px rgba(0, 0, 0, 0.05), 0px 4px 6px rgba(0, 0, 0, 0.1)',
  '0px 20px 25px rgba(0, 0, 0, 0.05), 0px 10px 10px rgba(0, 0, 0, 0.1)',
  '0px 25px 50px rgba(0, 0, 0, 0.1), 0px 12px 24px rgba(0, 0, 0, 0.15)',
  '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 12px 24px rgba(0, 0, 0, 0.2)',
  '0px 25px 50px rgba(0, 0, 0, 0.2), 0px 12px 24px rgba(0, 0, 0, 0.25)',
  '0px 25px 50px rgba(0, 0, 0, 0.25), 0px 12px 24px rgba(0, 0, 0, 0.3)',
  '0px 30px 60px rgba(0, 0, 0, 0.3), 0px 15px 30px rgba(0, 0, 0, 0.35)',
  '0px 35px 70px rgba(0, 0, 0, 0.35), 0px 18px 35px rgba(0, 0, 0, 0.4)',
  '0px 40px 80px rgba(0, 0, 0, 0.4), 0px 20px 40px rgba(0, 0, 0, 0.45)',
  '0px 45px 90px rgba(0, 0, 0, 0.45), 0px 22px 45px rgba(0, 0, 0, 0.5)',
  '0px 50px 100px rgba(0, 0, 0, 0.5), 0px 25px 50px rgba(0, 0, 0, 0.55)',
  '0px 55px 110px rgba(0, 0, 0, 0.55), 0px 28px 55px rgba(0, 0, 0, 0.6)',
  '0px 60px 120px rgba(0, 0, 0, 0.6), 0px 30px 60px rgba(0, 0, 0, 0.65)',
  '0px 65px 130px rgba(0, 0, 0, 0.65), 0px 32px 65px rgba(0, 0, 0, 0.7)',
  '0px 70px 140px rgba(0, 0, 0, 0.7), 0px 35px 70px rgba(0, 0, 0, 0.75)',
  '0px 75px 150px rgba(0, 0, 0, 0.75), 0px 38px 75px rgba(0, 0, 0, 0.8)',
  '0px 80px 160px rgba(0, 0, 0, 0.8), 0px 40px 80px rgba(0, 0, 0, 0.85)',
  '0px 85px 170px rgba(0, 0, 0, 0.85), 0px 42px 85px rgba(0, 0, 0, 0.9)',
  '0px 90px 180px rgba(0, 0, 0, 0.9), 0px 45px 90px rgba(0, 0, 0, 0.95)',
  '0px 95px 190px rgba(0, 0, 0, 0.95), 0px 48px 95px rgba(0, 0, 0, 1)',
  '0px 100px 200px rgba(0, 0, 0, 1), 0px 50px 100px rgba(0, 0, 0, 1)',
  '0px 105px 210px rgba(0, 0, 0, 1), 0px 52px 105px rgba(0, 0, 0, 1)',
] as [
  'none',
  string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string
];

export const mondooTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: mondooColors.primary,
        secondary: mondooColors.secondary,
        background: mondooColors.background,
        text: mondooColors.text,
        divider: mondooColors.divider,
        success: mondooColors.success,
        warning: mondooColors.warning,
        error: mondooColors.error,
        info: mondooColors.info,
      },
    },
    dark: {
      palette: {
        primary: {
          main: mondooColors.primary.light, // Lighter purple for dark mode
          light: '#A78BFA',
          dark: mondooColors.primary.dark,
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: mondooColors.secondary.light, // Lighter blue for dark mode
          light: '#60A5FA',
          dark: mondooColors.secondary.dark,
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#0F172A', // Dark navy background
          paper: '#1E293B', // Lighter dark for paper
        },
        text: {
          primary: '#F8FAFC', // Light text for dark mode
          secondary: '#CBD5E1', // Secondary light text
        },
        divider: '#475569', // Dark mode divider
        success: {
          main: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          main: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          main: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        info: {
          main: mondooColors.secondary.light,
          light: '#60A5FA',
          dark: mondooColors.secondary.dark,
        },
      },
    },
  },
  
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: mondooColors.text.primary,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: mondooColors.text.primary,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: mondooColors.text.primary,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: mondooColors.text.primary,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: mondooColors.text.primary,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: mondooColors.text.primary,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: mondooColors.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: mondooColors.text.secondary,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none' as const,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: mondooColors.text.secondary,
    },
  },

  shadows: mondooShadows,

  shape: {
    borderRadius: 8, // Mondoo uses rounded corners consistently
  },

  components: {
    // Button styling inspired by Mondoo's CTA buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(107, 70, 193, 0.25)',
          },
        },
        contained: {
          backgroundColor: mondooColors.primary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: mondooColors.primary.dark,
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: mondooColors.primary.main,
          color: mondooColors.primary.main,
          '&:hover': {
            borderColor: mondooColors.primary.dark,
            backgroundColor: mondooColors.accent.purple.subtle,
          },
        },
        text: {
          color: mondooColors.primary.main,
          '&:hover': {
            backgroundColor: mondooColors.accent.purple.subtle,
          },
        },
      },
    },

    // Card styling for clean, modern appearance
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${mondooColors.divider}`,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
    },

    // Paper component for consistent elevation
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${mondooColors.divider}`,
          '&.chart-paper': {
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        },
        elevation1: {
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.05), 0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    // Form controls styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: mondooColors.divider,
            },
            '&:hover fieldset': {
              borderColor: mondooColors.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: mondooColors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    // Chip styling for tags and filters
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: mondooColors.background.elevated,
          border: `1px solid ${mondooColors.divider}`,
          '&:hover': {
            backgroundColor: mondooColors.accent.purple.subtle,
          },
        },
        colorPrimary: {
          backgroundColor: mondooColors.accent.purple.subtle,
          color: mondooColors.primary.main,
          border: `1px solid rgba(107, 70, 193, 0.2)`,
        },
      },
    },

    // AppBar/Toolbar styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: mondooColors.text.primary,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)',
          borderBottom: `1px solid ${mondooColors.divider}`,
        },
      },
    },

    // Typography enhancements
    MuiTypography: {
      styleOverrides: {
        h1: {
          background: `linear-gradient(135deg, ${mondooColors.primary.main} 0%, ${mondooColors.secondary.main} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
      },
    },

    // Global CSS baseline overrides
    MuiCssBaseline: {
      styleOverrides: {
        // Global CSS reset and base styles (from globals.css)
        '*': {
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
        },
        html: {
          maxWidth: '100vw',
          overflowX: 'hidden',
          // Font smoothing for better text rendering
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          maxWidth: '100vw',
          overflowX: 'hidden',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },

        // Mondoo Logo Color Switching - default (purple brand color on light backgrounds)
        '.mondoo-logo-header, .mondoo-logo-subtitle': {
          filter: 'brightness(0) saturate(100%) invert(15%) sepia(97%) saturate(7103%) hue-rotate(270deg) brightness(79%) contrast(106%)',
          transition: 'filter 0.3s ease-in-out',
          display: 'block !important',
          visibility: 'visible !important',
          opacity: '1 !important',
        },

        // White logo on dark backgrounds (in dark mode)
        '[data-mui-color-scheme="dark"] .mondoo-logo-header, [data-mui-color-scheme="dark"] .mondoo-logo-subtitle': {
          filter: 'brightness(0) invert(1) !important',
        },

        // White logo on headers and navigation areas (AppBar and Drawer)
        '.MuiAppBar-root .mondoo-logo-header, .MuiAppBar-root .mondoo-logo-subtitle, .MuiDrawer-root .mondoo-logo-header, .MuiDrawer-root .mondoo-logo-subtitle': {
          filter: 'brightness(0) invert(1) !important',
        },

        // Ensure logo always shows regardless of next/image's default styles
        'img.mondoo-logo-header, img.mondoo-logo-subtitle': {
          color: 'unset !important',
          display: 'block !important',
          visibility: 'visible !important',
          opacity: '1 !important',
        },

        // Chart container responsiveness
        '.chart-container': {
          width: '100%',
          height: 'auto',
          minHeight: '400px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          '& svg': {
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            display: 'block',
          },
        },

        // Responsive utilities
        '.responsive-container': {
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        },
      },
    },



    // Enhanced Drawer/Sidebar styling
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: mondooColors.background.paper,
          borderRight: `1px solid ${mondooColors.divider}`,
          // Sidebar Icon Customization (from globals.css)
          '& .MuiListItemIcon-root .MuiSvgIcon-root': {
            fontSize: '1.2rem !important',
            color: 'rgba(0, 0, 0, 0.4) !important',
            transition: 'color 0.2s ease',
          },
          '& .MuiListItemButton-root.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root': {
            color: `${mondooColors.primary.main} !important`,
          },
          '& .MuiListItemButton-root:hover .MuiListItemIcon-root .MuiSvgIcon-root': {
            color: 'rgba(0, 0, 0, 0.6) !important',
          },
          // Dark mode icon adjustments
          '[data-mui-color-scheme="dark"] &': {
            '& .MuiListItemIcon-root .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.5) !important',
            },
            '& .MuiListItemButton-root.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root': {
              color: '#A78BFA !important',
            },
            '& .MuiListItemButton-root:hover .MuiListItemIcon-root .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.7) !important',
            },
          },
        },
      },
    },
  },
});

export default mondooTheme;
