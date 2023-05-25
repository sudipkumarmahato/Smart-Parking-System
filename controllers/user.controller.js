const sanitize = require('mongo-sanitize');
const User = require('../models/user.model.js');
const { generateToken } = require('../utils/ganerateToken.js');
const {
    validateEmail,
    validateUsername,
    validatePassword,
} = require('../utils/validation');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res, next) => {
    try {
        const email = sanitize(req.body.email).trim();
        const username = sanitize(req.body.username).trim();
        const password = sanitize(req.body.password).trim();

        if (!email || !username || !password)
            return res.status(400).json({ message: 'Please enter all fields! ' });

        if (await User.findOne({ email }))
            return res.status(403).json({
                message: 'Email is already taken ! Try using another.',
            });

        if (username.length <= 8 || username.length > 15)
            return res
                .status(400)
                .json({ message: "Username's character must be between 8 and 15 !" });

        if (!validateUsername(username))
            return res
                .status(400)
                .json({ message: 'Username should be alphanumeric and Valid !' });

        if (!validateEmail(email))
            return res
                .status(400)
                .json({ message: 'Please enter valid email address !' });

        if (!validatePassword(password))
            return res.status(400).json({
                message:
                    'Password must contain one uppercase, symbol, number, and atleast 8 characters !',
            });

        let user = await User.create({
            username,
            email,
            password,
        });
        console.log(user);

        const token = generateToken(user._id);

        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: 'none',
        });

        const { username: uname, _id } = user;

        return res.json({ uname, _id, token });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

exports.userLogin = async (req, res, next) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!email || !validateEmail(email)) {
        return res
            .status(400)
            .json({ message: 'Please enter a valid email address! ' });
    }
    if (!(password || validatePassword(password))) {
        return res.status(400).json({ message: 'Please enter a valid password! ' });
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return res
            .status(404)
            .json({ message: 'User doesnot exists, Please signup again!' });
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    if (user && checkpassword) {
        const { _id, username, email } = user;
        const token = generateToken(_id);

        res.cookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: 'none',
        });

        return res.status(200).json({
            _id,
            username,
            message: 'User Login succesfully !',
        });
    } else {
        return res.status(401).json({ message: 'Invalid Credentials !' });
    }
};

exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({ message: 'Logged out successfully !' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
