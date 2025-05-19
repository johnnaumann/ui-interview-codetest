import app from "./api/index.js";
import { consola } from "consola";
import dotenv from "dotenv";
dotenv.config();

const startServer = async (port) => {
  try {
    await new Promise((resolve, reject) => {
      app
        .listen(port, () => {
          consola.success(`Server started on port ${port}`);
          resolve();
        })
        .on("error", (err) => {
          if (err.code === "EADDRINUSE") {
            consola.warn(`Port ${port} is in use, trying ${port + 1}`);
            reject(err);
          } else {
            consola.error("Server error:", err);
            reject(err);
          }
        });
    });
  } catch (err) {
    if (err.code === "EADDRINUSE") {
      const nextPort = port + 1;
      consola.info(`Attempting to start server on port ${nextPort}...`);
      startServer(nextPort);
    } else {
      consola.error("Failed to start server:", err);
      process.exit(1);
    }
  }
};

// Always try port 3000 first
consola.info("Attempting to start server on port 3000...");
startServer(3000);
