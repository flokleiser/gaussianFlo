import * as THREE from 'three'
import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { LumaSplatsThree, LumaSplatsSemantics } from '@lumaai/luma-web';
import { Color, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, Texture, Vector3 } from "three";


declare global {
    interface Window {
        demoSplat() : any
        catSplat() : any
        catSplat2() : any
        deskSplat() : any
        deskSplat2() : any
        deskSplat3() : any
        toggleBackground() : any
    }
}

const splatArray =[
	'https://lumalabs.ai/capture/d80d4876-cf71-4b8a-8b5b-49ffac44cd4a',

	"https://lumalabs.ai/embed/dda54514-b5b8-4675-8d4c-a2590acbe399",

	"https://lumalabs.ai/embed/66bcf4a4-ddbd-4c53-9d89-93f39a943dba",

	"https://lumalabs.ai/embed/2c100df7-a93d-4893-9430-fbf9715e012d",

	"https://lumalabs.ai/embed/f3fa6a0c-de07-4f58-b395-f75f993c1d6f",

	"https://lumalabs.ai/embed/2a7c971c-fb52-4aca-b7c3-117a9e1016a0",
]
var backgroundEnabled = true;

console.log('compile')


export default function splatTest() {}
let renderer = new WebGLRenderer({ antialias: false });

renderer.domElement.style.position = 'absolute';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';

document.body.appendChild(renderer.domElement);

let camera = new PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = -7;

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let scene = new Scene();


let splat = new LumaSplatsThree({
	source: splatArray[1],
	enableThreeShaderIntegration: false,

});


scene.add(splat);



export function demoSplat() {
	scene.remove(splat);
	splat = new LumaSplatsThree({
		source: splatArray[0],
		enableThreeShaderIntegration:false
	});
	scene.add(splat)

	camera.position.z = 7;
}

export function catSplat() {
	scene.remove(splat);
	splat = new LumaSplatsThree({
		source: splatArray[1],
		enableThreeShaderIntegration:false
	});
	scene.add(splat)

	camera.position.z = -7;
}

export function catSplat2() { 
	scene.remove(splat);
	splat = new LumaSplatsThree({
		source: splatArray[2],
		enableThreeShaderIntegration:false
	});
	scene.add(splat)

	camera.position.z = 7;
}

export function deskSplat() {
	scene.remove(splat);
	splat = new LumaSplatsThree({
		source: splatArray[3],
		enableThreeShaderIntegration:false
	});
	scene.add(splat)

	camera.position.z = 7;
}

export function deskSplat2() {
	scene.remove(splat);
	splat = new LumaSplatsThree({
		source: splatArray[4],
		enableThreeShaderIntegration:false
	});
	scene.add(splat)

	camera.position.z = -7;
}

export function deskSplat3() {
	scene.remove(splat);
	splat = new LumaSplatsThree({
		source: splatArray[5],
		enableThreeShaderIntegration:false
	});
	scene.add(splat)

	camera.position.z = 7;
}

export function toggleBackground() {
	backgroundEnabled = !backgroundEnabled
	console.log(backgroundEnabled)

	if (!backgroundEnabled) {
		splat.semanticsMask = LumaSplatsSemantics.FOREGROUND;
	}

	else if (backgroundEnabled) {
		splat.semanticsMask = LumaSplatsSemantics.FOREGROUND | LumaSplatsSemantics.BACKGROUND;
	}
}

function frameLoop() {
	let canvas = renderer.domElement;
	let width = canvas.clientWidth;
	let height = canvas.clientHeight;

	if (canvas.width !== width || canvas.height !== height) {
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height, false);
	}

	controls.update();

	renderer.render(scene, camera);
}


renderer.setAnimationLoop(frameLoop);
