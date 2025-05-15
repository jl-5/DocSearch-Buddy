import { FaTimes } from "react-icons/fa";

function DocumentRow({ document, onDelete, searchQuery }) {

    // Check if the document text includes the search query
    // also, only highlight the row if the search query is not empty
    const matches = searchQuery
        ? document.content.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
    return (
        <tr style={{ backgroundColor: matches ? '#c8f7c5' : 'transparent' }}>
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