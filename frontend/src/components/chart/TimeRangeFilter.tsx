'use client';

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { TimeRangeFilterProps, TimeRange } from '../../types';
import { colors } from '../../contexts/ThemeContext';

const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TimeRange);
  };

  return (
    <FormControl 
      sx={{ 
        minWidth: { xs: '100%', sm: 200 },
        width: { xs: '100%', sm: 'auto' },
        '&.Mui-disabled': {
          opacity: 1,
          '& .MuiInputLabel-root': {
            color: 'text.primary',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.light.border.default,
            },
            '&:hover fieldset': {
              borderColor: colors.light.border.default,
            },
            '& .MuiSelect-select': {
              color: 'text.primary',
            },
            '& .MuiSvgIcon-root': {
              color: 'action.active',
            },
          },
        },
      }} 
      disabled={disabled}
    >
      <InputLabel 
        id="time-range-label"
        sx={{
          '&.Mui-disabled': {
            color: 'text.primary',
          },
        }}
      >
        Time Range
      </InputLabel>
      <Select
        labelId="time-range-label"
        id="time-range-select"
        value={value}
        label="Time Range"
        onChange={disabled ? undefined : handleChange}
        size="small"
        sx={{
          '&.Mui-disabled': {
            '& .MuiSelect-select': {
              color: 'text.primary',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.light.border.default,
            },
            '& .MuiSvgIcon-root': {
              color: 'action.active',
            },
          },
        }}
      >
        <MenuItem value="THREE_DAYS">Last 3 Days</MenuItem>
        <MenuItem value="SEVEN_DAYS">Last 7 Days</MenuItem>
        <MenuItem value="FOURTEEN_DAYS">Last 14 Days</MenuItem>
        <MenuItem value="THIRTY_DAYS">Last 30 Days</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TimeRangeFilter;
