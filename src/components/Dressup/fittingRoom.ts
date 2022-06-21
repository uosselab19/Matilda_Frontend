import * as THREE from "three";

export const [width, height] = [720, 540];
const textureLoader = new THREE.TextureLoader();
//ground
function makeFloor(w){
	const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(w, w),
        new THREE.MeshStandardMaterial({
            map:textureLoader.load("./assets/texture/floorTexture.jpg")
        }),
    );
	floor.rotation.x -= 0.5*Math.PI;
    return floor;
}

//wall
function makeWall(w, h, angle, locVecter){
	const wall = new THREE.Mesh(
		new THREE.PlaneGeometry(w, h),
		new THREE.MeshStandardMaterial({
			map:textureLoader.load("./assets/texture/wallTexture.jpg")
		})
	);
	wall.rotation.y += angle;
    wall.position.set(locVecter.x, locVecter.y, locVecter.z);
	return wall;
}

export const meshFloor = makeFloor(width);
export const wallBack =  makeWall(width, height, 0, 		  new THREE.Vector3(0, height/2, -width/2));
export const wallRight = makeWall(width, height, 0.5*Math.PI, new THREE.Vector3(-width/2, height/2, 0));
export const wallForth = makeWall(width, height, Math.PI,	  new THREE.Vector3(0, height/2, width/2));
export const wallLeft =  makeWall(width, height, 1.5*Math.PI, new THREE.Vector3(width/2, height/2, 0));