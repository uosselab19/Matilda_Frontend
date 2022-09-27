import { useEffect, useState } from 'react';
import { DressupMarket } from '../../components/Dressup/DressupMarket';
import { DressupPreset } from '../../components/Dressup/DressupPreset';
import { DressupInfo } from '../../components/Dressup/DressupInfo';
import createView from '../../utils/threejs/threeViewUtil';
import { loadModel } from '../../utils/threejs/threeModelUtil';
import createFittingRoom from '../../utils/threejs/threeRoomUtil';
import { Clothes } from '../../types/Clothes';
import { Scene } from 'three';
import { getS3Url } from '../../utils/S3';
import { NavButtons } from '../../components/NavButtons';
import { Item } from '../../types/Item';


export const Dressup = () => {
  const [scene] = useState(new Scene() as Scene);
  const [clothes, setClothes] = useState({} as Clothes);
  const [changedClothes, setChangedClothes] = useState({} as Item);
  const [presetList, setPresetList] = useState([] as Clothes[]);
  const [selectedNavButton, setSelectedNavButton] = useState("Market");
  const [modelHeight, roomWidth, roomHeight] = [60, 512, 200];

  const navItems = [
    { key: "Marketplace", title: "Marketplace" },
    { key: "Mypage", title: "My page" },
    { key: "Info", title: "Wear I am" },
    { key: "Preset", title: "Preset" },
  ];

  useEffect(() => {
    (async () => {
      createView(modelHeight, roomWidth, roomHeight, scene);
      createFittingRoom('wooden', roomWidth, roomHeight, scene);
      loadModel('BaseMesh', './assets/model/BaseMesh.glb', modelHeight, scene, 0);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!Object.entries(clothes).length) return;

      const sceneMesh = scene.children.filter((_, i) => { return (i > 11); });
      const sceneCatCode = sceneMesh.map((e) => { return clothes[e.name]; });
      console.log(sceneCatCode);
      console.log(changedClothes);

      const index = Object.entries(clothes).findIndex(async (e) => {
        return e[1].catCode === changedClothes.catCode;
      });

      if (index > -1) {
        scene.remove(sceneMesh[index]);
        console.log(sceneMesh[index]);
      }

      loadModel(changedClothes.catCode, await getS3Url(changedClothes.objectUrl),
        changedClothes.catCode == "TOP" ? 0.4 * modelHeight : 0.55 * modelHeight, scene,
        changedClothes.catCode == "TOP" ? 40 : 20);
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
        <div id="View" className="col-5" />
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
            <DressupMarket
              clothes={clothes}
              setClothes={setClothes}
              presetList={presetList}
              setChangedClothes={setChangedClothes} />
          </div>
          <div className={`${selectedNavButton == "Mypage" ? "d-block" : "d-none"}`}>
            <DressupMarket
              clothes={clothes}
              setClothes={setClothes}
              presetList={presetList}
              setChangedClothes={setChangedClothes} />
          </div>
          <div className={`${selectedNavButton == "Info" ? "d-block" : "d-none"}`}>
            <DressupInfo
              clothes={clothes}
              setClothes={setClothes}
              setPresetList={setPresetList} />
          </div>
          <div className={`${selectedNavButton == "Preset" ? "d-block" : "d-none"}`}>
            <DressupPreset
              clothes={clothes}
              setClothes={setClothes}
              presetList={presetList}
              setPresetList={setPresetList} />
          </div>
        </div>
      </div>
    </main>
  );
};
