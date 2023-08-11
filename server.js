const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

let tasks = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' }
];
let nextTaskId = 4;

// Retrieve task list
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { taskName } = req.body;
  const newTask = { id: nextTaskId++, name: taskName };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server started at http://localhost:8000');
});