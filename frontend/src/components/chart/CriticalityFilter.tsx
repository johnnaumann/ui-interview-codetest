'use client';

import React from 'react';
import {
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { CriticalityFilterProps, CriticalityLevel } from '../../interfaces';

const CriticalityFilter: React.FC<CriticalityFilterProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const theme = useTheme();
  const handleChipClick = (criticality: CriticalityLevel) => {
    if (disabled) return;
    
    const isSelected = value.includes(criticality);
    if (isSelected) {
      onChange(value.filter(c => c !== criticality));
    } else {
      onChange([...value, criticality]);
    }
  };

  const getCriticalityColor = (criticality: CriticalityLevel) => {
    if (theme.palette.mode === 'dark') {
      switch (criticality) {
        case 'CRITICAL':
          return '#EF4444';
        case 'HIGH':
          return '#F59E0B';
        case 'MEDIUM':
          return '#3B82F6';
        case 'LOW':
          return '#10B981';
        case 'NONE':
          return '#6B7280';
        default:
          return '#6B7280';
      }
    } else {
      switch (criticality) {
        case 'CRITICAL':
          return 'error';
        case 'HIGH':
          return 'warning';
        case 'MEDIUM':
          return 'info';
        case 'LOW':
          return 'success';
        case 'NONE':
          return 'default';
        default:
          return 'default';
      }
    }
  };

  const allCriticalities: CriticalityLevel[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {allCriticalities.map((criticality) => {
        const isSelected = value.includes(criticality);
        const chipColor = getCriticalityColor(criticality);
        return (
          <Chip
            key={criticality}
            label={criticality}
            size="medium"
            variant={isSelected ? "filled" : "outlined"}
            onClick={() => handleChipClick(criticality)}
            sx={{
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.6 : 1,
              ...(theme.palette.mode === 'dark' ? {
                backgroundColor: isSelected ? chipColor : 'transparent',
                color: isSelected ? 'white' : chipColor,
                borderColor: chipColor,
                border: '1px solid',
                '&:hover': disabled ? {} : {
                  backgroundColor: isSelected ? chipColor : `${chipColor}20`,
                },
              } : {
                '&:hover': disabled ? {} : {
                  backgroundColor: isSelected ? undefined : 'rgba(107, 70, 193, 0.1)',
                },
              }),
            }}
          />
        );
      })}
    </Box>
  );
};

export default CriticalityFilter;
