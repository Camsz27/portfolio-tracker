import React, { useState } from 'react';

const Graphs = () => {
  const [active, setActive] = useState('chart');
  return (
    <div className='w-5/6 mx-auto mt-5 pl-5 lg:pl-0'>
      <header className='flex justify-between lg:w-1/3 md:w-96 mb-3'>
        <button
          className={`${
            active === 'chart' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white rounded-xl px-2.5 py-1 md:px-3.5 md:py-2 hover:bg-purple-600 transform transition duration-500 hover:scale-105`}
          onClick={() => setActive('chart')}
        >
          Chart
        </button>
        <button
          className={`${
            active === 'allocation' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white rounded-xl px-2.5 py-1 md:px-3.5 md:py-2 hover:bg-purple-600 transform transition duration-500 hover:scale-105`}
          onClick={() => setActive('allocation')}
        >
          Allocation
        </button>
        <button
          className={`${
            active === 'statistics' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white rounded-xl px-2.5 py-1 md:px-3.5 md:py-2 hover:bg-purple-600 transform transition duration-500 hover:scale-105`}
          onClick={() => setActive('statistics')}
        >
          Statistics
        </button>
      </header>
      <section className='h-56 md:h-96 bg-yellow-800'></section>
    </div>
  );
};

export default Graphs;
