const express = require("express");
const request = require("request");

const {
  addTask,
  deleteTask,
  getUsersTask,
} = require("../db/queries/tasks_queries");
const router = express.Router();

router.post("/", (req, res) => {
  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  let url = `https://www.omdbapi.com/?t=${req.body["task-name"]}&apikey=a53781da`;
  request.get(url, (error, response, body) => {
    parsedData = JSON.parse(body);
    if (!error && response.statusCode === 200) {
      console.log(`Request successful! ${parsedData.Type}`);
      addTask({
        user_id: req.session.user_id,
        task_name: req.body["task_name"],
        category: parsedData.Type,
        due_date: new Date().toISOString(),
        date_created: new Date().toISOString(),
        priority: false,
        is_active: true,
      });
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
