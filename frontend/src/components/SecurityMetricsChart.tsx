'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA, TimeSeriesResponse, TimeRange, CriticalityLevel } from '../lib/graphql-queries';
import { ChartControls, SummaryCards, D3LineChart } from './chart';

const SecurityMetricsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([
    'NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  ]);

  const { data, loading, error } = useQuery<TimeSeriesResponse>(GET_TIME_SERIES_DATA, {
    variables: {
      timeRange,
      criticalities: selectedCriticalities,
    },
  });

  const handleTimeRangeChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
  };

  const handleCriticalityChange = (newCriticalities: CriticalityLevel[]) => {
    setSelectedCriticalities(newCriticalities);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading security metrics: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Security Metrics Over Time
      </Typography>

      {/* Chart Controls */}
      <ChartControls
        timeRange={timeRange}
        selectedCriticalities={selectedCriticalities}
        onTimeRangeChange={handleTimeRangeChange}
        onCriticalityChange={handleCriticalityChange}
        disabled={loading}
      />

      {/* Summary Cards */}
      {data && (
        <SummaryCards
          data={data.timeSeriesData.summary}
          loading={loading}
        />
      )}

      {/* D3 Line Chart */}
      {data && (
        <D3LineChart
          dataPoints={data.timeSeriesData.dataPoints}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default SecurityMetricsChart;
