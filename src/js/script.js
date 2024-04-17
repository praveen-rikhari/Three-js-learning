import * as THREE from 'three';

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
    75,     // field of view
    window.innerWidth / window.innerHeight,     // aspect ratio
    // near & far clipping plane
    0.1,
    1000
);

// adding axeshelper to guide through coordinates axes
// 5 here represents the length of the axes
const axesHelper = new THREE.AxesHelper(5);

//adding axesHelper to scene
scene.add(axesHelper);

//changing camera position w.r.t. z-axis and y-axis
camera.position.set(0, 2, 5)

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

//adding animation
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    // linking scene with camera
    renderer.render(scene, camera);
}

// setting up animation on loop
renderer.setAnimationLoop(animate);