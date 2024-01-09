const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const mongoose = require("mongoose");
const appError = require('./utils/appError');
const app = express();

const userRouter = require('./api/v1/routers/userRouter');
const orderRouter = require('./api/v1/routers/orderRouter');



app.use(cors());
app.use('/static', express.static('public'))

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongodb connected ...!')
  }, (err) => {
    console.log(err);
  });






  
app.use(helmet());
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against user Router XSS
app.use(xss());



// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/order',orderRouter );
app.use('/api/v1/user',userRouter );


app.all('*', (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
  