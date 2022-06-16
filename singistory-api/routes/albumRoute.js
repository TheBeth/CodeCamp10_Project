const express = require('express');
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload');
const albumController = require('../controllers/albumController')

const router = express.Router();

router.get('/:id', authenticate, albumController.getAlbum);
router.post('/', authenticate, upload.single('coverImg'), albumController.createAlbum);
router.patch('/edit-album/:id',upload.single('coverImg'),authenticate, albumController.editAlbum);
router.delete('/:id',authenticate,albumController.deleteAlbum)

module.exports = router;