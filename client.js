// External database settings + credentials
const { Pool } = require("pg");

const client = new Pool({
  user: process.env.ELEPHANT_SQL_USER,
  password: process.env.ELEPHANT_SQL_PW,
  host: process.env.ELEPHANT_SQL_HOST,
  database: process.env.ELEPHANT_SQL_DB,
  port: Number(process.env.ELEPHANT_SQL_DB)
});

module.exports = client;