const router = require('express').Router();
const controller = require('./controller.js');

router.get('/reviews', controller.getAllReviews);

module.exports = router