// const model = require('./model.js')
const express = require('express')

module.exports = {
  getAllReviews: (req, res) => {
    console.log(req.query.product_id)
    // res.status(200)
    // res.end()
    // model.query(req.query.product_id, (err, data) => {
    //   if (err) {
    //     res.status(500)
    //     res.end()
    //   } else {
    //     res.write(data)
    //     res.status(200)
    //     res.end()
    //   }
    // })
      // .then((results) => {
      //   console.log(results)
      //   if (results[0].length > 0) {
      //     res.status(200).send(results[0]);
      //   } else {
      //     res.sendStatus(400);
      //   }
      // })
      // .catch((err) => console.log(err));
  }
}