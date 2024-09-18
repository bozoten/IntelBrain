const { createAudioFileFromText } = require('../api-util/functions/elevenlabs');

(async () => {
  try {
    const text = "good morning, BOSS! Here’s your briefing to get your day started: Locallu Update: Your team’s progress on the multi-LLM interaction engine is impressive. Focus on reviewing the latest model integrations and fine-tuning the beta launch strategy. Kozot Progress: You and Kaushik are on track with the simulation demo and MVP development. Seek out collaboration opportunities and connect with potential partners in robotics and AI. H241 Developments: The decentralized marketplace is advancing well. Check in on the on-chain language model updates and ensure the blockchain payment system aligns with your objectives. Research Paper: Continue working on your research paper. Set aside some time to refine your ideas and polish your drafts. LinkedIn Post: Finalize your LinkedIn post about Locallu’s engine. Highlight the innovative aspects of multi-agent systems and decentralized AI. Legal Assistant Role: Review any updates from your father’s office and prepare for any new tasks or legal drafting needs. Important Note: An unknown individual entered your room while you were asleep last night. A photo from your security system captured this. Please review the footage and take necessary security precautions.";
    const fileName = await createAudioFileFromText(text);
    console.log(`Audio file created: ${fileName}`);
  } catch (error) {
    console.error("Error creating audio file:", error);
  }
})();