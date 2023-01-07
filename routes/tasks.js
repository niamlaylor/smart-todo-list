const express = require("express");
const { addTask } = require('../db/queries/tasks_queries')
const router = express.Router();

router.post('/', (req, res) => {
  const task = req.body;
  console.log(req.body, req.session);
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
});

module.exports = router;
