const express = require("express");
const request = require("request");

const {
  addTask,
  deleteTask,
  getUsersTask,
} = require("../db/queries/tasks_queries");
const router = express.Router();

router.post("/", (req, res) => {
  const task = req.body;
  console.log(req.body);
  console.log(req.body["task-name"]);

  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  let url = `https://www.omdbapi.com/?t=${req.body["task-name"]}&apikey=a53781da`;
  request.get(url, (error, response, body) => {
    parsedData = JSON.parse(body);
    if (!error && response.statusCode === 200) {
      console.log(`Request successful! ${parsedData.Type}`);
      addTask(
        req.session.user_id,
        parsedData.Type,
        req.body["task-name"],
        Date.now()
      );
    }
  });
  // addTask(req.session.user_id, "To watch", task);
  res.redirect("/tasks");
});

router.get("/", (req, res) => {
  const userTasks = getUsersTask(req.session.user_id);
  const templateVars = { user_id: req.session.user_id, tasks: userTasks };
  res.render("tasks", templateVars);
});

router.patch("/", (req, res) => {
  // This is for updating a task
});

// For this route we delete the value of req.params
router.delete("/:task_id", (req, res) => {
  // Need to test if this works with the db queries
  deleteTask(req.session.user_id, req.params.task_id);
  res.redirect("/tasks");
});

module.exports = router;
