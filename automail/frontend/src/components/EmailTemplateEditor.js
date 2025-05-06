// src/components/EmailTemplateEditor.js
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EmailTemplateEditor = ({ template, onSave, toggleChatBot }) => {
  const [content, setContent] = useState(template);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handlePreviewClose = () => setShowPreview(false);
  const handlePreviewShow = () => setShowPreview(true);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  return (
    <div className="template-editor">
      <h3>Email Template Editor</h3>
      {!isEditing ? (
        <div>
          <Button variant="warning" onClick={toggleEditing}>
            Edit Mail Template
          </Button>
        </div>
      ) : (
        <div>
          <Form.Group controlId="emailTemplate">
            <Form.Label>Email Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-start mt-3">
            <Button variant="success" onClick={() => { onSave(content); toggleEditing(); }}>
              Save Template
            </Button>
            <Button variant="secondary" onClick={toggleEditing} className="ms-2">
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-start mt-3">
        <Button variant="primary" onClick={toggleChatBot}>
          Open ChatBot
        </Button>
        <Button variant="info" onClick={handlePreviewShow} className="ms-2">
          Show Preview
        </Button>
      </div>

      {/* Email Preview Modal */}
      <Modal show={showPreview} onHide={handlePreviewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailTemplateEditor;
