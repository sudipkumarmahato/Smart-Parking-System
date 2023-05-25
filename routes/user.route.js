
const express = require('express');
const userRouter = express.Router();
const {
    registerUser,
    userLogin,
    logoutUser,
} = require('../controllers/user.controller.js');
const { verifyTokenAuthentication } = require('../middlewares/auth');
userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);
userRouter.post('/logout', verifyTokenAuthentication, logoutUser);
module.exports = userRouter;