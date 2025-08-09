'use client';

import React, { useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA } from '../api/graphql-queries';
import type { TimeRange, CriticalityLevel } from '../types';
import ChartTitle from './chart/ChartTitle';
import FilterWrapper from './chart/FilterWrapper';
import D3LineChart from './chart/D3LineChart';
import SummaryCards from './chart/SummaryCards';

const Chart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([]);

  const { data, loading, error } = useQuery(GET_TIME_SERIES_DATA, {
    variables: {
      timeRange,
      criticalities: selectedCriticalities.length > 0 ? selectedCriticalities : null,
    },
    fetchPolicy: 'cache-and-network',
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
    <Box>
      <ChartTitle />
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          xl: '1fr 300px',
        },
        gap: { xs: 0, xl: 2 },
        p: 2,
      }}>
        <Box>
          <FilterWrapper
            timeRange={timeRange}
            selectedCriticalities={selectedCriticalities}
            onTimeRangeChange={handleTimeRangeChange}
            onCriticalityChange={handleCriticalityChange}
            disabled={loading}
          />
          <Box>
            {data && (
              <D3LineChart
                dataPoints={data.timeSeriesData.dataPoints}
                loading={loading}
              />
            )}
          </Box>
        </Box>

        {data && (
          <Box>
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
