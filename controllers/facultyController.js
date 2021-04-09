const Faculty = require('../models/facultyModel');
const AuthToken = require('../models/authTokenModel');
const authTokenHelper = require('../helpers/authTokenHelper');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var faculty = await Faculty.findOne({ email: req.body.email });
    if (faculty) {
        return res.status(409).json({ message: "Account already exists with this email." });
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) console.log('error with bcrpt\n***\n' + err);

        req.body.password = hash;

        Faculty.create(req.body, function (err, faculty) {
            if (err) return res.status(500).json(err);

            const newAuthToken = authTokenHelper.generateAuthToken(faculty.email);

            AuthToken.create({ token: newAuthToken, userId: faculty._id, userType: 'faculty' }, function (err, token) {
                if (err) return res.status(500).json(err);

                res.cookie('authToken', newAuthToken);
                faculty._id = undefined;
                faculty.password = undefined;
                faculty.authLevel = undefined;
                faculty.emailVerified = undefined;
                faculty.detailsVerified = undefined;
                res.status(200).json(faculty);
            })
        })
    });
};

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var faculty = await Faculty.findOne({ email: req.body.email });
    if (!faculty) {
        return res.status(401).json({ message: "Email or password invalid." });
    }

    bcrypt.compare(req.body.password, faculty.password, async function (err, result) {
        if (result) {
            var authToken = await AuthToken.findOne({ userId: faculty._id });
            if (authToken) {
                const newAuthToken = authTokenHelper.generateAuthToken(faculty.email);

                authToken.token = newAuthToken;
                await authToken.save();

                res.cookie('authToken', newAuthToken);
                faculty._id = undefined;
                faculty.password = undefined;
                faculty.authLevel = undefined;
                faculty.emailVerified = undefined;
                faculty.detailsVerified = undefined;
                res.status(200).json(faculty);
            } else {
                const newAuthToken = authTokenHelper.generateAuthToken(faculty.email);

                AuthToken.create({ token: newAuthToken, userId: faculty._id, userType: 'faculty' }, function (err, token) {
                    if (err) return res.status(500).json(err);

                    res.cookie('authToken', newAuthToken);
                    faculty._id = undefined;
                    faculty.password = undefined;
                    faculty.authLevel = undefined;
                    faculty.emailVerified = undefined;
                    faculty.detailsVerified = undefined;
                    res.status(200).json(faculty);
                })
            }
        } else {
            res.status(401).json({ message: "Email or password invalid." });
        }
    })
};

exports.getProfile = async (req, res) => {
    Faculty.findOne({ email: req.user.email }, 'name email department gender mobile emailVerified detailsVerified', function (err, faculty) {
        if (err) res.status(500).json(err);
        else {
            faculty._id = undefined;
            res.status(200).json(faculty);
        }
    })
};

exports.editProfile = async (req, res) => {
    Faculty.findOneAndUpdate({ email: req.user.email }, req.body, { new: true }, function (err, faculty) {
        if (err) res.status(500).json(err);
        else {
            faculty._id = undefined;
            faculty.password = undefined;
            faculty.authLevel = undefined;
            faculty.emailVerified = undefined;
            faculty.detailsVerified = undefined;
            res.status(200).json(faculty);
        }
    })
};

exports.getPublicProfile = async (req, res) => {
    if (!req.params.email) {
        return res.status(400).json({ message: "Bad Request" });
    }
    Faculty.findOne({ email: req.params.email }, 'name email department gender mobile', function (err, faculty) {
        if (err) res.status(500).json(err);
        else if (faculty) {
            faculty._id = undefined;
            res.status(200).json(faculty);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    })
};