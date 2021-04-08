module.exports = function (role) {
    return (req, res, next) => {
        if (role > req.user.authLevel) {
            return res.status(403).json({ message: "Action not permitted for user." });
        } else {
            console.log('role: ' + role);
            next()
        }
    }
};