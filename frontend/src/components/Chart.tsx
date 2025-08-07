'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA, TimeSeriesResponse, TimeRange, CriticalityLevel } from '../api/graphql-queries';
import ChartControls from './chart/ChartControls';
import SummaryCards from './chart/SummaryCards';
import D3LineChart from './chart/D3LineChart';

const Chart: React.FC = () => {
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
    <Box sx={{ width: '100%' }}>
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

export default Chart;
