const express = require('express');
const authenticate = require('../middlewares/authenticate');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.get('/:genreType', authenticate,genreController.getGenre);
router.post('/', authenticate, genreController.createGenre);
router.delete('/:id',authenticate, genreController.deleteGenre);

module.exports = router;