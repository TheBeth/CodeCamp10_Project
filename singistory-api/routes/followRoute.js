const express = require('express');
const authenticate = require('../middlewares/authenticate');
const followController = require('../controllers/followController');

const router = express.Router();

router.get('/:id', authenticate, followController.getFollowBySingerId)
router.post('/', authenticate, followController.createLike);
router.delete('/:id', authenticate, followController.deleteFollow);

module.exports = router;