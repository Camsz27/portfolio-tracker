import React, { useState } from 'react';
import DeleteModal from './DeleteModal';
import Toast from './Toast';
import EditTransaction from './EditTransaction';
import Message from './Message';

const Transaction = ({ activeHandler, id, active, data }) => {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changeType, setChangeType] = useState();
  const [type, setType] = useState();
  let date = new Date(data.date);
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
        (type === 'edit' ? (
          <EditTransaction
            handler={setModal}
            amount={data.quantity}
            price={data.pricePerCoin}
            dateAdded={date}
            id={id}
            successHandler={setSuccess}
            changeType={setChangeType}
          />
        ) : (
          <DeleteModal handler={setModal} asset={false} />
        ))}
      <span className='col-span-2 flex items-center space-x-6 md:w-5/6'>
        <h3>{data.coin.name}</h3>
        <h3 className='hidden lg:block text-gray-700'>
          {data.coin.symbol.toUpperCase()}
        </h3>
      </span>
      <h5 className='col-span-1'>{data.type}</h5>
      <h5 className='hidden lg:col-span-1 lg:flex items-center'>
        {date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </h5>
      <h5 className='hidden lg:col-span-1 lg:block'>${data.pricePerCoin}</h5>
      <span className='col-span-1'>
        <h3>{`${data.type === 'buy' ? '+' : '−'} $${(
          data.quantity * data.pricePerCoin
        ).toFixed(2)}`}</h3>
        <h5
          className={`text-sm ${
            data.type === 'buy' ? 'text-green-500' : 'text-red-500'
          }`}
        >{`${data.type === 'buy' ? '+' : '−'} ${
          data.quantity
        } ${data.coin.symbol.toUpperCase()}`}</h5>
      </span>
      <h5 className='hidden md:col-span-1 md:block ml-3'>- -</h5>
      <span className='hidden md:col-span-1 md:flex gap-x-4'>
        <button
          className='transform transition duration-300 hover:scale-125'
          onClick={() => {
            setModal(true);
            setType('edit');
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
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
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
          asset={false}
        />
      )}
    </div>
  );
};

export default Transaction;
