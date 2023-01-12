const express = require("express");
const request = require("request");
const axios = require("axios");

const { addTask, deleteTask, editTask } = require("../db/queries/tasks_queries");
const { getUserById } = require("../db/queries/users_queries");
const db = require("../db/connection");
const { getTaskFromBook, getBook } = require("../api/book-api");
const { getTaskFromEat, getEat } = require("../api/eats-api");
const { getTaskFromProduct, getProduct } = require("../api/buy-api");
const { getTaskFromMovie, getMovie } = require("../api/movie-api");
const { categorizeSearchQuery } = require("../api/classify-api");
const { TASK_CATEGORIES } = require("../api/constants");
const router = express.Router();

router.post("/", async(req, res) => {
  const taskName = req.body.task_name;
  const userId = req.session.user_id;
  const category = await categorizeSearchQuery(taskName);
  let task = null;
  switch (category) {
  case TASK_CATEGORIES.MOVIES:
    task = getTaskFromMovie(taskName, userId, getMovie(taskName));
    break;
  case TASK_CATEGORIES.BOOKS:
    task = getTaskFromBook(taskName, userId, getBook(taskName));
    break;
  case TASK_CATEGORIES.EATS:
    task = getTaskFromEat(taskName, userId, getEat(taskName));
    break;
  case TASK_CATEGORIES.PRODUCTS:
    task = getTaskFromProduct(taskName, userId, getProduct(taskName));
    break;
  }
  if (task) {
    const newRecord = await addTask(task);
    console.log(newRecord);
    res.json(newRecord);
  }
});

router.get("/", (req, res) => {
  let apiTasks;
  getUserById(req.session.user_id).then((user) => {
    let userEmail = user[0].email;
    res.locals.user = {
      email: userEmail,
    };
    request(
      "http://localhost:8080/api/tasks",
      function (error, response, body) {
        apiTasks = JSON.parse(body);
        const templateVars = {
          user_id: req.session.user_id,
          tasks: apiTasks.tasks,
        };
        res.render("tasks", templateVars);
      }
    );
  });
});

