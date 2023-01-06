const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Post request worked for tasks!');
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('tasks');
  const templateVars = { username: req.session.username };
});

router.patch('/', (req, res) => {
  // This is for updating a task
})

// For this route we delete the value of req.params
router.delete('/:task_id', (req, res) => {
});

module.exports = router;
