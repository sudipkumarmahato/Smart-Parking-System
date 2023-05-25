exports.index = async (req, res, next) => {
    res.status(200).json({
        message: 'Hello I am building parking App',
    });
};
