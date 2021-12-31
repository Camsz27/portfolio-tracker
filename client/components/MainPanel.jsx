import React, { useState, useEffect } from 'react';
import Assets from './Assets';
import Graphs from './Graphs';
import HeaderSummary from './HeaderSummary';

const userId = '61b68c7e91ad3a87651ddf6e';

const MainPanel = () => {
  const [assets, setAssets] = useState([]);
  const [summary, setSummary] = useState();
  const [statistics, setStatistics] = useState();

  const fetchSummary = async () => {
    const data = await fetch(`http://localhost:27182/users/${userId}/summary`);
    const response = await data.json();
    const statisticsResponse = {
      bestPerformer: response.bestPerformer,
      worstPerformer: response.worstPerformer,
      allTimeProfit: response.allTimeProfit,
      invested: response.invested,
    };
    setSummary(response);
    setStatistics(statisticsResponse);
  };

  const fetchUserAssets = async () => {
    const data = await fetch(`http://localhost:27182/users/${userId}`);
    const response = await data.json();
    setAssets(response.assets);
  };

  useEffect(() => {
    fetchUserAssets();
    fetchSummary();
  }, []);

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
