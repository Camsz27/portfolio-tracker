import React, { useState, useEffect } from 'react';

const Message = ({ type }) => {
  const [display, setDisplay] = useState(true);
  let message = '';
  switch (type) {
    case 'edit':
      message = 'The change in the transaction has been saved';
      break;
    case 'deleteAsset':
      message = 'The asset has been deleted';
    case 'delete':
      message = 'The transaction has been deleted';
      break;
    default:
      message = 'The transaction has been added';
      break;
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setDisplay(false);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div className='absolute bg-white border-l-8 border-green-500 rounded-md flex justify-between items-center gap-x-3 px-2 top-8 right-3'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 text-green-500'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <span>
        <h3>Success</h3>
        <p className='text-sm text-gray-600'>{message}</p>
      </span>
      <button
        type='button'
        className='text-gray-600'
        onClick={() => setDisplay(false)}
      >
        Close
      </button>
    </div>
  );
};

export default Message;
