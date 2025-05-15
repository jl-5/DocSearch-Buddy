import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import ScrollableTableContainer from './components/FileTable/ScollableTableContainer';

import React, { useState } from 'react';

export default function App() {

  // state to hold and manage the documents
  const [documents, setDocuments] = useState([]);

  // state to hold and manage the search query
  const [searchQuery, setSearchQuery] = useState('');

  // function to handle the addition of new entries
  const handleAddEntry = (newEntry) => {
    setDocuments(prev => [...prev, newEntry]);
    console.log('added entry: ', newEntry);
  };

  // function to handle the deletion of docuements when the user clicks the "X" button next to a document
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
