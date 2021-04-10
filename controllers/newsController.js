const News = require('../models/newsModel');

exports.createNews = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var news = await News.findOne({ title: req.body.title });
    if (news) {
        return res.status(409).json({ message: "Please use a different title." });
    }

    req.body.publishedBy = {
        userId: req.user._id,
        userType: req.userType.charAt(0).toUpperCase() + req.userType.slice(1),
    }

    News.create(req.body, function (err, news) {
        if (err) return res.status(500).json(err);

        res.status(200).json(news);
    })
};

exports.getNewsDetails = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Bad Request" });
    }

    News.findById(req.params.id, async function (err, news) {
        if (err) return res.status(500).json(err);
        if (!news) return res.status(404).json({ message: "News not found." });

        if (req.user.authLevel < 5) {
            news.publishedBy = undefined;
            res.status(500).json(news);
        } else {
            if (req.userType === 'admin' || req.userType === 'faculty') {
                await news.populate('publishedBy.userId', 'name email').execPopulate();
                res.status(200).json(news);
            }
        }
    })
};

exports.updateNewsDetails = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Bad Request" });
    }

    News.findByIdAndUpdate(req.params.id, req.body, { new: true }, async function (err, news) {
        if (err) return res.status(500).json(err);
        if (!news) return res.status(404).json({ message: "News not found." });

        await news.populate('publishedBy.userId', 'name email').execPopulate();
        res.status(200).json(news);
    })
};

exports.deleteNews = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Bad Request" });
    }

    News.findByIdAndDelete(req.params.id, function (err, news) {
        if (err) return res.status(500).json(err);
        if (!news) return res.status(404).json({ message: "News not found." });

        news.publishedBy = undefined;
        res.status(200).json(news);
    })
};

exports.getTopThreeNews = async (req, res) => {
    News.find({}, 'title publishedOn', { limit: 3, sort: '-publishedOn' }, function (err, news) {
        if (err) res.status(500).json(err);
        else res.status(200).json(news);
    })
};

exports.getAllNews = async (req, res) => {
    var page = (!req.query.page) ? 0 : req.query.page - 1;
    News.find({}, 'title publishedOn', { sort: '-publishedOn', skip: page * 10, limit: (page * 10) + 9 }, function (err, news) {
        if (err) res.status(500).json(err);
        else res.status(200).json(news);
    })
};