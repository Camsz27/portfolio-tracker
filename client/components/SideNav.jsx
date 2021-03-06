import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Settings from './Settings';
import AuthContext from '../store/AuthContext';
import { useRouter } from 'next/router';

const SideNav = ({ active }) => {
  const [collapse, setCollapse] = useState(true);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const collapseHandler = () => {
    setCollapse((prev) => !prev);
  };

  const logoutHandler = () => {
    authContext.logout();
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div
      className={`bg-purple-500 z-10 absolute lg:relative min-h-screen ${
        collapse ? 'px-4 md:px-6 lg:px-7' : 'pl-10'
      }`}
    >
      {modal && <Settings handler={setModal} />}
      <span
        className={`flex justify-between mt-10 mb-64 ${
          collapse ? 'flex-col items-center' : 'pr-7'
        }`}
      >
        <h1
          className={`text-white font-semibold text-3xl text-center ${
            collapse ? 'hidden' : ''
          }`}
        >
          Outfolio
        </h1>
        {collapse && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-9 w-9 stroke-current text-white transform transition duration-400 hover:scale-110 cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            onClick={collapseHandler}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        )}
        {!collapse && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-9 w-9 stroke-current text-white transform transition duration-400 hover:scale-110 cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            onClick={collapseHandler}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        )}
      </span>
      <ul
        className={`text-secondary text-xl flex flex-col justify-center gap-y-10 ${
          collapse ? '' : 'pr-16'
        }`}
      >
        <Link href='/' passHref>
          <li
            className={`grid grid-cols-6 group cursor-pointer transform transition duration-400 hover:scale-110 place-items-center ${
              active === 'dashboard' ? 'text-purple-800 font-bold' : ''
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`h-8 w-8 ${collapse ? 'col-span-6' : 'col-span-2'}`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            {!collapse && (
              <h4 className='col-span-4 group-hover:underline'>My Dashboard</h4>
            )}
          </li>
        </Link>
        <Link href='/transactions' passHref>
          <li
            className={`grid grid-cols-6 group cursor-pointer transform transition duration-400 hover:scale-110 place-items-center ${
              active === 'transactions' ? 'text-purple-800 font-bold' : ''
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              enableBackground='new 0 0 24 24'
              viewBox='0 0 24 24'
              className={`h-8 w-8 ${collapse ? 'col-span-6' : 'col-span-2'}`}
              fill='currentColor'
            >
              <path d='M0,0h24v24H0V0z' fill='none' />
              <g>
                <path d='M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z' />
                <rect height='2' width='6' x='9' y='7' />
                <rect height='2' width='2' x='16' y='7' />
                <rect height='2' width='6' x='9' y='10' />
                <rect height='2' width='2' x='16' y='10' />
              </g>
            </svg>
            {!collapse && (
              <h4 className='col-span-4 group-hover:underline'>Transactions</h4>
            )}
          </li>
        </Link>
        {/* <li
          className={`grid grid-cols-6 group cursor-pointer transform transition duration-400 hover:scale-110 place-items-center ${
            active === 'settings' ? 'text-purple-800' : ''
          }`}
          // onClick={() => setModal(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-8 w-8 ${collapse ? 'col-span-6' : 'col-span-2'}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          {!collapse && (
            <h4 className='col-span-4 group-hover:underline'>Settings</h4>
          )}
        </li> */}
        <li
          className={`grid grid-cols-6 group cursor-pointer transform transition duration-400 hover:scale-110 place-items-center`}
          onClick={logoutHandler}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-8 w-8 ${collapse ? 'col-span-6' : 'col-span-2'}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          {!collapse && (
            <h4 className='col-span-4 group-hover:underline'>Logout</h4>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
