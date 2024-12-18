from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows cross-origin requests from React

tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    tasks.append({'id': len(tasks) + 1, 'text': data['text'], 'completed': False})
    return jsonify({'message': 'Task added successfully'})

@app.route('/tasks', methods=['POST'])
def add_task():
    try:
        data = request.json
        if not data or 'text' not in data:
            return jsonify({'error': 'Task text is required'}), 400
        tasks.append({'id': len(tasks) + 1, 'text': data['text'], 'completed': False})
        return jsonify({'message': 'Task added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'message': 'Task deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)