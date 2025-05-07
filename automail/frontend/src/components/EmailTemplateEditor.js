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
      <h3 className="text-center">Email Template Editor</h3>  
      {!isEditing ? (
        <div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="warning" onClick={toggleEditing} className="me-2">
              Edit
            </Button>
            <Button variant="primary" onClick={toggleChatBot} className="me-2">
              ChatBot
            </Button>
            <Button variant="info" onClick={handlePreviewShow}>
              Preview
            </Button>
          </div>
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
          <div className="d-flex justify-content-center mt-3">
            <Button variant="success" onClick={() => { onSave(content); toggleEditing(); }} className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={toggleEditing}>
              Cancel
            </Button>
          </div>
        </div>
      )}

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
