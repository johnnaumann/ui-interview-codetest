import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import { consola } from "consola";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateTimeSeriesData } from "./mockData.js";
import typeDefs from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve README at /readme
app.get("/readme", (req, res) => {
  try {
    const readmePath = join(__dirname, "..", "README.md");
    const readmeContent = readFileSync(readmePath, "utf8");
    res.setHeader("Content-Type", "text/markdown");
    res.send(readmeContent);
    consola.info("README.md served successfully");
  } catch (error) {
    consola.error("Error serving README:", error);
    res.status(500).send("Error loading README");
  }
});

const httpServer = http.createServer(app);

// User Data Store
const user = {
  id: 1,
  name: "Jane Smith",
};

const resolvers = {
  Query: {
    user() {
      consola.info("Fetching user data");
      return user;
    },
    timeSeriesData: (
      _,
      { timeRange = "THIRTY_DAYS", criticalities = null }
    ) => {
      consola.info(`Fetching time series data for range: ${timeRange}`);
      return generateTimeSeriesData(timeRange, criticalities);
    },
  },
  Mutation: {
    updateUser: (_, { name }) => {
      consola.info(`Updating user name to: ${name}`);
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
  consola.success("Apollo Server started successfully");
};

startApolloServer(app, httpServer);

export default httpServer;
