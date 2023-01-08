const { movieApi } = require("../api/movie-api");

const callApi = function (task, userId) {
  movieApi(task, userId);
};

module.exports = { callApi };
