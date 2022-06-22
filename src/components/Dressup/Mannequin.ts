import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as room from "./fittingRoom";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

//camera
const camera = new THREE.PerspectiveCamera(45, 1, 1, 1500);
camera.position.set(0, 150, 150); //최초 카메라 위치 조절

//lights
const ambientLight = new THREE.AmbientLight(0xFFFFFF); // 예쁜 빛 색깔 찾아놨다...
ambientLight.intensity = 1;
scene.add(ambientLight);

//controls (depend on camera & renderer)
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 100;// 카메라 최소 거리
controls.maxDistance = 400;// 카메라 최대 거리
controls.enablePan = true;// 카메라 절대 위치 조절
controls.keys = {
  LEFT:"",
  RIGHT:"",
  UP:"",
  BOTTOM:""
}; //카메라 절대 위치는 마우스로만 조절할 수 있음
controls.panSpeed = 2;// 카메라 절대 위치 속도 조절
controls.minPolarAngle = Math.PI / 2;// 상하 회전각을 없애는 코드 1
controls.maxPolarAngle = Math.PI / 2;// 상하 회전각을 없애는 코드 2
controls.enableDamping = true;//마찰력 기능
controls.dampingFactor = 0.1;// 회전 마찰력
controls.rotateSpeed = 1.5;//회전 속도
controls.update();

//loader
let boundaryBox: THREE.Box3, centerBox: THREE.Vector3;
export const loadModel = (model: string, scale: number, locVecter: THREE.Vector3) => {
  new GLTFLoader().load(model,
    // called when the resource is loaded
    function (gltf) {
      const matilda = gltf.scene.children[0];
      matilda.position.set(locVecter.x, locVecter.y, locVecter.z);//위치 조정
      matilda.scale.set(scale, scale, scale);//스케일 조정
      scene.add(gltf.scene);

      boundaryBox = new THREE.Box3().setFromObject(matilda);
      centerBox = boundaryBox.getCenter(new THREE.Vector3());
      controls.target.set(0, centerBox.y, 0); //카메라 시점 조절

      const dressupDom=document.getElementById("dressUp");
      if(dressupDom){
        dressupDom.appendChild(renderer.domElement);
        const width = dressupDom.offsetWidth-12;
        renderer.setSize(width, width);
      }

      animate();
    },

    // called while loading is progressing
    (xhr) => { console.log(`${model} ${(xhr.loaded / xhr.total * 100)}% loaded`); },

    // called when loading has errors
    (error) => {
      console.error(error);
      console.log('An error happened');
    }
  );

  const animate = () => {//need to load model
    controls.update();
    const distance = camera.position.distanceTo(controls.target);
    const minHeight = 1.25 * Math.tan(0.125 * Math.PI) * Math.max(0, distance - room.width * 0.5) + 1;
    // 가중치 * tan(1/8*pi) * 높이 + 바닥 최대 길이 (1/8*pi 인 이유는 화면 각이 22.5도이기 때문.)
    //+1 붙이는 이유는 높이가 0이면 바닥이 뚫려보이기 때문, 그렇기에 한 칸 띄워주는 것임.
    const minPan = new THREE.Vector3(0, minHeight, 0);
    const maxPan = new THREE.Vector3(0, 2 * centerBox.y, 0); //이거는 모델 키 조절해서 도전해봐야 할 듯
    controls.target.clamp(minPan, maxPan);
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
    const dressupDom=document.getElementById("dressUp");
    if(dressupDom){
      const width = dressupDom.offsetWidth-15;
      renderer.setSize(width, width);
    }
  }
}

//set the changing room
scene.add(room.meshFloor);
scene.add(room.wallBack);
scene.add(room.wallRight);
scene.add(room.wallForth);
scene.add(room.wallLeft);