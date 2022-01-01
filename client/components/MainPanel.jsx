import React, { useState, useEffect, useContext, useCallback } from 'react';
import Assets from './Assets';
import Graphs from './Graphs';
import HeaderSummary from './HeaderSummary';
import AuthContext from '../store/AuthContext';
import { useRouter } from 'next/router';

const MainPanel = () => {
  const [assets, setAssets] = useState([]);
  const [summary, setSummary] = useState();
  const [statistics, setStatistics] = useState();
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const fetchSummary = useCallback(async () => {
    const data = await fetch(`${server}/users/${authContext.user}/summary`);
    const response = await data.json();
    const statisticsResponse = {
      bestPerformer: response.bestPerformer,
      worstPerformer: response.worstPerformer,
      allTimeProfit: response.allTimeProfit,
      invested: response.invested,
    };
    setSummary(response);
    setStatistics(statisticsResponse);
  }, [authContext.user]);

  const fetchUserAssets = useCallback(async () => {
    const data = await fetch(`${server}/users/${authContext.user}`);
    const response = await data.json();
    setAssets(response.assets);
  }, [authContext.user]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && authContext.isLoggedIn) {
      fetchUserAssets();
      fetchSummary();
    } else {
      router.push('/login');
    }
    return () => (isMounted = false);
  }, [
    authContext.isLoggedIn,
    authContext.user,
    fetchSummary,
    fetchUserAssets,
    router,
  ]);

  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary mainPanel={true} information={summary} />
      {summary && (
        <Graphs statistics={statistics} data={summary.assetsResults} />
      )}
      <Assets assets={assets} />
    </div>
  );
};

export default MainPanel;
