import React from 'react';
import { MarketCard } from './MarketCard';

export const Market = () => {
  return (
    <div>
      <div>
      <section className="container py-3 text-center">
        <form>
          <div className="row">
            <div className='col-2'/>
            <input className="col-6" type="search" placeholder="Search" aria-label="Search" />
            <button
              className="btn btn-outline-success mx-3 col-2"
              type="submit"
              onClick={() => {alert()}}
            >
              Search
            </button>
          </div>
        </form>
      </section>
      </div>
      <div className='row g-1'>
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
      </div>
    </div>
  );
};
