var express = require('express');
const alumniController = require('../controllers/alumniController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();


router.post('/register', alumniController.register);

router.get('/login', alumniController.login);

router.use(authenticate);

router.get('/profile', authorize(3), alumniController.getProfile);
router.patch('/profile', authorize(4), alumniController.editProfile);

module.exports = router;