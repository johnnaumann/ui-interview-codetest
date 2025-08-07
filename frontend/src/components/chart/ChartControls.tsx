'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { TimeRange, CriticalityLevel } from '../../api/graphql-queries';
import TimeRangeFilter from './TimeRangeFilter';
import CriticalityFilter from './CriticalityFilter';

interface ChartControlsProps {
  timeRange: TimeRange;
  selectedCriticalities: CriticalityLevel[];
  onTimeRangeChange: (timeRange: TimeRange) => void;
  onCriticalityChange: (criticalities: CriticalityLevel[]) => void;
  disabled?: boolean;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  timeRange,
  selectedCriticalities,
  onTimeRangeChange,
  onCriticalityChange,
  disabled = false,
}) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(45, 27, 105, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: 1,
        padding: 1.5,
        border: theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <TimeRangeFilter
        value={timeRange}
        onChange={onTimeRangeChange}
        disabled={disabled}
      />
      <CriticalityFilter
        value={selectedCriticalities}
        onChange={onCriticalityChange}
        disabled={disabled}
      />
    </Box>
  );
};

export default ChartControls;
