const express = require("express");
const request = require("request");
const axios = require("axios");

const { addTask, deleteTask, editTask } = require("../db/queries/tasks_queries");
const { getUserById } = require("../db/queries/users_queries");
const db = require("../db/connection");
const { getTaskFromBook, getBook } = require("../api/book-api");
const { getTaskFromEat, getEat } = require("../api/eats-api");
const { getTaskFromProduct, getProduct } = require("../api/buy-api");
const { getTaskFromMovie, getMovie } = require("../api/movie-api");
const { categorizeSearchQuery } = require("../api/classify-api");
const { TASK_CATEGORIES } = require("../api/constants");
const router = express.Router();

router.post("/", async(req, res) => {
  const taskName = req.body.task_name;
  const userId = req.session.user_id;
  const category = await categorizeSearchQuery(taskName);
  let task = null;
  switch (category) {
  case TASK_CATEGORIES.MOVIES:
    task = getTaskFromMovie(taskName, userId, getMovie(taskName));
    break;
  case TASK_CATEGORIES.BOOKS:
    task = getTaskFromBook(taskName, userId, getBook(taskName));
    break;
  case TASK_CATEGORIES.EATS:
    task = getTaskFromEat(taskName, userId, getEat(taskName));
    break;
  case TASK_CATEGORIES.PRODUCTS:
    task = getTaskFromProduct(taskName, userId, getProduct(taskName));
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

router.post("/:id", (req, res) => {
  const newCategory = { category: req.body.changedCategory, userId: req.session.user_id, taskId: req.params.id };

  editTask(newCategory);

  res.redirect(`/tasks/${req.params.id}`);
});

// For this route we delete the value of req.params
router.delete("/:id", (req, res) => {
  // Need to test if this works with the db queries
  deleteTask(req.session.user_id, req.params.id);
  res.redirect("/tasks");
});

module.exports = router;
