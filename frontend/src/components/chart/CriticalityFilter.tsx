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
        return theme.palette.mode === 'dark' ? colors.dark.text.disabled : colors.light.text.disabled;
      default:
        return theme.palette.mode === 'dark' ? colors.dark.text.disabled : colors.light.text.disabled;
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
              color: isSelected ? colors.white : chipColor,
              borderColor: chipColor,
              border: `1px solid ${chipColor}`,
              fontWeight: 'medium',
              minWidth: 'fit-content',
              fontSize: '0.8125rem',
              height: '32px',
              transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
              '&:hover': disabled ? {} : {
                backgroundColor: `${chipColor}40 !important`,
                color: `${chipColor} !important`,
                '& .MuiChip-label': {
                  color: `${chipColor} !important`,
                },
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default CriticalityFilter;
