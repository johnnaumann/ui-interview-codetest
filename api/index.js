import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

// User Data Store
const user = {
  id: 1,
  name: "Jane Smith",
};

// Helper function to generate random data points
const generateDataPoints = (days, criticality) => {
  const points = [];
  const now = new Date();
  const hoursInDay = 24;
  const totalHours = days * hoursInDay;

  // Define criticality ranges
  const ranges = {
    NONE: { min: 0, max: 15 },
    LOW: { min: 16, max: 40 },
    MEDIUM: { min: 41, max: 100 },
    HIGH: { min: 101, max: 200 },
    CRITICAL: { min: 201, max: 250 },
  };

  const range = criticality ? ranges[criticality] : { min: 0, max: 250 };

  for (let i = 0; i < totalHours; i++) {
    const timestamp = new Date(now - (totalHours - i) * 60 * 60 * 1000);
    const value =
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

    points.push({
      timestamp: timestamp.toISOString(),
      value,
    });
  }

  return points;
};

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
    value: Int!
  }

  type TimeSeriesSummary {
    totalCount: Int!
    averageValue: Float!
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

const resolvers = {
  Query: {
    user() {
      return user;
    },
    timeSeriesData: (_, { timeRange = "THIRTY_DAYS", criticality }) => {
      // Convert timeRange to days
      const daysMap = {
        THREE_DAYS: 3,
        SEVEN_DAYS: 7,
        FOURTEEN_DAYS: 14,
        THIRTY_DAYS: 30,
      };

      const days = daysMap[timeRange];
      const dataPoints = generateDataPoints(days, criticality);

      // Calculate summary
      const totalCount = dataPoints.length;
      const averageValue =
        dataPoints.reduce((sum, point) => sum + point.value, 0) / totalCount;

      return {
        dataPoints,
        summary: {
          totalCount,
          averageValue,
          timeRange,
          criticality,
        },
      };
    },
  },
  Mutation: {
    updateUser: (_, { name }) => {
      return { id: 1, name };
    },
  },
};

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
