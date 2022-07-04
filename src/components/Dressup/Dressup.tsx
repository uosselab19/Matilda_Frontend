import React, { useState } from 'react';
import { View } from './View';
import { Market } from './Market';
import { Preset } from './Preset';

export interface Clothes {
  shirt?: string;
}

export const Dressup = () => {
  const [clothes, setClothes] = useState({ shirt: '상의' } as Clothes);
  return (
    <main className="container mt-5 d-flex justify-content-center">
      <div className="col-12 row g-3">
        <Preset clothes={clothes} setClothes={setClothes} />
        <View clothes={clothes} setClothes={setClothes} />
        <Market clothes={clothes} setClothes={setClothes} />
      </div>
    </main>
  );
};
