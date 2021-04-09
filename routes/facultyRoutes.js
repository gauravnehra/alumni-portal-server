var express = require('express');
const facultyController = require('../controllers/facultyController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();

router.post('/register', facultyController.register);

router.post('/login', facultyController.login);

router.use(authenticate);

router.get('/', authorize(5), facultyController.getProfile);
router.patch('/', authorize(5), facultyController.editProfile);

router.get('/profile/:email', authorize(3), facultyController.getPublicProfile);

module.exports = router;
