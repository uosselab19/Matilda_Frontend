import React, { useEffect, useState } from 'react';
import { Market } from '../../components/Dressup/Market';
import { Preset } from '../../components/Dressup/Preset';
import useView from '../../hooks/threejs/useView';
import useModel from '../../hooks/threejs/useModel';
import useFittingRoom from '../../hooks/threejs/useFittingRoom';
import { Clothes } from '../../types/Clothes';

export const Dressup = () => {
  const [clothes, setClothes] = useState({ TOP: '상의' } as Clothes);
  useEffect(() => {
    const [modelHeight, roomWidth, roomHeight] = [60, 1024, 350];
    const scene = useView(modelHeight, roomWidth);
    useFittingRoom('wooden', roomWidth, roomHeight, scene);
    useModel('./assets/model/matilda/scene.gltf', modelHeight, scene);
  }, []);

  return (
    <main className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-12 fs-2 fw-bold my-4 text-center">dress up</div>
        <div id="Preset" className="col-1">
          <Preset clothes={clothes} setClothes={setClothes} />
        </div>
        <div id="View" className="col-5" />
        <div id="Market" className="col-6">
          <Market clothes={clothes} setClothes={setClothes} />
        </div>
      </div>
    </main>
  );
};
