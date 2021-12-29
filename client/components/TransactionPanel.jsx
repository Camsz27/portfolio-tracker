import React, { useState, useEffect } from 'react';
import HeaderSummary from './HeaderSummary';
import Transactions from './Transactions';

const userId = '61b68c7e91ad3a87651ddf6e';

const TransactionPanel = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState();

  const fetchSummary = async () => {
    const data = await fetch(`http://localhost:27182/users/${userId}/summary`);
    const response = await data.json();
    setSummary(response);
  };

  const fetchUserTransactions = async () => {
    const data = await fetch(
      `http://localhost:27182/users/${userId}/transactions`
    );
    const response = await data.json();
    setTransactions(response);
  };

  useEffect(() => {
    fetchUserTransactions();
    fetchSummary();
  }, []);

  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary transaction={true} information={summary} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default TransactionPanel;
