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
