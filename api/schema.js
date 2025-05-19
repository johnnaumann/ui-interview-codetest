import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  enum TimeRange {
    THREE_DAYS
    SEVEN_DAYS
    FOURTEEN_DAYS
    THIRTY_DAYS
  }

  enum CriticalityLevel {
    NONE
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  type DataPoint {
    timestamp: String!
    cves: Int!
    advisories: Int!
  }

  type Delta {
    cves: Float!
    advisories: Float!
  }

  type MetricSummary {
    averageValue: Float!
    delta: Float!
  }

  type TimeSeriesSummary {
    cves: MetricSummary!
    advisories: MetricSummary!
    timeRange: TimeRange!
    criticality: CriticalityLevel
  }

  type TimeSeriesData {
    dataPoints: [DataPoint!]!
    summary: TimeSeriesSummary!
  }

  type Query {
    user: User
    timeSeriesData(
      timeRange: TimeRange
      criticality: CriticalityLevel
    ): TimeSeriesData
  }

  type Mutation {
    updateUser(name: String): User
  }
`;

export default typeDefs;
