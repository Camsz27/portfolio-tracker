import React from 'react';
import Router from 'next/router';

const DeleteModal = ({
  handler,
  asset,
  transactionId,
  successHandler,
  changeType,
  assetId,
}) => {
  const removeTransaction = async () => {
    const deleteRequest = {
      assetId,
      transactionId,
    };
    const request = await fetch('http://localhost:27182/assets/transaction', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteRequest),
    });
    if (request.status === 200) {
      handler(false);
      successHandler(true);
      changeType('delete');
      Router.reload();
    }
  };

  const removeAsset = () => {
    console.log('this is for remove asset');
  };

  return (
    <div className='absolute top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-brightness-75 flex items-center md:text-lg'>
      <main
        className='xl:w-1/4 md:w-1/2 mx-auto bg-purple-500 text-white rounded-lg flex flex-col pb-5 lg:pb-7'
        style={{ minWidth: '290px' }}
      >
        <span className='flex items-center justify-between mx-3 my-2'>
          <h1 className='text-2xl font-bold ml-4'>
            {asset ? 'Remove asset' : 'Remove transaction'}
          </h1>
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
        <p className='w-4/5 mx-auto'>
          {asset
            ? 'Are you sure you want to remove this coin? Any transactions associated with this coin will also be removed.'
            : 'Are you sure you want to remove this transaction?'}
        </p>
        <button
          type='button'
          className='bg-red-500 w-4/5 mx-auto rounded-lg hover:bg-red-600 transform transition duration-500 hover:scale-105 py-1 mt-4 mb-3'
          onClick={asset ? removeAsset : removeTransaction}
        >
          Remove
        </button>
        <button
          type='button'
          className='w-4/5 mx-auto rounded-lg bg-purple-600 hover:bg-purple-700 transform transition duration-500 hover:scale-105 py-1'
          onClick={() => handler(false)}
        >
          Cancel
        </button>
      </main>
    </div>
  );
};

export default DeleteModal;
