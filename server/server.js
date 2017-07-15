const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const { PORT, DATABASE_URL } = require('./config');
require('dotenv').config({ path: 'variables.env' });
require('./handlers/passport');

const db = mongoose.createConnection(DATABASE_URL, { useMongoClient: true });
db.on('error', err => console.error(err));
db.once('open', () => {
  console.info(`Connected to Mongo at: ${new Date()}`);
});

// const { router } = require('./routes');

const app = express();
mongoose.Promise = global.Promise;
let server;

// Help locate unhandled Promise rejections
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// Middleware
app.use(cors({
  origin: `${process.env.CORS_ORIGIN || '*'}`,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: 'Accept, Origin, Content-Type, Referer',
  credentials: true,
}));
app.use(compression({ level: 9, threshold: 0 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
// app.use(router);

// Log all requests
app.use((req, res, next) => {
  console.info(`${req.method} ${req.url} ${req.body ? JSON.stringify(req.body) : 'No body'}`);
  next();
});

/*
Re-enable once router is implemented
// Log errors
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' }).end();
});
*/

const runServer = (databaseUrl = DATABASE_URL, port = PORT) =>
  new Promise((resolve, reject) => {
    /* eslint-disable consistent-return */
    server = app.listen(port, () => {
      console.info(`Your app is listening on port ${port}`);
      resolve();
    })
    .on('error', (err) => {
      console.error(err);
      closeServer();
      reject();
    });
  });

const closeServer = () =>
  db.close(() => {
    new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });   

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };