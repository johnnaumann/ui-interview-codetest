'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';


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
           }}>
                   <CardContent>
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
              {Math.round(data.averageValue)}
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
        
        
      </CardContent>
    </Card>
  );
};

export default CVESummaryCard;
