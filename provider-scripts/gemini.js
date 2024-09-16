const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "YOUR_API_KEY";
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
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(`2 meters to obstacle and a speed of 0.5km/hour, the destination is 175 degrees to northeast. 
                                                  plan & return the next 7 sequence of actions to avoid wall & reach the destination in json format. 
                                                  possible executable functions are, move forward, move right, move left, 
                                                  break, reverse. RETURN ONLY JSON`);
    console.log(result.response.text());
  }
  
  run();