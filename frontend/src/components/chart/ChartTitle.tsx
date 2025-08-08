import React from 'react';
import { Box, Typography } from '@mui/material';

const ChartTitle: React.FC = () => {
  return (
    <Box sx={{ 
      mt: 3,
      mb: 1,
      px: 2,
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 1,
          // Responsive typography: smaller on mobile, larger on desktop
          fontSize: {
            xs: '1.5rem',    // 24px on extra small devices (mobile)
            sm: '1.75rem',   // 28px on small devices (tablet)
            md: '2.125rem',  // 34px on medium devices and up (desktop) - default h4 size
          },
          lineHeight: {
            xs: 1.2,
            sm: 1.3,
            md: 1.4,
          },
        }}
      >
        Security Metrics Dashboard
      </Typography>
      
      <Typography 
        variant="body1" 
        component="p" 
        sx={{ 
          color: 'text.secondary',
          fontWeight: 'medium',
        }}
      >
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Typography>
    </Box>
  );
};

export default ChartTitle;
