import openai
import json
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_tasks(user_story):
    prompt = ''' You are an intelligent chatbot. Please provide development tasks for the following user story:"${user_story}". Generate only 5 or fewer tasks.Expected output format:"tasks": [{"name": "name of task 1", "description": "Description of Task 1","priority": "low",}, {"name": "name of task 2", "description": "Description of Task 2","priority": "High",  }, {"name": "name of task 3", "description": "Description of Task 3","priority": "Medium",},] '''

    conversation = [{"role": "user", "content": prompt}]
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        max_tokens=1000,
    )

    # Extract the tasks string from the response
    tasks_string = response.choices[0].message["content"]

    try:
        # Parse the inner tasks string to a JSON object
        tasks = json.loads(tasks_string)["tasks"]
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

    return tasks

# Example usage
# user_story = "As a user, I want to be able to log in to my account."
# tasks = generate_tasks(user_story)
# print(tasks)
