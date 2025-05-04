import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const EmailTemplateEditor = ({ template, onSave }) => {
  const [content, setContent] = useState(template);

  return (
    <div className="template-editor">
      <h3>Email Template Editor</h3>
      <Form.Group controlId="emailTemplate">
        <Form.Label>Email Content:</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" onClick={() => onSave(content)} className="mt-3">
        Save Template
      </Button>
    </div>
  );
};

export default EmailTemplateEditor;
