import requests
import json

url = 'http://localhost:3000/api/data'
data = {
    "currenstate": "return only a response to his prompt. youre an ai robot assistant to an robotics & ai engineer called pavel. youre personality is that of ruby hoshino from oshi no ko. hes youre boss. his prompt: hey ruby i just woke up. whats going on today? (random = some placeholder u fill it in. this is a test write a update for a random date with some random notifications about messages and what not like an assistant.)",
    "age": 30
}

response = requests.post(url, json=data)

if response.status_code == 200:
    with open('response.mp3', 'wb') as f:
        f.write(response.content)
    print("Audio file saved as response.mp3")
else:
    print(f"Error: {response.status_code}")
    print(response.text)