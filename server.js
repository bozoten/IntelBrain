const { createAudioFileFromText } = require('./api-util/functions/elevenlabs');
const { transcribeFile } = require('./api-util/functions/deepgram');
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const {createClient} = require('@deepgram/sdk');

const multer = require('multer');

const upload = multer({dest: 'uploads/'});


const app = express();
app.use(express.json());

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const dgApiKey = process.env.DEEPGRAM_API_KEY;

const deepgram = createClient(dgApiKey)

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

app.post('/move', async (req, res) => {
  const request = req.body;
  const systemPr = "You're opearting a robot arm, the current state of the machine is given below, return only json with the next angles it should move to for the given task. RETURN ONLY JSON IN THE SAME FORMAT";

  const response = await generate(systemPr + JSON.stringify(request));
  console.log(systemPr + JSON.stringify(request));
  // Randomly select 0 or 175
  // const turn = Math.random() < 0.5 ? '0' : '175';

  res.json(response);
});


app.post('/talk', upload.single('audio'), async (req, res) => {
  try {

    const file = req.file;

    const transcription = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(file.path),
      {
        smart_format: true,
        model: 'nova-2',
        language: 'en-IN'
      });

    fs.unlinkSync(file.path);
    const receivedData = transcription;
    console.log(receivedData);
    const systemPrompt = "you are no longer gemini from now you're ruby. users speech to text is in the transcript in the following json file:"
    const data = systemPrompt + JSON.stringify(receivedData);
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



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});
