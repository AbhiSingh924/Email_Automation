const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,  
  email: String,
  organization: String,
  achievement: String,
  role: String,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Recipient', RecipientSchema);
