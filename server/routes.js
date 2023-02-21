const router = require('express').Router();
const controller = require('./controller.js');

router.get('/reviews/:page?:count?', controller.getAllReviews);
router.post('/reviews', controller.postReview);


// router.get('/reviews/meta', controller.getOneMeta);
router.put('/reviews/:review_id/helpful', controller.setHelpful);
router.put('/reviews/:review_id/report', controller.report);

module.exports = router;