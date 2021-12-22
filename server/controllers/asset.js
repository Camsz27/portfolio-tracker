const Transaction = require('../models/transaction');
const Asset = require('../models/asset');
const { body, validationResult } = require('express-validator');

exports.get_asset = (req, res, next) => {
  Asset.findById(req.params.id, (err, asset) => {
    if (err) {
      return res.status(400).send('The asset was not found');
    }
    res.send(asset);
  });
};

exports.create_asset = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  }
  const asset = new Asset({
    coin: req.body.coin,
    transactions: req.body.transactions,
  });
  asset.save((err) => {
    if (err) {
      return next(err);
    }
    res.send('The asset was added');
  });
};

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

exports.update_asset = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  }
  Asset.findByIdAndUpdate(
    req.body.id,
    {
      coin: req.body.coin,
      transactions: req.body.transactions,
    },
    (err) => {
      if (err) {
        return res.status(400).send('There was an error');
      }
      res.send('The asset was updated');
    }
  );
};

exports.trial = (req, res, next) => {
  Asset.findOne(async (err, result) => {
    if (err) {
      return res.send('There was an error');
    }
    const [quantity, averagePrice] = await Promise.all([
      result.getQuantity(),
      result.getAveragePrice(),
    ]);
    res.json({ quantity, averagePrice });
  });
};