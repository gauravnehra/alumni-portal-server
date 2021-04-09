const Alumni = require('../models/alumniModel');
const AuthToken = require('../models/authTokenModel');
const authTokenHelper = require('../helpers/authTokenHelper');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var alumni = await Alumni.findOne({ email: req.body.email });
    if (alumni) {
        return res.status(409).json({ message: "Account already exists with this email." });
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) console.log('error with bcrpt\n***\n' + err);

        req.body.password = hash;

        Alumni.create(req.body, function (err, alumni) {
            if (err) return res.status(500).json(err);

            const newAuthToken = authTokenHelper.generateAuthToken(alumni.email);

            AuthToken.create({ token: newAuthToken, userId: alumni._id, userType: 'alumni' }, function (err, token) {
                if (err) return res.status(500).json(err);

                res.cookie('authToken', newAuthToken);
                alumni._id = undefined;
                alumni.password = undefined;
                alumni.authLevel = undefined;
                alumni.emailVerified = undefined;
                alumni.detailsVerified = undefined;
                res.status(200).json(alumni);
            })
        })
    });
};

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var alumni = await Alumni.findOne({ email: req.body.email });
    if (!alumni) {
        return res.status(401).json({ message: "Email or password invalid." });
    }

    bcrypt.compare(req.body.password, alumni.password, async function (err, result) {
        if (result) {
            var authToken = await AuthToken.findOne({ userId: alumni._id });
            if (authToken) {
                const newAuthToken = authTokenHelper.generateAuthToken(alumni.email);

                authToken.token = newAuthToken;
                await authToken.save();

                res.cookie('authToken', newAuthToken);
                alumni._id = undefined;
                alumni.password = undefined;
                alumni.authLevel = undefined;
                alumni.emailVerified = undefined;
                alumni.detailsVerified = undefined;
                res.status(200).json(alumni);
            } else {
                const newAuthToken = authTokenHelper.generateAuthToken(alumni.email);

                AuthToken.create({ token: newAuthToken, userId: alumni._id, userType: 'alumni' }, function (err, token) {
                    if (err) return res.status(500).json(err);

                    res.cookie('authToken', newAuthToken);
                    alumni._id = undefined;
                    alumni.password = undefined;
                    alumni.authLevel = undefined;
                    alumni.emailVerified = undefined;
                    alumni.detailsVerified = undefined;
                    res.status(200).json(alumni);
                })
            }
        } else {
            res.status(401).json({ message: "Email or password invalid." });
        }
    })
};

exports.getProfile = async (req, res) => {
    Alumni.findOne({ email: req.user.email }, 'name email graduatedIn gender mobile currentJob emailVerified detailsVerified', function (err, alumni) {
        if (err) res.status(500).json(err);
        else {
            alumni._id = undefined;
            res.status(200).json(alumni);
        }
    })
};

exports.editProfile = async (req, res) => {
    Alumni.findOneAndUpdate({ email: req.user.email }, req.body, { new: true }, function (err, alumni) {
        if (err) res.status(500).json(err);
        else {
            alumni._id = undefined;
            alumni.password = undefined;
            alumni.authLevel = undefined;
            alumni.emailVerified = undefined;
            alumni.detailsVerified = undefined;
            res.status(200).json(alumni);
        }
    })
};

exports.getPublicProfile = async (req, res) => {
    if (!req.params.email) {
        return res.status(400).json({ message: "Bad Request" });
    }
    Alumni.findOne({ email: req.params.email }, 'name email graduatedIn gender mobile currentJob', function (err, alumni) {
        if (err) res.status(500).json(err);
        else if (alumni) {
            alumni._id = undefined;
            res.status(200).json(alumni);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    })
};