const express = require('express');
const authenticate = require('../middlewares/authenticate');
const awardController = require('../controllers/awardController');

const router = express.Router();

router.post('/', authenticate, awardController.createAward);
router.delete('/:id', authenticate, awardController.deleteAward);

module.exports = router;