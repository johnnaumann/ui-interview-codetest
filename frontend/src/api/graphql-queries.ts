/**
 * GraphQL Queries and Data Fetching
 * 
 * This file contains all GraphQL queries used for data fetching throughout the application.
 * It serves as the data layer interface between the frontend and the GraphQL API.
 * 
 * The queries are designed to:
 * - Fetch time series data for security metrics visualization
 * - Support filtering by time range and criticality levels
 * - Return structured data that matches the application's type definitions
 * - Provide type safety through TypeScript integration
 */

import { gql } from '@apollo/client';
import type { 
  DataPoint, 
  MetricSummary, 
  TimeSeriesSummary, 
  TimeSeriesData, 
  TimeSeriesResponse, 
  TimeRange, 
  CriticalityLevel 
} from '../types';

/**
 * Time Series Data Query
 * 
 * Fetches security metrics data for visualization in charts and summary cards.
 * This is the primary data query used by the chart dashboard.
 * 
 * Query Parameters:
 * - timeRange: The time period to fetch data for (e.g., 'THIRTY_DAYS')
 * - criticalities: Array of criticality levels to filter by (e.g., ['HIGH', 'CRITICAL'])
 * 
 * Returns:
 * - dataPoints: Array of individual data points with timestamp, CVE count, and advisory count
 * - summary: Aggregated statistics including averages and deltas for trend analysis
 * 
 * Usage:
 * ```typescript
 * const { data, loading, error } = useQuery(GET_TIME_SERIES_DATA, {
 *   variables: {
 *     timeRange: 'THIRTY_DAYS',
 *     criticalities: ['HIGH', 'CRITICAL']
 *   }
 * });
 * ```
 */
export const GET_TIME_SERIES_DATA = gql`
  query GetTimeSeriesData($timeRange: TimeRange, $criticalities: [CriticalityLevel!]) {
    timeSeriesData(timeRange: $timeRange, criticalities: $criticalities) {
      # Individual data points for time series visualization
      dataPoints {
        timestamp    # ISO 8601 timestamp for the data point
        cves         # Number of CVEs at this timestamp
        advisories   # Number of advisories at this timestamp
      }
      
      # Aggregated summary statistics for the entire time period
      summary {
        # CVE metrics summary
        cves {
          averageValue  # Average CVE count over the time period
          delta         # Change in CVE count from previous period
        }
        
        # Advisory metrics summary
        advisories {
          averageValue  # Average advisory count over the time period
          delta         # Change in advisory count from previous period
        }
        
        timeRange      # Human-readable description of the time period
        criticalities  # Array of criticality levels included in the data
      }
    }
  }
`;

/**
 * Type Re-exports for Backward Compatibility
 * 
 * These type exports ensure that components can import types directly from this file
 * if needed, while maintaining the single source of truth in the types/index.ts file.
 * 
 * This pattern allows for:
 * - Centralized type definitions
 * - Flexible import locations
 * - Backward compatibility with existing code
 */
export type {
  DataPoint,           // Individual data point structure
  MetricSummary,       // Summary statistics for a metric
  TimeSeriesSummary,   // Combined summary for all metrics
  TimeSeriesData,      // Complete time series data structure
  TimeSeriesResponse,  // GraphQL response wrapper
  TimeRange,           // Available time range options
  CriticalityLevel     // Available criticality level options
};
