const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
// const { router } = require('./routes');

const app = express();
mongoose.Promise = global.Promise;
let server;

// Help locate unhandled Promise rejections
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
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
// app.use(express.static('../client')); after we figure out where Angular's build output is
// app.use(router);

// Log all requests
app.use((req, res, next) => {
  console.info(`${req.method} ${req.url} ${req.body ? JSON.stringify(req.body) : 'No body'}`);
  next();
});

// Log errors
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' }).end();
});

const runServer = (databaseUrl = DATABASE_URL, port = PORT) =>
  new Promise((resolve, reject) => {
    /* eslint-disable consistent-return */
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.info(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', () => {
        mongoose.disconnect();
        reject();
      });
    });
  });

const closeServer = () =>
  mongoose.disconnect().then(() =>
    new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    }),
  );

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };