import React, { useState } from 'react';
import Asset from './Asset';

const Assets = ({ assets }) => {
  const [active, setActive] = useState();
  return (
    <div className='w-5/6 mx-auto mt-5 pl-5 lg:pl-0'>
      <h2 className='text-3xl mb-5 font-bold'>Assets</h2>
      <section>
        <header className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-3 font-semibold border-b-2 border-purple-500 mb-3 text-sm md:text-base'>
          <h3 className='col-span-2'>Name</h3>
          <h3 className='col-span-1 relative -left-4 md:left-0'>Price</h3>
          <h3 className='hidden lg:col-span-1 lg:block'>24hr Variation</h3>
          <h3 className='col-span-1 relative -left-3 md:left-0'>Holdings</h3>
          <h3 className='hidden lg:col-span-1 lg:block'>Avg. Buy Price</h3>
          <h3 className='hidden md:col-span-1 md:block'>Profit/Loss</h3>
          <h3 className='hidden md:col-span-1 md:block'>Actions</h3>
        </header>
        <main className='space-y-4'>
          {assets.map((asset) => (
            <Asset
              key={asset.id}
              activeHandler={setActive}
              active={active}
              asset={asset}
              id={asset.id}
            />
          ))}
        </main>
      </section>
    </div>
  );
};

export default Assets;
