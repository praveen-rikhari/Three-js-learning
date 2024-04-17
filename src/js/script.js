import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// calling webGL for getting up the space in web page to play with 3d
const renderer = new THREE.WebGLRenderer();

//setting size of that space
renderer.setSize(window.innerWidth, window.innerHeight);

//injecting that space(which is basically a canvas element)
document.body.appendChild(renderer.domElement);

//creating scene
const scene = new THREE.Scene();

// adding perspective camera
const camera = new THREE.PerspectiveCamera(
    45,     // field of view
    window.innerWidth / window.innerHeight,     // aspect ratio
    // near & far clipping plane
    0.1,
    1000
);

// creating instance of orbit control class
const orbit = new OrbitControls(camera, renderer.domElement);

// adding axeshelper to guide through coordinates axes
// 5 here represents the length of the axes
const axesHelper = new THREE.AxesHelper(5);

//adding axesHelper to scene
scene.add(axesHelper);

//changing camera position w.r.t. z-axis and y-axis
camera.position.set(-10, 30, 30);

// we need to update then scene after everytime we change the camera postions
orbit.update();

// adding object
const boxGeometry = new THREE.BoxGeometry();
//adding material
const boxMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0x8ecae6
    }
);
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// adding plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,

    // this propewrty adds view to all the sides
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

//adding grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// adding sphere
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    // adds and removes wireframe from 3d object
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);

//adding animation
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    // linking scene with camera
    renderer.render(scene, camera);
}

// setting up animation on loop
renderer.setAnimationLoop(animate);