// This file sets up the Express server for the game service, handling routes and middleware.
// It uses environment variables for configuration and includes CORS and body-parser middleware.

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const gameRoutes = require('./routes/games');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/games', gameRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Game Service running on port ${process.env.PORT}`);
});
