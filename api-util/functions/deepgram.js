const express = require('express');
const multer = require('multer');
const { createClient } = require("@deepgram/sdk");
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

const deepgramApiKey = "YOUR_API_KEY";
const deepgram = createClient(deepgramApiKey);

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.file;

  try {
    console.log(`Transcribing file: ${file.originalname}`);
    console.log(`File size: ${file.size} bytes`);
    console.log(`File mime type: ${file.mimetype}`);

    const result = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(file.path),
      {
        smart_format: true,
        model: 'nova-2',
        language: 'en-IN'
      }
    );

    // Delete the temporary file
    fs.unlinkSync(file.path);

    // Return the entire Deepgram response
    res.json(result);
  } catch (error) {
    console.error("Error during transcription:", error);
    res.status(500).json({ error: 'Transcription failed', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});