const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const logger = require('pino')()
const mongo = require('./config/mongodb.js');
mongo.connectDB();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello I am building parking App',
    });
});


const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
    logger.info(`server is up and running at port ${port} successfully `);
});
