// This file defines the routes for the Analytics Service
// It handles incoming requests related to analytics data 
  
const express = require('express');
const router = express.Router();
const {
  logEvent,
  getAnalyticsEvents,
  getAnalyticsSummary
} = require('../controllers/analyticsController');

// Log new event
router.post('/', logEvent);

// Get recent 20 events
router.get('/', getAnalyticsEvents);

// Get aggregated summary
router.get('/summary', getAnalyticsSummary);

module.exports = router;
