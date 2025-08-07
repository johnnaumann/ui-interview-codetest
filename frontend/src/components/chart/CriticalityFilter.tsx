'use client';

import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
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
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const selectedValue = event.target.value;
    onChange(typeof selectedValue === 'string' ? selectedValue.split(',') as CriticalityLevel[] : selectedValue);
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

  return (
    <FormControl sx={{ minWidth: 300 }} disabled={disabled}>
      <InputLabel id="criticality-label">Criticality Levels</InputLabel>
      <Select
        labelId="criticality-label"
        id="criticality-select"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Criticality Levels" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((criticality) => (
              <Chip 
                key={criticality} 
                label={criticality} 
                size="small"
                color={getCriticalityColor(criticality)}
                variant="outlined"
              />
            ))}
          </Box>
        )}
      >
        <MenuItem value="NONE">None</MenuItem>
        <MenuItem value="LOW">Low</MenuItem>
        <MenuItem value="MEDIUM">Medium</MenuItem>
        <MenuItem value="HIGH">High</MenuItem>
        <MenuItem value="CRITICAL">Critical</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CriticalityFilter;
