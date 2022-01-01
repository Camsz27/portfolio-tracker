import React, { useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../store/AuthContext';

const RegisterForm = () => {
  const name = useRef();
  const username = useRef();
  const password = useRef();
  const confirm = useRef();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(false);

  const registrationHandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirm.current.value) {
      setError(true);
      return;
    }
    const newUser = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value,
      assets: [],
      currency: 'usd',
      language: 'eng',
    };
    const request = await fetch(`${server}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const response = await request.json();
    authContext.login(response._id);
    localStorage.setItem('user', response._id);
    localStorage.setItem('login', true);
    router.push('/');
  };

  return (
    <>
      <form
        action=''
        className='font-semibold flex flex-col space-y-6 text-xl justify-center min-h-screen ml-16 lg:w-3/4 lg:mx-auto'
        onSubmit={registrationHandler}
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
            ref={name}
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
            ref={username}
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
            ref={password}
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
            ref={confirm}
          />
        </span>
        {error && (
          <h2 className='text-red-600 font-bold text-lg'>
            Incorrect username or password
          </h2>
        )}
        <button className='bg-purple-500 text-secondary w-36 rounded-lg py-2 hover:bg-purple-700 transform transition duration-500 hover:scale-105 lg:w-1/6'>
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
