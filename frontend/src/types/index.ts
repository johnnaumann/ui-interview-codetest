import type { Theme } from '@mui/material/styles';

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

export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
  theme: Theme;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

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

export type TimeRange = 'THREE_DAYS' | 'SEVEN_DAYS' | 'FOURTEEN_DAYS' | 'THIRTY_DAYS';

export type CriticalityLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface BaseProps {
  children?: React.ReactNode;
}

export interface LoadingProps {
  loading?: boolean;
}

export interface DisabledProps {
  disabled?: boolean;
}

export interface WrapperProps extends BaseProps {
  children: React.ReactNode;
}

export interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

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
  timeRange?: TimeRange;
}

export interface FilterProps<T> extends DisabledProps {
  value: T;
  onChange: (value: T) => void;
}

export type TimeRangeFilterProps = FilterProps<TimeRange>;
export type CriticalityFilterProps = FilterProps<CriticalityLevel[]>;

export interface FilterWrapperProps extends LoadingProps, DisabledProps {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  selectedCriticalities: CriticalityLevel[];
  onCriticalityChange: (criticalities: CriticalityLevel[]) => void;
}

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
