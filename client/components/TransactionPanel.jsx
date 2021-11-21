import React from 'react';
import HeaderSummary from './HeaderSummary';
import Transactions from './Transactions';

const TransactionPanel = () => {
  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary transaction={true} />
      <Transactions />
    </div>
  );
};

export default TransactionPanel;
