import { FaTimes } from "react-icons/fa";

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

export default DocumentRow;