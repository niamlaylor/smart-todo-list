const express = require("express");
const request = require("request");
const axios = require("axios");
const { addTask, deleteTask } = require("../db/queries/tasks_queries");
const { apiChecker } = require("../helpers/api-checker");
const db = require('../db/connection');
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
      const movieMatch = apiChecker(task, response.data.Title);

      if (movieMatch) {
        addTask({
          user_id: userId,
          task_name: response.data.Title,
          category: "To watch",
          due_date: new Date().toISOString(),
          date_created: new Date().toISOString(),
          priority: false,
          is_active: true,
        });
        let frontendData = { category: 'To watch', data: response.data };
        console.log(`Movie match was ${movieMatch}! Added task to 'To watch'`);
        return res.send(frontendData);
      }
      // If no luck with movie match, run the book api next
      else if (!movieMatch) {
        const API_KEY = "AIzaSyAFUzAdq321nVUZ4KvMFCwJ5YJb7TQv5pI";
        axios(`https://www.googleapis.com/books/v1/volumes?q=intitle:${task}&key=${API_KEY}&maxResults=1`)
        .then((bookResponse) => {
          const bookData = bookResponse.data.items[0].volumeInfo;
          const bookMatch = apiChecker(task, bookData.title);

          // If exact book title match, then add book to db and send to frontend with category 'To read'
          if (bookMatch) {
            addTask({
              user_id: userId,
              task_name: bookData.title,
              category: "To read",
              due_date: new Date().toISOString(),
              date_created: new Date().toISOString(),
              priority: false,
              is_active: true,
            });
            let frontendData = { category: 'To read', data: bookData };
            console.log(`Book match was ${bookMatch}! Added task to 'To read'`);
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

router.get("/:id", (req, res) => {
  const query = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
  console.log(query);

  db.query(query)
    .then(data => {
      const tasks = data.rows;
      console.log(tasks);
      const templateVars = {
        user_id: req.session.user_id,
        task: tasks,
      };
      res.render('task-view', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

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
