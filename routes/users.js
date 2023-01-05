/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookieSession = require('cookie-session');
const router  = express.Router();

// Do we want to use cookie-session in this file?
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

router.post('/:user_id', (req, res) => {
  req.cookies.user_id = req.params.user_id;
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('users');
});

module.exports = router;
