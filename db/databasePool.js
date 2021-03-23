const { Pool } = require("pg");
var connectionString = "postgres://postgres:postgres@localhost:5432/database"; //remote connection used later on
const databaseConfiguration = require("./secrets/databaseConfiguration");

const pool = new Pool(databaseConfiguration);

module.exports = pool;
