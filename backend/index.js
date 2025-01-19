const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors()); 
// Storage configuration for multer (file upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Hill Cipher Key (2x2 matrix for simplicity)
const hillKey = [[9, 5], [4, 7]]; // Example key, change it as needed

// Function to generate the inverse matrix of the Hill cipher key
function inverseHillKey(key) {
  const determinant = key[0][0] * key[1][1] - key[0][1] * key[1][0];
  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return 1;
  };
  const mod = 26;
  const invDet = modInverse(determinant, mod);
  const inverse = [
    [key[1][1] * invDet % mod, -key[0][1] * invDet % mod],
    [-key[1][0] * invDet % mod, key[0][0] * invDet % mod],
  ];
  return inverse.map(row => row.map(cell => (cell + mod) % mod));
}
function hillEncrypt(text, key) {
  let encryptedText = '';
  for (let i = 0; i < text.length; i += 2) {
    const chunk = [text.charCodeAt(i) - 65, text.charCodeAt(i + 1) - 65];
    const encryptedChunk = [
      (key[0][0] * chunk[0] + key[0][1] * chunk[1]) % 26,
      (key[1][0] * chunk[0] + key[1][1] * chunk[1]) % 26,
    ];
    encryptedText += String.fromCharCode(encryptedChunk[0] + 65) + String.fromCharCode(encryptedChunk[1] + 65);
  }
  return encryptedText;
}

function hillDecrypt(text, key) {
  const inverseKey = inverseHillKey(key);
  let decryptedText = '';
  for (let i = 0; i < text.length; i += 2) {
    const chunk = [text.charCodeAt(i) - 65, text.charCodeAt(i + 1) - 65];
    const decryptedChunk = [
      (inverseKey[0][0] * chunk[0] + inverseKey[0][1] * chunk[1]) % 26,
      (inverseKey[1][0] * chunk[0] + inverseKey[1][1] * chunk[1]) % 26,
    ];
    decryptedText += String.fromCharCode((decryptedChunk[0] + 26) % 26 + 65) + String.fromCharCode((decryptedChunk[1] + 26) % 26 + 65);
  }
  return decryptedText;
}


// Route to upload and encrypt the file
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file.');

    // Process the text: remove spaces and non-alphabet characters, convert to uppercase
    let processedText = data.replace(/[^A-Za-z]/g, '').toUpperCase();
    if (processedText.length % 2 !== 0) processedText += 'X'; // Padding if length is odd

    // Encrypt the processed text
    const encryptedText = hillEncrypt(processedText, hillKey);

    // Overwrite the original file with the encrypted content
    fs.writeFile(filePath, encryptedText, 'utf-8', (err) => {
      if (err) return res.status(500).send('Error writing encrypted file.');

      res.send('File uploaded and encrypted successfully.');
    });
  });
});

// Route to download and decrypt the file
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).send('File not found.');

    // Decrypt the text
    const decryptedText = hillDecrypt(data, hillKey);

    // Send the decrypted content as plain text
    res.setHeader('Content-Disposition', 'attachment; filename=' + req.params.filename);
    res.send(decryptedText);
  });
});
app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');

  // Read the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory.');
    }

    // Send the list of files as JSON
    res.json(files);
  });
});
// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
