const EmailStats = require('../models/EmailStats');

const getAnalytics = async (req, res) => {
  try {
    const stats = await EmailStats.findOne();
    res.status(200).json(stats || { sent: 0, opened: 0, responses: 0, rsvps: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

module.exports = { getAnalytics };