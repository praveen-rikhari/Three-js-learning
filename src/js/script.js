import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

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
// plane will receive shadows of the objects
plane.receiveShadow = true;

//adding grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// adding sphere
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    // adds and removes wireframe from 3d object
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
// sphere will cast shadow on plane
sphere.castShadow = true;

// adding ambident light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// adding directional light
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);

// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// // directional light helper
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

//creating spot Light
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

//spotlight helper
const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

// creating GUI instance
const gui = new dat.GUI();

//setting up GUI options for sphere
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
};

gui.addColor(options, 'sphereColor').onChange(function (e) {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function (e) {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

gui.add(options, 'angle', 0, 1);

gui.add(options, 'penumbra', 0, 1);

gui.add(options, 'intensity', 0, 1);

let step = 0;

//adding animation
function animate(time) {
    // box rotating animation
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    // sphere bouncing animation
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    //spotlight options
    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();

    // linking scene with camera
    renderer.render(scene, camera);
}

// setting up animation on loop
renderer.setAnimationLoop(animate);