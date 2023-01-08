const axios = require("axios");
const { addTask } = require("../db/queries/tasks_queries");

const API_KEY = "AIzaSyAFUzAdq321nVUZ4KvMFCwJ5YJb7TQv5pI";

const bookApi = function (task, userId) {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${task}&key=${API_KEY}`
    )
    .then((response) => {
      // handle success
      console.log(`Request successful! Book`);
      addTask({
        user_id: userId,
        task_name: task,
        category: "To read",
        due_date: new Date().toISOString(),
        date_created: new Date().toISOString(),
        priority: false,
        is_active: true,
      });
      console.log(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

module.exports = { bookApi };
