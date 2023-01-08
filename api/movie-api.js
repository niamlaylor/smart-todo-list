const axios = require("axios");

const movieApi = function () {
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
};

module.exports = { movieApi };
