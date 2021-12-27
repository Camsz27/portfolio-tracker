import React, { useState } from 'react';
import Image from 'next/image';

const AddTransaction = ({ handler, asset, id }) => {
  const [active, setActive] = useState('buy');
  const [quantity, setQuantity] = useState(0);
  const [pricePerCoin, setPricePerCoin] = useState(0);
  const [date, setDate] = useState();

  const addTransaction = async () => {
    const transactionRequest = {
      id,
      type: 'buy',
      quantity,
      pricePerCoin,
      date,
    };
    const request = await fetch('http://localhost:27182/assets', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionRequest),
    });
    if (request.status === 200) {
      handler(false);
    }
  };
  return (
    <div className='absolute top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-brightness-75 flex items-center md:text-lg'>
      <form
        className='xl:w-1/4 md:w-1/2 mx-auto bg-purple-500 text-white rounded-lg flex flex-col pb-5 lg:pb-7'
        style={{ minWidth: '290px' }}
      >
        <span className='flex items-center justify-between mx-3 my-2'>
          <h1 className='text-2xl font-bold'>Add Transaction</h1>
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
        <span className='flex bg-purple-400 rounded-lg mx-7 py-0.5 px-2 justify-between lg:w-2/3 lg:mx-auto lg:px-4'>
          <button
            type='button'
            className={`${
              active === 'buy' ? 'bg-purple-500' : ''
            } px-4 rounded-lg`}
            onClick={() => setActive('buy')}
          >
            Buy
          </button>
          <button
            type='button'
            className={`${
              active === 'sell' ? 'bg-purple-500' : ''
            } px-4 rounded-lg`}
            onClick={() => setActive('sell')}
            disabled
          >
            Sell
          </button>
          <button
            type='button'
            className={`${
              active === 'transfer' ? 'bg-purple-500' : ''
            } px-4 rounded-lg`}
            onClick={() => setActive('transfer')}
            disabled
          >
            Transfer
          </button>
        </span>
        <span className='flex justify-between items-center w-max gap-x-4 mx-auto my-4'>
          {/* <div className='h-5 w-5 bg-gray-700 rounded-full'></div> */}
          <Image src={asset.image} height={42} width={42} alt='coin logo' />
          <h3>{asset.name}</h3>
          <h3>{asset.symbol.toUpperCase()}</h3>
        </span>
        {active === 'transfer' ? (
          <span className='flex flex-col items-center mb-3'>
            <label htmlFor='transferType'>Transfer</label>
            <select
              name='transferType'
              id='transferType'
              className='w-5/6 lg:w-3/4 bg-purple-400 rounded-lg'
            >
              <option value='in'>Transfer In</option>
              <option value='out'>Transfer Out</option>
            </select>
          </span>
        ) : (
          ''
        )}
        <div className='flex justify-center gap-x-8'>
          <span
            className={`flex flex-col items-center ${
              active === 'transfer' ? 'w-full' : 'w-1/3'
            }`}
          >
            <label
              htmlFor='quantity'
              className={`block ${
                active === 'transfer' ? '' : 'text-sm md:text-lg'
              }`}
            >
              Quantity
            </label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              className={`bg-purple-400 rounded-lg h-9 border-gray-500 ${
                active === 'transfer' ? 'w-4/5 lg:w-3/4' : 'w-28'
              }`}
              value={quantity}
              onChange={(e) => setQuantity(e.currentTarget.value)}
            />
          </span>
          {active !== 'transfer' ? (
            <span className='w-1/3 flex flex-col items-center text-sm md:text-lg'>
              <label htmlFor='price' className='block'>
                Price Per Coin
              </label>
              <input
                type='number'
                name='price'
                id='price'
                className='bg-purple-400 w-28 rounded-lg h-9 border-gray-500'
                value={pricePerCoin}
                onChange={(e) => setPricePerCoin(e.currentTarget.value)}
              />
            </span>
          ) : (
            ''
          )}
        </div>
        <input
          type='date'
          name='date'
          id='date'
          className='bg-purple-400 h-8 lg:h-12 lg:w-3/4 lg:text-xl rounded-lg self-center my-5 border-gray-500 border-2'
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
        <h2 className='ml-7 text-lg lg:ml-14'>
          {active === 'buy'
            ? 'Total Spent'
            : active === 'sell'
            ? 'Total Received'
            : ''}
        </h2>
        {active !== 'transfer' ? (
          <h2 className='text-2xl font-semibold mt-2 mb-4 ml-7 lg:ml-14'>
            ${quantity * pricePerCoin}
          </h2>
        ) : (
          ''
        )}
        <button
          type='button'
          className='w-3/4 bg-purple-400 h-10 font-bold rounded-lg self-center hover:bg-purple-700 transform transition duration-500 hover:scale-105'
          onClick={addTransaction}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
