import React from 'react';

const HeaderSummary = () => {
  return (
    <div className='w-4/5 mx-auto mt-10'>
      <h4 className='text-gray-600 text-xl mb-3'>Current Balance</h4>
      <span className='flex gap-x-4 items-center justify-between mb-6'>
        <span className='flex gap-x-8'>
          <h2 className='text-5xl'>$785.98</h2>
          <span className='bg-green-500 text-white rounded-lg flex items-center px-1 justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='fill-current text-white w-8 h-8'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M7 14l5-5 5 5H7z' />
            </svg>
            <h5 className='text-lg'>6.54%</h5>
          </span>
        </span>
        <button className='bg-purple-500 text-secondary font-semibold w-32 rounded-lg py-2 px-1 hover:bg-purple-700 transform transition duration-500 hover:scale-105 lg:w-1/6 flex items-center justify-center gap-x-2'>
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
              d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Add new
        </button>
      </span>
      <span className='flex text-lg space-x-6 items-center'>
        <h2 className='text-green-500 font-bold'>$785.98</h2>
        <h5 className='bg-purple-200 rounded-lg p-1 text-base'>24h</h5>
      </span>
    </div>
  );
};

export default HeaderSummary;
