import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function createView(modelHeight: number, roomWidth: number, roomHeight: number, scene: Scene) {
  const dressupDom = document.getElementById('View') as HTMLElement; // 마운트가 되어야 Dom을 찾을 수 있다.
  let [canvasWidth, canvasDomHeight] = [dressupDom.clientWidth, (4 / 3) * dressupDom.clientWidth]; // 브라우저 크기 확인

  //scene : 화면 출력의 대상
  scene.background = new THREE.Color(0x999999); // 플레이스홀더의 색깔은 회색으로.

  //renderer : 화면 렌더러
  const renderer = new THREE.WebGLRenderer({ antialias: false }); // 안티앨리어싱은 필요하지 않음.
  renderer.shadowMap.enabled = true; //셰도우맵 사용 : 그림자 표현
  renderer.shadowMap.type = THREE.PCFShadowMap; // PCF 방식의 섀도우맵을 사용할 예정
  dressupDom.appendChild(renderer.domElement);

  //camera : 화면 출력 카메라
  const camera = new THREE.PerspectiveCamera(45, 3 / 4, modelHeight / 64, 2 * roomWidth); // 화면각은 45도, 화면 비율은 실제 보여지는 비율에 맞게 수정.
  camera.position.set(0, 0.5 * modelHeight, 2 * modelHeight); //최초 카메라 위치 조절

  //lights : 광원
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // 빛 종류는 AmbientLight, 빛 색깔은 사이트 분위기와 비교하여 고르기
  ambientLight.name = 'ambientLight';
  scene.add(ambientLight);

  const makeDirectionalLight = (name: string, x: number, y: number, z: number) => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(x, y, z);
    directionalLight.name = name;
    return directionalLight;
  };

  scene.add(makeDirectionalLight('directionalLight1', roomWidth / 2, -roomHeight, -roomWidth / 2));
  scene.add(makeDirectionalLight('directionalLight2', -roomWidth / 2, -roomHeight, roomWidth / 2));
  scene.add(makeDirectionalLight('directionalLight3', roomWidth / 2, roomHeight, roomWidth / 2));
  scene.add(makeDirectionalLight('directionalLight4', -roomWidth / 2, roomHeight, -roomWidth / 2));

  //controls : 카메라 조절하는 컨트롤러 (depend on camera & renderer)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1 * modelHeight; // 카메라 최소 거리
  controls.maxDistance = 0.5 * roomWidth; // 카메라 최대 거리
  controls.enablePan = true; // 카메라 절대 위치 조절
  controls.keys = { LEFT: '', RIGHT: '', UP: '', BOTTOM: '' }; //카메라 절대 위치는 마우스로만 조절할 수 있음
  controls.panSpeed = 2; // 카메라 절대 위치 속도 조절
  controls.minPolarAngle = Math.PI / 2; // 상하 회전각을 없애는 코드 (하)
  controls.maxPolarAngle = Math.PI / 2; // 상하 회전각을 없애는 코드 (상)
  controls.enableDamping = true; //마찰력 기능
  controls.dampingFactor = 0.1; // 회전 마찰력
  controls.rotateSpeed = 1.5; //회전 속도
  controls.target.set(0, 0.5 * modelHeight, 0); //카메라 시점 조절
  controls.update();

  const animate = () => {
    //need to load model
    controls.update();
    const minPan = new THREE.Vector3(0, 1, 0); // 카메라 최소위치 고정
    const maxPan = new THREE.Vector3(0, 2 * modelHeight, 0); // 카메라 최대위치 고정, 모델 키에 비례하여 달라짐.
    controls.target.clamp(minPan, maxPan); // 카메라 위치 고정하는 함수

    // Dom 갱신을 위한 부분
    [canvasWidth, canvasDomHeight] = [dressupDom.clientWidth, (4 / 3) * dressupDom.clientWidth];
    renderer.setSize(canvasWidth, canvasDomHeight); // 브라우저 크기에 맞춰서 사이즈 조절
    renderer.render(scene, camera); // 렌더링하는 부분.
    window.requestAnimationFrame(animate); // 브라우저에 애니메이트
  };

  animate();
}
