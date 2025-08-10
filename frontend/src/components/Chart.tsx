'use client';

import React, { useState, useRef } from 'react';
import { Box, Alert } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA } from '../api/graphql-queries';
import type { TimeRange, CriticalityLevel } from '../types';
import ChartTitle from './chart/ChartTitle';
import FilterWrapper from './chart/FilterWrapper';
import D3LineChart from './chart/D3LineChart';
import SummaryCards from './chart/SummaryCards';
import LoadingOverlay from './LoadingOverlay';
import { colors } from '../contexts/ThemeContext';

const Chart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([]);
  const hasInitialData = useRef(false);

  const { data, loading, error } = useQuery(GET_TIME_SERIES_DATA, {
    variables: {
      timeRange,
      criticalities: selectedCriticalities.length > 0 ? selectedCriticalities : null,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      hasInitialData.current = true;
    },
  });

  const handleTimeRangeChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
  };

  const handleCriticalityChange = (newCriticalities: CriticalityLevel[]) => {
    setSelectedCriticalities(newCriticalities);
  };

  if (loading && !hasInitialData.current) {
    return <LoadingOverlay fullScreen />;
  }

  if (error) {
    return (
      <Alert 
        severity="error"
        sx={{
          backgroundColor: colors.error.light + '20',
          color: colors.error.main,
          border: `1px solid ${colors.error.light}40`,
        }}
      >
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
          />
          <Box sx={{ minHeight: 400 }}>
            <D3LineChart
              dataPoints={data?.timeSeriesData?.dataPoints || []}
              timeRange={timeRange}
              loading={false}
            />
          </Box>
        </Box>

        <Box>
          <SummaryCards
            data={data?.timeSeriesData?.summary}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chart;
