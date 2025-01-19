import { useEffect, useState } from "react";

export function List({ fileUploaded }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the files whenever the component mounts or fileUploaded changes
    fetch("http://192.168.0.110:3000/files")
      .then(async (res) => {
        const json = await res.json();
        console.log("Fetched files:", json);
        setFiles(json);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [fileUploaded]); // Add fileUploaded as a dependency

  return (
    <div>
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={`http://192.168.0.110:3000/download/${file}`}>{file}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
}
