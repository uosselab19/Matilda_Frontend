import React from 'react';
import { View } from "./View"
import { Market } from './Market';
import { Preset } from './Preset';

export const Dressup = () => {
  return (
    <main className="container mt-5 d-flex justify-content-center">
      <div className='row g-3'>
        <Preset />
        <View />
        <Market />
      </div>
    </main>
  );
};