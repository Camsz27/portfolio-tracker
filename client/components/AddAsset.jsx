import React, { useState, useEffect } from 'react';
import SearchResult from './SearchResult';

const trendingCoins = [
  {
    img: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
    name: 'Bitcoin',
    symbol: 'BTC',
    _id: '61bfa482b18008d1ab3625e4',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
    name: 'Ethereum',
    symbol: 'ETH',
    _id: '61bfa483b18008d1ab362f23',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
    name: 'Binance Coin',
    symbol: 'BNB',
    _id: '61bfa482b18008d1ab362591',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
    name: 'Tether',
    symbol: 'USDT',
    _id: '61bfa483b18008d1ab36479f',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/4128/small/Solana.jpg?1635329178',
    name: 'Solana',
    symbol: 'SOL',
    _id: '61bfa483b18008d1ab3644ed',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860',
    name: 'Cardano',
    symbol: 'ADA',
    _id: '61bfa483b18008d1ab362854',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
    name: 'USD Coin',
    symbol: 'USDC',
    _id: '61bfa483b18008d1ab364a2b',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/8284/small/luna1557227471663.png?1567147072',
    name: 'Terra',
    symbol: 'LUNA',
    _id: '61bfa483b18008d1ab364791',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818',
    name: 'Avalanche',
    symbol: 'AVAX',
    _id: '61bfa482b18008d1ab3623eb',
  },
  {
    img: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    name: 'Polygon',
    symbol: 'MATIC',
    _id: '61bfa483b18008d1ab3638e1',
  },
];

const AddAsset = ({ handler, popUp, main, assetHandler }) => {
  const [result, setResult] = useState([]);
  const [initial, setInitial] = useState(true);
  const [initialData, setInitialData] = useState([]);

  const fetchCoins = async () => {
    const data = await fetch('http://localhost:27182/information/coins');
    const result = await data.json();
    setInitialData(result);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const getResults = (e) => {
    const search = e.target.value;
    const filterCoins = initialData.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setResult(filterCoins);
    setInitial(false);
  };

  return (
    <div className='absolute top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-brightness-75 flex items-center md:text-lg'>
      <form
        className='xl:w-1/4 md:w-1/2 mx-auto bg-purple-500 text-white rounded-lg flex flex-col pb-5 lg:pb-7'
        style={{ minWidth: '290px' }}
      >
        <span className='flex items-center justify-between mx-3 my-2'>
          <h1 className='text-2xl font-bold'>Select Coin</h1>
          <button
            type='button'
            className='transform transition duration-500 hover:scale-110'
            onClick={() => handler(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 md:h-8 md:w-8 lg:h-9 lg:w-9'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </span>
        <span className='flex items-center bg-gray-300 rounded-lg w-5/6 mx-auto px-3 text-gray-500'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 md:h-8 md:w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </span>
          <input
            type='text'
            placeholder='Search'
            className='flex-grow bg-transparent border-0 outline-none ring-0 focus:ring-0 md:text-xl'
            onChange={getResults}
          />
        </span>
        <main className='mt-5 w-5/6 mx-auto max-h-96 overflow-y-scroll'>
          {initial &&
            trendingCoins.map((coin, index) => (
              <SearchResult
                popUp={popUp}
                main={main}
                key={index}
                coin={coin}
                assetHandler={assetHandler}
              />
            ))}
          {!initial &&
            result.map((coin, index) => (
              <SearchResult
                popUp={popUp}
                main={main}
                key={index}
                coin={coin}
                assetHandler={assetHandler}
              />
            ))}
        </main>
      </form>
    </div>
  );
};

export default AddAsset;
