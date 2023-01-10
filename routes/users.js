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
  const formPassword = req.body.password;
  console.log(req.body);

  let queryString = `
  UPDATE users SET email = $2
`;
  let values = [req.session.user_id, formEmail];

  if (formEmail.length > 3 && formPassword.length <= 3) {
<<<<<<< Updated upstream
    console.log(`Adding JUST ${formEmail} to query`);
  } else if (formPassword.length > 3 && formEmail.length <= 3) {
    console.log(`Adding JUST ${formPassword} to query`);
    queryString = `UPDATE users SET password = $2`;
    values[1] = formPassword;
  } else if (formPassword.length > 3 && formEmail.length > 3) {
    console.log(`Adding BOTH ${formEmail} and ${formPassword} to query`);
=======
    console.log(`Updating users.email to: ${formEmail} in database`);
  } else if (formPassword.length > 3 && formEmail.length <= 3) {
    console.log(`Updating users.password to: ${formPassword} in database`);
    queryString = `UPDATE users SET password = $2`;
    values[1] = formPassword;
  } else if (formPassword.length > 3 && formEmail.length > 3) {
    console.log(
      `Updating BOTH users.email and users.password to: ${formEmail} and ${formPassword} in database`
    );
>>>>>>> Stashed changes
    values.push(formPassword);
    queryString += `, password = $3`;
  } else {
    console.log("Error, must enter something to update database");
    res.status(304).send({ success: false });
    return;
  }
  queryString = queryString + ` WHERE id = $1`;
<<<<<<< Updated upstream
  console.log(queryString);
=======
>>>>>>> Stashed changes

  db.query(queryString, values)
    .then((data) => {
      res.status(200).send({ success: true, email: formEmail });
    })
    .catch((err) => {
      console.log(err);
      res.status(304).send({ success: false });
    });

  // if (formEmail.length > 3) {
  //   db.query(
  //     `
  //     UPDATE users SET email = $2
  //     WHERE id = $1
  //   `,
  //     [req.session.user_id, formEmail]
  //   )
  //     .then((data) => {
  //       // Log the data from the query to the console
  //       // Send a successful response to the client
  //       res.status(200).send({ success: true, email: formEmail });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(200).send({ success: false, error: err });
  //     });
  // }
});

router.get("/:user_id", (req, res) => {
  res.render("users");
});

router.patch("/", (req, res) => {
  //This route is for updating account information
});

module.exports = router;
