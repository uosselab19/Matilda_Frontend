import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//loader
export const useModel = (modelURL: string, scene: THREE.Scene) => {
  const modelHeight = 66; // 모델의 크기 지정. (단위: 미터)
  const locVecter = new THREE.Vector3(0, 0, 0);

  new GLTFLoader().load(
    modelURL,
    // called when the resource is loaded
    (gltf) => {
      const matilda = gltf.scene.children[0];
      matilda.position.set(locVecter.x, locVecter.y, locVecter.z); //위치 조정

      scene.add(gltf.scene);

      const boxCenter = new THREE.Box3().setFromObject(matilda).getCenter(new THREE.Vector3());

      const scale = modelHeight / boxCenter.y;
      matilda.scale.set(scale, scale, scale); //스케일 조정
    },

    // called while loading is progressing
    (xhr) => {
      //console.log(xhr);
      //console.log(`${modelURL} ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },

    // called when loading has errors
    (error) => {
      console.error(error);
      console.log('An error happened');
    }
  );
};
