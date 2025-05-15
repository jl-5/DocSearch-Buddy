import DocumentTable from "./DocumentTable";

function ScrollableTableContainer({ documents, onDelete }) {
  return (
    <div className="table-container">
      <DocumentTable documents={documents} onDelete={onDelete} />
    </div>
  );
};

export default ScrollableTableContainer;