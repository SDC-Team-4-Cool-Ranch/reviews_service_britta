const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [{
    id: 'id', title: 'id'
  }, {
    id: 'product_id', title: 'product_id'
  }, {
    id: 'rating', title: 'rating'
  }, {
    id: 'date', title: 'date'
  }, {
    id: 'summary', title: 'summary'
  }, {
    id: 'body', title: 'body'
  }, {
    id: 'recommended', title: 'recommended'
  }, {
    id: 'reported', title: 'reported'
  }, {
    id: 'reviewer_name', title: 'reviewer_name'
  }, {
    id: 'reviewer_email', title: 'reviewer_email'
  }, {
    id: 'url', title: 'response'
  }, {
    id: 'url', title: 'helpfulness'
  }]
});

let readStream = fs.createReadStream("server/data/reviews.csv");
let writeStream = fs.createWriteStream("server/data/cleanReviews.csv");
