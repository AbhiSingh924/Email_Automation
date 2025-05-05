import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const AnalyticsDashboard = ({ stats }) => {
  return (
    <div className="analytics-dashboard">
      <h3>Email Analytics</h3>
      <Row>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Sent</Card.Title>
              <Card.Text>{stats.sent}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Opened</Card.Title>
              <Card.Text>{stats.opened}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Responses</Card.Title>
              <Card.Text>{stats.responses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>RSVPs</Card.Title>
              <Card.Text>{stats.rsvps}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
