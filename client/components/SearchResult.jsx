import React from 'react';
import Image from 'next/image';

const SearchResult = ({ popUp, main, coin, assetHandler }) => {
  const fetchCoinInformation = async () => {
    const data = await fetch(`http://localhost:27182/information/${coin._id}`);
    const response = await data.json();
    return response;
  };
  const selectedResultHandler = async () => {
    const information = await fetchCoinInformation();
    const selectedCoin = {
      id: coin._id,
      symbol: information.symbol,
      name: information.name,
      image: information.image,
    };
    assetHandler(selectedCoin);
    popUp(true);
    main(false);
  };
  return (
    <span
      className='flex items-center gap-x-5 hover:bg-purple-700 rounded-md px-3 py-2 cursor-pointer'
      onClick={selectedResultHandler}
    >
      {/* <div className='w-10 h-10 bg-white rounded-full'></div> */}
      <h1 className='font-bold'>{coin.name}</h1>
      <h3>{coin.symbol}</h3>
      <span className='flex-grow'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 float-right'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </span>
    </span>
  );
};

export default SearchResult;
