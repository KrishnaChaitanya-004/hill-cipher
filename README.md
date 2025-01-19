# File Management Web Application

This web application allows users to upload and download files. The files are encrypted before storing and decrypted when downloading.

## Features

- **File Upload**: Users can upload files to the server.
- **File Encryption**: Files are encrypted using the Hill cipher before being stored.
- **File Decryption**: Files are decrypted when downloaded.
- **File Listing**: Users can view a list of uploaded files.

## Backend

The backend is built with Node.js and Express.

### Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
2. Install dependencies:
    npm install
3. Start the server:
    node index.js
The server will run on http://localhost:3000.

API Endpoints
Upload File: POST /upload

Uploads and encrypts a file.
Request: multipart/form-data with a file field named file.
Download File: GET /download/:filename

Downloads and decrypts a file.
Response: Decrypted file content.
List Files: GET /files

Lists all uploaded files.
Response: JSON array of filenames.
Frontend
The frontend is built with React and Vite.

SETUP
1. Navigate to the frontend directory:
        cd frontend
2. Install dependencies:
        npm install
3. Start the development server:
        npm run dev
The frontend will run on http://localhost:5173.

Components
    -Upload: Component for uploading files.
    -List: Component for listing and downloading files.
Usage
1. Open the frontend in your browser.
2. Use the upload form to select and upload a file.
3. The file will be encrypted and stored on the server.
4. The list of files will be updated automatically.
5. Click on a file link to download and decrypt the file.

This README provides an overview of the application, setup instructions, API endpoints, and usage information.
