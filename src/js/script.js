import * as THREE from 'three';

// calling webGL for getting up the space in web page to play with 3d
const renderer = new THREE.WebGLRenderer();

//setting size of that space
renderer.setSize(window.innerHeight, window.innerWidth);

//injecting that space(which is basically a canvas element)
document.body.appendChild(renderer.domElement);