import React from 'react';
import Head from 'next/head';
import RegisterForm from '../components/RegisterForm';

const register = () => {
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterForm />
    </div>
  );
};

export default register;
