const express = require('express');

const indexRouter = express.Router();
const { index } = require('../controllers/index.controller.js');

indexRouter.get('/', index);

module.exports = indexRouter;
