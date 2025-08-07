// Theme Context Interfaces
export interface Palette {
  advisories: {
    main: string;
    light: string;
    dark: string;
  };
}

export interface PaletteOptions {
  advisories?: {
    main: string;
    light: string;
    dark: string;
  };
}

export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
  theme: any; // Theme from MUI
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

// Component Props Interfaces
export interface WrapperProps {
  children: React.ReactNode;
}

export interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

// Chart Component Interfaces
export interface CVESummaryData {
  averageValue: number;
  delta: number;
}

export interface CVESummaryCardProps {
  data?: CVESummaryData;
  loading?: boolean;
}

export interface AdvisoriesSummaryData {
  averageValue: number;
  delta: number;
}

export interface AdvisoriesSummaryCardProps {
  data?: AdvisoriesSummaryData;
  loading?: boolean;
}

export interface SummaryData {
  cves: {
    averageValue: number;
    delta: number;
  };
  advisories: {
    averageValue: number;
    delta: number;
  };
}

export interface SummaryCardsProps {
  data?: SummaryData;
  loading?: boolean;
}

export interface D3LineChartProps {
  dataPoints: DataPoint[];
  loading?: boolean;
}

export interface TimeRangeFilterProps {
  value: TimeRange;
  onChange: (timeRange: TimeRange) => void;
  disabled?: boolean;
}

export interface CriticalityFilterProps {
  value: CriticalityLevel[];
  onChange: (criticalities: CriticalityLevel[]) => void;
  disabled?: boolean;
}

export interface ChartControlsProps {
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  selectedCriticalities: CriticalityLevel[];
  onCriticalityChange: (criticalities: CriticalityLevel[]) => void;
  loading?: boolean;
}

// Tooltip Interface for D3 Chart
export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

// Chart Dimensions Interface
export interface ChartDimensions {
  width: number;
  height: number;
}
