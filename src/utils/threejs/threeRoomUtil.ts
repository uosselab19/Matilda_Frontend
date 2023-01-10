import * as THREE from 'three';

// 모든 텍스쳐 출처는 https://www.freepik.com/ 에서 가져온 자료들입니다.
const textureLoader = new THREE.TextureLoader();

//ground
function makeFloor(name: string, theme: string, w: number) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(w, w),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./assets/texture/floorTexture_${theme}.jpg`)
    })
  );
  floor.rotation.x -= 0.5 * Math.PI;
  floor.name = name;
  return floor;
}

function makeCeil(name: string, theme: string, w: number, h: number) {
  const ceil = new THREE.Mesh(
    new THREE.PlaneGeometry(w, w),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./assets/texture/ceilTexture_${theme}.jpg`)
    })
  );
  ceil.rotation.x += 0.5 * Math.PI;
  ceil.position.set(0, h, 0);
  ceil.name = name;
  return ceil;
}

//wall
function makeWall(name: string, theme: string, w: number, h: number, angle: number, locVecter: THREE.Vector3) {
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`./assets/texture/wallTexture_${theme}.jpg`)
    })
  );
  wall.rotation.y += angle;
  wall.position.set(locVecter.x, locVecter.y, locVecter.z);
  wall.name = name;
  return wall;
}

//위에 있는 벽과 바닥, 천장을 사용해서 방을 구현함
export default function createFittingRoom(theme: string, width: number, height: number, scene: THREE.Scene) {
  scene.add(makeFloor('floor', theme, width)); //floor
  scene.add(makeWall('backWall', theme, width, height, 0, new THREE.Vector3(0, height / 2, -width / 2))); //back
  scene.add(makeWall('rightWall', theme, width, height, 0.5 * Math.PI, new THREE.Vector3(-width / 2, height / 2, 0))); //right
  scene.add(makeWall('forthWall', theme, width, height, Math.PI, new THREE.Vector3(0, height / 2, width / 2))); //forth
  scene.add(makeWall('leftWall', theme, width, height, 1.5 * Math.PI, new THREE.Vector3(width / 2, height / 2, 0))); //left
  scene.add(makeCeil('ceil', theme, width, height)); //ceil
}
