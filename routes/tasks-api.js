const express = require("express");
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM tasks`;
  console.log(query);
  db.query(query)
    .then(data => {
      const tasks = data.rows;
      res.json({ tasks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
