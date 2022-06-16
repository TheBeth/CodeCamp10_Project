const express = require('express');
const singerController = require('../controllers/singerController')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/searchName',authenticate,singerController.searchSinger);
router.get('/:id', authenticate, singerController.getSingerDetail);
router.get('/',authenticate, singerController.getAllSinger);
router.post('/', authenticate, upload.single('singerImg'), singerController.createSinger);
router.patch('/:id', authenticate, singerController.editSinger);
router.delete('/:id', authenticate, singerController.deleteSinger);

module.exports = router;