import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer, light;
let loader, group;
let control;
const radius = 10;
let pulseGroup;

let sun, moon;


const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform vec3 colorA;
    uniform vec3 colorB;
    void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.x), 1.0);
    }
`;

init();
animate();

function setupKeyLogger() {
    document.onkeydown = function (e) {
        console.log(e);
    }
}

function createMoon() {
    const loader = new THREE.TextureLoader();

    loader.load('2k_moon.jpg', function (texture) {
        const geometry = new THREE.SphereGeometry(radius, 1000, 1000);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'moon';
        group.add(mesh);
    });
}

function createLine(points) {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setFromPoints(points);
    return new THREE.Line(lineGeometry, lineMaterial);
}



function createLines() {
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // const points = [
    //     new THREE.Vector3(-200, 0, 0),
    //     new THREE.Vector3(0, 0, 0),
    //     new THREE.Vector3(200, 0, 0),
    //     new THREE.Vector3(0, -200, 0),
    //     new THREE.Vector3(0, 0, 0),
    //     new THREE.Vector3(0, 200, 0),
    //     new THREE.Vector3(0, 0, -200),
    //     new THREE.Vector3(0, 0, 0),
    //     new THREE.Vector3(0, 0, 200),
    // ];
    // const lineGeometry = new THREE.BufferGeometry();
    // lineGeometry.setFromPoints(points);
    // const line = new THREE.Line(lineGeometry, lineMaterial);
    // group.add(line);
    const points = [
        new THREE.Vector3(-200, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(200, 0, 0),
        new THREE.Vector3(0, -200, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 200, 0),
        new THREE.Vector3(0, 0, -200),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 200),
    ];

    const line = createLine(points);
    group.add(line);


}

function createFrames() {

    const latSegments = 18;
    const longSegments = 36;
    const frameMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });

    for (let i = radius; i > 0; --i) {
        const frameGeometry = new THREE.SphereGeometry(i, longSegments, latSegments);
        const frameSphere = new THREE.Mesh(frameGeometry, frameMaterial);
        group.add(frameSphere);
        i--;
    }
}

function createRandomSpheres() {
    const sphereRadius = 10;
    const numPoints = 100;
    const Tpoints = [];

    for (let i = 0; i < numPoints; i++) {
        const theta = Math.random() * Math.PI;
        const phi = Math.random() * 2 * Math.PI;
        const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
        const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = sphereRadius * Math.cos(theta) * Math.sin(phi);

        const point = new THREE.Vector3(x, y, z);
        Tpoints.push(point);

        const sphereGeometry = new THREE.SphereGeometry(Math.random(10), 32, 32);

        const sphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                colorA: { value: new THREE.Vector3(1, 0, 0) },
                colorB: { value: new THREE.Vector3(1, 0, 0) }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(point);
        pulseGroup.add(sphere);
    }
}

function createAxes() {
    const axesHelper = new THREE.AxesHelper(20);
    group.add(axesHelper);
}

function createSun() {
    // Create a directional light to represent the sun
    sun = new THREE.DirectionalLight(0xffffff, 1); // White light with full intensity
    sun.position.set(0, 1, 0); // Position the sun above the moon's surface
    group.add(sun);
}

function animateSun() {
    // Calculate the sun's position based on time of day
    const timeOfDay = (Date.now() % (24 * 60 * 60)) / (24 * 60 * 60); // Current time as a fraction of a day
    const sunAngle = Math.PI * 2 * timeOfDay; // Angle around the moon's surface
    const distance = 20; // Distance of the sun from the moon's center
    const x = Math.cos(sunAngle) * distance;
    const z = Math.sin(sunAngle) * distance;

    // Update the sun's position
    sun.position.set(x, 1, z);
    console.log(timeOfDay);
}

function initSphere() {
    createSun();
    createMoon();
    //createLines();
    createFrames();
    createRandomSpheres();
}

function init() {
    setupScene();
    setupCamera();
    setupRenderer();
    setupControls();
    //setupLight();
    initSphere();
    createAxes();
    setupEventListeners();

}

function setupScene() {
    scene = new THREE.Scene();
    group = new THREE.Object3D();
    pulseGroup = new THREE.Object3D();
    scene.add(group);
    scene.add(pulseGroup);
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 20;
}

function setupRenderer() {
    const canvas = document.querySelector(".webgl");
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function setupControls() {
    control = new OrbitControls(camera, renderer.domElement);
    control.update();
}

function setupLight() {
    light = new THREE.PointLight(0xffffff, 10000);
    light.position.set(0, 0, 200);
    scene.add(light);
}

function setupEventListeners() {
    const inputRotation = document.getElementById("rotation");
    const sliderZoom = document.getElementById("zoom");
    const wireframeBox = document.getElementById("wireframe");

    inputRotation.addEventListener("input", function () {
        group.rotation.y = this.value;
    });

    sliderZoom.addEventListener("input", function () {
        camera.position.z = this.value;
    });

    wireframeBox.addEventListener("input", function () {
        const sphere = group.getObjectByName('moon', true);
        sphere.material.wireframe = this.checked;
    });

    document.addEventListener("keydown", onDocumentKeyDown);
}

function onDocumentKeyDown(e) {
    const sphere = group.getObjectByName('moon', true);
    console.log(e.code);
    switch (e.code) {
        case 'ArrowUp':
            sphere.rotateX(0.1);
            break;
        case 'ArrowLeft':
            sphere.rotateZ(-0.1);
            break;
        case 'ArrowDown':
            sphere.rotateX(-0.1);
            break;
        case 'ArrowRight':
            sphere.rotateZ(0.1);
            break;
    }
}

function animateSphere(sphere) {
    const time = Date.now() * 0.001;
    const pulseScale = 0.5 + 0.5 * Math.sin(time * 2);
    const scale = new THREE.Vector3(pulseScale, pulseScale, pulseScale);
    sphere.scale.copy(scale);
}

function animate() {
    requestAnimationFrame(animate);
    pulseGroup.traverse((object) => {
        if (object instanceof THREE.Mesh && object.geometry instanceof THREE.SphereGeometry) {
            animateSphere(object);
        }
    });
    animateSun();
    renderer.render(scene, camera);
}
