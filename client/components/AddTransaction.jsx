import React from 'react';

const AddTransaction = ({ handler }) => {
  return (
    <div className='absolute top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-brightness-75 flex items-center md:text-lg'>
      <form className='xl:w-1/4 mx-auto bg-purple-500 text-white rounded-lg'>
        <span
          className='flex items-center justify-between mx-3 my-2'
          style={{ minWidth: '300px' }}
        >
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
          <button className='bg-purple-500 px-4 rounded-lg'>Buy</button>
          <button>Sell</button>
          <button>Transfer</button>
        </span>
        <h3>This is the coin you are buying</h3>
      </form>
    </div>
  );
};

export default AddTransaction;
