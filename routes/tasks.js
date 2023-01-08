const express = require("express");
const request = require("request");
const axios = require("axios");
const {
  addTask,
  deleteTask,
  getUsersTask,
} = require("../db/queries/tasks_queries");
const { callApi } = require("../helpers/call-api-functions");
const router = express.Router();

router.post("/", (req, res) => {
  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  callApi(req.body["task_name"], req.session.user_id);
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
