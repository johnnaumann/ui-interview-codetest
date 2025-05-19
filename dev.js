import app from "./api/index.js";
import consola from "consola";
import dotenv from "dotenv";
dotenv.config();

const startServer = async (port) => {
  try {
    await new Promise((resolve, reject) => {
      app
        .listen(port, () => {
          console.log(`Server started on port ${port}`);
          resolve();
        })
        .on("error", (err) => {
          if (err.code === "EADDRINUSE") {
            console.log(`Port ${port} is in use, trying ${port + 1}`);
            reject(err);
          } else {
            reject(err);
          }
        });
    });
  } catch (err) {
    if (err.code === "EADDRINUSE") {
      startServer(port + 1);
    } else {
      console.error("Failed to start server:", err);
    }
  }
};

startServer(3000);
