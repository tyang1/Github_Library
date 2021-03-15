const server = require('./server.js');

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DOTENV_CONFIG_PORT || 8080
    : process.env.DOTENV_PROD_PORT;
const hostname =
  process.env.NODE_ENV === 'development'
    ? process.env.DOTENV_CONFIG_HOST || '0.0.0.0'
    : process.env.DOTENV_PROD_HOST;

const app = server.start({ port, hostname }).then((app) => app);

module.exports = app;
