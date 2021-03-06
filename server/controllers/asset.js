const Transaction = require('../models/transaction');
const Asset = require('../models/asset');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.get_asset = (req, res, next) => {
  Asset.findById(req.params.id, (err, asset) => {
    if (err) {
      return res.status(400).send('The asset was not found');
    }
    res.send(asset);
  });
};

exports.create_asset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  }
  const user = await User.findById(req.body.userId).populate('assets');
  const assetFound = user.assets.find(
    (asset) => asset.coin.toString() === req.body.coin
  );
  if (assetFound) {
    return res.send({ id: assetFound.coin });
  }
  const asset = new Asset({
    coin: req.body.coin,
    transactions: [],
  });
  asset.save(async (err, asset) => {
    if (err) {
      return next(err);
    }
    user.addAsset(asset);
    res.send({ id: asset._id });
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

// Add transaction to a given asset
exports.update_asset = [
  body('type').trim().isIn(['buy', 'sell', 'transfer']).escape(),
  body('quantity').isFloat({ min: 0 }).escape(),
  body('pricePerCoin').isFloat({ min: 0 }).escape(),
  body('date').isDate().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    }
    const transaction = new Transaction({
      type: req.body.type,
      quantity: req.body.quantity,
      pricePerCoin: req.body.pricePerCoin,
      date: req.body.date,
    });

    Asset.findByIdAndUpdate(
      req.body.id,
      {
        $push: { transactions: transaction },
      },
      (err) => {
        if (err) {
          return res.status(400).send('There was an error');
        }
        transaction.save((err) => {
          if (err) {
            return next(err);
          }
          res.send('The transaction was added and the asset updated');
        });
      }
    );
  },
];

exports.delete_transaction_from_asset = [
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    }
    try {
      const asset = await Asset.findById(req.body.assetId);
      asset.deleteTransaction(req.body.transactionId);
      const transaction = await Transaction.findByIdAndDelete(
        req.body.transactionId
      );
      res.send(transaction);
    } catch (err) {
      res.status(400).send(err);
    }
  },
];
