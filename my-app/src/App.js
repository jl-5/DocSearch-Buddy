import { FaSearch } from "react-icons/fa";

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

  return (
    <tr>
      {/* TODO: Add document icon. */}
      <td>{name}</td>

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
    <div>
      <table style={{ justifyContent: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: 'beige' }}>
            <th style = {{textAlign: 'center'}}>File List</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>

  );
}

function ScrollableTableContainer ({ documents}) {
  return (
    <div className="table-container">
      <DocumentTable documents={documents} />
    </div>
  );
};

function SearchBar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ textAlign: 'center' }}>
        <input type="text" style={{ textAlign: 'center', width: '10cm', height: '1cm', fontSize: '20px' }} placeholder="What are you looking for?" />
      </form>
      <FaSearch size='1cm' style={{ marginLeft: '5px', color: '#000' }} />

    </div>

  );
}

function FileUploadSection() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p>Upload your documents here</p>
        <input type="file" />
        <button type="submit">Upload</button>
      </div>
    </div>
  );
}

function FilterableDocumentTable({ documents }) {
  return (
    <div >
      <h1 style={{ textAlign: 'center', padding: '30px', fontSize: '50px', color: ' #00439C' }}>DocSearch Buddy</h1>
      <SearchBar />
      <ScrollableTableContainer documents={documents}/>
      <FileUploadSection />

    </div>
  );
}

// example documents. These will be replaced with actual documents that will be uploaded by the user.
const DOCUMENTS = [
  { name: "Thinking in React.pdf", type: "Documentation", text: "React can change how you think about the designs you look at and the apps you build. When you build a user interface with React, you will first break it apart into pieces called components. Then, you will describe the different visual states for each of your components. Finally, you will connect your components together so that the data flows through them. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React." },
  { name: "React Docs.pdf", type: "Documentation", text: "The React documentation is a great place to start learning about React. It covers the basics of React, including components, props, state, and lifecycle methods. It also includes advanced topics such as context, hooks, and performance optimization." },
  { name: "React Tutorial.pdf", type: "Documentation", text: "The React tutorial is a hands-on guide to building a simple React application. It covers the basics of React, including components, props, state, and lifecycle methods. It also includes advanced topics such as context, hooks, and performance optimization." },
  { name: "React API Reference.pdf", type: "Documentation", text: "The React API reference is a comprehensive guide to the React API. It covers all of the components, hooks, and utilities that are available in React. It also includes examples and usage guidelines for each API." },
  { name: "React Blog.pdf", type: "Documentation", text: "The React blog is a great place to stay up to date with the latest news and updates from the React team. It covers new features, best practices, and performance optimization tips." },
  { name: "React Community.pdf", type: "Documentation", text: "The React community is a great place to connect with other React developers. It includes forums, chat rooms, and social media groups where you can ask questions, share ideas, and get help with your React projects." },
  { name: "React GitHub.pdf", type: "Documentation", text: "The React GitHub repository is the official source code for React. It includes the source code, documentation, and issue tracker for React. You can also find the latest releases and changelogs here." },
  { name: "React Examples.pdf", type: "Documentation", text: "The React examples are a collection of sample applications built with React. They cover a wide range of topics, including state management, routing, and performance optimization. You can use these examples as a starting point for your own projects." },
  { name: "React Tools.pdf", type: "Documentation", text: "The React tools are a collection of utilities and libraries that can help you build better React applications. They include tools for testing, debugging, and performance optimization." },
  { name: "React Resources.pdf", type: "Documentation", text: "The React resources are a collection of articles, videos, and tutorials that can help you learn more about React. They cover a wide range of topics, including state management, routing, and performance optimization." },
  { name: "React Best Practices.pdf", type: "Documentation", text: "The React best practices are a collection of guidelines and recommendations for building better React applications. They cover a wide range of topics, including state management, routing, and performance optimization." },
];

export default function App() {
  return <div>
    <FilterableDocumentTable documents={DOCUMENTS} />;
  </div>

}
