import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChartTooltip from '../components/chart/ChartTooltip';

// Mock theme for testing
const mockTheme = createTheme({
  palette: {
    tooltip: {
      background: '#ffffff',
      border: '#cccccc',
      text: '#000000',
      shadow: 'rgba(0,0,0,0.15)',
    },
    gray: {
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#666666',
      800: '#333333',
    },
  },
});

// Wrapper component to provide theme context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={mockTheme}>
    {children}
  </ThemeProvider>
);

describe('ChartTooltip', () => {
  it('renders tooltip container with correct structure', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    // Check that the tooltip container is rendered using MuiBox-root class
    const tooltipContainer = screen.getByTestId('chart-tooltip');
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('renders two Typography components for date and value', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    // Check that both Typography components are rendered using MUI classes
    const tooltipContainer = screen.getByTestId('chart-tooltip');
    const typographyElements = tooltipContainer.querySelectorAll('p.MuiTypography-root');
    expect(typographyElements).toHaveLength(2);
    
    // Verify they have the correct MUI classes
    typographyElements.forEach(element => {
      expect(element).toHaveClass('MuiTypography-root');
      expect(element).toHaveClass('MuiTypography-body2');
    });
  });

  it('applies correct styling to tooltip container', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    
    // Check that the tooltip has the expected styles
    expect(tooltipContainer).toHaveStyle({
      position: 'fixed',
      zIndex: 1000,
      pointerEvents: 'none',
      opacity: 0,
      minWidth: '150px',
      whiteSpace: 'nowrap',
    });
  });

  it('applies correct styling to date Typography', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    const typographyElements = tooltipContainer.querySelectorAll('p.MuiTypography-root');
    const dateElement = typographyElements[0];
    
    // Check that the date Typography has the expected classes and basic styles
    expect(dateElement).toHaveClass('MuiTypography-root');
    expect(dateElement).toHaveClass('MuiTypography-body2');
    
    // Check computed styles that are actually applied
    const computedStyle = window.getComputedStyle(dateElement);
    expect(computedStyle.fontFamily).toContain('Roboto');
    expect(computedStyle.fontSize).toBe('12px');
    expect(computedStyle.whiteSpace).toBe('nowrap');
  });

  it('applies correct styling to value Typography', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    const typographyElements = tooltipContainer.querySelectorAll('p.MuiTypography-root');
    const valueElement = typographyElements[1];
    
    // Check that the value Typography has the expected classes and basic styles
    expect(valueElement).toHaveClass('MuiTypography-root');
    expect(valueElement).toHaveClass('MuiTypography-body2');
    
    // Check computed styles that are actually applied
    const computedStyle = window.getComputedStyle(valueElement);
    expect(computedStyle.fontFamily).toContain('Roboto');
    expect(computedStyle.fontSize).toBe('12px');
    expect(computedStyle.whiteSpace).toBe('nowrap');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    
    render(
      <TestWrapper>
        <ChartTooltip ref={ref} />
      </TestWrapper>
    );

    // Check that the ref is properly forwarded
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toHaveClass('MuiBox-root');
  });

  it('has correct theme-based colors', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    
    // Check that theme colors are applied
    expect(tooltipContainer).toHaveStyle({
      backgroundColor: '#ffffff',
      border: '1px solid #cccccc',
    });
  });

  it('has correct transition properties', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    
    // Check that transition properties are applied
    expect(tooltipContainer).toHaveStyle({
      transition: 'opacity 0.2s ease-in-out',
    });
  });

  it('has correct border radius and padding', () => {
    render(
      <TestWrapper>
        <ChartTooltip />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    
    // Check that border radius and padding are applied
    expect(tooltipContainer).toHaveStyle({
      borderRadius: '4px',
      padding: '12px',
    });
  });

  it('renders with cardType prop for styling', () => {
    render(
      <TestWrapper>
        <ChartTooltip cardType="cve" />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('renders with advisories cardType prop', () => {
    render(
      <TestWrapper>
        <ChartTooltip cardType="advisories" />
      </TestWrapper>
    );

    const tooltipContainer = screen.getByTestId('chart-tooltip');
    expect(tooltipContainer).toBeInTheDocument();
  });
});
