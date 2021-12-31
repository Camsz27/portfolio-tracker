import React, { useState } from 'react';
import Image from 'next/image';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const colors = [
  '#9333ea',
  '#4c5fc9',
  '#2875b9',
  '#048ba8',
  '#f7996e',
  '#f25f5e',
  '#ed254e',
  '#e7dfc6',
  '#faa916',
  '#edd2e0',
];

const Graphs = ({ statistics, data }) => {
  const [active, setActive] = useState('allocation');

  if (!statistics || !data) {
    return (
      <div className='w-5/6 mx-auto mt-10 pl-5 lg:pl-0 h-24'>
        <h4 className='text-gray-600 text-3xl mb-3'>Loading...</h4>
      </div>
    );
  }

  const customizedLabel = ({ x, y, value }) => {
    return (
      <text
        x={x}
        y={y}
        fill='current'
        dy={3}
        dx={-2}
        className='font-bold'
        textAnchor='end'
      >
        <tspan
          alignmentBaseline='middle'
          fontSize='26'
          className='hidden'
        >{`${value.toFixed(2)}%`}</tspan>
        <tspan fontSize='14'>{`${value.toFixed(2)}%`}</tspan>
      </text>
    );
  };

  const bestPerformer = statistics.bestPerformer;
  const worstPerformer = statistics.worstPerformer;

  const statisticsJsx = (
    <section className='flex font-bold mt-10 gap-x-10 flex-col lg:flex-row items-center gap-y-5'>
      <div>
        <h3 className='text-gray-600 text-xl text-center'>All Time Profit</h3>
        <span
          className={`flex items-center ${
            statistics.allTimeProfit >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className={`fill-current w-6 md:w-8 md:h-8 ${
              statistics.allTimeProfit >= 0 ? '' : 'transform rotate-180'
            }`}
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M7 14l5-5 5 5H7z' />
          </svg>
          <p>{`${(statistics.allTimeProfit / statistics.invested).toFixed(
            2
          )}% (${statistics.allTimeProfit >= 0 ? '+' : '−'}$${Math.abs(
            statistics.allTimeProfit.toFixed(2)
          )})`}</p>
        </span>
      </div>
      <div className='flex items-center gap-x-5 lg:gap-x-0'>
        <span>
          <Image
            src={bestPerformer.image}
            alt={bestPerformer.name}
            width={40}
            height={40}
          />
        </span>
        <span className='text-center'>
          <h3 className='text-gray-600 text-xl text-center'>Best Performer</h3>
          <span
            className={`flex items-center ${
              bestPerformer.profit >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className={`fill-current w-6 md:w-8 md:h-8 ${
                bestPerformer.profit >= 0 ? '' : 'transform rotate-180'
              }`}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M7 14l5-5 5 5H7z' />
            </svg>
            <p>{`${(
              bestPerformer.profit /
              (bestPerformer.quantity * bestPerformer.averagePrice)
            ).toFixed(2)}% (${bestPerformer.profit >= 0 ? '+' : '−'}$${Math.abs(
              bestPerformer.profit.toFixed(2)
            )})`}</p>
          </span>
        </span>
      </div>
      <div className='flex items-center gap-x-5'>
        <span>
          <Image
            src={worstPerformer.image}
            alt={worstPerformer.name}
            width={40}
            height={40}
          />
        </span>
        <span className='text-center'>
          <h3 className='text-gray-600 text-xl text-center'>Worst Performer</h3>
          <span
            className={`flex items-center ${
              worstPerformer.profit >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className={`fill-current w-6 md:w-8 md:h-8 ${
                worstPerformer.profit >= 0 ? '' : 'transform rotate-180'
              }`}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M7 14l5-5 5 5H7z' />
            </svg>
            <p>{`${(
              worstPerformer.profit /
              (worstPerformer.quantity * worstPerformer.averagePrice)
            ).toFixed(2)}% (${
              worstPerformer.profit >= 0 ? '+' : '−'
            }$${Math.abs(worstPerformer.profit.toFixed(2))})`}</p>
          </span>
        </span>
      </div>
    </section>
  );

  const allocationJsx = (
    <ResponsiveContainer
      width={'90%'}
      minWidth={250}
      minHeight={600}
      height={'100%'}
    >
      <PieChart className='flex justify-center'>
        <Pie
          dataKey='percentage'
          nameKey='name'
          isAnimationActive
          data={data}
          fill='#9333ea'
          label={customizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend verticalAlign='top' height={36} />
        <Tooltip formatter={(value, name) => `${value.toFixed(2)}%`} />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className='w-5/6 mx-auto mt-5 pl-5 lg:pl-0'>
      <header className='flex justify-between gap-x-1 lg:w-1/3 md:w-96 mb-3'>
        <button
          className={`${
            active === 'allocation' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white rounded-xl px-2 py-1 md:px-3.5 md:py-2 hover:bg-purple-600 transform transition duration-500 hover:scale-105`}
          onClick={() => setActive('allocation')}
        >
          Allocation
        </button>
        <button
          className={`${
            active === 'statistics' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white rounded-xl px-2 py-1 md:px-3.5 md:py-2 hover:bg-purple-600 transform transition duration-500 hover:scale-105`}
          onClick={() => setActive('statistics')}
        >
          Statistics
        </button>
        <button
          className={`${
            active === 'chart' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white rounded-xl px-2 py-1 md:px-3.5 md:py-2 hover:bg-purple-600 transform transition duration-500 hover:scale-105`}
          onClick={() => setActive('chart')}
          disabled
        >
          Chart
        </button>
      </header>
      {active === 'chart' && (
        <section className='h-56 md:h-96 bg-yellow-800'></section>
      )}
      {active === 'allocation' && allocationJsx}
      {active === 'statistics' && statisticsJsx}
    </div>
  );
};

export default Graphs;
