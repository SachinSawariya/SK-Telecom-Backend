const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./config/config.js');

const asyncHandler = require('./utils/asyncHandler.js')
const utils = require('./utils/responseMsg.js')

// global declarations
global.logger = require('./utils/logger.js');
global.asyncHandler = asyncHandler;
global.utils = utils;


const app = express();

app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(logger.morganInstance)


//routes import


app.use('/', require('./routes/index.js'))





module.exports = {
    app
};