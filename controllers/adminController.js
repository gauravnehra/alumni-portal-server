const Admin = require('../models/adminModel');
const AuthToken = require('../models/authTokenModel');
const authTokenHelper = require('../helpers/authTokenHelper');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
        return res.status(409).json({ message: "Account already exists with this email." });
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) console.log('error with bcrpt\n***\n' + err);

        req.body.password = hash;

        Admin.create(req.body, function (err, admin) {
            if (err) return res.status(500).json(err);

            const newAuthToken = authTokenHelper.generateAuthToken(admin.email);

            AuthToken.create({ token: newAuthToken, userId: admin._id, userType: 'admin' }, function (err, token) {
                if (err) return res.status(500).json(err);

                res.cookie('authToken', newAuthToken);
                admin._id = undefined;
                admin.password = undefined;
                admin.authLevel = undefined;
                admin.emailVerified = undefined;
                res.status(200).json(admin);
            })
        })
    });
};

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    var admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
        return res.status(401).json({ message: "Email or password invalid." });
    }

    bcrypt.compare(req.body.password, admin.password, async function (err, result) {
        if (result) {
            var authToken = await AuthToken.findOne({ userId: admin._id });
            if (authToken) {
                const newAuthToken = authTokenHelper.generateAuthToken(admin.email);

                authToken.token = newAuthToken;
                await authToken.save();

                res.cookie('authToken', newAuthToken);
                res.status(200).json(admin);
            } else {
                const newAuthToken = authTokenHelper.generateAuthToken(admin.email);

                AuthToken.create({ token: newAuthToken, userId: admin._id, userType: 'admin' }, function (err, token) {
                    if (err) return res.status(500).json(err);

                    res.cookie('authToken', newAuthToken);
                    admin._id = undefined;
                    admin.password = undefined;
                    admin.authLevel = undefined;
                    admin.emailVerified = undefined;
                    res.status(200).json(admin);
                })
            }
        } else {
            res.status(401).json({ message: "Email or password invalid." });
        }
    })
};

exports.getProfile = async (req, res) => {
    Admin.findOne({ email: req.user.email }, 'name email emailVerified', function (err, admin) {
        if (err) res.status(500).json(err);
        else {
            admin._id = undefined;
            res.status(200).json(admin);
        }
    })
};

exports.editProfile = async (req, res) => {
    Admin.findOneAndUpdate({ email: req.user.email }, req.body, { new: true }, function (err, admin) {
        if (err) res.status(500).json(err);
        else {
            admin._id = undefined;
            admin.password = undefined;
            admin.authLevel = undefined;
            admin.emailVerified = undefined;
            res.status(200).json(admin);
        }
    })
};