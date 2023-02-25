const model = require('./model.js')
const express = require('express')
const Redis = require('ioredis');
const { promisify } = require('util');
const { HOST, RDPORT } = process.env;

const redis = new Redis({
  host: HOST,
  port: RDPORT,
})


module.exports = {
  getAllReviews: async (req, res) => {
    let page = req.query.page || 0;
    let count = req.query.count || 5;
    const getEntry = promisify(redis.get).bind(redis);
    let cacheEntry = await getEntry(`'product':${req.query.product_id}`)
    if (cacheEntry) {
      console.log('accessing cache')
      cacheEntry = JSON.parse(cacheEntry);
      return res.status(200).send(cacheEntry);
    }
    model.getAll(req.query.product_id, count, page)
      .then(async (data) => {
        await redis.setex(`'product':${req.query.product_id}`,60, JSON.stringify(data.rows[0].json_build_object))
        res.status(200).send(data.rows[0].json_build_object)
      })

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
