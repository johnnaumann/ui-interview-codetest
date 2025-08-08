export default {
  // Configuration for running both GraphQL server and Next.js frontend
  dev: {
    command: [
      "yarn dev:server",
      "yarn dev:frontend"
    ],
    name: ["server", "frontend"],
    prefix: "name",
    prefixColors: ["blue", "green"],
    killOthers: ["failure", "success"],
    restartTries: 3,
    restartDelay: 1000,
    // Wait for server to be ready before starting frontend
    spawn: true,
    // Show timestamps
    timestampFormat: "HH:mm:ss"
  }
};
