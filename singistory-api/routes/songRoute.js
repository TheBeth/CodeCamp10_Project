const express = require('express');
const authenticate = require('../middlewares/authenticate');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/',authenticate,songController.searchSong);
router.post('/', authenticate, songController.createSong);
router.delete('/:id', authenticate, songController.deleteSong);

module.exports = router;