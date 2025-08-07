import { createTheme } from '@mui/material/styles';

// Mondoo-inspired color palette based on their website design
const mondooColors = {
  primary: {
    main: '#0052CC', // Deep blue from Mondoo branding
    light: '#1E6FD8',
    dark: '#003A94',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2D3748', // Dark gray/navy for secondary elements
    light: '#4A5568',
    dark: '#1A202C',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F7FAFC', // Very light gray background
    paper: '#FFFFFF',
    elevated: '#FAFBFC', // Slightly elevated surfaces
  },
  text: {
    primary: '#1A202C', // Dark text for high contrast
    secondary: '#4A5568', // Medium gray for secondary text
    disabled: '#A0AEC0',
  },
  divider: '#E2E8F0',
  success: {
    main: '#38A169', // Green for success states
    light: '#48BB78',
    dark: '#2F855A',
  },
  warning: {
    main: '#D69E2E', // Amber for warnings
    light: '#ECC94B',
    dark: '#B7791F',
  },
  error: {
    main: '#E53E3E', // Red for errors/critical alerts
    light: '#F56565',
    dark: '#C53030',
  },
  info: {
    main: '#3182CE', // Blue for info
    light: '#4299E1',
    dark: '#2C5282',
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
];

export const mondooTheme = createTheme({
  palette: {
    mode: 'light',
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

  shadows: mondooShadows as any,

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
            boxShadow: '0px 4px 12px rgba(0, 82, 204, 0.2)',
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
            backgroundColor: 'rgba(0, 82, 204, 0.04)',
          },
        },
        text: {
          color: mondooColors.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(0, 82, 204, 0.04)',
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
            backgroundColor: 'rgba(0, 82, 204, 0.08)',
          },
        },
        colorPrimary: {
          backgroundColor: 'rgba(0, 82, 204, 0.1)',
          color: mondooColors.primary.main,
          border: `1px solid rgba(0, 82, 204, 0.2)`,
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
          background: `linear-gradient(135deg, ${mondooColors.primary.main} 0%, ${mondooColors.primary.dark} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
      },
    },
  },
});

export default mondooTheme;
