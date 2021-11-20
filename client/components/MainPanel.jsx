import React from 'react';
import Assets from './Assets';
import Graphs from './Graphs';
import HeaderSummary from './HeaderSummary';

const MainPanel = () => {
  return (
    <div className='flex-grow lg:ml-0 ml-12'>
      <HeaderSummary />
      <Graphs />
      <Assets />
    </div>
  );
};

export default MainPanel;
