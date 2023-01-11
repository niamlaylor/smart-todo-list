const axios = require("axios");

const getEat = (query) => {
  return axios
    .get(
      `https://api.yelp.com/v3/businesses/search?location=Toronto&term=${query}&radius=2000&categories=&sort_by=best_match&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    )
    .then((response) => {
      return response.data.businesses[0];
    });
};

const getTaskFromEat = (name, userId, eat) => {
  return {
    user_id: userId,
    task_name: name,
    category: "To eat",
    due_date: new Date().toISOString(),
    date_created: new Date().toISOString(),
    priority: false,
    is_active: true
  };
};

module.exports = { getEat, getTaskFromEat };
