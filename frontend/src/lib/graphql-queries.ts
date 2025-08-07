import { gql } from '@apollo/client';

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

// TypeScript types for the GraphQL responses
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

export type TimeRange = 'THREE_DAYS' | 'SEVEN_DAYS' | 'FOURTEEN_DAYS' | 'THIRTY_DAYS';
export type CriticalityLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
