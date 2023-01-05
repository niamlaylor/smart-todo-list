const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('tasks'); // What we render depends on the frontend (what EJS templates do we have etc.)
});

router.post('/:task_id', (req, res) => {
  res.render('tasks'); // This would create a new task. We will need a function in here that adds the task to the db
  res.redirect('/');
});

module.exports = router;
