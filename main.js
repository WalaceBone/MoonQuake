import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1);
// const scene = new THREE.Scene();
// const canvas = document.querySelector(".webgl");
// const renderer = new THREE.WebGLRenderer({ canvas });
// const sphereGeometry = new THREE.SphereGeometry(3, 20, 20);
// const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00FF48});
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// const light = new THREE.PointLight(0xFFFFFF);

// renderer.setSize(window.innerWidth, window.innerHeight);
// light.position.set(0, 20, 10);
// camera.position.z = 20;
// scene.add(sphereMesh);
// scene.add(light);
// scene.add(camera);

// renderer.render(scene, camera);

let camera, scene, renderer, light;
let loader, group;
let control;

init();
animate();

function setupKeyLogger() {
    document.onkeydown = function (e) {
        console.log(e);
    }
}

function initSphere() {
    var loader = new THREE.TextureLoader();
    
    loader.load('2k_moon.jpg', function (texture) {
    const geometry = new THREE.SphereGeometry(3, 1000,1000);

    const material = new THREE.MeshStandardMaterial({ map: texture, wireframe: true});

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'moon'
    group.add(mesh);

    });
}

function init() {
    scene = new THREE.Scene();

    group = new THREE.Object3D();
    scene.add(group);

    initSphere();

    light = new THREE.PointLight(0xffffff, 100);
    light.position.set(0, 10, 10);
    scene.add(light);



    const canvas = document.querySelector(".webgl");
    renderer = new THREE.WebGLRenderer({ canvas });
    //renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 20;

    control = new OrbitControls(camera, renderer.domElement);
    control.update();

    //document.body.appendChild(renderer.domElement);
}

document.addEventListener("ondrag", onDocumentKeyDown, false);
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown() {
    let sphere = group.getObjectByName('moon', true);

    document.onkeydown = function (e) {
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
    };
}

function animate() {

    requestAnimationFrame(animate);
    render();
}

function render() {

    //group.rotation.x -= 0.001;
    group.rotation.y -= 0.001;
    //group.rotation.z -= 0.001;
    //
    renderer.render(scene, camera);
}
