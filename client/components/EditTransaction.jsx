import React from 'react';

const EditTransaction = ({ handler, type }) => {
  return (
    <div className='absolute top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-brightness-75 flex items-center md:text-lg'>
      <form
        className='w-5/6 xl:w-1/4 md:w-1/2 mx-auto bg-purple-500 text-white rounded-lg flex flex-col pb-5 lg:pb-7'
        style={{ minWidth: '290px' }}
      >
        <span className='flex items-center justify-between mx-3 my-2'>
          <h1 className='text-2xl font-bold'>Edit Transaction</h1>
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
        <div className='flex justify-between gap-x-10'>
          <span className={`flex flex-col items-center`}>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              className={`bg-purple-400 rounded-lg h-9 border-gray-500 w-5/6`}
            />
          </span>
          <span className='flex flex-col items-center text-sm md:text-lg'>
            <label htmlFor='price'>Price Per Coin</label>
            <input
              type='number'
              name='price'
              id='price'
              className='bg-purple-400 rounded-lg h-9 border-gray-500 w-5/6'
            />
          </span>
        </div>
        <input
          type='date'
          name='date'
          id='date'
          className='bg-purple-400 h-8 lg:h-12 lg:w-3/4 lg:text-xl rounded-lg self-center my-5 border-gray-500 border-2'
        />
        <h2 className='ml-7 text-lg lg:ml-14'>
          {type === 'buy' ? 'Total Spent' : 'Total Received'}
        </h2>
        <h2 className='text-3xl font-semibold mt-2 mb-4 ml-7 lg:ml-14'>
          $50000
        </h2>
        <button
          type='button'
          className='w-3/4 bg-purple-400 h-10 font-bold rounded-lg self-center hover:bg-purple-700 transform transition duration-500 hover:scale-105'
        >
          Edit Transaction
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
