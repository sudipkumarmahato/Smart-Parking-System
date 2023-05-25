const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();
const logger = require('pino')()
const mongo = require('./config/mongodb.js');
mongo.connectDB();


const indexRoute = require('./routes/index.route.js');
const userRoute = require('./routes/user.route.js');


app.use(morgan('tiny'));
app.use(cookieParser())

app.use('/api/v1/', indexRoute);
app.use('/api/v1/auth', userRoute);


const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
    logger.info(`server is up and running at port ${port} successfully `);
});
