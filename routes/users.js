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

router.post('/users', (req, res) => {
//This route is for creating a new user
});

router.get('/:user_id', (req, res) => {
  res.render('users');
});

router.patch('/', (req, res) => {
//This route is for updating account information
});

module.exports = router;
