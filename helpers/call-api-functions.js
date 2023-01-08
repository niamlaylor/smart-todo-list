const { movieApi } = require("../api/movie-api");
const { bookApi } = require("../api/book-api");

// Helper function to be used to call ALL APIs
const callApi = function (task, userId) {
  movieApi(task, userId);
  bookApi(task, userId);
};

module.exports = { callApi };
