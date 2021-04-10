const AuthToken = require('../models/authTokenModel');
const Alumni = require('../models/alumniModel');
const Faculty = require('../models/facultyModel');
const Admin = require('../models/adminModel');
const authTokenHelper = require('../helpers/authTokenHelper');

module.exports = async function (req, res, next) {
    const authToken = req.cookies.authToken;
    if (!authToken) {
        // 401 : Unauthorized
        return res.status(401).json({ msg: "Login or Register" });
    }

    var decodedToken = await authTokenHelper.verifyAuthToken(authToken);
    if (decodedToken === 0) {
        return res.status(403).json({ message: "Invalid Token" });
    }

    // find token in database with same token and decoded email
    AuthToken.findOne({ token: authToken, status: 'active' }, function (err, tempAuthToken) {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        } else {
            if (tempAuthToken.userType === 'alumni') {
                Alumni.findById(tempAuthToken.userId, 'name email authLevel', function (err, alumni) {
                    if (err) {
                        return res.status(403).json({ message: "Invalid Token" });
                    } else {
                        req.user = alumni;
                        req.userType = 'alumni';
                        next();
                    }
                })
            } else if (tempAuthToken.userType === 'faculty') {
                Faculty.findById(tempAuthToken.userId, 'name email authLevel', function (err, faculty) {
                    if (err) {
                        return res.status(403).json({ message: "Invalid Token" });
                    } else {
                        req.user = faculty;
                        req.userType = 'faculty';
                        next();
                    }
                })
            } else if (tempAuthToken.userType === 'admin') {
                Admin.findById(tempAuthToken.userId, 'name email authLevel', function (err, admin) {
                    if (err) {
                        return res.status(403).json({ message: "Invalid Token" });
                    } else {
                        req.user = admin;
                        req.userType = 'admin';
                        next();
                    }
                })
            }
        }
    })
};