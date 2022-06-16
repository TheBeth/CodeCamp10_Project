const express = require('express');
const postController = require('../controllers/postController')
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/one-post/:id',authenticate,postController.getOnePost);
router.get('/',authenticate,postController.getAllPost)
router.get('/:singerId', authenticate, postController.getPost);
router.post('/', authenticate, upload.single('img'), postController.createPost);
router.delete('/:id', authenticate, postController.deletePost)

module.exports = router;