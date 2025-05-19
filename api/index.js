import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import { generateTimeSeriesData } from "./mockData.js";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

// User Data Store
const user = {
  id: 1,
  name: "Jane Smith",
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
      return generateTimeSeriesData(timeRange, criticality);
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
