import requests
import sys

def transcribe_audio(file_path, server_url="http://localhost:8000/talk"):
    try:
        with open(file_path, 'rb') as audio_file:
            files = {'audio': audio_file}
            response = requests.post(server_url, files=files)

        if response.status_code == 200:
            with open('response.mp3', 'wb') as f:
                f.write(response.content)
            print("Audio file saved as response.mp3")
        else:
            print(f"Error: {response.status_code}")
            print(response.text)

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except requests.exceptions.RequestException as e:
        print(f"Error sending request: {e}")

if __name__ == "__main__":

    file_path = "query.m4a"
    transcribe_audio(file_path)