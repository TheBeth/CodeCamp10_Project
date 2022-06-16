const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/me',authenticate, userController.getme);
router.get('/',authenticate,userController.getUser);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch(
    '/profile-img',
    authenticate,
    upload.single('profileImg'),
    userController.updateProfileImg
);
router.patch('/update-profile',authenticate,userController.editProfile);
router.patch('/change-password', authenticate, userController.changePassword);
router.delete('/',authenticate, userController.deleteUser)

module.exports = router;