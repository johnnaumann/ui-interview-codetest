export default {
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
    spawn: true,
    timestampFormat: "HH:mm:ss"
  }
};
