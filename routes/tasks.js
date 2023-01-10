const express = require("express");
const request = require("request");
const axios = require("axios");
const { addTask, deleteTask } = require("../db/queries/tasks_queries");
const { getUserById } = require("../db/queries/users_queries");
const { apiChecker } = require("../helpers/api-checker");
const db = require("../db/connection");
const { searchSources } = require("../api/search-api");
const { getTaskFromBook } = require("../api/book-api");
const { getTaskFromEat } = require("../api/eats-api");
const { getTaskFromProduct } = require("../api/buy-api");
const { getTaskFromMovie } = require("../api/movie-api");
const router = express.Router();

router.post("/", async (req, res) => {
  const taskName = req.body.task_name;
  const userId = req.session.user_id;
  const results = await searchSources(taskName);

  // Pick a result randomly from the 4 api's we queried
  const index = Math.floor(Math.random() * 4);
  const MOVIE_INDEX = 0;
  const BOOK_INDEX = 1;
  const EAT_INDEX = 2;
  const PRODUCT_INDEX = 3;

  const result = results[index];
  let task = null;
  switch (index) {
    case MOVIE_INDEX:
      task = getTaskFromMovie(taskName, userId, result);
      break;
    case BOOK_INDEX:
      task = getTaskFromBook(taskName, userId, result);
      break;
    case EAT_INDEX:
      task = getTaskFromEat(taskName, userId, result);
      break;
    case PRODUCT_INDEX:
      task = getTaskFromProduct(taskName, userId, result);
      break;
  }
  if (task) {
    const newRecord = await addTask(task);
    console.log(newRecord);
    res.json(newRecord);
  }
});

router.get("/", (req, res) => {
  let apiTasks;
  getUserById(req.session.user_id).then((user) => {
    let userEmail = user[0].email;
    res.locals.user = {
      email: userEmail,
    };
    request(
      "http://localhost:8080/api/tasks",
      function (error, response, body) {
        apiTasks = JSON.parse(body);
        const templateVars = {
          user_id: req.session.user_id,
          tasks: apiTasks.tasks,
        };
        res.render("tasks", templateVars);
      }
    );
  });
});

router.get("/:id", (req, res) => {
  const query = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
  console.log(query);

  db.query(query)
    .then((data) => {
      const tasks = data.rows;
      console.log(tasks);
      const templateVars = {
        user_id: req.session.user_id,
        task: tasks,
      };
      res.render("task-view", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.patch("/", (req, res) => {
  // This is for updating a task
});

// For this route we delete the value of req.params
router.delete("/:id", (req, res) => {
  // Need to test if this works with the db queries
  deleteTask(req.session.user_id, req.params.id);
  res.redirect("/tasks");
});

module.exports = router;
