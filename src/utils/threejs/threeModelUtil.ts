import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { alertError, alertProgress } from '../alertUtil';

//loader
export async function loadModel(name: string, modelURL: string, modelHeight: number, scene: THREE.Scene, y: number) {
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
      if (name == 'TOP') matilda.rotateY(Math.PI);
      // console.log(name);
      // console.log(Number(name == "TOP" || name == "BTM"))
      matilda.scale.set(scale - 0.5 * Number(name == 'TOP' || name == 'BTM'), scale, scale + 2 * Number(name == 'TOP' || name == 'BTM')); //스케일 조정

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
