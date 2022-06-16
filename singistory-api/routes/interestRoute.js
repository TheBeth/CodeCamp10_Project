const express = require('express');
const authenticate = require('../middlewares/authenticate');
const interestController = require('../controllers/interestController');

const router = express.Router();


router.get('/:id', authenticate, interestController.getInterestByEventId);
router.post('/', authenticate, interestController.createInterest);
router.delete('/:id', authenticate, interestController.deleteInterest);

module.exports = router;