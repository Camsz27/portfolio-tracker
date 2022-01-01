const Transaction = require('../models/transaction');
const Asset = require('../models/asset');
const User = require('../models/user');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
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
      user.save((err, result) => {
        if (err) {
          return res.status(400).send('There was an error creating the user');
        }
        res.send(result);
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

exports.get_user = (req, res, next) => {
  User.findById(req.params.id)
    .populate([
      {
        path: 'assets',
        populate: [
          { path: 'coin', model: 'Coin' },
          { path: 'transactions', model: 'Transaction' },
        ],
      },
    ])
    .exec(async (err, result) => {
      if (err) {
        return res.send(err);
      }
      let assets = [];
      for (const asset of result.assets) {
        const [quantity, averagePrice] = await Promise.all([
          asset.getQuantity(),
          asset.getAveragePrice(),
        ]);
        assets.push({
          id: asset._id,
          coin: asset.coin,
          quantity: quantity,
          averagePrice: averagePrice,
        });
      }
      res.json({ id: result._id, name: result.name, assets: assets });
    });
};

exports.delete_asset_from_user = async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  user.deleteAsset(req.body.assetId);
  Asset.findByIdAndRemove(req.body.assetId, (err, asset) => {
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

exports.get_user_transactions = async (req, res, next) => {
  const user = await User.findById(req.params.id).populate([
    {
      path: 'assets',
      populate: [
        { path: 'coin', model: 'Coin' },
        { path: 'transactions', model: 'Transaction' },
      ],
    },
  ]);
  const assets = user.assets;
  let transactions = [];
  for (const asset of assets) {
    const coin = asset.coin;
    asset.transactions.map((transaction) => {
      const newTransaction = {
        ...transaction._doc,
        coin: coin,
        assetId: asset._id,
      };
      transactions.push(newTransaction);
    });
  }
  transactions.sort((a, b) => b.date - a.date);
  res.send(transactions);
};

exports.summary = async (req, res, next) => {
  const user = await User.findById(req.params.id).populate([
    {
      path: 'assets',
      populate: [
        { path: 'coin', model: 'Coin' },
        { path: 'transactions', model: 'Transaction' },
      ],
    },
  ]);
  const promises = user.assets.map(async (asset) => {
    const averagePrice = await asset.getAveragePrice();
    const quantity = await asset.getQuantity();
    const data = await CoinGeckoClient.coins.fetch(asset.coin.id, {
      developer_data: false,
      community_data: false,
      tickers: false,
    });
    const symbol = data.data.symbol;
    const id = data.data.id;
    const name = data.data.name;
    const image = data.data.image.small;
    const price = data.data.market_data.current_price.usd;
    const variationPercentage =
      data.data.market_data.price_change_percentage_24h;
    const profit = quantity * (price - averagePrice);
    const variationPrice = data.data.market_data.price_change_24h;
    const result = {
      symbol,
      id,
      name,
      image,
      price,
      variationPercentage,
      quantity,
      averagePrice,
      profit,
      variationPrice,
    };
    return result;
  });
  const assetsResults = await Promise.all(promises);
  let currentBalance = 0;
  let allTimeProfit = 0;
  let bestPerformer = { profit: Number.NEGATIVE_INFINITY };
  let worstPerformer = { profit: Number.POSITIVE_INFINITY };
  let dayProfit = 0;
  let invested = 0;
  assetsResults.map((asset) => {
    currentBalance += asset.price * asset.quantity;
    allTimeProfit += asset.profit;
    invested += asset.quantity * asset.averagePrice;
    dayProfit += asset.quantity * asset.variationPrice;
    if (bestPerformer.profit < asset.profit) {
      bestPerformer = asset;
    }
    if (worstPerformer.profit > asset.profit) {
      worstPerformer = asset;
    }
  });
  assetsResults.map((asset, index) => {
    const percentage = ((asset.quantity * asset.price) / currentBalance) * 100;
    assetsResults[index] = { ...assetsResults[index], percentage };
  });
  const dayVariationPercentage = (dayProfit / currentBalance) * 100;
  res.send({
    assetsResults,
    allTimeProfit,
    bestPerformer,
    worstPerformer,
    currentBalance,
    dayVariationPercentage,
    dayProfit,
    invested,
  });
};
