import React, { useState, useEffect } from 'react';
import AddTransaction from './AddTransaction';
import Toast from './Toast';
import DeleteModal from './DeleteModal';
import Image from 'next/image';
import Message from './Message';

const Asset = ({ activeHandler, id, active, asset }) => {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changeType, setChangeType] = useState();
  const [type, setType] = useState();
  const [coin, setCoin] = useState(asset.coin._id);
  const [coinInformation, setCoinInformation] = useState();

  const fetchCoinInformation = async (coin) => {
    const data = await fetch(`${server}/information/${coin}`);
    const response = await data.json();
    setCoinInformation(response);
  };

  useEffect(() => {
    fetchCoinInformation(coin);
  }, [coin]);

  if (!coinInformation) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 items-center border-b border-gray-600 mb-3 text-sm md:text-base'
      onClick={() => {
        if (active === id || !active) {
          if (!toast) {
            activeHandler(id);
          } else {
            activeHandler();
          }
          setToast((prev) => !prev);
        }
      }}
    >
      {success && <Message type={changeType} />}
      {modal &&
        (type === 'add' ? (
          <AddTransaction
            handler={setModal}
            asset={coinInformation}
            id={id}
            successHandler={setSuccess}
            changeType={setChangeType}
          />
        ) : (
          <DeleteModal
            handler={setModal}
            asset={true}
            id={id}
            assetId={id}
            successHandler={setSuccess}
            changeType={setChangeType}
          />
        ))}
      <span className='col-span-2 flex md:w-5/6 items-center space-x-4'>
        <div className='hidden md:block'>
          <Image
            src={coinInformation.image}
            height={30}
            width={30}
            alt='coin logo'
          />
        </div>
        <h3 className='relative -left-3 md:left-0'>{coinInformation.name}</h3>
        <h3 className='hidden lg:block text-gray-700'>
          {coinInformation.symbol.toUpperCase()}
        </h3>
      </span>
      <h5 className='col-span-1 text-xs md:text-sm lg:text-base relative -left-4 md:left-0'>
        ${coinInformation.price}
      </h5>
      <span
        className={`hidden lg:col-span-1 lg:flex items-center ${
          coinInformation.variationPercentage >= 0
            ? 'text-green-500'
            : 'text-red-500'
        }`}
      >
        {coinInformation.variationPercentage >= 0 ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-7 w-7'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 15l7-7 7 7'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-7 w-7'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        )}
        <h3>{coinInformation.variationPercentage.toPrecision(2)}%</h3>
      </span>
      <span className='col-span-1 ml-3 relative -left-3 md:left-0'>
        <h3 className='hidden md:block text-sm'>
          ${(asset.quantity * coinInformation.price).toFixed(2)}
        </h3>
        <h5 className='text-gray-700 text-xs md:text-sm'>{`${
          asset.quantity
        } ${asset.coin.symbol.toUpperCase()}`}</h5>
      </span>
      <h5 className='hidden lg:col-span-1 lg:block ml-8'>
        ${asset.averagePrice.toFixed(2)}
      </h5>
      <span className='hidden md:col-span-1 md:flex flex-col items-start text-sm'>
        <h3 className='w-5/6 pl-2.5'>
          {asset.quantity * (coinInformation.price - asset.averagePrice) >= 0
            ? '+'
            : '???'}{' '}
          $
          {Math.abs(
            asset.quantity * (coinInformation.price - asset.averagePrice)
          ).toFixed(1)}
        </h3>
        <span
          className={`flex items-center w-5/6 text-sm ${
            asset.quantity * (coinInformation.price - asset.averagePrice) >= 0
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {asset.quantity * (coinInformation.price - asset.averagePrice) >=
          0 ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 15l7-7 7 7'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          )}
          <h3>
            {(
              ((asset.quantity * (coinInformation.price - asset.averagePrice)) /
                (asset.quantity * asset.averagePrice)) *
              100
            ).toFixed(2)}
            %
          </h3>
        </span>
      </span>
      <span className='hidden md:col-span-1 md:flex gap-x-4'>
        <button
          className='transform transition duration-300 hover:scale-125'
          onClick={() => {
            setModal(true);
            setType('add');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
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
        </button>
        <button
          className='transform transition duration-300 hover:scale-125'
          onClick={() => {
            setModal(true);
            setType('delete');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
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
        </button>
      </span>
      {toast && (
        <Toast
          modalHandler={setModal}
          typeHandler={setType}
          toastHandler={setToast}
          asset={true}
        />
      )}
    </div>
  );
};

export default Asset;
