const express = require('express');

const bodyparser = require("body-parser");

const app = express();

app.use(express.json());

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "YOUR_API_KEY_HERE";
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
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(state);
    return result.response.text();
}

app.post('/api/data', async (req, res) => {
    const receivedData = req.body;
    const data = JSON.stringify(receivedData);
    const actionSequence = await generate(data);
    console.log('Received data:', receivedData);
    console.log('action sequence', actionSequence)
    res.json({ message: 'Data received successfully', data: actionSequence });
  });
  

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`The Server is running on port ${PORT}`);
});
