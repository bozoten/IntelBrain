# Intel Brain

**JavaScript API for seamless robot control, natural language control with LLMs & more.**

Intel Brain is a powerful Node.js Express API that enables seamless control and conversational features in robots using various LLMs (such as Gemini, GPT-4, Claude, and more). The API is designed to work with multiple hardware platforms, from basic boards like Arduino Uno R4 and ESP32 to more advanced devices like Raspberry Pi and Jetson Nano.

## Features
- **Multi-LLM Support**: Leverage multiple large language models for intelligent tasks.
- **Cross-Platform Compatibility**: Supports both limited and advanced robotics platforms.
- **Easy API Access**: Make simple HTTP POST requests to control robots and interact with LLMs.
- **Customizable Workflows**: Tailor the API to fit specific robotics and AI use cases.

## Quick Start

1. **Clone the repository:**

    ```bash
    git clone https://github.com/bozoten/IntelBrain.git
    cd IntelBrain
    ```

2. **Install dependencies:**

    ```bash
    npm install @deepgram/sdk @google/generative-ai express dotenv elevenlabs multer
    ```

3. **Set up environment variables:**

    Create a `.env` file in the project root and add your API keys:

    ```plaintext
    GEMINI_API_KEY=
    DEEPGRAM_API_KEY=
    ELEVENLABS_API_KEY=
    ```

4. **Run the server:**

    ```bash
    node server.js
    ```

    The API will now be running locally on `http://localhost:8000`.

## Sending POST Requests from Arduino, ESP32, and Raspberry Pi

### Example: Sending POST Requests from Arduino Uno R4 or ESP32

You can send HTTP POST requests from Arduino or ESP32 to interact with the API using the `WiFiClient` and `HTTPClient` libraries. Here’s an example for an ESP32 board:

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your-SSID";
const char* password = "your-PASSWORD";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin("http://your-server-ip:3000/robot-control"); // API endpoint
    http.addHeader("Content-Type", "application/json");

    String requestData = "{\"command\": \"move forward\"}";
    int httpResponseCode = http.POST(requestData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.println("Error in sending POST request");
    }
    
    http.end();
  }
}

void loop() {
  // Add any looping functionality here
}
```
You can send HTTP POST requests from Raspberry Pi to interact with the API using the request package. Here’s an example of a python script.
```python
import requests

url = 'http://your-server-ip:3000/robot-control'
data = {'command': 'move forward'}
response = requests.post(url, json=data)

print(response.text)

```
