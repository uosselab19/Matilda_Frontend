import React from 'react';
import item_img1 from '../../assets/images/Explore/item_img.png';
import { Clothes } from './Dressup';

interface props {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

export const Preset = (props: props) => {
  //const clothes=props.clothes;
  const setClothes = props.setClothes;

  const presetDB = [
    { shirt: 'mindul1' } as Clothes,
    { shirt: 'mindul2' } as Clothes,
    { shirt: 'mindul3' } as Clothes,
    { shirt: 'mindul4' } as Clothes,
    { shirt: 'mindul5' } as Clothes
  ];

  const presetCard = (n: number) => {
    const entity = presetDB[n - 1];
    return (
      <div
        className="card"
        onClick={() => {
          setClothes(entity);
        }}
      >
        <img alt="" className="card-img" src={item_img1}></img>
        Preset {n}
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
