require("dotenv").config();
const jwt = require('jsonwebtoken');

// Authorization Middleware to check for an authorized token generated when signing up or logging in
module.exports = function (req, res, next) {
    const token = req.header('ritadelToken');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token.');
    }
};

