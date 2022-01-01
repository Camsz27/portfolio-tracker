import React, { useState, useEffect, useCallback, useContext } from 'react';
import HeaderSummary from './HeaderSummary';
import Transactions from './Transactions';
import AuthContext from '../store/AuthContext';
import { useRouter } from 'next/router';

const TransactionPanel = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState();
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const fetchSummary = useCallback(async () => {
    const data = await fetch(`${server}/users/${authContext.user}/summary`);
    const response = await data.json();
    setSummary(response);
  }, [authContext.user]);

  const fetchUserTransactions = useCallback(async () => {
    const data = await fetch(
      `${server}/users/${authContext.user}/transactions`
    );
    const response = await data.json();
    setTransactions(response);
  }, [authContext.user]);

  useEffect(() => {
    if (authContext.user) {
      fetchUserTransactions();
      fetchSummary();
    } else {
      router.push('/login');
    }
  }, [authContext.user, fetchSummary, fetchUserTransactions, router]);

  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary mainPanel={true} information={summary} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default TransactionPanel;
