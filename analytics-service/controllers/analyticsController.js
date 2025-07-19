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

// GET /api/analytics
exports.getAnalyticsEvents = async (req, res) => {
  try {
    const query = `
      SELECT * FROM analytics_events
      ORDER BY timestamp DESC
      LIMIT 20
    `;
    const result = await clickhouse.query({ query, format: 'JSON' }).then(r => r.json());
    res.json(result.data);
  } catch (error) {
    console.error('Error fetching analytics events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/analytics/summary
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const query = `
      SELECT
        page,
        count(*) AS page_views,
        avg(page_duration) AS avg_duration,
        max(scroll_depth) AS max_scroll
      FROM analytics_events
      GROUP BY page
      ORDER BY page_views DESC
    `;
    const result = await clickhouse.query({ query, format: 'JSON' }).then(r => r.json());
    res.json(result.data);
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
