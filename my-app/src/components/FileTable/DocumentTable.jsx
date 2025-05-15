import DocumentRow from "./DocumentRow";

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

export default DocumentTable;