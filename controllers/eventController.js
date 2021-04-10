const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    req.body.from = Date();
    req.body.to = Date();
    if (!req.body.title || !req.body.location || !req.body.from || !req.body.to) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var event = await Event.findOne({ title: req.body.title });
    if (event) {
        return res.status(409).json({ message: "Please use a different title." });
    }

    req.body.createdBy = {
        userId: req.user._id,
        userType: req.userType.charAt(0).toUpperCase() + req.userType.slice(1),
    }

    Event.create(req.body, function (err, event) {
        if (err) return res.status(500).json(err);

        res.status(200).json(event);
    })
};

exports.getEventDetails = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Bad Request" });
    }

    Event.findById(req.params.id, async function (err, event) {
        if (err) return res.status(500).json(err);
        if (!event) return res.status(404).json({ message: "Event not found." });

        if (req.user.authLevel < 5) {
            event.createdBy = undefined;
            res.status(500).json(event);
        } else {
            if (req.userType === 'admin' || req.userType === 'faculty') {
                await event.populate('createdBy.userId', 'name email').execPopulate();
                res.status(200).json(event);
            }
        }
    })
};

exports.updateEventDetails = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Bad Request" });
    }

    Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, async function (err, event) {
        if (err) return res.status(500).json(err);
        if (!event) return res.status(404).json({ message: "Event not found." });

        await event.populate('createdBy.userId', 'name email').execPopulate();
        res.status(200).json(event);
    })
};

exports.deleteEvent = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Bad Request" });
    }

    Event.findByIdAndDelete(req.params.id, function (err, event) {
        if (err) return res.status(500).json(err);
        if (!event) return res.status(404).json({ message: "Event not found." });

        event.createdBy = undefined;
        res.status(200).json(event);
    })
};

exports.getTopThreeEvents = async (req, res) => {
    Event.find({}, 'title location from to', { limit: 3, sort: 'from' }, function (err, events) {
        if (err) res.status(500).json(err);
        else res.status(200).json(events);
    })
};

exports.getAllEvents = async (req, res) => {
    var page = (!req.query.page) ? 0 : req.query.page - 1;
    Event.find({}, 'title location from to', { sort: 'from', skip: page * 10, limit: (page * 10) + 9 }, function (err, events) {
        if (err) res.status(500).json(err);
        else res.status(200).json(events);
    })
};