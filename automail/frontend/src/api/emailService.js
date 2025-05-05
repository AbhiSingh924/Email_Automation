import axios from 'axios';

export const sendEmail = async (emailData) => {
  try {
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', emailData, {
      headers: {
        Authorization: `Bearer YOUR_SENDGRID_API_KEY`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};