var express = require('express');
const eventController = require('../controllers/eventController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
var router = express.Router();

router.get('/top-3', eventController.getTopThreeEvents);

router.get('/all', eventController.getAllEvents);

router.use(authenticate);

router.post('/', authorize([5, 6]), eventController.createEvent);

router.get('/:id', eventController.getEventDetails);
router.patch('/:id', authorize([5, 6]), eventController.updateEventDetails);
router.delete('/:id', authorize([5, 6]), eventController.deleteEvent);

module.exports = router;
