import React from 'react';
import * as THREE from "three";
import { loadModel } from "./Mannequin"
import { Market } from './Market';
import { Preset } from './Preset';

export const Dressup = () => {
  //set the matilda
  loadModel('./assets/model/matilda/scene.gltf', 0.7, new THREE.Vector3(0, 0, 0));
  return (
    <main className="container mt-5 d-flex justify-content-center">
      <div className='row g-3'>
        <Preset />
        <div id="dressUp" className='col-6' />
        <Market />
      </div>
    </main>
  );
};
