// This file sets up the Express application for the order service.
// It configures middleware for CORS and JSON body parsing,
// and defines the route for handling order-related requests.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Order Service running on port ${process.env.PORT}`);
});
