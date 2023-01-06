const express = require("express");
const { addTask } = require('../db/queries/')
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Post request worked for tasks!');
  res.redirect('/');
});

router.get('/', (req, res) => {
  const templateVars = { username: req.session.username };
  res.render('tasks', templateVars);
});

router.patch('/', (req, res) => {
  // This is for updating a task
})

// For this route we delete the value of req.params
router.delete('/:task_id', (req, res) => {
});

module.exports = router;
