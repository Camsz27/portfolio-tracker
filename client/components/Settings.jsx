import React from 'react';

const Settings = ({ handler }) => {
  return (
    <div className='absolute top-0 left-0 z-10 w-screen h-screen backdrop-filter backdrop-brightness-75 flex items-center md:text-lg'>
      <content
        className='xl:w-1/4 md:w-1/2 mx-auto bg-purple-500 text-white rounded-lg flex flex-col pb-5 lg:pb-7'
        style={{ minWidth: '290px' }}
      >
        <span className='flex items-center justify-between mx-3 my-2'>
          <h1 className='text-2xl font-bold'>Settings</h1>
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
      </content>
    </div>
  );
};

export default Settings;
