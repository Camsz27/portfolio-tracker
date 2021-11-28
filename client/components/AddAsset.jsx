import React from 'react';

const AddAsset = ({ handler, popUp, main }) => {
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
          />
        </span>
        <main className='mt-5 w-5/6 mx-auto'>
          <span
            className='flex items-center gap-x-5 hover:bg-purple-700 rounded-md px-3 py-2 cursor-pointer'
            onClick={() => {
              popUp(true);
              main(false);
            }}
          >
            <div className='h-8 w-8 bg-red-400 rounded-full'></div>
            <h1 className='font-bold'>Bitcoin</h1>
            <h3>BTC</h3>
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
        </main>
      </form>
    </div>
  );
};

export default AddAsset;
