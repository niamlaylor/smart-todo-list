const axios = require("axios");

// set up the request parameters
const params = {
  api_key: "2915C7E1E54D41DFA5000C18957FD70C",
  type: "product",
  amazon_domain: "amazon.ca",
  asin: "B073JYC4XM",
  currency: "cad",
  language: "en_US",
  output: "html",
};

// make the http GET request to Rainforest API
axios
  .get("https://api.rainforestapi.com/request", { params })
  .then((response) => {
    // print the HTML response from Rainforest API
    console.log(response.data);
  })
  .catch((error) => {
    // catch and print the error
    console.log(error);
  });
