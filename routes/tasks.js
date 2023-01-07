const express = require("express");
const { addTask, deleteTask } = require('../db/queries/tasks_queries')
const router = express.Router();

router.post('/', (req, res) => {
  const task = req.body;

  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  addTask(req.session.user_id, 'To watch', task);
  res.redirect('/tasks');
});

router.get('/', (req, res) => {
  const templateVars = { user_id: req.session.user_id };
  res.render('tasks', templateVars);
});

router.patch('/', (req, res) => {
  // This is for updating a task
})

// For this route we delete the value of req.params
router.delete('/:task_id', (req, res) => {
  // Need to test if this works with the db queries
  deleteTask(req.session.user_id, req.params.task_id);
  res.redirect('/tasks');
});

module.exports = router;
