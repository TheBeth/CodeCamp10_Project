const express = require('express');
const authenticate = require('../middlewares/authenticate');
const eventController = require('../controllers/eventController');
const upload = require('../middlewares/upload')

const router = express.Router();

router.get('/:id', authenticate, eventController.getEvent);
router.get('/', authenticate, eventController.getAllEvent);
router.post('/', authenticate, upload.single('posterImg'), eventController.createEvent);
router.delete('/:id', authenticate, eventController.deleteEvent);

module.exports = router;