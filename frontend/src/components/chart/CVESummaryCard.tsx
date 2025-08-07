'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

interface CVESummaryData {
  averageValue: number;
  delta: number;
}

interface CVESummaryCardProps {
  data?: CVESummaryData;
  loading?: boolean;
}

const CVESummaryCard: React.FC<CVESummaryCardProps> = ({
  data,
  loading = false,
}) => {
  const getDeltaColor = (delta: number) => {
    if (delta > 0) return 'error.main';
    if (delta < 0) return 'success.main';
    return 'text.secondary';
  };

  const getDeltaPrefix = (delta: number) => {
    if (delta > 0) return '+';
    return '';
  };

  return (
    <Card sx={{ 
      backgroundColor: '#6B46C1',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h6" color="white" gutterBottom>
          CVEs
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 60 }}>
            <Typography variant="body2" color="white">
              Loading...
            </Typography>
          </Box>
        ) : data ? (
          <>
            <Typography variant="h4" component="div" sx={{ mb: 1, color: 'white' }}>
              {data.averageValue.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="white">
              Average (
              <Typography
                component="span"
                color={getDeltaColor(data.delta)}
                sx={{ fontWeight: 'medium' }}
              >
                {getDeltaPrefix(data.delta)}{data.delta.toFixed(1)}%
              </Typography>
              {' '}change)
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="white">
            No data available
          </Typography>
        )}
        
                       <Button
                 variant="outlined"
                 size="small"
                 endIcon={<OpenInNew />}
                 sx={{
                   mt: 2,
                   borderColor: 'white',
                   color: 'white',
                   fontSize: {
                     xs: '0.75rem',
                     sm: '0.875rem',
                     md: '1rem',
                   },
                   padding: {
                     xs: '4px 8px',
                     sm: '6px 12px',
                     md: '8px 16px',
                   },
                   '&:hover': {
                     borderColor: 'rgba(255, 255, 255, 0.8)',
                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
                   },
                   fontWeight: 'medium',
                 }}
                 onClick={() => alert('Fix CVEs issues')}
               >
                 Fix Issues
               </Button>
      </CardContent>
    </Card>
  );
};

export default CVESummaryCard;
