import { gql } from '@apollo/client';
import { 
  DataPoint, 
  MetricSummary, 
  TimeSeriesSummary, 
  TimeSeriesData, 
  TimeSeriesResponse, 
  User, 
  UserResponse, 
  TimeRange, 
  CriticalityLevel 
} from '../interfaces';

export const GET_TIME_SERIES_DATA = gql`
  query GetTimeSeriesData($timeRange: TimeRange, $criticalities: [CriticalityLevel!]) {
    timeSeriesData(timeRange: $timeRange, criticalities: $criticalities) {
      dataPoints {
        timestamp
        cves
        advisories
      }
      summary {
        cves {
          averageValue
          delta
        }
        advisories {
          averageValue
          delta
        }
        timeRange
        criticalities
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
    }
  }
`;

// Re-export types for backward compatibility
export {
  DataPoint,
  MetricSummary,
  TimeSeriesSummary,
  TimeSeriesData,
  TimeSeriesResponse,
  User,
  UserResponse,
  TimeRange,
  CriticalityLevel
};
