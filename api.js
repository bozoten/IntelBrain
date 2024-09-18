const { createAudioFileFromText } = require('./api-util/functions/elevenlabs');
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const app = express();
app.use(express.json());

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.get('/', (req, res) => {
  res.send('its working.');
});

async function generate(state) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  
  const result = await chatSession.sendMessage(state);
  return result.response.text();
}

app.post('/api/data', async (req, res) => {
  try {
    const receivedData = req.body;
    const data = JSON.stringify(receivedData);
    const text = await generate(data);
    const audioFilePath = await createAudioFileFromText(text);
    
    console.log('Received data:', receivedData);
    console.log('Generated text:', text);
    console.log('Audio file path:', audioFilePath);

    // Read the audio file
    const audioFile = fs.readFileSync(audioFilePath);

    // Set the appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename=response.mp3');

    // Send the audio file in the response
    res.send(audioFile);

    // Optionally, delete the file after sending
    fs.unlinkSync(audioFilePath);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});