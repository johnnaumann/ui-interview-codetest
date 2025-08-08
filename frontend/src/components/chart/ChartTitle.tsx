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
          fontSize: {
            xs: '1.5rem',
            sm: '1.75rem',
            md: '2.125rem',
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
