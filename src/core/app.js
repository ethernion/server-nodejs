// import express from 'express';
const express = require('express');

// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');

// import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

// import definePlatform from '@/middleware/define-platform';
const definePlatform = require('../middleware/define-platform');
// import checkCors from '@/middleware/check-cors';
const checkCors = require('../middleware/check-cors');
// import auth from '@/middleware/auth';
const auth = require('../middleware/auth');

// import account from '@/routes/account';
const account = require('../routes/account');
// import logic from '@/routes/logic';
const logic = require('../routes/logic');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * The only goal of this route is to wake up the heroku server,
 * which falls asleep every 30 minutes.
 * 
 * https://cron-job.org/ makes an http-request every 15 minutes.
 */
app.get('/', (req, res) => {
  res.status(200).json({
    result: 'updated'
  });
});

/**
 * Define whether the client is
 * connected due to the app or the website.
 */
app.use(definePlatform);

/**
 * My own cors middleware based on
 * the method the client is connected with.
 */
app.use(checkCors);

/**
 * Auth based on jsonwebtoken.
 */
app.use(auth);

/**
 * Endpoints.
 */
app.use('/account', account);
app.use('/logic', logic);

// export default app;
module.exports = app;