const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/emails', emailRoutes);
app.use('/api/analytics', analyticsRoutes);

// Handle unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));