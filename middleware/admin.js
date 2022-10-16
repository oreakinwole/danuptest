// To check if user is an Admin User

module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Unauthorized access');

    next();
}