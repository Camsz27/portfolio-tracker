const Transaction = require('../models/transaction');
const Asset = require('../models/asset');
const { body, validationResult } = require('express-validator');

exports.get_asset = (req, res, next) => {
  Asset.findById(req.body.id, (err, asset) => {
    if (err) {
      return res.status(400).send('The asset was not found');
    }
    res.send(asset);
  });
};

exports.create_asset = [
  body('coinName').isLength({ min: 0, max: 40 }).trim().escape(),
  body('coinTicker').isLength({ min: 0, max: 10 }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    }
    const asset = new Asset({
      coinName: req.body.coinName,
      coinTicker: req.body.coinTicker,
      transactions: req.body.transactions,
    });
    asset.save((err) => {
      if (err) {
        return next(err);
      }
      res.send('The asset was added');
    });
  },
];

exports.delete_asset = (req, res, next) => {
  Asset.findByIdAndRemove(req.body.id, (err, asset) => {
    if (err) {
      return res.status(400).send('The asset was not found');
    }
    for (const transaction of asset.transactions) {
      Transaction.findByIdAndRemove(transaction, (err) => {
        if (err) {
          return next(err);
        }
      });
    }
    res.send('The asset and the corresponding transactions have been deleted');
  });
};
