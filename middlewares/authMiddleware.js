const AuthToken = require("../models/authTokenModel");

module.exports = async function (req, res, next) {
    const authToken = req.headers["auth-token"];
    if (!authToken) {
        // 401 : Unauthorized
        return res.status(401).send({ msg: "Login or Register" });
    }

    // verify if jwt is valid or not

    var tempAuthToken = await AuthToken.findById(authToken);
    if (!tempAuthToken) {
        // 403 : Forbidden
        return res.status(403).send({ msg: "Invalid token" });
    }

    req.token = token;
    req.userId = tempAuthToken.userId;

    next();
};