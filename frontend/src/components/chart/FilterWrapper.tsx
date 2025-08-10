'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { FilterWrapperProps } from '../../types';
import TimeRangeFilter from './TimeRangeFilter';
import CriticalityFilter from './CriticalityFilter';

const FilterWrapper: React.FC<FilterWrapperProps> = ({
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
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: { xs: 'stretch', md: 'space-between' },
        backgroundColor: theme.palette.mode === 'dark'
          ? `${theme.palette.background.paper}E6`
          : `${theme.palette.background.paper}F2`,
        backdropFilter: 'blur(8px)',
        borderRadius: 1,
        padding: 2,
        paddingTop: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        marginBottom: 2,
        position: 'relative',
      }}
    >
      <Box sx={{
        minWidth: { xs: '100%', md: '200px' },
      }}>
        <TimeRangeFilter
          value={timeRange}
          onChange={onTimeRangeChange}
          disabled={disabled}
        />
      </Box>

      <Box sx={{
        minWidth: { xs: '100%', md: 'auto' },
      }}>
        <CriticalityFilter
          value={selectedCriticalities}
          onChange={onCriticalityChange}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export default FilterWrapper;
