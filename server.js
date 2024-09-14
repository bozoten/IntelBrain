const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('its working.');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`The Server is running on port ${PORT}`);
});
