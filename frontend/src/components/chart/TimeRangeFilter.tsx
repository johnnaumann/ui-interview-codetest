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

const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TimeRange);
  };

  return (
    <FormControl sx={{ minWidth: 200 }} disabled={disabled}>
      <InputLabel id="time-range-label">Time Range</InputLabel>
      <Select
        labelId="time-range-label"
        id="time-range-select"
        value={value}
        label="Time Range"
        onChange={handleChange}
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
