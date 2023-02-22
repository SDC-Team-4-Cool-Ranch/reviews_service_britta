const model = require('./model.js')
const express = require('express')
// import Redis from 'ioredis';
// const redis = new Redis({
//   'port': 6379,
//   'host': 'localhost',
// })

// let cacheEntry = await redis.get(`'product':${req.query.product_id}`)
// if (cacheEntry) {
//   cacheEntry = JSON.parse(cacheEntry);
//   return {..cacheEntry, 'source':'cache'}
// }
// return {...dbResponse.data, 'source': 'db'}


module.exports = {
  getAllReviews: (req, res) => {
    let page = req.query.page || 0;
    let count = req.query.count || 5;
    model.getAll(req.query.product_id, count, page)
      .then((data) => res.status(200).send(data.rows[0].json_build_object))
      .catch((err) => console.log(err))
  },

  postReview: (req, res) => {
    console.log('query:', req.query)
    console.log('body: ', req.body)
    model.postOne(req.query.product_id, req.body)
      .then(() => {
        console.log('review posted');
        res.sendStatus(200);
      })
      .catch((err) => {console.log(err)})
  },

  setHelpful:  (req, res) => {
    model.putHelpful(req.params.review_id)
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err))
  },

  report:  (req, res) => {
    model.putReported(req.params.review_id)
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err))
  }
}
