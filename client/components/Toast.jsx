import React from 'react';

const Toast = ({ modalHandler, typeHandler, toastHandler, asset }) => {
  return (
    <div className='md:hidden absolute bg-purple-500 text-white rounded-lg px-3 py-1 right-2 mb-3'>
      {asset ? (
        <button
          className='transform transition duration-300 hover:scale-125 flex items-center gap-x-1'
          onClick={() => {
            toastHandler(false);
            modalHandler(true);
            typeHandler('add');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
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
          Add
        </button>
      ) : (
        <button
          className='transform transition duration-300 hover:scale-125 flex items-center gap-x-1'
          onClick={() => {
            toastHandler(false);
            modalHandler(true);
            typeHandler('edit');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
            />
          </svg>
          Edit
        </button>
      )}
      <button
        className='transform transition duration-300 hover:scale-125 flex items-center gap-x-1'
        onClick={() => {
          toastHandler(false);
          modalHandler(true);
          typeHandler('delete');
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
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
        Delete
      </button>
    </div>
  );
};

export default Toast;
