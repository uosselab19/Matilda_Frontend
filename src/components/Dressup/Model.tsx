import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { modelHeight } from './View';

//loader
let boundaryBox: THREE.Box3, centerBox: THREE.Vector3;
const locVecter = new THREE.Vector3(0, 0, 0);

export const loadModel = (model: string, scene: any) => {
  new GLTFLoader().load(
    model,
    // called when the resource is loaded
    (gltf) => {
      const matilda = gltf.scene.children[0];
      matilda.position.set(locVecter.x, locVecter.y, locVecter.z); //위치 조정

      scene.add(gltf.scene);

      boundaryBox = new THREE.Box3().setFromObject(matilda);
      centerBox = boundaryBox.getCenter(new THREE.Vector3());

      const scale = modelHeight / centerBox.y;
      matilda.scale.set(scale, scale, scale); //스케일 조정
    },

    // called while loading is progressing
    (xhr) => {
      console.log(`${model} ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },

    // called when loading has errors
    (error) => {
      console.error(error);
      console.log('An error happened');
    }
  );
};
