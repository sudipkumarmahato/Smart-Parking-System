const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretToken = process.env.TOKEN_KEY;

const generateToken = (id) => {
    return jwt.sign({ id }, secretToken, {
        expiresIn: process.env.EXPIRES ?? '12h',
    });
};

module.exports = {
    generateToken,
};