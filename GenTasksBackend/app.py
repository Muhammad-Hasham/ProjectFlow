from flask import Flask, jsonify, request
from flask_cors import CORS
from openai_service import generate_tasks

app = Flask(__name__)
CORS(app)

@app.route('/api/generate-tasks', methods=['POST'])
def generate_tasks_endpoint():
    data = request.get_json()
    user_story = data.get('user_story', '')
    tasks = generate_tasks(user_story)
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
