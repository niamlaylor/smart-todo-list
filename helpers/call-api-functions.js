const { movieApi } = require("../api/movie-api");

// Helper function to be used to call ALL APIs
const callApi = function (task, userId) {
  movieApi(task, userId);
};

module.exports = { callApi };
