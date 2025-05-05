const nodemailer = require('nodemailer');
const Recipient = require('../models/Recipient');

const sendEmail = async (req, res) => {
  const { recipients, subject, body } = req.body;

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send emails to all recipients
    for (const recipient of recipients) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient.email,
        subject: subject,
        html: body.replace('{FirstName}', recipient.firstName),
      };

      await transporter.sendMail(mailOptions);

      // Update recipient status in the database
      await Recipient.findOneAndUpdate(
        { email: recipient.email },
        { status: 'sent' },
        { upsert: true }
      );
    }

    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send emails' });
  }
};

module.exports = { sendEmail };