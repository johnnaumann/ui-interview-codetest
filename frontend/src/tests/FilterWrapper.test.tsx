import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import FilterWrapper from '../components/chart/FilterWrapper';
import { TimeRange, CriticalityLevel } from '../types';

jest.mock('../components/chart/TimeRangeFilter', () => {
  return function MockTimeRangeFilter({ value, onChange, disabled }: { value: string; onChange: (value: string) => void; disabled?: boolean }) {
    return (
      <div data-testid="time-range-filter">
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="THREE_DAYS">Last 3 Days</option>
          <option value="SEVEN_DAYS">Last 7 Days</option>
          <option value="FOURTEEN_DAYS">Last 14 Days</option>
          <option value="THIRTY_DAYS">Last 30 Days</option>
        </select>
      </div>
    );
  };
});

jest.mock('../components/chart/CriticalityFilter', () => {
  return function MockCriticalityFilter({ value, onChange, disabled }: { value: string[]; onChange: (value: string[]) => void; disabled?: boolean }) {
    return (
      <div data-testid="criticality-filter">
        {['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((level) => (
          <button
            key={level}
            onClick={() => {
              if (disabled) return;
              const isSelected = value.includes(level);
              if (isSelected) {
                onChange(value.filter((c: string) => c !== level));
              } else {
                onChange([...value, level]);
              }
            }}
            disabled={disabled}
            data-testid={`criticality-${level.toLowerCase()}`}
          >
            {level}
          </button>
        ))}
      </div>
    );
  };
});

const theme = createTheme();

const defaultProps = {
  timeRange: 'THIRTY_DAYS' as TimeRange,
  selectedCriticalities: [] as CriticalityLevel[],
  onTimeRangeChange: jest.fn(),
  onCriticalityChange: jest.fn(),
  disabled: false,
};

const renderWithTheme = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <FilterWrapper {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('FilterWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both filter components', () => {
    renderWithTheme();
    
    expect(screen.getByTestId('time-range-filter')).toBeInTheDocument();
    expect(screen.getByTestId('criticality-filter')).toBeInTheDocument();
  });

  it('passes correct props to TimeRangeFilter', () => {
    const onTimeRangeChange = jest.fn();
    renderWithTheme({ onTimeRangeChange });
    
    const select = screen.getByTestId('time-range-filter').querySelector('select');
    expect(select).toHaveValue('THIRTY_DAYS');
    
    fireEvent.change(select!, { target: { value: 'SEVEN_DAYS' } });
    expect(onTimeRangeChange).toHaveBeenCalledWith('SEVEN_DAYS');
  });

  it('passes correct props to CriticalityFilter', () => {
    const onCriticalityChange = jest.fn();
    const selectedCriticalities: CriticalityLevel[] = ['HIGH', 'CRITICAL'];
    renderWithTheme({ onCriticalityChange, selectedCriticalities });
    
    const highButton = screen.getByTestId('criticality-high');
    fireEvent.click(highButton);
    
    expect(onCriticalityChange).toHaveBeenCalledWith(['CRITICAL']);
  });

  it('handles disabled state correctly', () => {
    renderWithTheme({ disabled: true });
    
    const select = screen.getByTestId('time-range-filter').querySelector('select');
    expect(select).toBeDisabled();
    
    const criticalityButton = screen.getByTestId('criticality-high');
    expect(criticalityButton).toBeDisabled();
  });

  it('renders with proper structure', () => {
    renderWithTheme();
    
    expect(screen.getByTestId('time-range-filter')).toBeInTheDocument();
    expect(screen.getByTestId('criticality-filter')).toBeInTheDocument();
    
    const timeFilter = screen.getByTestId('time-range-filter');
    const criticalityFilter = screen.getByTestId('criticality-filter');
    
    expect(timeFilter.parentElement?.parentElement).toBe(criticalityFilter.parentElement?.parentElement);
  });
});
