import React, { useEffect, useState } from 'react';
import { Market } from '../../components/Dressup/Market';
import { Preset } from '../../components/Dressup/Preset';
import { useView } from '../../hooks/useView';
import { useModel } from '../../hooks/useModel';

export interface Clothes {
  DR?: string;
  TOP?: string;
  OTR?: string;
  BTM?: string;
  SOX?: string;
  SH?: string;
  HAI?: string;
  HEA?: string;
  GLA?: string;
  BRA?: string;
  NEC?: string;
  EAR?: string;
  BAG?: string;
  MAS?: string;
  WIN?: string;
  NAI?: string;
  GLO?: string;
}

export const Dressup = () => {
  const [clothes, setClothes] = useState({ TOP: '상의' } as Clothes);
  useEffect(() => {
    const scene = useView();
    useModel('./assets/model/matilda/scene.gltf', scene);
  }, []);

  return (
    <main className="container mt-5 d-flex justify-content-center">
      <div className="col-12 row g-3">
        <Preset clothes={clothes} setClothes={setClothes} />
        <div id="View" className="col-6" />
        <div className="col-5 text-center">
          <Market clothes={clothes} setClothes={setClothes} />
          {/* <div className="row g-2">{cardList}</div> */}
        </div>
      </div>
    </main>
  );
};
