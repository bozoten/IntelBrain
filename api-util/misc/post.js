// this is the file im playing around wiht different requests to learn

const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.get('/', (req, res) => {
    res.send("HELLO FUCKING WORLD");
});

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    res.json(req.file)
    // req.body will contain the text fields, if there were any
  })

const PORT = 3000;

app.listen(PORT, () => {
    console.log("listening on port 3000");
});