/**
 * Application Type Definitions
 * 
 * This file contains all TypeScript type definitions used throughout the application.
 * Types are organized into logical sections for better maintainability and clarity.
 * 
 * The type system is designed to be:
 * - Comprehensive: Covers all data structures and component interfaces
 * - Type-safe: Ensures compile-time error checking
 * - Reusable: Common patterns are abstracted into base types
 * - Self-documenting: Clear naming conventions and structure
 */

// =============================================================================
// THEME & CONTEXT TYPES
// =============================================================================
// Types used by ThemeContext and theme-related components

import type { AppTheme } from '@toolpad/core/AppProvider';

/**
 * Custom color definition for advisory data visualization
 * Extends the standard color pattern with main, light, and dark variants
 */
export interface AdvisoriesColor {
  main: string;   // Primary color for advisory elements
  light: string;  // Lighter variant for hover states
  dark: string;   // Darker variant for active states
}

/**
 * Extended palette interface for custom colors
 * Used to extend Material-UI's default palette with application-specific colors
 */
export interface Palette {
  advisories: AdvisoriesColor;
}

/**
 * Optional palette interface for theme creation
 * Allows custom colors to be optional during theme initialization
 */
export interface PaletteOptions {
  advisories?: AdvisoriesColor;
}

/**
 * Theme context interface for the custom theme provider
 * Provides access to theme mode, toggle function, and Material-UI theme object
 */
export interface ThemeContextType {
  mode: 'light' | 'dark';                    // Current theme mode
  toggleColorMode: () => void;               // Function to switch between modes
  theme: AppTheme;                           // Material-UI theme object
}

/**
 * Props interface for the ThemeProvider component
 * Wraps the application with theme context
 */
export interface ThemeProviderProps {
  children: React.ReactNode;                 // Child components to be themed
}

// =============================================================================
// API & GRAPHQL TYPES
// =============================================================================
// Types used for data fetching, GraphQL operations, and API responses

/**
 * Individual data point representing security metrics at a specific timestamp
 * Used for time series data visualization in charts
 */
export interface DataPoint {
  timestamp: string;  // ISO 8601 timestamp string
  cves: number;       // Number of CVEs at this timestamp
  advisories: number; // Number of advisories at this timestamp
}

/**
 * Summary statistics for a metric (CVE or Advisory)
 * Contains average value and change delta for trend analysis
 */
export interface MetricSummary {
  averageValue: number;  // Average value over the time period
  delta: number;         // Change from previous period (positive/negative)
}

/**
 * Summary data for the entire time series
 * Contains aggregated statistics for both CVEs and advisories
 */
export interface TimeSeriesSummary {
  cves: MetricSummary;           // CVE summary statistics
  advisories: MetricSummary;     // Advisory summary statistics
  timeRange: string;             // Human-readable time range description
  criticalities: string[];       // Array of criticality levels included
}

/**
 * Complete time series data structure
 * Contains both individual data points and summary statistics
 */
export interface TimeSeriesData {
  dataPoints: DataPoint[];       // Array of time series data points
  summary: TimeSeriesSummary;    // Aggregated summary statistics
}

/**
 * GraphQL response structure for time series queries
 * Wraps the time series data in the expected GraphQL response format
 */
export interface TimeSeriesResponse {
  timeSeriesData: TimeSeriesData;
}

/**
 * GraphQL Type Definitions
 * 
 * These types represent the available options for GraphQL query parameters
 * and ensure type safety when constructing queries.
 */

/**
 * Available time range options for data filtering
 * Used in time range filter components and GraphQL queries
 */
export type TimeRange = 'THREE_DAYS' | 'SEVEN_DAYS' | 'FOURTEEN_DAYS' | 'THIRTY_DAYS';

/**
 * Security criticality levels for vulnerability classification
 * Used in criticality filter components and GraphQL queries
 */
export type CriticalityLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// =============================================================================
// COMMON COMPONENT TYPES
// =============================================================================
// Reusable base types and utility interfaces used across multiple components

/**
 * Base props interface for components that may have children
 * Provides a consistent foundation for component prop interfaces
 */
export interface BaseProps {
  children?: React.ReactNode;  // Optional child components
}

/**
 * Props interface for components that can show loading states
 * Used to control loading indicators and disabled states
 */
export interface LoadingProps {
  loading?: boolean;  // Whether the component is in a loading state
}

/**
 * Props interface for components that can be disabled
 * Used to control interactive states and accessibility
 */
