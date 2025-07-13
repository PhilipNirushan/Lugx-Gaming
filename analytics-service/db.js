// This file sets up the ClickHouse client for database interactions
// It exports the client for use in other parts of the application

const { createClient } = require('@clickhouse/client');
require('dotenv').config();

const clickhouse = createClient({
  host: process.env.CLICKHOUSE_HOST,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
  database: process.env.CLICKHOUSE_DATABASE,
  protocol: 'https', // required for ClickHouse Cloud
});

module.exports = clickhouse;

