import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';;
import { DetailItem } from '../../types/Item';
import { alertError, alertProgress } from '../alertUtil';

//loader
export async function loadModel(name: string, modelURL: string, modelHeight: number, y: number, scene: THREE.Scene) {
  const locVecter = new THREE.Vector3(0, y, 0);
  const progress = { value: 0, total: 100, error: false };
  if (name != 'BaseMesh') alertProgress('옷 입는 중', progress);

  new GLTFLoader().load(
    modelURL,
    // called when the resource is loaded
    (gltf) => {
      const matilda = gltf.scene.children[0];
      matilda.name = name;
      matilda.position.set(locVecter.x, locVecter.y, locVecter.z); //위치 조정
      const boxSizeVecter = new THREE.Box3().setFromObject(matilda).getSize(new THREE.Vector3());

      const scale = modelHeight / boxSizeVecter.y;
      if (name == 'TOP') {
        matilda.rotateY(Math.PI);
        matilda.scale.set(scale, scale, scale + 2); //스케일 조정
      } else if (name == 'BTM') {
        matilda.scale.set(scale + 3, scale, scale + 3); //스케일 조정
      } else if (name == 'HEA') {
        matilda.rotateY(Math.PI / 2);
        matilda.scale.set(scale, scale, scale);
      } else {
        matilda.scale.set(scale, scale, scale);
      }
      scene.add(matilda);
    },

    // called while loading is progressing
    (xhr) => {
      progress.value = xhr.loaded;
      progress.total = xhr.total;
    },

    // called when loading has errors
    (error) => {
      console.error(error);
      console.log('An error happened');
      progress.error = true;
      alertError('모델 불러오기 에러', '모델을 불러오는 중에 에러가 발생했습니다.');
    }
  );
}

export const removeModel = (changedClothes:DetailItem, scene:THREE.Scene)=> {
  const sceneMesh = scene.children.filter((_, i) => { return i > 11; });
  const alreadyExistsMeshIndex = sceneMesh.findIndex((e) => { return e.name == changedClothes.catCode; });
  if (alreadyExistsMeshIndex > -1) scene.remove(sceneMesh[alreadyExistsMeshIndex]);
}
