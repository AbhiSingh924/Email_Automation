import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UploadCSV = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        onUpload(csvData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="upload-section">
      <h3>Upload Participant CSV</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <Button variant="primary" type="submit" className="mt-3">
          Process CSV
        </Button>
      </form>
    </div>
  );
};

export default UploadCSV;
