const mongoose = require('mongoose');

const EmailStatsSchema = new mongoose.Schema({
  sent: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  responses: { type: Number, default: 0 },
  rsvps: { type: Number, default: 0 },
});

module.exports = mongoose.model('EmailStats', EmailStatsSchema);