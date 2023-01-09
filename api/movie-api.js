const axios = require("axios");
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
      const parsedData = response.data;
      console.log(`Request successful! ${parsedData.Type}`);
      addTask({
        user_id: userId,
        task_name: task,
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
};

module.exports = { movieApi };
