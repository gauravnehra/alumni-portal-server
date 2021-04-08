var express = require('express');
var alumniController = require('../controllers/alumniController');
var router = express.Router();


router.post('/register', alumniController.register);

router.get('/login', alumniController.login);

router.use(require('../middlewares/authMiddleware'));
module.exports = router;
