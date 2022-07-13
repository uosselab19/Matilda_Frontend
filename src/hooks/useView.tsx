
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as room from '../components/Dressup/fittingRoom';

export const useView = () => {
  const modelHeight = 66; // 모델의 크기 지정. (단위: 미터)
  const dressupDom = document.getElementById('View') as HTMLElement; // 마운트가 되어야 Dom을 찾을 수 있다.
  let dressupDomWidth = dressupDom.offsetWidth - 16; // 브라우저 크기 확인, 16은 padding

  //scene : 화면 출력의 대상
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x999999); // 플레이스홀더의 색깔은 회색으로.

  //renderer : 화면 렌더러
  const renderer = new THREE.WebGLRenderer({ antialias: false }); // 안티앨리어싱은 필요하지 않음.
  renderer.shadowMap.enabled = true; //셰도우맵 사용 : 그림자 표현
  renderer.shadowMap.type = THREE.PCFShadowMap; // PCF 방식의 섀도우맵을 사용할 예정
  dressupDom.appendChild(renderer.domElement);

  //camera : 화면 출력 카메라
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 1500); // 화면각은 45도, 400보다 적당히 큰 1500 기준으로 가시거리 설정.
  camera.position.set(0, 160, 160); //최초 카메라 위치 조절

  //lights : 광원
  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 빛 종류는 AmbientLight, 빛 색깔은 사이트 분위기와 비교하여 고르기
  scene.add(ambientLight);

  //controls : 카메라 조절하는 컨트롤러 (depend on camera & renderer)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100; // 카메라 최소 거리
  controls.maxDistance = 400; // 카메라 최대 거리
  controls.enablePan = true; // 카메라 절대 위치 조절
  controls.keys = { LEFT: '', RIGHT: '', UP: '', BOTTOM: '' }; //카메라 절대 위치는 마우스로만 조절할 수 있음
  controls.panSpeed = 2; // 카메라 절대 위치 속도 조절
  controls.minPolarAngle = Math.PI / 2; // 상하 회전각을 없애는 코드 (하)
  controls.maxPolarAngle = Math.PI / 2; // 상하 회전각을 없애는 코드 (상)
  controls.enableDamping = true; //마찰력 기능
  controls.dampingFactor = 0.1; // 회전 마찰력
  controls.rotateSpeed = 1.5; //회전 속도
  controls.target.set(0, modelHeight, 0); //카메라 시점 조절
  controls.update();

  const animate = () => {
    //need to load model
    controls.update();
    const distance = camera.position.distanceTo(controls.target); //모델과 카메라 사이의 거리
    const minHeight = 1.25 * Math.tan(0.125 * Math.PI) * Math.max(0, distance - room.width * 0.5) + 1;
    // 카메라 최소 높이 : 카메라가 바닥을 뚫지 않고 안정적으로 모델을 바라볼 수 있는 최소 높이
    // 가중치 * tan(1/8*pi) * 높이 + 바닥 최대 길이 (1/8*pi 인 이유는 화면 각이 45도이기 때문.)
    //+1 붙이는 이유는 높이가 0이면 바닥이 뚫려보이기 때문.
    const minPan = new THREE.Vector3(0, minHeight, 0); // 카메라 최소위치 고정
    const maxPan = new THREE.Vector3(0, 2 * modelHeight, 0); // 카메라 최대위치 고정, 모델 키에 비례하여 달라짐.
    controls.target.clamp(minPan, maxPan); // 카메라 위치 고정하는 함수
    
    // Dom 갱신을 위한 부분
    dressupDomWidth = dressupDom.offsetWidth - 16; // 브라우저 크기 확인, 16은 padding
    renderer.setSize(dressupDomWidth, dressupDomWidth); // 브라우저 크기에 맞춰서 사이즈 조절
    renderer.render(scene, camera); // 렌더링하는 부분.
    window.requestAnimationFrame(animate); // 브라우저에 애니메이트
  };

  animate();

  //set the changing room
  room.fittingRoom.forEach((e) => {scene.add(e);});

  return scene;
};
