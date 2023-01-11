const axios = require("axios");

const mapGoogleCategoryToCategory = (googleCategory) => {
  const isMovie = googleCategory.toLowerCase().includes("movies");
  if (isMovie) return "To watch";

  const isBook = googleCategory.toLowerCase().includes("books");
  if (isBook) return "To read";

  const isRestaurant = googleCategory.toLowerCase().includes("food & drink");
  if (isRestaurant) return "To eat";

  const isProduct = googleCategory.toLowerCase().includes("movie");
  if (isProduct) return "To buy";
};

const categorizeSearchQuery = async (query) => {
  const results = await axios.post(
    `https://language.googleapis.com/v1/documents:classifyText?alt=json&key=${process.env.GOOGLE_API_KEY}`,
    {
      body: JSON.stringify({
        document: {
          type: "PLAIN_TEXT",
          content: query,
        },
        classificationModelOptions: {
          v2Model: {
            contentCategoriesVersion: "V2",
          },
        },
      }),
    }
  );
  console.log(results.data);
  results.data.categories.forEach((googleCategory) => {
    const category = mapGoogleCategoryToCategory(googleCategory.name);
    if (category) return category;
  });
  return null;
};

module.exports = { categorizeSearchQuery };
