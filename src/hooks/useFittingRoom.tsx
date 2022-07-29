import * as THREE from 'three';

//모든 텍스쳐 출처는 https://www.freepik.com/ 에서 가져온 자료들입니다.
const textureLoader = new THREE.TextureLoader();

//ground
function makeFloor(theme: string, w: number) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, w),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./assets/texture/floorTexture_${theme}.jpg`)
    })
  );
  floor.rotation.x -= 0.5 * Math.PI;
  return floor;
}

function makeCeil(theme: string, w: number, h: number) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, w),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./assets/texture/ceilTexture_${theme}.jpg`)
    })
  );
  floor.rotation.x += 0.5 * Math.PI;
  floor.position.set(0, h, 0);
  return floor;
}

//wall
function makeWall(theme: string, w: number, h: number, angle: number, locVecter: THREE.Vector3) {
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./assets/texture/wallTexture_${theme}.jpg`)
    })
  );
  wall.rotation.y += angle;
  wall.position.set(locVecter.x, locVecter.y, locVecter.z);
  return wall;
}

export default function useFittingRoom(theme: string, width: number, height: number, scene: THREE.Scene) {
  scene.add(makeFloor(theme, width)); //floor
  scene.add(makeWall(theme, width, height, 0, new THREE.Vector3(0, height / 2, -width / 2))); //back
  scene.add(makeWall(theme, width, height, 0.5 * Math.PI, new THREE.Vector3(-width / 2, height / 2, 0))); //right
  scene.add(makeWall(theme, width, height, Math.PI, new THREE.Vector3(0, height / 2, width / 2))); //forth
  scene.add(makeWall(theme, width, height, 1.5 * Math.PI, new THREE.Vector3(width / 2, height / 2, 0))); //left
  scene.add(makeCeil(theme, width, height)); //floor
}
