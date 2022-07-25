import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { FlatShading } from 'three';

const gui = new dat.GUI();
const world = {
    plane: {
        width: 5,
        height: 5,
        widthSegment: 10,
        heightSegment: 10,
        vertexHeight: 1
    }
}

gui.add(world.plane, 'width', 1, 100).
    onChange (planeGenerator);

gui.add(world.plane, 'height', 1, 100).
onChange (planeGenerator);

gui.add(world.plane, 'widthSegment', 1, 100).
onChange (planeGenerator);

gui.add(world.plane, 'heightSegment', 1, 100).
onChange (planeGenerator);

gui.add(world.plane, 'vertexHeight', 0, 5).
onChange (planeGenerator);

function planeGenerator () {
    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry( 
        world.plane.width, 
        world.plane.height, 
        world.plane.widthSegment,
        world.plane.heightSegment
        );

    const {array} = plane.geometry.attributes.position;    
    for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random() * world.plane.vertexHeight;
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry( 5, 5, 10, 10 );
console.log(geometry);
const material = new THREE.MeshPhongMaterial( { 
    color: 0x00ff11,
    // wireframe: true,
    flatShading: THREE.FlatShading
} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

camera.position.z = 10;

const controls = new OrbitControls(camera, renderer.domElement);

const upperLight = new THREE.DirectionalLight( 0xffffff, 1);
// const upperLightHelper = new THREE.DirectionalLightHelper(upperLight, 5);
upperLight.position.set( 0, 0, 1);
scene.add(upperLight);

const {array} = plane.geometry.attributes.position;

for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
}

function animate() {
    requestAnimationFrame( animate );


    controls.update();

    renderer.render( scene, camera );
};

animate();