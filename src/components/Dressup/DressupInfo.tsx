import React from 'react';
import { Clothes } from '../../types/Clothes';
import { BlankMessage } from '../load/BlankMessage';
import { DressupCard } from './DressupCard';

interface DressupInfoProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>;
  scene: THREE.Scene;
}

export const DressupInfo = (props: DressupInfoProps) => {
  const { clothes, setClothes, scene } = props;

  return (
    <div className="container">
      <BlankMessage isFull={Object.entries(clothes).length > 0} blankMessage={`입고 있는 옷이 없습니다.`}>
        <DressupCard
          clothes={clothes}
          setClothes={setClothes}
          scene={scene} />
      </BlankMessage>
    </div>
  );
};
