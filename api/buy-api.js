const axios = require("axios");

// make the http GET request to Rainforest API
const getProduct = (query) => {
  const params = {
    api_key: process.env.RAINFOREST_API_KEY,
    type: "search",
    amazon_domain: "amazon.ca",
    search_term: query,
    output: "json",
    sort_by: "featured",
    page: "1",
  };

  return axios
    .get("https://api.rainforestapi.com/request", {
      params,
    })
    .then((response) => {
      // print the HTML response from Rainforest API
      return response.data.search_results[0];
    });
};

const getTaskFromProduct = (name, userId, product) => {
  return {
    user_id: userId,
    task_name: name,
    category: "To buy",
    due_date: new Date().toISOString(),
    date_created: new Date().toISOString(),
    priority: false,
    is_active: true,
  };
};

module.exports = { getProduct, getTaskFromProduct };
