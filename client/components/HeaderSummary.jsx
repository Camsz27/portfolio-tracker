import React, { useState } from 'react';
import AddTransaction from './AddTransaction';

const HeaderSummary = ({ transaction }) => {
  const [modal, setModal] = useState(false);
  return (
    <div className='w-5/6 mx-auto mt-10 pl-5 lg:pl-0'>
      {modal && transaction && <AddTransaction handler={setModal} />}
      <h4 className='text-gray-600 text-xl mb-3'>Current Balance</h4>
      <span className='flex gap-x-4 lg:items-center justify-between mb-3 flex-col md:flex-row gap-y-5'>
        <h2 className='text-3xl md:text-5xl'>$785.98</h2>
        <span className='flex flex-grow justify-between gap-x-3'>
          <span className='bg-green-500 text-white rounded-lg flex items-center px-1 justify-center md:px-2.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='fill-current text-white w-6 md:w-8 h-8'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M7 14l5-5 5 5H7z' />
            </svg>
            <h5 className='text-base'>6.54%</h5>
          </span>
          <button
            className='bg-purple-500 text-secondary font-semibold rounded-lg py-2 px-3 hover:bg-purple-700 transform transition duration-500 hover:scale-105 lg:w-44 flex items-center justify-center gap-x-0.5 sm:gap-x-2'
            onClick={() => setModal(true)}
          >
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
            <h3 className='text-xs sm:text-sm'>
              {transaction ? 'Add Transaction' : 'Add New'}
            </h3>
          </button>
        </span>
      </span>
      <span className='flex text-lg space-x-6 items-center'>
        <h2 className='text-green-500 font-bold'>$785.98</h2>
        <h5 className='bg-purple-200 rounded-lg p-1 text-base'>24h</h5>
      </span>
    </div>
  );
};

export default HeaderSummary;
