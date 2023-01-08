const express = require("express");
const request = require("request");
const axios = require("axios");
const {
  addTask,
  deleteTask,
  getUsersTask,
} = require("../db/queries/tasks_queries");
const router = express.Router();

router.post("/", (req, res) => {
  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  axios
    .get(`https://www.omdbapi.com/?t=${req.body["task-name"]}&apikey=a53781da`)
    .then((response) => {
      const parsedData = response.data;
      console.log(`Request successful! ${parsedData.Type}`);
      addTask({
        user_id: req.session.user_id,
        task_name: req.body["task_name"],
        category: "To watch",
        due_date: new Date().toISOString(),
        date_created: new Date().toISOString(),
        priority: false,
        is_active: true,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  res.redirect("/tasks");
});

router.get("/", (req, res) => {
  let apiTasks;
  request("http://localhost:8080/api/tasks", function (error, response, body) {
    apiTasks = JSON.parse(body);
    const templateVars = {
      user_id: req.session.user_id,
      tasks: apiTasks.tasks,
    };
    console.log(templateVars);
    res.render("tasks", templateVars);
  });
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
