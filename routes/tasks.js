const express = require("express");
const request = require("request");
const axios = require("axios");
const { addTask, deleteTask } = require("../db/queries/tasks_queries");
const router = express.Router();

router.post("/", (req, res) => {
  // The category 'to watch' is placeholder for now. Ths will be determined by the API call
  const taskName = req.body.task_name;
  const user = req.session.user_id;

  // Exact movie match: Harry Potter and the Deathly Hallows: Part 2
  // Exact book match: Book One of the Travelers

  const runApi = function(task, userId) {
    // Start by running movie api
    axios(`https://www.omdbapi.com/?t=${task}&apikey=a53781da`)
    .then((response) => {
      // If exact movie title match, then it will add to db and send to frontend with category 'To watch'
      if (response.data["Title"] === task) {
        addTask({
          user_id: userId,
          task_name: task,
          category: "To watch",
          due_date: new Date().toISOString(),
          date_created: new Date().toISOString(),
          priority: false,
          is_active: true,
        });
        let frontendData = { category: 'To watch', data: response.data };
        console.log('Movie matched! Added task to To watch');
        return res.send(frontendData);

      }
      // If no luck with movie match, run the book api next
      else if (response.data["Title"] !== task) {
        const API_KEY = "AIzaSyAFUzAdq321nVUZ4KvMFCwJ5YJb7TQv5pI";
        axios(`https://www.googleapis.com/books/v1/volumes?q=intitle:${task}&key=${API_KEY}&maxResults=1`)
        .then((bookResponse) => {
          const bookData = bookResponse.data.items[0].volumeInfo;
          // If exact book title match, then add book to db and send to frontend with category 'To read'
          if (bookData.title === task) {
            addTask({
              user_id: userId,
              task_name: task,
              category: "To read",
              due_date: new Date().toISOString(),
              date_created: new Date().toISOString(),
              priority: false,
              is_active: true,
            });
            let frontendData = { category: 'To read', data: response.data };
            console.log('Book matched! Added task to To read');
            return res.send(frontendData);
          }
        })
      }
      let movieInfo = { category: 'To watch', data: response.data };
    });
  };
  runApi(taskName, user);

});













router.get("/", (req, res) => {
  let apiTasks;
  request("http://localhost:8080/api/tasks", function (error, response, body) {
    apiTasks = JSON.parse(body);
    const templateVars = {
      user_id: req.session.user_id,
      tasks: apiTasks.tasks,
    };
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
