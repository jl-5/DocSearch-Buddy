import { FaSearch, FaTimes } from "react-icons/fa";
import pdfToText from 'react-pdftotext'
import React, { useState } from 'react';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = workerSrc;

function DocumentRow({ document, onDelete }) {
  return (
    <tr>
      <td>{document.name}</td>
      <td>
        <button
          onClick={() => onDelete(document.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label={`Delete ${document.name}`}
        >
          <FaTimes color="red" />
        </button>
      </td>
    </tr>
  );
}

function DocumentTable({ documents, onDelete }) {
  const rows = [];

  documents.forEach((document) => {
    rows.push(
      <DocumentRow
        document={document}
        key={document.name}
        onDelete={onDelete} />
    );
  });
  return (
    <div>
      <table style={{ justifyContent: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: 'beige' }}>
            <th style={{ textAlign: 'center' }} colSpan="2">File List</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>

  );
}

function ScrollableTableContainer({ documents, onDelete }) {
  return (
    <div className="table-container">
      <DocumentTable documents={documents} onDelete={onDelete} />
    </div>
  );
};

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <form style={{ textAlign: 'center' }}>
        <input type="text"
          style={{ textAlign: 'center', width: '10cm', height: '1cm', fontSize: '20px' }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : 'What are you looking for?'} />
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
      // if it's a text file, use readTextFile to extract the text
      if (file.type === 'text/plain') {
        const text = await readTextFile(file);
        const newEntry = {
          id: Date.now(),
          name: file.name,
          content: text,
        };
        onFileUpload(newEntry)
      // otherwise, if it's a PDF file, use readPdfFile to extract the text
      } else if (file.type === 'application/pdf') {
        console.log('file is a pdf');
        const text = await readPdfFile(file);
        console.log('text extracted from pdf: ', text);
        const newEntry = {
          id: Date.now(),
          name: file.name,
          content: text,
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

// function to read text from txt files
function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// function to read text from pdf files
async function readPdfFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    text += strings.join(' ') + '\n';
  }

  return text;
}


export default function App() {

  const [documents, setDocuments] = useState([]);

  const handleAddEntry = (newEntry) => {
    setDocuments(prev => [...prev, newEntry]);
    console.log('added entry: ', newEntry);
  };

  const handleDeleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  return <div>
    <h1 style={{ textAlign: 'center', padding: '30px', fontSize: '50px', color: ' #00439C' }}>DocSearch Buddy</h1>
    <h3 style={{ textAlign: 'center', padding: '10px', fontSize: '25px', color: ' #00439C' }}>Upload files below and search them for text.</h3>
    <FileUpload onFileUpload={handleAddEntry} />
    <ScrollableTableContainer documents={documents} onDelete={handleDeleteDocument} />
    <SearchBar />
  </div>

}