export interface DisabledProps {
  disabled?: boolean;  // Whether the component is disabled
}

/**
 * Wrapper component props interface
 * Used for components that wrap other components with additional functionality
 */
export interface WrapperProps extends BaseProps {
  children: React.ReactNode;  // Required child components
}

/**
 * Logo component props interface
 * Controls the size and styling of logo elements
 */
export interface LogoProps {
  width?: number;     // Logo width in pixels
  height?: number;    // Logo height in pixels
  className?: string; // Additional CSS classes
}

// =============================================================================
// CHART COMPONENT TYPES
// =============================================================================
// Types used by chart-related components (D3LineChart, SummaryCards, etc.)

/**
 * Type aliases for metric summary data
 * Provides semantic naming for different metric types while reusing the same structure
 */
export type CVESummaryData = MetricSummary;
export type AdvisoriesSummaryData = MetricSummary;

/**
 * Base props interface for summary card components
 * Provides loading state and optional data for metric display
 */
export interface SummaryCardProps extends LoadingProps {
  data?: MetricSummary;  // Optional metric data to display
}

/**
 * Type aliases for specific summary card components
 * Ensures type safety while maintaining semantic clarity
 */
export type CVESummaryCardProps = SummaryCardProps;
export type AdvisoriesSummaryCardProps = SummaryCardProps;

/**
 * Combined summary data structure
 * Contains summary statistics for both CVEs and advisories
 */
export interface SummaryData {
  cves: MetricSummary;       // CVE summary statistics
  advisories: MetricSummary; // Advisory summary statistics
}

/**
 * Props interface for the summary cards container component
 * Displays multiple summary cards with loading state support
 */
export interface SummaryCardsProps extends LoadingProps {
  data?: SummaryData;  // Optional summary data to display
}

/**
 * Props interface for the D3 line chart component
 * Provides data points and loading state for chart visualization
 */
export interface D3LineChartProps extends LoadingProps {
  dataPoints: DataPoint[];  // Array of data points for chart rendering
}

// =============================================================================
// FILTER COMPONENT TYPES
// =============================================================================
// Types used by filter components (TimeRangeFilter, CriticalityFilter, etc.)

/**
 * Generic filter props interface
 * Provides a reusable pattern for filter components with value and change handler
 * 
 * @template T - The type of the filter value
 */
export interface FilterProps<T> extends DisabledProps {
  value: T;                           // Current filter value
  onChange: (value: T) => void;       // Callback for value changes
}

/**
 * Type aliases for specific filter components
 * Ensures type safety for time range and criticality filters
 */
export type TimeRangeFilterProps = FilterProps<TimeRange>;
export type CriticalityFilterProps = FilterProps<CriticalityLevel[]>;

/**
 * Props interface for chart controls component
 * Combines time range and criticality filters with loading and disabled states
 */
export interface ChartControlsProps extends LoadingProps, DisabledProps {
  timeRange: TimeRange;                                    // Current time range selection
  onTimeRangeChange: (timeRange: TimeRange) => void;       // Time range change handler
  selectedCriticalities: CriticalityLevel[];               // Current criticality selections
  onCriticalityChange: (criticalities: CriticalityLevel[]) => void; // Criticality change handler
}

/**
 * Props interface for the filter wrapper component
 * Provides a container for all filter controls with consistent state management
 */
export interface FilterWrapperProps extends LoadingProps, DisabledProps {
  timeRange: TimeRange;                                    // Current time range selection
  onTimeRangeChange: (timeRange: TimeRange) => void;       // Time range change handler
  selectedCriticalities: CriticalityLevel[];               // Current criticality selections
  onCriticalityChange: (criticalities: CriticalityLevel[]) => void; // Criticality change handler
}

// =============================================================================
// UTILITY TYPES
// =============================================================================
// Helper types and interfaces for internal functionality

/**
 * Tooltip state interface for chart interactions
 * Manages the display and positioning of tooltips in interactive components
 */
export interface TooltipState {
  visible: boolean;  // Whether the tooltip is currently visible
  x: number;         // X coordinate for tooltip positioning
  y: number;         // Y coordinate for tooltip positioning
  content: string;   // HTML content to display in the tooltip
}

/**
 * Chart dimensions interface for responsive chart sizing
 * Used to manage chart container dimensions and responsive behavior
 */
export interface ChartDimensions {
  width: number;   // Chart width in pixels
  height: number;  // Chart height in pixels
}
