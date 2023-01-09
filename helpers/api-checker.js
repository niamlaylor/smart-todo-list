// This function checks for how many words are a match in the response title

const apiChecker = (task, responseTitle) => {
  let match;

  if (!responseTitle) {
    return match = false;
  }

  let taskWords = task.toLowerCase().split(' ');

  let responseTitleWords = responseTitle.toLowerCase().split(' ');
  const responseTitleWordsCount = responseTitleWords.length;
  let responseObject = {};

  let taskWordsPresent = 0;

  for (const word of responseTitleWords) {
    responseObject[word] = 1;
  };

  for (const word of taskWords) {
    if (responseObject[word]) {
      taskWordsPresent += 1;
    }
  }

  taskWordsPresent / responseTitleWordsCount >= 0.2 ? match = true : match = false;
  return match;
};

apiChecker('Book One of the Travelers', 'Book Two of the Travelers');

module.exports = { apiChecker };
