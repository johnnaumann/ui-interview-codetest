'use client';

import React from 'react';
import {
  Box,
  Chip,
} from '@mui/material';
import { CriticalityLevel } from '../../api/graphql-queries';

interface CriticalityFilterProps {
  value: CriticalityLevel[];
  onChange: (criticalities: CriticalityLevel[]) => void;
  disabled?: boolean;
}

const CriticalityFilter: React.FC<CriticalityFilterProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
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
  };

  const allCriticalities: CriticalityLevel[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {allCriticalities.map((criticality) => {
        const isSelected = value.includes(criticality);
        return (
          <Chip
            key={criticality}
            label={criticality}
            size="small"
            color={getCriticalityColor(criticality)}
            variant={isSelected ? "filled" : "outlined"}
            onClick={() => handleChipClick(criticality)}
            sx={{
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.6 : 1,
              '&:hover': disabled ? {} : {
                backgroundColor: isSelected ? undefined : 'rgba(107, 70, 193, 0.1)',
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default CriticalityFilter;
