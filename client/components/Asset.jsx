import React, { useState } from 'react';
import AddTransaction from './AddTransaction';
import Toast from './Toast';
import DeleteModal from './DeleteModal';

const Asset = () => {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [type, setType] = useState();
  return (
    <div
      className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 items-center border-b border-gray-600 mb-3 text-sm md:text-base'
      onClick={() => setToast((prev) => !prev)}
    >
      {modal &&
        (type === 'add' ? (
          <AddTransaction handler={setModal} />
        ) : (
          <DeleteModal handler={setModal} asset={true} />
        ))}
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
        <button
          className='transform transition duration-300 hover:scale-125'
          onClick={() => {
            setModal(true);
            setType('add');
          }}
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
              d='M12 4v16m8-8H4'
            />
          </svg>
        </button>
        <button
          className='transform transition duration-300 hover:scale-125'
          onClick={() => {
            setModal(true);
            setType('delete');
          }}
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
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      </span>
      {toast && (
        <Toast
          modalHandler={setModal}
          typeHandler={setType}
          toastHandler={setToast}
        />
      )}
    </div>
  );
};

export default Asset;
