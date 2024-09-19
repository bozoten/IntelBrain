const express = require('express');
const multer = require('multer');
const { transcribeFile } = require('./api-util/functions/deepgram');  // Import your function

const app = express();
const upload = multer();  // Using memory storage, file will be stored in memory buffer

app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    // Get file buffer and mimetype from the uploaded file
    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    // Call the transcribe function and pass the file buffer and mimetype
    const transcriptionResult = await transcribeFile(fileBuffer, mimeType);

    // Send the result back to the client
    res.json(transcriptionResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to transcribe the file.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
