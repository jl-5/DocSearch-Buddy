import React from 'react';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
GlobalWorkerOptions.workerSrc = workerSrc;

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

export default FileUpload;