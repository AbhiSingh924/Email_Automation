import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons
import UploadCSV from './components/UploadCSV';
import EmailTemplateEditor from './components/EmailTemplateEditor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import './App.css';

const App = () => {
  // State for email template
  const [template, setTemplate] = useState(`Subject: {FirstName}, Join Us at Viksit Bharat Dialogues & Awards 2025

Dear {FirstName},
Your {Achievement} is creating significant impact in India's economic growth. We invite you to join 500+ leaders at VBDA 2025 to shape our $30T economy vision.

Date: 25th July 2025
Venue: Bharat Mandapam, New Delhi

RSVP now to secure your spot!`);

  // State for analytics stats
  const [stats, setStats] = useState({
    sent: 0,
    opened: 0,
    responses: 0,
    rsvps: 0,
  });

  // State for theme (light/dark mode)
  const [theme, setTheme] = useState('light');

  // Effect to apply the selected theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to handle CSV upload
  const handleUpload = (csvData) => {
    console.log('CSV data uploaded:', csvData);
    // TODO: Add CSV parsing logic
  };

  // Function to handle saving the email template
  const handleTemplateSave = (newTemplate) => {
    setTemplate(newTemplate);
  };

  return (
    <Container fluid className="main-container">
      {/* Dark Mode Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>

      {/* Header Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="text-center mb-4">VBDA Email Automation Dashboard</h1>
        </Col>
      </Row>

      {/* Main Content Section */}
      <Row>
        <Col md={4}>
          <UploadCSV onUpload={handleUpload} />
        </Col>
        <Col md={8}>
          <EmailTemplateEditor 
            template={template} 
            onSave={handleTemplateSave} 
          />
        </Col>
      </Row>

      {/* Analytics Section */}
      <Row className="mt-4">
        <Col md={12}>
          <AnalyticsDashboard stats={stats} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
