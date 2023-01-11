// This function checks for how many words are a match in the response title

const compareApi = (task, movie, book, restaurant, product) => {
  let bestMatch = {};

  const taskWords = task.toLowerCase().split(' ');

  let movieWords;
  if (!movie) {
    movieWords = [''];
  } else {
    movieWords = movie.toLowerCase().split(' ');
  };

  let bookWords;
  if (!book) {
    bookWords = [''];
  } else {
    bookWords = book.toLowerCase().split(' ');
  };

  let restaurantWords;
  if (!restaurant) {
    restaurantWords = [''];
  } else {
    restaurantWords = restaurant.toLowerCase().split(' ');
  };

  let productWords;
  if (!product) {
    productWords = [''];
  } else {
    productWords = product.toLowerCase().split(' ');
  };

  const movieMatchWords = movieWords.filter((word) => taskWords.includes(word));
  bestMatch["movieMatch"] = movieMatchWords.length / taskWords.length;

  const bookMatchWords = bookWords.filter((word) => taskWords.includes(word));
  bestMatch["bookMatch"] = bookMatchWords.length / taskWords.length;

  const restaurantMatchWords = restaurantWords.filter((word) => taskWords.includes(word));
  bestMatch["restaurantMatch"] = restaurantMatchWords.length / taskWords.length;

  const productMatchWords = productWords.filter((word) => taskWords.includes(word));
  bestMatch["productMatch"] = productMatchWords.length / taskWords.length;

  let bestResponse = Object.keys(bestMatch)[0];
  for (const ratio in bestMatch) {
    if (bestMatch[ratio] > bestMatch[bestResponse]) {
      bestResponse = ratio;
    }
  };
  if (bestResponse === 'movieMatch') {
    return 'To watch';
  } else if (bestResponse === 'bookMatch') {
    return 'To read';
  } else if (bestResponse === 'restaurantMatch') {
    return 'To watch';
  } else if (bestResponse === 'productMatch') {
    return 'To buy';
  };
};

module.exports = { compareApi };
