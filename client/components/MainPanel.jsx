import React from 'react';
import Graphs from './Graphs';
import HeaderSummary from './HeaderSummary';

const MainPanel = () => {
  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary />
      <Graphs />
    </div>
  );
};

export default MainPanel;
