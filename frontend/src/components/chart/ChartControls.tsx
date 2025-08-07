'use client';

import React from 'react';
import { Box } from '@mui/material';
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
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        flexWrap: 'wrap',
        alignItems: 'center'
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
