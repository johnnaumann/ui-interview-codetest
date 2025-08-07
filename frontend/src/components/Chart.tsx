'use client';

import React, { useState } from 'react';
import {
  Box,
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
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ 
          height: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
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
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 300px',
          lg: '1fr 350px',
        },
        minHeight: '400px',
        height: '100%',
      }}>
        <Box sx={{ height: '100%', position: 'relative' }}>
          {data && (
            <D3LineChart
              dataPoints={data.timeSeriesData.dataPoints}
              loading={loading}
            />
          )}
          
          <Box sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
          }}>
            <ChartControls
              timeRange={timeRange}
              selectedCriticalities={selectedCriticalities}
              onTimeRangeChange={handleTimeRangeChange}
              onCriticalityChange={handleCriticalityChange}
              disabled={loading}
            />
          </Box>
        </Box>

        {data && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
          }}>
            <SummaryCards
              data={data.timeSeriesData.summary}
              loading={loading}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chart;
