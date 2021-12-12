const Transaction = require('../models/transaction');
const { body, validationResult } = require('express-validator');

exports.get_transaction = (req, res, next) => {
  Transaction.findById(req.body.id, (err, transaction) => {
    if (err) {
      return res.status(400).send('The transaction was not found');
    }
    res.send(transaction);
  });
};

exports.create_transaction = [
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

    transaction.save((err) => {
      if (err) {
        return next(err);
      }
      res.send('The transaction was added');
    });
  },
];

exports.delete_transaction = [
  body('id').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    }
    Transaction.findByIdAndRemove(req.body.id, (err) => {
      if (err) {
        return res.send(err);
      }
      res.send('The transaction was deleted');
    });
  },
];

exports.update_transaction = [
  body('id').escape(),
  body('type').trim().isIn(['buy', 'sell', 'transfer']).escape(),
  body('quantity').isFloat({ min: 0 }).escape(),
  body('pricePerCoin').isFloat({ min: 0 }).escape(),
  body('date').isDate().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    }
    Transaction.findByIdAndUpdate(
      req.body.id,
      {
        type: req.body.type,
        quantity: req.body.quantity,
        pricePerCoin: req.body.pricePerCoin,
        date: req.body.date,
      },
      (err) => {
        if (err) {
          return res.status(400).send('There was an error');
        }
        res.send('The transaction was updated');
      }
    );
  },
];
