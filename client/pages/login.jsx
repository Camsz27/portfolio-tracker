import React from 'react';
import Head from 'next/head';
import LoginForm from '../components/LoginForm';

const login = () => {
  return (
    <div className='flex min-h-screen text-primary'>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </div>
  );
};

export default login;
