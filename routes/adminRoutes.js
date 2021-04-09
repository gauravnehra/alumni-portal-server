var express = require('express');
const adminController = require('../controllers/adminController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();

router.post('/register', adminController.register);

router.post('/login', adminController.login);

router.use(authenticate);

router.get('/', authorize(6), adminController.getProfile);
router.patch('/', authorize(6), adminController.editProfile);

module.exports = router;
