import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:5000/tasks')
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const addTask = () => {
        fetch('http://127.0.0.1:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText }),
        })
            .then((res) => res.json())
            .then(() => {
                setTasks([...tasks, { text: taskText }]);
                setTaskText('');
            });
    };

    const deleteTask = (id) => {
        fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then(() => setTasks(tasks.filter((task) => task.id !== id)));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text} <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
