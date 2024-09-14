const express = require('express');

const bodyparser = require("body-parser");

const app = express();

app.get('/', (req, res) => {
    res.send('its working.');
});

// Middleware to parse incoming JSON requests
app.use(express.json());

app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    res.json({ message: 'Data received successfully', data: receivedData });
  });

  
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`The Server is running on port ${PORT}`);
});
