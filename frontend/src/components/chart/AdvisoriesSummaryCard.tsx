'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

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
    <Card sx={{ backgroundColor: '#E9D5FF' }}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default AdvisoriesSummaryCard;
