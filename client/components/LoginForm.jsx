import React, { useRef, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthContext from '../store/AuthContext';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext.isLoggedIn) {
      router.back();
    }
  }, [authContext.isLoggedIn, router]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const request = await fetch(`${server}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    });
    if (request.status === 400) {
      setError(true);
    } else {
      const response = await request.json();
      authContext.login(response._id);
      localStorage.setItem('user', response._id);
      localStorage.setItem('login', true);
      router.push('/');
    }
  };
  return (
    <>
      <section className='min-h-full md:w-1/2 flex flex-col justify-center space-y-8 pl-10 md:pl-20'>
        <h1 className='text-5xl lg:text-7xl font-semibold'>
          Welcome back to <span className='text-purple-500'>OUTFOLIO</span>
        </h1>
        <form
          action=''
          className='text-gray-500 font-semibold flex flex-col space-y-6 text-xl'
          onSubmit={loginHandler}
        >
          <h3>Sign in to you account.</h3>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            className='rounded-lg w-56 lg:w-1/2 border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            required
            ref={username}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='rounded-lg w-56 lg:w-1/2 border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            required
            ref={password}
          />
          {error && (
            <h2 className='text-red-600 font-bold text-lg'>
              Incorrect username or password
            </h2>
          )}
          <button className='bg-purple-500 text-secondary font-semibold w-36 rounded-lg py-2 hover:bg-purple-700 transform transition duration-500 hover:scale-105 lg:w-1/4'>
            Sign in
          </button>
          <h4>
            {"Don't have an account? "}
            <Link href='/register'>
              <a className='text-purple-500'>Register</a>
            </Link>
          </h4>
        </form>
      </section>
      <section className='bg-purple-500 min-h-full text-white md:flex flex-col justify-center px-8 hidden md:w-1/2'>
        <h1 className='text-3xl lg:text-5xl font-semibold'>
          Keep track of your portfolio with an easy to use{' '}
          <span className='text-purple-900'>dashboard</span>
        </h1>
        <div className='flex mx-auto max-w-lg md:pt-3 lg:pt-12'>
          <Image
            src={'/preview.png'}
            layout='intrinsic'
            width={700}
            height={680}
            alt='app preview'
          />
        </div>
      </section>
    </>
  );
};

export default LoginForm;
