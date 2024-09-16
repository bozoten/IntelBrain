const { createAudioFileFromText } = require('../api-scripts/elevenlabs');

(async () => {
  try {
    const text = "Throughout the heavens and earth... I alone am the honoured one.";
    const fileName = await createAudioFileFromText(text);
    console.log(`Audio file created: ${fileName}`);
  } catch (error) {
    console.error("Error creating audio file:", error);
  }
})();