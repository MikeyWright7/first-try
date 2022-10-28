const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    var errors = [];
    // Check for Token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add User from payload
    req.user = decoded;
    next();
    } catch(e) {
        res.status(401).json({msg: 'Token Not Valid'})
    }
}


module.exports = auth;