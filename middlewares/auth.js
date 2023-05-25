const jwt = require('jsonwebtoken');

exports.verifyTokenAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token)
            return res
                .status(403)
                .json({ message: 'User authentication failed ' });

        const user = jwt.verify(token,
            process.env.TOKEN_KEY);

        req.user = user;

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
