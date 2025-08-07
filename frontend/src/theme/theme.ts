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

// Remove all shadows - flat design with no elevation
const mondooShadows = [
  'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none', 'none', 'none', 'none'
] as [
  'none',
  string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string
];

export const theme = createTheme({
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
    borderRadius: 0, // Remove all rounded corners
  },

  components: {
    // Button styling inspired by Mondoo's CTA buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
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
          borderRadius: 0,
          border: `1px solid ${mondooColors.divider}`,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            transform: 'none',
            transition: 'none',
          },
        },
      },
    },

    // Paper component for consistent elevation
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `1px solid ${mondooColors.divider}`,
          '&.chart-paper': {
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        },
        elevation1: {
          boxShadow: 'none',
        },
        elevation2: {
          boxShadow: 'none',
        },
      },
    },

    // Form controls styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
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
          borderRadius: 0,
        },
      },
    },

    // Chip styling for tags and filters
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
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
          boxShadow: 'none',
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
        
        // Ensure SVG icons are visible
        'svg': {
          display: 'block',
          fill: 'currentColor',
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

        // Logo component styles (keeping basic styling for the custom SVG component)
        '.logo-header, .logo-subtitle': {
          transition: 'all 0.3s ease-in-out',
          display: 'block !important',
          maxWidth: '100%',
          height: 'auto',
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
          // Sidebar Icon Customization (targeting both standard MUI and Toolpad Core classes)
          '& .MuiListItemIcon-root .MuiSvgIcon-root, & .MuiSvgIcon-root': {
            fontSize: '1.2rem !important',
            color: 'rgba(0, 0, 0, 0.4) !important',
            transition: 'color 0.2s ease',
          },
          '& .MuiListItemButton-root.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root, & .MuiListItemButton-root.Mui-selected .MuiSvgIcon-root': {
            color: `${mondooColors.primary.main} !important`,
          },
          '& .MuiListItemButton-root:hover .MuiListItemIcon-root .MuiSvgIcon-root, & .MuiListItemButton-root:hover .MuiSvgIcon-root': {
            color: 'rgba(0, 0, 0, 0.6) !important',
          },
          // Dark mode icon adjustments
          '[data-mui-color-scheme="dark"] &': {
            '& .MuiListItemIcon-root .MuiSvgIcon-root, & .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.5) !important',
            },
            '& .MuiListItemButton-root.Mui-selected .MuiListItemIcon-root .MuiSvgIcon-root, & .MuiListItemButton-root.Mui-selected .MuiSvgIcon-root': {
              color: '#A78BFA !important',
            },
            '& .MuiListItemButton-root:hover .MuiListItemIcon-root .MuiSvgIcon-root, & .MuiListItemButton-root:hover .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.7) !important',
            },
          },
        },
      },
    },
  },
});

export default theme;
