import React, { useState } from 'react';
import Transaction from './Transaction';

const Transactions = ({ transactions }) => {
  const [active, setActive] = useState();
  return (
    <div className='w-5/6 mx-auto mt-5 pl-5 lg:pl-0'>
      <h2 className='text-xl md:text-3xl mb-5 font-bold'>Transactions</h2>
      <section>
        <header className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 font-semibold border-b-2 border-purple-500 mb-3 text-sm md:text-base'>
          <h3 className='col-span-2'>Name</h3>
          <h3 className='col-span-1 relative -left-6 md:left-0'>Type</h3>
          <h3 className='hidden lg:col-span-1 lg:block'>Date</h3>
          <h3 className='col-span-1 relative -left-4 md:left-0'>Price</h3>
          <h3 className='hidden lg:col-span-1 lg:block'>Amount</h3>
          <h3 className='hidden md:col-span-1 md:block'>Fees</h3>
          <h3 className='hidden md:col-span-1 md:block'>Actions</h3>
        </header>
        <main className='space-y-4'>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction._id}
              activeHandler={setActive}
              id={transaction._id}
              active={active}
              data={transaction}
            />
          ))}
          {transactions.length === 0 && (
            <div className='flex font-bold mt-10 gap-x-10 flex-col lg:flex-row items-center gap-y-5'>
              You have no assets, add one first!
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default Transactions;
