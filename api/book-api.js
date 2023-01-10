const axios = require("axios");
const { addTask } = require("../db/queries/tasks_queries");

const API_KEY = process.env.BOOK_API_KEY;

const getBook = query => {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&key=${API_KEY}&maxResults=1`
    )
    .then((response) => {
      return response.data.items[0];
    });
};

const getTaskFromBook = (name, userId, book) => {
  return {
    user_id: userId,
    task_name: name,
    category: "To read",
    due_date: new Date().toISOString(),
    date_created: new Date().toISOString(),
    priority: false,
    is_active: true
  };
};

module.exports = { getBook, getTaskFromBook };
