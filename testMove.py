import requests
import sys

def operate(server_url="http://localhost:8000/move"):
    try:
        json_request = {
        "robot_state": {
            "joint_angles": {
            "joint1": 0,
            "joint2": 30,
            "joint3": 60,
            "joint4": 90,
            "joint5": 120,
            "joint6": 150
            }
        },
        "task": {
            "target_position": {
            "x": 1.5,
            "y": 2.0,
            "z": 1.0
            },
            "orientation": {
            "roll": 90,
            "pitch": 45,
            "yaw": 180
            },
            "action": "grasp_object"
        }
        }

        response = requests.post(server_url, json=json_request)

        if response.status_code == 200:
            print(response.text)
        else:
            print(f"Error: {response.status_code}")
            print(response.text)

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except requests.exceptions.RequestException as e:
        print(f"Error sending request: {e}")

if __name__ == "__main__":
    operate()