const express = require("express");
const { addTask, deleteTask, getUsersTask } = require('../db/queries/tasks_queries');
const router = express.Router();

router.post('/', (req, res) => {
  const task = req.body;

  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  addTask({
    user_id: req.session.user_id,
    task_name: task.task_name,
    category: 'To Eat',
    due_date: new Date().toISOString(),
    date_created: new Date().toISOString(),
    priority: false,
    is_active: true
  });
  res.redirect('/tasks');
});

router.get('/', (req, res) => {
  const userTasks = getUsersTask(req.session.user_id);
  const templateVars = { user_id: req.session.user_id, tasks: userTasks };
  res.render('tasks', templateVars);
});

router.patch('/', (req, res) => {
  // This is for updating a task
});

// For this route we delete the value of req.params
router.delete('/:task_id', (req, res) => {
  // Need to test if this works with the db queries
  deleteTask(req.session.user_id, req.params.task_id);
  res.redirect('/tasks');
});

module.exports = router;
