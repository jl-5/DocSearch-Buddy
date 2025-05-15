import { FaSearch } from "react-icons/fa";
import pdfToText from 'react-pdftotext'
import React, { useState } from 'react';

function DocumentRow({ document }) {
  const name = document.name

  return (
    <tr>
      {/* TODO: Add document icon. */}
      <td>{name}</td>

    </tr>
  );
}

function DocumentTable({ documents }) {
  const rows = [];

  documents.forEach((document) => {
    rows.push(
      <DocumentRow
        document={document}
        key={document.name} />
    );
  });
  return (
    <div>
      <table style={{ justifyContent: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: 'beige' }}>
            <th style={{ textAlign: 'center' }}>File List</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>

  );
}

function ScrollableTableContainer({ documents }) {
  return (
    <div className="table-container">
      <DocumentTable documents={documents} />
    </div>
  );
};

function SearchBar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ textAlign: 'center' }}>
        <input type="text" style={{ textAlign: 'center', width: '10cm', height: '1cm', fontSize: '20px' }} placeholder="What are you looking for?" />
      </form>
      <FaSearch size='1cm' style={{ marginLeft: '5px', color: '#000' }} />

    </div>

  );
}

function FileUpload({ onFileUpload }) {
  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let files = event.target.uploadedFile.files;
    if (files.length == 0) {
      alert('Please select a file.');
      return;
    }

    console.log('files uploaded: ', files);
    console.log('number of files uploaded: ', files.length);
    // Iterare through the files and extract text from each one
    for (let i = 0; i < files.length; i++) {
      console.log('file being checked: ', files[i]);
      let file = files[i];
      // Check if a file was selected, if it has a size greater than 0 then it exists

      // Check if the file is a PDF or TXT file
      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        const newEntry = {
          id: Date.now(),
          name: file.name,
          content: 'placeholder for content',
        };
        // Call the onFileUpload function passed as a prop to add the new entry to the documents
        onFileUpload(newEntry);
      }
      else {
        alert('Could not read file: ' + file.name);
        // If the file is not a PDF or TXT file, skip it and continue to the next one
        continue;
      }
    }
    // Reset the form
    event.target.reset();
    files = null;
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p>Upload your documents here</p>
        <form onSubmit={handleFileUpload}>
          <input type="file" name="uploadedFile" multiple />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}


export default function App() {

  const [documents, setDocuments] = useState([]);

  const handleAddEntry = (newEntry) => {
    setDocuments(prev => [...prev, newEntry]);
    console.log('added entry: ', newEntry);
  };
  return <div>
    <h1 style={{ textAlign: 'center', padding: '30px', fontSize: '50px', color: ' #00439C' }}>DocSearch Buddy</h1>
    <SearchBar />
    <ScrollableTableContainer documents={documents} />
    <FileUpload onFileUpload={handleAddEntry} />
  </div>

}
