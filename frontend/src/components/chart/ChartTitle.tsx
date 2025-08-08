import React from 'react';
import { Box, Typography } from '@mui/material';

const ChartTitle: React.FC = () => {
  return (
    <Box sx={{ 
      mt: 3,
      mb: 2,
      px: 2,
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 1,
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