router.get("/:id", (req, res) => {
  const query = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
  console.log(query);

  db.query(query)
    .then((data) => {
      const tasks = data.rows;
      console.log(tasks);
      const templateVars = {
        user_id: req.session.user_id,
        task: tasks,
      };
      res.render("task-view", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/:id", (req, res) => {
  const newCategory = { category: req.body.changedCategory, userId: req.session.user_id, taskId: req.params.id };

  editTask(newCategory);

  res.redirect(`/tasks/${req.params.id}`);
});

// For this route we delete the value of req.params
router.post("/delete/:id", (req, res) => {
  const userId = req.session.user_id;
  const taskId = req.params.id;

  deleteTask(userId, taskId);

  res.redirect(`/tasks`)
});


// Sample Amazon API response:
// {
//   status: 'fulfilled',
//   value: {
//     position: 1,
//     title: 'The Art of Avatar The Way of Water',
//     asin: '0744028736',
//     link: 'https://www.amazon.ca/Art-Avatar-Way-Water/dp/0744028736/ref=sr_1_1?keywords=Avatar%3A+The+Way+of+Water&qid=1673454265&sr=8-1',
//     categories: [ [Object] ],
//     image: 'https://m.media-amazon.com/images/I/91W-FLAS23L._AC_UL320_.jpg',
//     authors: [ [Object] ],
//     other_formats: [ [Object] ],
//     is_prime: true,
//     rating: 4.4,
//     ratings_total: 52,
//     prices: [ [Object] ],
//     price: {
//       symbol: '$',
//       value: 66,
//       currency: 'CAD',
//       raw: '$66.00',
//       name: 'Hardcover',
//       asin: '0744028736',
//       link: 'https://www.amazon.ca/Art-Avatar-Way-Water/dp/0744028736/ref=sr_1_1?keywords=Avatar%3A+The+Way+of+Water&qid=1673454265&sr=8-1'
//     }
//   }
// }

// Sample Yelp API response
// {
//   status: 'fulfilled',
//   value: {
//     id: 'W4HKHNIsOEaTwFV3Ct1JsA',
//     alias: 'guelph-glass-guelph',
//     name: 'Guelph Glass',
//     image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/JitBsnsG-sRVmiqHOL29AQ/o.jpg',
//     is_closed: false,
//     url: 'https://www.yelp.com/biz/guelph-glass-guelph?adjust_creative=2OEEvwxebiFdCtxg7BhWlQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2OEEvwxebiFdCtxg7BhWlQ',
//     review_count: 2,
//     categories: [ [Object], [Object] ],
//     rating: 5,
//     coordinates: { latitude: 43.53093, longitude: -80.2488 },
//     transactions: [],
//     location: {
//       address1: '226 Edinburgh Road S',
//       address2: '',
//       address3: '',
//       city: 'Guelph',
//       zip_code: 'N1G 2J4',
//       country: 'CA',
//       state: 'ON',
//       display_address: [Array]
//     },
//     phone: '+15198224940',
//     display_phone: '+1 519-822-4940',
//     distance: 780.3713735449161
//   }
// }

// Sample Google Books API response
// {
//   status: 'fulfilled',
//   value: {
//     kind: 'books#volume',
//     id: '9f6MEAAAQBAJ',
//     etag: 'sY/13RSLnlQ',
//     selfLink: 'https://www.googleapis.com/books/v1/volumes/9f6MEAAAQBAJ',
//     volumeInfo: {
//       title: 'Forrest Gump',
//       authors: [Array],
//       publisher: 'National Geographic Books',
//       publishedDate: '2012-02-21',
//       description: 'The modern classic that inspired the beloved movie starring Tom Hanks. Six foot six, 242 pounds, and possessed of a scant IQ of 70, Forrest Gump is the lovable, surprisingly savvy hero of this classic comic tale. His early life may seem inauspicious, but when the University of Alabama’s football team drafts Forrest and makes him a star, it sets him on an unbelievable path that will transform him from Vietnam hero to world-class Ping-Pong player, from wrestler to entrepreneur. With a voice all his own, Forrest is telling all in a madcap romp through three decades of American history.',
//       industryIdentifiers: [Array],
//       readingModes: [Object],
//       pageCount: 0,
//       printType: 'BOOK',
//       categories: [Array],
//       averageRating: 3,
//       ratingsCount: 33,
//       maturityRating: 'NOT_MATURE',
//       allowAnonLogging: false,
//       contentVersion: 'preview-1.0.0',
//       panelizationSummary: [Object],
//       imageLinks: [Object],
//       language: 'en',
//       previewLink: 'http://books.google.ca/books?id=9f6MEAAAQBAJ&dq=intitle:Forrest+Gump&hl=&cd=1&source=gbs_api',
//       infoLink: 'http://books.google.ca/books?id=9f6MEAAAQBAJ&dq=intitle:Forrest+Gump&hl=&source=gbs_api',
//       canonicalVolumeLink: 'https://books.google.com/books/about/Forrest_Gump.html?hl=&id=9f6MEAAAQBAJ'
//     },
//     saleInfo: { country: 'CA', saleability: 'NOT_FOR_SALE', isEbook: false },
//     accessInfo: {
//       country: 'CA',
//       viewability: 'NO_PAGES',
//       embeddable: false,
//       publicDomain: false,
//       textToSpeechPermission: 'ALLOWED',
//       epub: [Object],
//       pdf: [Object],
//       webReaderLink: 'http://play.google.com/books/reader?id=9f6MEAAAQBAJ&hl=&source=gbs_api',
//       accessViewStatus: 'NONE',
//       quoteSharingAllowed: false
//     },
//     searchInfo: {
//       textSnippet: 'The modern classic that inspired the beloved movie starring Tom Hanks. Six foot six, 242 pounds, and possessed of a scant IQ of 70, Forrest Gump is the lovable, surprisingly savvy hero of this classic comic tale.'
//     }
//   }
// }

// Sample OMDb API response
// {
//   status: 'fulfilled',
//   value: {
//     Title: 'Avatar: The Way of Water',
//     Year: '2022',
//     Rated: 'PG-13',
//     Released: '16 Dec 2022',
//     Runtime: '192 min',
//     Genre: 'Action, Adventure, Fantasy',
//     Director: 'James Cameron',
//     Writer: 'James Cameron, Rick Jaffa, Amanda Silver',
//     Actors: 'Sam Worthington, Zoe Saldana, Sigourney Weaver',
//     Plot: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
//     Language: 'English',
//     Country: 'United States',
//     Awards: '12 wins & 45 nominations',
//     Poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
//     Ratings: [ [Object], [Object], [Object] ],
//     Metascore: '67',
//     imdbRating: '7.9',
//     imdbVotes: '167,554',
//     imdbID: 'tt1630029',
//     Type: 'movie',
//     DVD: 'N/A',
//     BoxOffice: 'N/A',
//     Production: 'N/A',
//     Website: 'N/A',
//     Response: 'True'
//   }
// }

module.exports = router;
