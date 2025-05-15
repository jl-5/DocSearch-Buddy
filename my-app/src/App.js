import { FaSearch, FaTimes } from "react-icons/fa";
import React, { useState } from 'react';


import FileUpload from './components/FileUpload';



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
