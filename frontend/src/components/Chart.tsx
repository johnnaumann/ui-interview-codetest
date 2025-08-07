'use client';

import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA, TimeSeriesResponse, TimeRange, CriticalityLevel } from '../api/graphql-queries';
import TimeRangeFilter from './chart/TimeRangeFilter';
import CriticalityFilter from './chart/CriticalityFilter';
import SummaryCards from './chart/SummaryCards';
import D3LineChart from './chart/D3LineChart';

const Chart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([]);

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
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 300px',
          lg: '1fr 350px',
        },
        gap: 2,
        minHeight: '400px',
        height: '100%',
        p: 2,
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
            left: 16,
            zIndex: 10,
            backgroundColor: 'white',
            borderRadius: 1,
            p: 1,
          }}>
            <TimeRangeFilter
              value={timeRange}
              onChange={handleTimeRangeChange}
              disabled={loading}
            />
          </Box>
          
          <Box sx={{
            position: 'absolute',
            top: -8,
            right: 16,
            zIndex: 10,
            backgroundColor: 'white',
            borderRadius: 1,
            p: 1,
            m: 3,
          }}>
            <CriticalityFilter
              value={selectedCriticalities}
              onChange={handleCriticalityChange}
              disabled={loading}
            />
          </Box>
        </Box>

        {data && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
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
