const { movieApi } = require("../api/movie-api");
const { bookApi } = require("../api/book-api");

// Helper function to be used to call ALL APIs
const callApi = function (task, userId) {
  if (movieApi(task, userId) === false) {
    bookApi(task, userId);
  }
};





// if (movieApi(task, userId) === false) {
//   bookApi(task, userId);
// }

module.exports = { callApi };
