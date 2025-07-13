// This is the controller for handling analytics events
// It processes incoming requests and interacts with the ClickHouse database
  
const clickhouse = require('../db');
exports.logEvent = async (req, res) => {
  const { type, page, session_id, timestamp, scroll_depth, click_target, page_duration } = req.body;
  try {
    await clickhouse.insert({
      table: 'analytics_events',
      values: [{
        type,
        page,
        session_id,
        timestamp,
        scroll_depth: scroll_depth || 0,
        click_target: click_target || '',
        page_duration: page_duration || 0.0,
      }],
      format: 'JSONEachRow',
    });
    res.status(201).json({ message: 'Event logged' });
  } catch (error) {
    console.error('ClickHouse Insert Error:', error);
    res.status(500).json({ error: error.message });
  }
};
