import React from 'react';
// import item_img1 from '../../assets/images/Explore/item_img.png';
import { Clothes } from './Dressup';

interface props {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Preset = (props: props) => {
  //const clothes=props.clothes;
  const setClothes = props.setClothes;

  const presetDB = [];
  const loadPresetDB = (presetDB: Array<Clothes>) => {
    presetDB.push({ shirt: 'mindul1' });
    presetDB.push({ shirt: 'mindul2' });
    presetDB.push({ shirt: 'mindul3' });
    presetDB.push({ shirt: 'mindul4' });
    presetDB.push({ shirt: 'mindul5' });
  };
  loadPresetDB(presetDB);

  const presetCard = (n: number) => {
    const entity = presetDB[n - 1];
    return (
      <div className="card w-100">
        {/* <img alt="" className="card-img" src={item_img1}
          onClick={() => {
            setClothes(entity);
          }}
        /> */}
        <div className="btn-light py-2">Preset {n}</div>
        <button
          className="btn-dark text-white py-1"
          onClick={() => {
            setClothes(entity);
          }}
        >
          Load
        </button>

        <button
          className="btn-dark text-white py-1"
          onClick={() => {
            alert(n);
          }}
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="col-1 d-flex align-content-between flex-wrap text-center">
      {presetCard(1)}
      {presetCard(2)}
      {presetCard(3)}
      {presetCard(4)}
      {presetCard(5)}
    </div>
  );
};
