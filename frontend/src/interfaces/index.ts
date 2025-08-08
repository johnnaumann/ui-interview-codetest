// Theme Context Interfaces
export interface AdvisoriesColor {
  main: string;
  light: string;
  dark: string;
}

export interface Palette {
  advisories: AdvisoriesColor;
}

export interface PaletteOptions {
  advisories?: AdvisoriesColor;
}

import type { AppTheme } from '@toolpad/core/AppProvider';

export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
  theme: AppTheme;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

// GraphQL Data Interfaces
export interface DataPoint {
  timestamp: string;
  cves: number;
  advisories: number;
}

export interface MetricSummary {
  averageValue: number;
  delta: number;
}

export interface TimeSeriesSummary {
  cves: MetricSummary;
  advisories: MetricSummary;
  timeRange: string;
  criticalities: string[];
}

export interface TimeSeriesData {
  dataPoints: DataPoint[];
  summary: TimeSeriesSummary;
}

export interface TimeSeriesResponse {
  timeSeriesData: TimeSeriesData;
}

export interface User {
  id: string;
  name: string;
}

export interface UserResponse {
  user: User;
}

// GraphQL Type Definitions
export type TimeRange = 'THREE_DAYS' | 'SEVEN_DAYS' | 'FOURTEEN_DAYS' | 'THIRTY_DAYS';
export type CriticalityLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Common Component Props
export interface BaseProps {
  children?: React.ReactNode;
}

export interface LoadingProps {
  loading?: boolean;
}

export interface DisabledProps {
  disabled?: boolean;
}

// Component Props Interfaces
export interface WrapperProps extends BaseProps {
  children: React.ReactNode;
}

export interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

// Chart Component Interfaces
// Use MetricSummary instead of duplicating CVESummaryData and AdvisoriesSummaryData
export type CVESummaryData = MetricSummary;
export type AdvisoriesSummaryData = MetricSummary;

export interface SummaryCardProps extends LoadingProps {
  data?: MetricSummary;
}

export type CVESummaryCardProps = SummaryCardProps;
export type AdvisoriesSummaryCardProps = SummaryCardProps;

export interface SummaryData {
  cves: MetricSummary;
  advisories: MetricSummary;
}

export interface SummaryCardsProps extends LoadingProps {
  data?: SummaryData;
}

export interface D3LineChartProps extends LoadingProps {
  dataPoints: DataPoint[];
}

// Filter Component Props
export interface FilterProps<T> extends DisabledProps {
  value: T;
  onChange: (value: T) => void;
}

export type TimeRangeFilterProps = FilterProps<TimeRange>;
export type CriticalityFilterProps = FilterProps<CriticalityLevel[]>;

export interface ChartControlsProps extends LoadingProps, DisabledProps {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  selectedCriticalities: CriticalityLevel[];
  onCriticalityChange: (criticalities: CriticalityLevel[]) => void;
}

// Utility Interfaces
export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

export interface ChartDimensions {
  width: number;
  height: number;
}
