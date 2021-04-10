var express = require('express');
const newsController = require('../controllers/newsController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();


router.get('/top-3', newsController.getTopThreeNews);

router.get('/all', newsController.getAllNews);

router.use(authenticate);

router.post('/', authorize([5, 6]), newsController.createNews);

router.get('/:id', newsController.getNewsDetails);
router.patch('/:id', authorize([5, 6]), newsController.updateNewsDetails);
router.delete('/:id', authorize([5, 6]), newsController.deleteNews);
// role level 6

module.exports = router;
