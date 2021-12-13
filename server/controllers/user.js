const Transaction = require('../models/transaction');
const Asset = require('../models/asset');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.login_user = [
  body('username').trim().escape(),
  body('password').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    User.find({ username: req.body.username }, (err, user) => {
      if (err) {
        return res.status(400).send('There is no user with that username');
      }
      if (user.length === 1) {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (result) {
            return res.send(user[0]);
          } else {
            return res.status(400).send('Incorrect password');
          }
        });
      } else {
        return res.status(400).send('There is no user with that username');
      }
    });
  },
];

exports.create_user = [
  body('name').isAlpha().isLength({ min: 3, max: 30 }).trim().escape(),
  body('username').isLength({ min: 3, max: 30 }).trim().escape(),
  body('password').isLength({ min: 5, max: 30 }).trim().escape(),
  body('currency').isLength({ min: 0, max: 10 }).trim().escape(),
  body('language').isAlpha().isLength({ min: 0, max: 10 }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(400).send('There was an error hashing the password');
      }
      const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        assets: req.body.assets,
        currency: req.body.currency,
        language: req.body.language,
      });
      user.save((err) => {
        if (err) {
          return res.status(400).send('There was an error creating the user');
        }
        res.send('The user has been created');
      });
    });
  },
];

exports.update_user = [
  body('id').trim().escape(),
  body('name').isAlpha().isLength({ min: 3, max: 30 }).trim().escape(),
  body('username').isLength({ min: 3, max: 30 }).trim().escape(),
  body('currency').isLength({ min: 0, max: 10 }).trim().escape(),
  body('language').isAlpha().isLength({ min: 0, max: 10 }).trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    User.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
        username: req.body.username,
        assets: req.body.assets,
        currency: req.body.currency,
        language: req.body.language,
      },
      (err) => {
        if (err) {
          return res.status(400).send('The user was not found');
        }
        res.send('The user has been updated');
      }
    );
  },
];
