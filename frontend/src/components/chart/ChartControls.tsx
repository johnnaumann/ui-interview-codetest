'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ChartControlsProps } from '../../types';
import TimeRangeFilter from './TimeRangeFilter';
import CriticalityFilter from './CriticalityFilter';

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
        backgroundColor: theme.palette.mode === 'dark' 
          ? `${theme.palette.background.paper}E6`
          : `${theme.palette.background.paper}F2`,
        padding: 1.5,
        border: `1px solid ${theme.palette.divider}`,
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
