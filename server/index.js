const server = require("./server.js");
const pool = require("../db/databasePool.js");
const repository = require("./repo.js");

const port =
  process.env.NODE_ENV === "development"
    ? process.env.DOTENV_CONFIG_PORT || 8080
    : process.env.DOTENV_PROD_PORT;
const hostname =
  process.env.NODE_ENV === "development"
    ? process.env.DOTENV_CONFIG_HOST || "localhost"
    : process.env.DOTENV_PROD_HOST;

const app = repository.connect(pool).then((repo) => {
  if (!repo) {
    reject(new Error("The server must be started with a connected repository"));
  }
  server.start({ port, hostname, repo }).then((app) => app);
});
module.exports = app;
