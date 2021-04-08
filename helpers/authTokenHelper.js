const jwt = require('jsonwebtoken');

function generateAuthToken(email) {
    var token = jwt.sign({ email: email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '168h' });

    return token;
}

function verifyAuthToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return decoded;
    } catch (err) {
        return 0;
    }
}

exports.generateAuthToken = generateAuthToken;
exports.verifyAuthToken = verifyAuthToken;