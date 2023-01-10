const { getMovie } = require("./movie-api");
const { getBook } = require("./book-api");
const { getEat } = require("./eats-api");
const { getProduct } = require("./buy-api");

const searchSources = (query) => {
  return Promise.allSettled([
    getMovie(query),
    getBook(query),
    getEat(query),
    getProduct(query),
  ]).then((values) => {
    return { values };
  });
};

module.exports = { searchSources };