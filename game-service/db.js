// This module exports a configured PostgreSQL connection pool using the pg library.
// It reads the database connection parameters from environment variables.
// The pool can be used to query the database throughout the application.

const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

module.exports = pool;
