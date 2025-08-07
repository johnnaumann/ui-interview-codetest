'use client';

import React from 'react';
import {
  Box,
  Button,
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
        return '#DC2626';
      case 'HIGH':
        return '#D97706';
      case 'MEDIUM':
        return '#1E40AF';
      case 'LOW':
        return '#059669';
      case 'NONE':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const allCriticalities: CriticalityLevel[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {allCriticalities.map((criticality) => {
        const isSelected = value.includes(criticality);
        const color = getCriticalityColor(criticality);
        return (
          <Button
            key={criticality}
            variant={isSelected ? "contained" : "outlined"}
            size="small"
            onClick={() => handleChipClick(criticality)}
            disabled={disabled}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontWeight: 'medium',
              backgroundColor: isSelected ? color : 'transparent',
              borderColor: color,
              color: isSelected ? 'white' : color,
              '&:hover': {
                backgroundColor: isSelected ? color : `${color}20`,
                borderColor: color,
              },
              '&:disabled': {
                opacity: 0.6,
                backgroundColor: isSelected ? color : 'transparent',
                borderColor: color,
                color: isSelected ? 'white' : color,
              },
            }}
          >
            {criticality}
          </Button>
        );
      })}
    </Box>
  );
};

export default CriticalityFilter;
