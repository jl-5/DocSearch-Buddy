import DocumentTable from "./DocumentTable";

function ScrollableTableContainer({ documents, onDelete, searchQuery }) {
  return (
    <div className="table-container">
      <DocumentTable documents={documents} onDelete={onDelete} searchQuery={searchQuery}/>
    </div>
  );
};

export default ScrollableTableContainer;