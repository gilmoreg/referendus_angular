const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const router = require('./routes');
require('dotenv').config();
require('./handlers/passport');
require('./models/User');

mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => console.error(err));
mongoose.connection.once('open', () => {
  console.info(`Connected to Mongo at: ${new Date()}`);
});

const app = express();
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
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Log all requests
app.use((req, res, next) => {
  console.info(`${req.method} ${req.url} ${req.body ? JSON.stringify(req.body) : 'No body'}`);
  next();
});

// Router
app.use(router);

// Log errors
app.use((req, res) => {
  res.status(500).json({ error: 'Something went wrong' }).end();
});

const closeServer = () =>
  mongoose.connection.close(() =>
    new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) return reject(err);
        return resolve();
      });
    }));

const runServer = (port = process.env.PORT) =>
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

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
