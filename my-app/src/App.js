// Use this later if we want to organize the documents by type
function DocumentTypeRow({ type }) {
  return (
    <tr>
      <th colSpan="2">
        {type}
      </th>
    </tr>
  );
}

function DocumentRow({ document }) {
  const name = document.name
  const type = document.type

  return (
    <tr>
      {/* TODO: Add document icon. */}
      <td>{name}</td>
      <td>{type}</td>
      
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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show documents containing the text
      </label>
    </form>
  );
}

function FilterableDocumentTable({ documents }) {
  return (
    <div>
      <h1>DocuSearch</h1>
      <SearchBar />
      <DocumentTable documents={documents} />
    </div>
  );
}

const DOCUMENTS = [
  {name: "Thinking in React", type: "Documentation", text: "Thinking in React. React can change how you think about the designs you look at and the apps you build. When you build a user interface with React, you will first break it apart into pieces called components. Then, you will describe the different visual states for each of your components. Finally, you will connect your components together so that the data flows through them. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React."},
  {name: "React Docs", type: "Documentation", text: "The React documentation is a great place to start learning about React. It covers the basics of React, including components, props, state, and lifecycle methods. It also includes advanced topics such as context, hooks, and performance optimization."},
  {name: "React Tutorial", type: "Documentation", text: "The React tutorial is a hands-on guide to building a simple React application. It covers the basics of React, including components, props, state, and lifecycle methods. It also includes advanced topics such as context, hooks, and performance optimization."},
];

export default function App() {
  return <FilterableDocumentTable documents={DOCUMENTS} />;
}
