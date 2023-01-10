/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/users", (req, res) => {
  //This route is for creating a new user
});

// This route for updating user
router.post("/update-user", (req, res) => {
  const formEmail = req.body.email;
  console.log(formEmail);

  db.query(
    `
    UPDATE users SET email = $2
    WHERE id = $1
  `,
    [req.session.user_id, formEmail]
  )
    .then((data) => {
      // Log the data from the query to the console
      // Send a successful response to the client
      res.status(200).send({ success: true, email: formEmail });
    })
    .catch((err) => {
      console.error(err);
      res.status(200).send({ success: false, error: err });
    });
});

router.get("/:user_id", (req, res) => {
  res.render("users");
});

router.patch("/", (req, res) => {
  //This route is for updating account information
});

module.exports = router;
