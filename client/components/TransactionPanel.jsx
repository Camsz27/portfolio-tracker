import React, { useState, useEffect } from 'react';
import HeaderSummary from './HeaderSummary';
import Transactions from './Transactions';

const userId = '61b68c7e91ad3a87651ddf6e';

const TransactionPanel = () => {
  const [transactions, setTransactions] = useState([]);
  const fetchUserTransactions = async () => {
    const data = await fetch(
      `http://localhost:27182/users/${userId}/transactions`
    );
    const response = await data.json();
    setTransactions(response);
  };
  useEffect(() => {
    fetchUserTransactions();
  }, []);
  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary transaction={true} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default TransactionPanel;
