// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import UploadCSV from './components/UploadCSV';
import EmailTemplateEditor from './components/EmailTemplateEditor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ChatBot from './components/ChatBot'; // Import ChatBot component
import Papa from 'papaparse';
import './App.css';

const App = () => {
  const [template, setTemplate] = useState(
`Dear {name},
Your {achievement} is creating significant impact in India's economic growth. We invite you to join 500+ leaders at VBDA 2025 to shape our $30T economy vision.

Date: 25th July 2025
Venue: Bharat Mandapam, New Delhi

RSVP now to secure your spot!`);

  const [theme, setTheme] = useState('light');
  const [stats, setStats] = useState({ sent: 0, opened: 0, responses: 0, rsvps: 0 });
  const [participants, setParticipants] = useState([]);
  const [generatedEmails, setGeneratedEmails] = useState([]);
  const [showChatBot, setShowChatBot] = useState(false); // State to toggle chatbot modal

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  const handleUpload = (csvData) => {
    const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
    const participantsData = parsed.data;
    setParticipants(participantsData);
    console.log("appjsx")
    console.log(participantsData);
  
    // Generate emails per row using the template
    const emails = participantsData.map((person) => {
      let body = template;
  
      // Replace placeholders with actual CSV data
      Object.entries(person).forEach(([key, value]) => {
        body = body.replaceAll(`{${key}}`, value);
      });
  
      return {
        to: person.email,
        body,
      };
    });
  
    setGeneratedEmails(emails);
  };

  console.log(generatedEmails);

  const handleTemplateSave = (newTemplate) => {
    setTemplate(newTemplate);
  };

  return (
    <Container fluid className="main-container p-4">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>

      <Row className="mb-4">
        <Col>
          <h1 className="text-center">VBDA Email Automation Dashboard</h1>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <UploadCSV onUpload={handleUpload} />
        </Col>
        <Col md={8}>
          <EmailTemplateEditor template={template} onSave={handleTemplateSave} toggleChatBot={toggleChatBot} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <AnalyticsDashboard stats={stats} />
        </Col>
      </Row>

      {generatedEmails.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h4>Preview Generated Emails</h4>
            {generatedEmails.map((email, idx) => (
              <div key={idx} className="border p-3 mb-3 rounded bg-light">
                <p><strong>To:</strong> {email.to}</p>
                <p><strong>CC:</strong> {}</p>
                <p><strong>Subject:</strong> {`${email.body.split(",")[0]}, Join Us at Viksit Bharat Dialogues & Awards 2025`}</p>
                <pre>{email.body}</pre>
              </div>
            ))}
          </Col>
        </Row>
      )}

      {/* ChatBot Modal */}
      <Modal show={showChatBot} onHide={toggleChatBot} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>ChatBot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChatBot />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default App;
