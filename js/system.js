const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector("#bg"),
antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// ======================
// ILUMINAÇÃO
// ======================

const ambientLight = new THREE.AmbientLight(0xffffff,0.25);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0xffffff,0.6);
light1.position.set(5,5,5);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff,0.4);
light2.position.set(-5,2,5);
scene.add(light2);

const redLight = new THREE.PointLight(0xff0000,0.5);
redLight.position.set(0,0,3);
scene.add(redLight);


// ======================
// TEXTURA DO OLHO
// ======================

const canvas = document.createElement("canvas");
canvas.width = 2048;
canvas.height = 1024;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "#ff0000";
ctx.fillRect(0,0,2048,1024);

const centerX = canvas.width/2;
const centerY = canvas.height/2;

ctx.beginPath();
ctx.arc(centerX,centerY,220,0,Math.PI*2);
ctx.lineWidth = 25;
ctx.strokeStyle = "#880000";
ctx.stroke();

ctx.beginPath();
ctx.arc(centerX,centerY,160,0,Math.PI*2);
ctx.lineWidth = 18;
ctx.strokeStyle = "#aa0000";
ctx.stroke();

ctx.beginPath();
ctx.arc(centerX,centerY,110,0,Math.PI*2);
ctx.lineWidth = 14;
ctx.strokeStyle = "#660000";
ctx.stroke();

ctx.beginPath();
ctx.arc(centerX,centerY,60,0,Math.PI*2);
ctx.fillStyle = "#000000";
ctx.fill();

const texture = new THREE.CanvasTexture(canvas);


// ======================
// OLHO
// ======================

const eye = new THREE.Mesh(

new THREE.SphereGeometry(5.90,64,64),

new THREE.MeshStandardMaterial({
map:texture,
roughness:0.35,
metalness:0.15
})

);

// ORIENTAÇÃO CORRETA
eye.rotation.x = Math.PI / 2;
eye.rotation.z = Math.PI - 1.50;


// ======================
// CABEÇA STL
// ======================

let head;

const loader = new THREE.STLLoader();

loader.load(

"models/head.stl",

function(geometry){

geometry.computeVertexNormals();
geometry.center();

const material = new THREE.MeshStandardMaterial({

color:0x2e5bff,
roughness:0.6,
metalness:0.1

});

head = new THREE.Mesh(geometry,material);

head.scale.set(0.06,0.06,0.06);
head.position.set(0,0,0);


// posição do olho
eye.position.set(0,5.2,26.5);


// olho preso na cabeça
head.add(eye);


// linhas da malha

const edges = new THREE.EdgesGeometry(geometry);

const line = new THREE.LineSegments(
edges,
new THREE.LineBasicMaterial({color:0x222222,
transparent:true,
opacity:0.35
})
);

head.add(line);

scene.add(head);

}

);


// ======================
// MOUSE
// ======================

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove",(event)=>{

mouseX = (event.clientX/window.innerWidth)*2-1;
mouseY = (event.clientY/window.innerHeight)*2-1;

});


// ======================
// ANIMAÇÃO
// ======================

function animate(){

requestAnimationFrame(animate);

if(head){

head.rotation.y += ((mouseX*0.5)-head.rotation.y)*0.02;
head.rotation.x += ((mouseY*0.3)-head.rotation.x)*0.02;

}

renderer.render(scene,camera);

}

animate();


// ======================
// RESPONSIVO
// ======================

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);

});