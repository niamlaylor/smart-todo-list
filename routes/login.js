const express = require('express');
const cookieSession = require('cookie-session');
const router  = express.Router();

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

router.post('/', (req, res) => {
  req.session.user_id = 2;
  console.log(req.session.user_id)
  res.redirect('/tasks');
});

module.exports = router;
