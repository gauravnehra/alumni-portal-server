var express = require('express');
const alumniController = require('../controllers/alumniController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();


router.post('/register', alumniController.register);

router.post('/login', alumniController.login);

router.use(authenticate);

router.get('/', authorize([4, 6]), alumniController.getProfile);
router.patch('/', authorize([4]), alumniController.editProfile);

router.get('/profile/:email', alumniController.getPublicProfile);

module.exports = router;