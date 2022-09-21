import { useEffect, useState } from 'react';
import { DressupMarket } from '../../components/Dressup/DressupMarket';
import { DressupPreset } from '../../components/Dressup/DressupPreset';
import useView from '../../hooks/threejs/useView';
import useModel from '../../hooks/threejs/useModel';
import useFittingRoom from '../../hooks/threejs/useFittingRoom';
import { Clothes } from '../../types/Clothes';
import { ResetbuyButton } from '../../components/Dressup/ResetbuyButton';
import { getUserInfo } from '../../utils/cookieUtil';

export const Dressup = () => {
  const [clothes, setClothes] = useState({} as Clothes);
  const [presetList, setPresetList] = useState([] as Clothes[]);
  const cookie = getUserInfo();
  const [modelHeight, roomWidth, roomHeight] = [60, 1024, 350];

  useEffect(() => {
    const scene = useView(modelHeight, roomWidth);
    useFittingRoom('wooden', roomWidth, roomHeight, scene);
    useModel('./assets/model/BaseMesh.glb', modelHeight, scene);
  }, []);

  useEffect(() => {
    (async () => {
      // useModel('./assets/model/matilda/scene.gltf', modelHeight, scene);
    })();
  }, []);

  return (
    <main className="container">
      <div className="row">
        <div className="col-12 fs-2 fw-bold my-4 text-center">Dress Up</div>
        <div className="col-12 mb-4 text-center">{Object.entries(clothes).map((elem) => { return [elem[0], elem[1].title].join(":") }).join(" ")}</div>
        <div className='col-1 row g-1'>
          <div id="Preset" className={`${(cookie ? "d-block" : "d-none")} align-self-start`}>
            <DressupPreset
              clothes={clothes}
              setClothes={setClothes}
              presetList={presetList}
              setPresetList={setPresetList} />
          </div>
          <div className={`align-self-end my-5 w-100`}>
            <ResetbuyButton setClothes={setClothes} />
          </div>
        </div>
        <div id="View" className="col-5" />
        <div id="Market" className="col-6">
          <DressupMarket
            clothes={clothes}
            setClothes={setClothes}
            presetList={presetList} />
        </div>
      </div>
    </main>
  );
};
