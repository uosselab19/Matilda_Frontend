import { useEffect, useState } from 'react';
import { DressupItems } from '../../components/Dressup/DressupItems';
import { DressupPreset } from '../../components/Dressup/DressupPreset';
import { DressupInfo } from '../../components/Dressup/DressupInfo';
import createView from '../../utils/threejs/threeViewUtil';
import { loadModel, removeModel } from '../../utils/threejs/threeModelUtil';
import createFittingRoom from '../../utils/threejs/threeRoomUtil';
import { Clothes } from '../../types/Clothes';
import { Scene } from 'three';
import { NavButtons } from '../../components/Navigation/NavButtons';
import { DetailItem } from '../../types/Item';
import { getUserInfo } from '../../utils/cookieUtil';
import { BlankMessage } from '../../components/load/BlankMessage';
import { Subpage } from '../../components/Navigation/Subpage';

export const Dressup = () => {
  const [scene] = useState(new Scene() as Scene);
  const [clothes, setClothes] = useState({} as Clothes);
  const [changedClothes, setChangedClothes] = useState({} as DetailItem);
  const [presetList, setPresetList] = useState([] as Clothes[]);
  const [selectedNavButton, setSelectedNavButton] = useState('Marketplace');
  const [modelHeight, roomWidth, roomHeight] = [60, 512, 200];

  const navItems = [
    {
      key: 'Marketplace',
      title: 'Marketplace',
      page:
        <DressupItems
          clothes={clothes}
          setClothes={setClothes}
          presetList={presetList}
          options={{ stateCodes: 'OS' }}
          setChangedClothes={setChangedClothes} />
    }, {
      key: 'Mypage',
      title: 'My page',
      page:
        <BlankMessage isFull={getUserInfo()} blankMessage={'로그인이 필요한 페이지입니다.'}>
          <DressupItems
            clothes={clothes}
            setClothes={setClothes}
            presetList={presetList}
            options={{ memberNum: getUserInfo()?.num, stateCodes: 'OS,NOS' }}
            setChangedClothes={setChangedClothes} />
        </BlankMessage>
    }, {
      key: 'Info',
      title: 'Clothes Info',
      page:
        <DressupInfo
          clothes={clothes}
          setClothes={setClothes}
          setPresetList={setPresetList}
          scene={scene} />
    }, {
      key: 'Preset',
      title: 'Preset',
      page:
        <BlankMessage isFull={getUserInfo()} blankMessage={'로그인이 필요한 페이지입니다.'}>
          <DressupPreset
            clothes={clothes}
            setClothes={setClothes}
            presetList={presetList}
            setPresetList={setPresetList}
            scene={scene} />
        </BlankMessage>
    },
  ];

  //초기 3D 방 세팅
  useEffect(() => {
    (async () => {
      createView(modelHeight, roomWidth, roomHeight, scene);
      createFittingRoom('wooden', roomWidth, roomHeight, scene);
      loadModel('BaseMesh', './assets/model/BaseMesh.glb', modelHeight, 0, scene);
    })();
  }, []);

  //옷을 입기 위한 코드
  useEffect(() => {
    (async () => {
      //옷을 안 입었으면 확인할 필요가 없음
      if (!Object.entries(clothes).length) return;

      //이미 입은 카테고리의 옷을 입으려고 시도하면 그 전에 있던 옷을 지워야 함
      //그거 지우는 코드
      removeModel(changedClothes, scene);

      //옷 입기 코드
      let h, y;
      if (changedClothes.catCode == 'TOP') {
        h = 0.4 * modelHeight
        y = 41
      } else if (changedClothes.catCode == 'BTM') {
        h = 0.55 * modelHeight
        y = 17
      } else if (changedClothes.catCode == 'HEA') {
        h = 0.09 * modelHeight
        y = 57
      } else if (changedClothes.catCode == 'DRE') {
        h = 0.68 * modelHeight
        y = 32
      }

      loadModel(
        changedClothes.catCode,
        `https://nftstorage.link/ipfs/${changedClothes.tokenUri.slice(7)}`,
        h, y, scene);
    })();
  }, [changedClothes]);

  return (
    <main className="container">
      <div className="row">
        <div className="col-12 fs-2 fw-bold my-4 text-center">Dress Up</div>
        <div id="View" className="col-5 px-0" />
        <div id="page" className="col-7">
          <div className="my-3">
            <NavButtons
              navItems={navItems}
              selectedNavButton={selectedNavButton}
              onClick={setSelectedNavButton}
              textBold={true}
              textSize={5}
              textColor={'black'} />
          </div>
          <Subpage pages={navItems} selectedKey={selectedNavButton} />
        </div>
      </div>
    </main >
  );
};
