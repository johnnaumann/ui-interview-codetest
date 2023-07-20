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

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  type Query {
    user: User
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
