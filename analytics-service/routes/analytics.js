// This file defines the routes for the Analytics Service
// It handles incoming requests related to analytics data 
  
const express = require('express');
const router = express.Router();
const {
  logEvent
} = require('../controllers/analyticsController');

router.post('/', logEvent);

module.exports = router;
