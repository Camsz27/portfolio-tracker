const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const Coin = require('../models/coin');

// Get the coin information given the id
exports.getCoin = (req, res, next) => {
  Coin.findById(req.params.id)
    .then(async (coin) => {
      const data = await CoinGeckoClient.coins.fetch(coin.id, {
        developer_data: false,
        community_data: false,
        tickers: false,
        sparkline: true,
      });
      const symbol = data.data.symbol;
      const id = data.data.id;
      const name = data.data.name;
      const image = data.data.image.small;
      const marketData = data.data.market_data;
      //const sparkline = marketData.sparkline_7d;
      const price = marketData.current_price.usd;
      const variation = marketData.price_change_24h;
      const variationPercentage = marketData.price_change_percentage_24h;
      // console.log(Object.keys(data.data));
      console.log(Object.keys(data.data.image));
      res.json({
        symbol,
        id,
        name,
        image,
        price,
        variation,
        variationPercentage,
      });
    })
    .catch((err) => console.log(err));
};

// Gets the coins listed in the CoinGecko API and passes them to mongodb
exports.initial = async (req, res, next) => {
  const data = await CoinGeckoClient.coins.list();
  for (const coin of data.data) {
    const newCoin = new Coin({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
    });
    newCoin.save((err) => {
      if (err) {
        return next(err);
      }
    });
  }
  res.send(data.data);
};

//Get a list of all the coins in the db
exports.coins = (req, res, next) => {
  Coin.find((err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result);
  });
};
