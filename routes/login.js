const express = require('express');
const cookieSession = require('cookie-session');
const router  = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
});

module.exports = router;
