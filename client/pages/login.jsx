import React from 'react';

const login = () => {
  return (
    <div className='flex min-h-screen text-primary'>
      <section className='min-h-full w-1/2 flex flex-col justify-center px-8 space-y-8'>
        <h1 className='text-7xl font-semibold'>
          Welcome back to <span className='text-purple-500'>OUTFOLIO</span>
        </h1>
        <form
          action=''
          className='text-gray-500 font-semibold flex flex-col space-y-6 text-xl'
        >
          <h3>Sign in to you account.</h3>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            className='rounded-lg border-2 border-purple-500'
            required
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='rounded-lg focus:border-purple-500 focus:border-2'
            required
          />
          <button className='bg-purple-500 text-secondary font-semibold w-1/4 rounded-lg py-2 hover:bg-purple-700 transform transition duration-500 hover:scale-105'>
            Sign in
          </button>
          <h4>
            Don't have an account?{' '}
            <a href='register' className='text-purple-500'>
              Register
            </a>
          </h4>
        </form>
      </section>
      <section className='bg-purple-500 min-h-full w-1/2 text-white flex flex-col justify-center px-8'>
        <h1 className='text-5xl font-semibold'>
          Keep track of your portfolio with an easy to use{' '}
          <span className='text-purple-900'>dashboard</span>
        </h1>
        <div className='flex items-center justify-center w-11/12 mx-auto bg-black h-96'>
          Here goes picture
        </div>
      </section>
    </div>
  );
};

export default login;
