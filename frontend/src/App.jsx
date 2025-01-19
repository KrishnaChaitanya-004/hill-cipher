import './App.css'
import { useState } from "react";
import { List } from "./Components/List";
import { Upload } from "./Components/Upload";

export default function App() {
  const [fileUploaded, setFileUploaded] = useState(false);

  // Function to update the state when a file is uploaded
  const onFileUploaded = () => {
    setFileUploaded((prev) => !prev); // Toggle the state to trigger re-render in List
  };

  return (
    <div>
      <h1>File Management</h1>
      {/* Pass the onFileUploaded function to the Upload component */}
      <Upload onFileUploaded={onFileUploaded} />
      {/* Pass the fileUploaded state to the List component */}
      <List fileUploaded={fileUploaded} />
    </div>
  );
}
