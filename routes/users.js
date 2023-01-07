/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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
