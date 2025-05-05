const express = require('express');
const { sendEmail } = require('../controllers/emailController');
const Recipient = require('../models/Recipient');
const router = express.Router();

router.post('/send', sendEmail);

router.post('/upload', async (req, res) => {
  try {
    const recipientsData = req.body;

    if (!Array.isArray(recipientsData) || recipientsData.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid CSV data' });
    }

    const recipients = await Recipient.insertMany(recipientsData);

    res.status(200).json({ success: true, message: 'Data uploaded successfully!', recipients });
  } catch (error) {
    console.error('Error saving recipients data:', error);
    res.status(500).json({ success: false, error: 'Error saving data to database' });
  }
});

module.exports = router;
