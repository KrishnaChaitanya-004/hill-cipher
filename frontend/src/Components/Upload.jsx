import { useState } from "react";

export function Upload({ onFileUploaded }) {
  // State to hold the selected file
  const [file, setFile] = useState(null);
  // State to hold the message to display after the upload attempt
  const [message, setMessage] = useState("");

  // Function to handle the file selection from the input
  const handleFileChange = (event) => {
    // `event.target.files[0]` retrieves the first selected file from the input
    setFile(event.target.files[0]); // Update the state with the selected file
  };

  // Function to handle the form submission and file upload
  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Create a new FormData object to send the file to the server
    const formData = new FormData();
    formData.append("file", file); // Attach the selected file with the key "file"

    try {
      // Send a POST request to the server to upload the file
      const response = await fetch("http://192.168.0.110:3000/upload", {
        method: "POST",
        body: formData, // Send the FormData as the request body
      });

      // Handle the server's response
      if (response.ok) {
        // If the upload is successful, show a success message
        setMessage("File uploaded successfully!");
        onFileUploaded(); // Notify the parent component (List) to refresh the file list
      } else {
        // If the upload fails, show an error message
        setMessage("Failed to upload file");
      }
    } catch {
      // Catch and handle any errors that occur during the request
      setMessage("An error occurred while uploading the file.");
    }
  };

  // Render the upload form
  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        {/* Input field to select the file */}
        <input type="file" onChange={handleFileChange} />
        {/* Submit button to trigger the file upload */}
        <button type="submit" style={{ marginLeft: "10px" }}>Upload</button>
      </form>
      {/* Display the message if it exists */}
      {message && <p>{message}</p>}
    </div>
  );
}
