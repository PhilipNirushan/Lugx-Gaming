// This is the entry point for the Analytics Service
// It sets up the server, middleware, and routes for handling analytics data

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const analyticsRoutes = require('./routes/analytics');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/analytics', analyticsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Analytics Service running on port ${process.env.PORT}`);
})