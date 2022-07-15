import React, { useEffect, useState } from 'react';
// import item_img1 from '../../assets/images/Explore/item_img.png';
import { Clothes } from '../../types/Clothes';

interface PresetProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Preset = (props: PresetProps) => {
  const { setClothes }=props;
  const [ presetItemList ] = useState([] as Clothes[]);

  useEffect(() => {
    (async () => {
      //const { data } = await selectItem(selectCondition);

     // setPresetItemList(data);
    })();
  }, []);

  const loadPresetDB = (presetDB: Array<Clothes>) => {
    presetDB.push({ TOP: 'mindul1' });
    presetDB.push({ TOP: 'mindul2' });
    presetDB.push({ TOP: 'mindul3' });
    presetDB.push({ TOP: 'mindul4' });
    presetDB.push({ TOP: 'mindul5' });
  };
  loadPresetDB(presetItemList);

  const presetCard = (n: number) => {
    const entity = presetItemList[n - 1];
    return (
      <div className="card w-100">
        <div className="btn-light py-2 card-header"
          data-bs-toggle="collapse" data-bs-target={`#collapseExample${n}`}
          aria-expanded="false" aria-controls={`collapseExample${n}`}>
          Preset {n}
        </div>
        <div className="collapse" id={`collapseExample${n}`}>
          <button
            className="btn-dark text-white py-1 w-100"
            onClick={() => {setClothes(entity);}}
          > Load </button>
          <button
              className="btn-dark text-white py-1 w-100"
            onClick={() => {setClothes(entity);}}
          > Save </button>
          <button
            className="btn-dark text-white py-1 w-100"
            onClick={() => {setClothes(entity);}}
          > Reset </button>
          <button
            className="btn-dark text-white py-1 w-100"
            onClick={() => {alert(n);}}
          > Buy </button>
        </div>
      </div>
    );
  };

  return (
    <div className='h-100 d-flex align-content-between flex-wrap'>
      {presetCard(1)}
      {presetCard(2)}
      {presetCard(3)}
      {presetCard(4)}
      {presetCard(5)}
    </div>
  );
};
