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

interface AdvisoriesSummaryData {
  averageValue: number;
  delta: number;
}

interface AdvisoriesSummaryCardProps {
  data?: AdvisoriesSummaryData;
  loading?: boolean;
}

const AdvisoriesSummaryCard: React.FC<AdvisoriesSummaryCardProps> = ({
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
      backgroundColor: '#E9D5FF',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h6" color="#6B46C1" gutterBottom>
          Advisories
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 60 }}>
            <Typography variant="body2" color="#6B46C1">
              Loading...
            </Typography>
          </Box>
        ) : data ? (
          <>
            <Typography variant="h4" component="div" sx={{ mb: 1, color: '#6B46C1' }}>
              {data.averageValue.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="#6B46C1">
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
          <Typography variant="body2" color="#6B46C1">
            No data available
          </Typography>
        )}
        
                       <Button
                 variant="outlined"
                 size="small"
                 endIcon={<OpenInNew />}
                 sx={{
                   mt: 2,
                   borderColor: '#6B46C1',
                   color: '#6B46C1',
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
                     borderColor: '#553C9A',
                     backgroundColor: 'rgba(107, 70, 193, 0.1)',
                   },
                   fontWeight: 'medium',
                 }}
                 onClick={() => alert('Fix Advisories issues')}
               >
                 Fix Issues
               </Button>
      </CardContent>
    </Card>
  );
};

export default AdvisoriesSummaryCard;
