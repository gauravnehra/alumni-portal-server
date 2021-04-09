module.exports = function (allowedRoles) {
    return (req, res, next) => {
        if (allowedRoles.indexOf(req.user.authLevel) != -1) {
            console.log('role: ' + req.user.authLevel);
            next()
        } else {
            return res.status(403).json({ message: "Action not permitted for user." });
        }
    }
};