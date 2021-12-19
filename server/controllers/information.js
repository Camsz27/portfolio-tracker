const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const Coin = require('../models/coin');

exports.getCoins = async (req, res, next) => {
  //   const data = await CoinGeckoClient.coins.fetch('bitcoin', {});
  const data = await CoinGeckoClient.coins.fetch(req.body.id, {
    developer_data: false,
    community_data: false,
    tickers: false,
  });

  const symbol = data.data.symbol;
  const id = data.data.id;
  const name = data.data.name;
  const marketData = data.data.market_data;
  console.log(marketData);
  res.json({ symbol, id, name });
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
