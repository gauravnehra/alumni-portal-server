var express = require('express');
const facultyController = require('../controllers/facultyController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();

router.post('/register', facultyController.register);

router.post('/login', facultyController.login);

router.use(authenticate);

router.get('/', authorize([4, 6]), facultyController.getProfile);
router.patch('/', authorize([4]), facultyController.editProfile);

router.get('/profile/:email', facultyController.getPublicProfile);

module.exports = router;
