import React from 'react';

const Asset = () => {
  return (
    <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 items-center border-b border-gray-600 mb-3 text-sm md:text-base'>
      <span className='col-span-2 flex justify-between md:w-5/6'>
        <h3>Crypto.com Coin</h3>
        <h3 className='hidden lg:block text-gray-700'>CRO</h3>
      </span>
      <h5 className='col-span-1'>$0.0557</h5>
      <span className='hidden lg:col-span-1 text-green-500 lg:flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='fill-current w-8 h-8'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M7 14l5-5 5 5H7z' />
        </svg>
        <h3>14.42%</h3>
      </span>
      <span className='col-span-1 ml-3'>
        <h3>$903.4</h3>
        <h5 className='text-gray-700 text-sm'>$903.4</h5>
      </span>
      <h5 className='hidden lg:col-span-1 lg:block ml-8'>$0.0557</h5>
      <span className='hidden md:col-span-1 md:flex flex-col items-start'>
        <h3 className='w-5/6 pl-2.5'>+ $903.4</h3>
        <span className='text-green-500 flex items-center w-5/6 text-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='fill-current w-8 h-8'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M7 14l5-5 5 5H7z' />
          </svg>
          <h3>14.42%</h3>
        </span>
      </span>
      <span className='hidden md:col-span-1 md:flex gap-x-4'>
        <button className='transform transition duration-300 hover:scale-125'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg>
        </button>
        <button className='transform transition duration-300 hover:scale-125'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </button>
      </span>
    </div>
  );
};

export default Asset;
