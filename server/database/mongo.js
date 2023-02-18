const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher'); // if you don't give port, goes to 27019

// lines 5 - 9 are not in the solution video ??
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connected')
});

const product_id = ObjectId()

let reviewsSchema = mongoose.Schema({
  product_id: product_id,
  page: Number,
  count: Number,
  reviews: [
    {
      review_id: {type: Number, unique: true},
      rating: Number,
      summary: String,
      recommended: Boolean,
      response: String,
      body: String,
      date: Date,
      reviewer_name: String,
      helpfulness: Number,
      photos: [
        {
          id: {type: Number, unique: true},
          url: String,
        }
      ]
    }
  ]
});

let ratingsSchema = mongoose.Schema({
  product_id: product_id,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
  },
  recommended: {
    false: Number,
    true: Number,
  },
  characteristics: {
    size: {
      id: Number,
      value: Number,
    },
    width: {
      id: Number,
      value: Number,
    },
    comfort: {
      id: Number,
      value: Number,
    },
    fit: {
      id: Number,
      value: Number,
    },
    length: {
      id: Number,
      value: Number,
    },
    quality: {
      id: Number,
      value: Number,
    },
  }
});