import React from 'react';
import Head from 'next/head';

const register = () => {
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <form
        action=''
        className='font-semibold flex flex-col space-y-6 text-xl justify-center min-h-screen ml-16 lg:w-3/4 lg:mx-auto'
      >
        <h1 className='text-5xl lg:text-7xl lg:w-2/3'>Create your account</h1>
        <span>
          <label htmlFor='name' className='block text-gray-600 text-base'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            className='rounded-lg w-56 md:w-1/3 border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            required
          />
        </span>
        <span>
          <label htmlFor='username' className='block text-gray-600 text-base'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            className='rounded-lg w-56 md:w-1/3 border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            required
          />
        </span>
        <span>
          <label htmlFor='password' className='block text-gray-600 text-base'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='rounded-lg w-56 md:w-1/3 border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            required
          />
        </span>
        <span>
          <label
            htmlFor='confirmPassword'
            className='block text-gray-600 text-base'
          >
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Confirm Password'
            className='rounded-lg w-56 md:w-1/3 border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            required
          />
        </span>
        <button className='bg-purple-500 text-secondary w-36 rounded-lg py-2 hover:bg-purple-700 transform transition duration-500 hover:scale-105 lg:w-1/6'>
          Register
        </button>
      </form>
    </div>
  );
};

export default register;
