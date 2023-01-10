import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';;
import { DetailItem } from '../../types/Item';
import { alertError, alertProgress } from '../alertUtil';

//loader
export async function loadModel(name: string, modelURL: string, modelHeight: number, y: number, scene: THREE.Scene) {
  const locVecter = new THREE.Vector3(0, y, 0);
  const progress = { value: 0, total: 100, error: false };
  if (name != 'BaseMesh') alertProgress('옷 입는 중', progress);

  // three.js 모듈에 포함된 gltf 로더를 사용함.
  // 마틸다 프로젝트에서 사용되는 3D 모델의 확장자는 전부 GLTF 계열이기 때문에
  // 해당 로더를 사용해서 모델을 불러옴
  new GLTFLoader().load(
    modelURL,
    // called when the resource is loaded
    (gltf) => {
      const matilda = gltf.scene.children[0];
      matilda.name = name;
      matilda.position.set(locVecter.x, locVecter.y, locVecter.z); //위치 조정
      const boxSizeVecter = new THREE.Box3().setFromObject(matilda).getSize(new THREE.Vector3());

      // 리깅작업을 구현할 정도로 충분한 시간이 없었음
      // 설마 리깅까지 했으리라고 생각했다면 큰 오산이고
      // 논문에 들어갈 사진을 뽑아내기 위해 어쩔 수 없이
      // 눈대중으로 대충 이정도 값이면 예쁘게 뽑히겠다 하는 것들을
      // 하나하나 수작업으로 보정해서 진행함!
      const scale = modelHeight / boxSizeVecter.y;
      if (name == 'TOP') {
        matilda.rotateY(Math.PI);
        matilda.scale.set(scale, scale, scale + 2);
      } else if (name == 'BTM') {
        matilda.scale.set(scale + 3, scale, scale + 3);
      } else if (name == 'HEA') {
        matilda.rotateY(Math.PI / 2);
        matilda.scale.set(scale, scale, scale);
      } else if (name == 'DRE') {
        matilda.scale.set(scale+1.5, scale, scale+12.5);
      } else {
        matilda.scale.set(scale-0.5, scale, scale);
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

// 불러왔던 모델 지워주는 함수
// scene에서만 지워주면 되니까 코드 길이는 짧음
export const removeModel = (changedClothes:DetailItem, scene:THREE.Scene)=> {
  // 11개의 앞선 mesh 들은 방과 마네킹을 만들때 필요한 mesh
  // 나머지 불러오는 모든 모델은 전부 옷 모델이므로 조건을 단순하게 저렇게만 짜도 상관 X
  const sceneMesh = scene.children.filter((_, i) => { return i > 11; });
  const alreadyExistsMeshIndex = sceneMesh.findIndex((e) => { return e.name == changedClothes.catCode; });
  if (alreadyExistsMeshIndex > -1) scene.remove(sceneMesh[alreadyExistsMeshIndex]);
}
