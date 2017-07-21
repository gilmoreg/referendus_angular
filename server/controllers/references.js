/* eslint-disable no-underscore-dangle */
const Reference = require('../models/Reference');

const APAFormatter = require('./formats/apa');
const ChicagoFormatter = require('./formats/chicago');
const MLAFormatter = require('./formats/mla');

exports.getRefs = async (req, res) => {
  if (!req.query.format) throw Error('You must supply a format');
  let formatter;
  switch (req.query.format) {
    case 'apa': formatter = APAFormatter; break;
    case 'chicago': formatter = ChicagoFormatter; break;
    case 'mla': formatter = MLAFormatter; break;
    default: throw Error('Invalid format');
  }
  const refs = await Reference.find({ user: req.user._doc.username });
  res.status(200).json(refs.map(ref => formatter.format(ref)));
};

exports.createRef = (req, res) => {
  console.log('info', `POST ${JSON.stringify(req.body)}`);
  let requiredFields;
  if (!req.body.type) {
    throw new Error('Missing "type" in request body', res);
  }

  switch (req.body.type) {
    case 'Article': {
      requiredFields = ['title', 'authors', 'year', 'journal', 'volume', 'issue', 'pages'];
      break;
    }
    case 'Book': {
      requiredFields = ['title', 'authors', 'city', 'publisher', 'year'];
      break;
    }
    case 'Website': {
      requiredFields = ['title', 'siteTitle', 'accessDate', 'url'];
      break;
    }
    default: {
      throw new Error(`Unknown reference type ${req.body.type}`, res);
    }
  }

  requiredFields.forEach((field) => {
    if (!(field in req.body)) {
      throw new Error(`Missing \`${field}\` in request body`, res);
    }
  });

  if (req.body.authors && req.body.authors.length < 1) {
    throw new Error('"authors" must contain at least one author', res);
  }

  // Add 'user' to body
  req.body.user = req.user._doc.username;

  return Reference
    .create(req.body)
    .then(
      ref => res.status(201).json(ref.json()))
    .catch(err => new Error(`Error creating reference: ${err}`));
};

exports.deleteRef = (req, res) => {
  console.log('info', `DELETE ${req.params.id}`);
  Reference
    .findOneAndRemove({ _id: req.params.id, user: req.user._doc.username })
    .exec()
    .then(() => res.status(204).end())
    .catch(err => new Error(`Error creating reference: ${err}`));
};

exports.editRef = (req, res) =>  {
  console.log('info', `PUT ${req.body}`);
  if (req.params.id !== req.body.id) {
    const message = `
      Request path id (${req.params.id}) and request body id 
      (${req.body.id}) must match`;
    console.log('error', message);
    throw new Error(msg);
  }
  const toUpdate = {};
  const updateableFields = [
    'type', 'title', 'tags', 'identifier', 'notes', 'authors', 'year', 'volume',
    'issue', 'pages', 'url', 'journal', 'city', 'publisher', 'edition', 'siteTitle',
    'accessDate', 'pubDate',
  ];
  updateableFields.forEach((field) => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Reference
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findOneAndUpdate({ _id: req.params.id, user: req.user._doc.username }, { $set: toUpdate })
    .exec()
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: `Internal server error${err}` }));
};
