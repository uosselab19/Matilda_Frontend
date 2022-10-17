import { useEffect, useState } from 'react';
import { DressupItems } from '../../components/Dressup/DressupItems';
import { DressupPreset } from '../../components/Dressup/DressupPreset';
import { DressupInfo } from '../../components/Dressup/DressupInfo';
import createView from '../../utils/threejs/threeViewUtil';
import { loadModel } from '../../utils/threejs/threeModelUtil';
import createFittingRoom from '../../utils/threejs/threeRoomUtil';
import { Clothes } from '../../types/Clothes';
import { Scene } from 'three';
import { NavButtons } from '../../components/NavButtons';
import { DetailItem } from '../../types/Item';
import { getUserInfo } from '../../utils/cookieUtil';

export const Dressup = () => {
  const [scene] = useState(new Scene() as Scene);
  const [clothes, setClothes] = useState({} as Clothes);
  const [changedClothes, setChangedClothes] = useState({} as DetailItem);
  const [presetList, setPresetList] = useState([] as Clothes[]);
  const [selectedNavButton, setSelectedNavButton] = useState("Marketplace");
  const [modelHeight, roomWidth, roomHeight] = [60, 512, 200];

  const navItems = [
    { key: "Marketplace", title: "Marketplace" },
    { key: "Mypage", title: "My page" },
    { key: "Info", title: "Wear I am" },
    { key: "Preset", title: "Preset" },
  ];

  //초기 3D 방 세팅
  useEffect(() => {
    (async () => {
      createView(modelHeight, roomWidth, roomHeight, scene);
      createFittingRoom('wooden', roomWidth, roomHeight, scene);
      loadModel('BaseMesh', './assets/model/BaseMesh.glb', modelHeight, scene, 0);
    })();
  }, []);

  //옷을 입기 위한 코드
  useEffect(() => {
    (async () => {
      //옷을 안 입었으면 확인할 필요가 없음
      if (!Object.entries(clothes).length) return;

      //이미 입은 카테고리의 옷을 입으려고 시도하면 그 전에 있던 옷을 지워야 함
      //그거 지우는 코드
      const sceneMesh = scene.children.filter((_, i) => { return (i > 11); });
      const alreadyExistsMeshIndex = sceneMesh.findIndex((e) => { return e.name == changedClothes.catCode; });
      if (alreadyExistsMeshIndex > -1) scene.remove(sceneMesh[alreadyExistsMeshIndex]);

      //옷 입기 코드
      loadModel(changedClothes.catCode, `https://nftstorage.link/ipfs/${changedClothes.tokenUri.slice(7)}`,
        changedClothes.catCode == "TOP" ? 0.4 * modelHeight : 0.55 * modelHeight, scene,
        changedClothes.catCode == "TOP" ? 40 : 17);
    })();
  }, [changedClothes]);

  // const handleInfo = async () => {
  //   const footer=`
  //   <div className="card" style="width: 18rem;">
  //     <ul className="list-group list-group-flush">
  //       <li className="list-group-item">옷 1</li>
  //       <li className="list-group-item">바지</li>
  //       <li className="list-group-item"></li>
  //     </ul>
  //   </div>
  //   `;
  //   const result = await alertInfo(`입은 옷들이에요!`, footer);
  //   if(result.isConfirmed){

  //   }
  // };

  // <div className='col-1 row g-1'>
  //         <div id="Preset" className={`${(cookie ? "d-block" : "d-none")} align-self-start`}>
  //           <DressupPreset
  //             clothes={clothes}
  //             setClothes={setClothes}
  //             presetList={presetList}
  //             setPresetList={setPresetList} />
  //         </div>
  //         <div className={`align-self-end my-5 w-100`}>
  //           <button type="button" className="btn btn-primary w-100" onClick={() => { handleInfo(); }}> Info </button>
  //         </div>
  //       </div>

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
              textColor={"black"} />
          </div>
          <div className={`${selectedNavButton == "Marketplace" ? "d-block" : "d-none"}`}>
            <DressupItems
              clothes={clothes}
              setClothes={setClothes}
              presetList={presetList}
              options={{ stateCodes: "OS" }}
              setChangedClothes={setChangedClothes} />
          </div>
          <div className={`${selectedNavButton == "Mypage" ? "d-block" : "d-none"}`}>
            {
              (getUserInfo()) ?
                <DressupItems
                  clothes={clothes}
                  setClothes={setClothes}
                  presetList={presetList}
                  options={{ memberNum: getUserInfo().num, stateCodes: "OS,NOS" }}
                  setChangedClothes={setChangedClothes} />
                :
                <div className='d-flex justify-content-center py-2'>
                  로그인이 필요한 페이지입니다.
                </div>
            }
          </div>
          <div className={`${selectedNavButton == "Info" ? "d-block" : "d-none"}`}>
            <DressupInfo
              clothes={clothes}
              setClothes={setClothes}
              setPresetList={setPresetList} />
          </div>
          <div className={`${selectedNavButton == "Preset" ? "d-block" : "d-none"}`}>
            {
              (getUserInfo()) ?
                <DressupPreset
                  clothes={clothes}
                  setClothes={setClothes}
                  presetList={presetList}
                  setPresetList={setPresetList} />
                :
                <div className='d-flex justify-content-center py-2'>
                  로그인이 필요한 페이지입니다.
                </div>
            }
          </div>
        </div>
      </div>
    </main>
  );
};
