'use client';

import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA } from '../api/graphql-queries';
import { TimeSeriesResponse, TimeRange, CriticalityLevel } from '../types';
import SummaryCards from './chart/SummaryCards';
import D3LineChart from './chart/D3LineChart';
import ChartTitle from './chart/ChartTitle';
import FilterWrapper from './chart/FilterWrapper';

/**
 * Chart Component
 * 
 * Main chart dashboard that orchestrates the display of security metrics data.
 * This component serves as the central hub for:
 * - Data fetching via GraphQL
 * - State management for filters (time range and criticality levels)
 * - Layout coordination between chart, filters, and summary cards
 * - Loading and error state handling
 * 
 * The component uses a responsive grid layout that adapts to different screen sizes:
 * - Mobile/Tablet: Single column layout
 * - Desktop: Two-column layout with chart and sidebar
 */
const Chart: React.FC = () => {
  // Filter state management
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([]);

  /**
   * GraphQL Query Hook
   * 
   * Fetches time series data based on current filter selections.
   * The query automatically re-runs when timeRange or selectedCriticalities change.
   * 
   * @param data - Time series data with data points and summary statistics
   * @param loading - Boolean indicating if the query is in progress
   * @param error - Any error that occurred during the query
   */
  const { data, loading, error } = useQuery<TimeSeriesResponse>(GET_TIME_SERIES_DATA, {
    variables: {
      timeRange,
      criticalities: selectedCriticalities,
    },
  });

  /**
   * Time Range Change Handler
   * 
   * Updates the time range filter and triggers a new data fetch.
   * 
   * @param newTimeRange - The new time range selection
   */
  const handleTimeRangeChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
  };

  /**
   * Criticality Level Change Handler
   * 
   * Updates the criticality filter and triggers a new data fetch.
   * 
   * @param newCriticalities - Array of selected criticality levels
   */
  const handleCriticalityChange = (newCriticalities: CriticalityLevel[]) => {
    setSelectedCriticalities(newCriticalities);
  };

  /**
   * Loading State
   * 
   * Displays a centered loading spinner while data is being fetched.
   * Uses fixed positioning to cover the entire viewport.
   */
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

  /**
   * Error State
   * 
   * Displays an error alert if the GraphQL query fails.
   * Shows the specific error message to help with debugging.
   */
  if (error) {
    return (
      <Alert severity="error">
        Error loading security metrics: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Chart title component */}
      <ChartTitle />
      
      {/* Main content grid layout */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',        // Single column on mobile/tablet
          xl: '1fr 300px',  // Two columns on desktop (chart + sidebar)
        },
        gap: { xs: 0, xl: 2 }, // No gap on mobile, 16px gap on desktop
        p: 2, // Padding around the entire grid
      }}>
        {/* Left column: Chart and filters */}
        <Box sx={{ 
          display: 'block'
        }}>
          {/* Filter controls for time range and criticality levels */}
          <FilterWrapper
            timeRange={timeRange}
            selectedCriticalities={selectedCriticalities}
            onTimeRangeChange={handleTimeRangeChange}
            onCriticalityChange={handleCriticalityChange}
            disabled={loading}
          />
          
          {/* Chart container with relative positioning for proper layout */}
          <Box sx={{ 
            position: 'relative'
          }}>
            {/* D3 line chart - only render when data is available */}
            {data && (
              <D3LineChart
                dataPoints={data.timeSeriesData.dataPoints}
                loading={loading}
              />
            )}
          </Box>
        </Box>

        {/* Right column: Summary cards (desktop only) */}
        {data && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
          }}>
            {/* Summary statistics cards showing key metrics */}
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
