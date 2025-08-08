'use client';

import React from 'react';
import {
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { CriticalityFilterProps, CriticalityLevel } from '../../types';
import { colors } from '../../contexts/ThemeContext';

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
          return colors.error.light;
        case 'HIGH':
          return colors.warning.light;
        case 'MEDIUM':
          return colors.info.light;
        case 'LOW':
          return colors.success.light;
        case 'NONE':
          return colors.dark.text.disabled;
        default:
          return colors.dark.text.disabled;
      }
    } else {
      switch (criticality) {
        case 'CRITICAL':
          return colors.error.main;
        case 'HIGH':
          return colors.warning.main;
        case 'MEDIUM':
          return colors.info.main;
        case 'LOW':
          return colors.success.main;
        case 'NONE':
          return colors.light.text.disabled;
        default:
          return colors.light.text.disabled;
      }
    }
  };

  const allCriticalities: CriticalityLevel[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1,
      flexWrap: 'wrap',
      justifyContent: { xs: 'center', sm: 'flex-start' },
    }}>
      {allCriticalities.map((criticality) => {
        const isSelected = value.includes(criticality);
        const chipColor = getCriticalityColor(criticality);
        return (
          <Chip
            key={criticality}
            label={criticality}
            size="small"
            variant={isSelected ? "filled" : "outlined"}
            onClick={() => handleChipClick(criticality)}
            sx={{
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.6 : 1,
              backgroundColor: isSelected ? chipColor : 'transparent',
              color: isSelected ? 'white' : chipColor,
              borderColor: chipColor,
              border: `1px solid ${chipColor}`,
              fontWeight: 'medium',
              minWidth: 'fit-content',
              fontSize: '0.8125rem',
              height: '32px',
              '& .MuiChip-label': {
                fontWeight: 'medium',
                fontSize: '0.8125rem',
                lineHeight: '1.2',
                padding: '0 12px',
              },
              '&:hover': disabled ? {} : {
                backgroundColor: isSelected ? chipColor : `${chipColor}20`,
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default CriticalityFilter;
