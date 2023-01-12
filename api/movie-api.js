const axios = require("axios");
const request = require("request");
const { addTask } = require("../db/queries/tasks_queries");
const { TASK_CATEGORIES } = require("./constants");
/**
 *
 * @param {*} task
 * @param {*} userId
 */
const getMovie = query => {
  return axios
    .get(`https://www.omdbapi.com/?t=${query}&apikey=${process.env.MOVIE_API_KEY}`)
    .then((response) => {
      return response.data;
    });
};

const getTaskFromMovie = (name, userId, movie) => {
  return {
    user_id: userId,
    task_name: name,
    category: TASK_CATEGORIES.MOVIES,
    due_date: new Date().toISOString(),
    date_created: new Date().toISOString(),
    priority: false,
    is_active: true
  };
};

module.exports = { getMovie, getTaskFromMovie };
