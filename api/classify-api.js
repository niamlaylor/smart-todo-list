const axios = require("axios");

const mapGoogleCategoryToCategory = (googleCategory) => {
  const isMovie = googleCategory.toLowerCase().includes("movies")
    || googleCategory.toLowerCase().includes("tv & video");
  if (isMovie) return "To watch";

  const isBook = googleCategory.toLowerCase().includes("book");
  if (isBook) return "To read";

  const isRestaurant = googleCategory.toLowerCase().includes("food & drink");
  if (isRestaurant) return "To eat";

  return "To buy";
};

const categorizeSearchQuery = async (query) => {
  const results = await axios.post(
    `https://language.googleapis.com/v1/documents:classifyText?alt=json&key=${process.env.GOOGLE_API_KEY}`,
    {
      document: {
        type: "PLAIN_TEXT",
        content: query,
      },
      classificationModelOptions: {
        v2Model: {
          contentCategoriesVersion: "V2",
        },
      },
    }
  );
  let category = null;
  console.log(results.data.categories);
  results.data.categories.forEach((googleCategory) => {
    if (category) return;
    category = mapGoogleCategoryToCategory(googleCategory.name);
  });
  return category;
};

module.exports = { categorizeSearchQuery };
