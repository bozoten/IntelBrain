const { ElevenLabsClient } = require("elevenlabs");
const { createWriteStream } = require("fs");
const { v4: uuid } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const ELEVENLABS_API_KEY = "YOUR_API_KEY";

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

const createAudioFileFromText = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: "Clyde",
        model_id: "eleven_turbo_v2_5",
        text,
      });
      const fileName = `${uuid()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on("finish", () => resolve(fileName));
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createAudioFileFromText };