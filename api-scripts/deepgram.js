const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

const transcribeFile = async () => {
  const deepgramApiKey = "YOUR_API_KEY";

  // Replace with your file path and audio mimetype
  const pathToFile = "..\\demo\\test.m4a";

  const deepgram = createClient(deepgramApiKey);

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync(pathToFile),
    {smart_format: true, model: 'nova-2', language: 'en-IN' },
  );

  if (error) throw error;
  if (!error) console.dir(result, {depth: null});
};

transcribeFile();
