const axios = require("axios");
const request = require("request");
const { addTask } = require("../db/queries/tasks_queries");

/**
 *
 * @param {*} task
 * @param {*} userId
 */
const movieApi = function(task, userId) {
  axios
    .get(`https://www.omdbapi.com/?t=${task}&apikey=a53781da`)
    .then((response) => {
      if (task === response.data["Title"]) {
        console.log(`Request successful! To Watch category`);
        addTask({
          user_id: userId,
          task_name: task,
          category: "To watch",
          due_date: new Date().toISOString(),
          date_created: new Date().toISOString(),
          priority: false,
          is_active: true,
        });
      } else {
        return Promise.resolve(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { movieApi };
