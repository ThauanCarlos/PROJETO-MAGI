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

/* cor de fundo do render */

renderer.setClearColor(0x2b2b2b);


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

const redLight = new THREE.PointLight(0xff0000,0.25,4);
redLight.position.set(0,5,28);
scene.add(redLight);


// ======================
// TEXTURA DO OLHO
// ======================

const canvas = document.createElement("canvas");
canvas.width = 2048;
canvas.height = 1024;

const ctx = canvas.getContext("2d");

const centerX = canvas.width/2;
const centerY = canvas.height/2;


// globo ocular (vermelho escuro)

const gradient = ctx.createRadialGradient(
centerX,centerY,50,
centerX,centerY,450
);

gradient.addColorStop(0,"#aa0000");
gradient.addColorStop(1,"#330000");

ctx.fillStyle = gradient;
ctx.fillRect(0,0,2048,1024);


// ANEL EXTERNO

ctx.beginPath();
ctx.arc(centerX,centerY,220,0,Math.PI*2);
ctx.lineWidth = 25;
ctx.strokeStyle = "#330000";
ctx.stroke();


// ANEL MÉDIO

ctx.beginPath();
ctx.arc(centerX,centerY,160,0,Math.PI*2);
ctx.lineWidth = 18;
ctx.strokeStyle = "#220000";
ctx.stroke();


// ANEL INTERNO

ctx.beginPath();
ctx.arc(centerX,centerY,110,0,Math.PI*2);
ctx.lineWidth = 14;
ctx.strokeStyle = "#110000";
ctx.stroke();


// PUPILA

ctx.beginPath();
ctx.arc(centerX,centerY,60,0,Math.PI*2);
ctx.fillStyle = "#000000";
ctx.fill();


const texture = new THREE.CanvasTexture(canvas);


// ======================
// OLHO
// ======================

const eye = new THREE.Mesh(

new THREE.SphereGeometry(8,64,64),

new THREE.MeshStandardMaterial({
map:texture,
roughness:0.35,
metalness:0.15,
emissive:0x220000,
emissiveIntensity:0.5
})

);

eye.rotation.x = Math.PI/2;
eye.rotation.z = Math.PI - 1.55;


// ======================
// PARTÍCULAS
// ======================

const particlesGeometry = new THREE.BufferGeometry();

const particleCount = 120;
const positions = new Float32Array(particleCount * 3);

for(let i=0;i<particleCount*3;i++){

positions[i]=(Math.random()-0.5)*6;

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(positions,3)
);

const particlesMaterial = new THREE.PointsMaterial({

color:0xff0000,
size:0.15,
transparent:true,
opacity:0.8

});

const particles = new THREE.Points(
particlesGeometry,
particlesMaterial
);

particles.position.set(0,5,26);

scene.add(particles);


// ======================
// CABEÇA STL
// ======================

let head;

const loader = new THREE.STLLoader();

loader.load("models/head.stl",function(geometry){

geometry.center();
geometry.computeVertexNormals();

const position = geometry.attributes.position;
const colors=[];

for(let i=0;i<position.count;i++){

const x = position.getX(i);
const y = position.getY(i);
const z = position.getZ(i);

let r,g,b;


// topo branco

if(y > 24){

r = 1;
g = 1;
b = 1;

}


// abaixo do olho (mais escuro)

else if(z > 8.5 && Math.abs(x) < 12 && y < 9){

r = 0.10;
g = 0.10;
b = 0.10;

}


// rosto preto normal

else if(z > 8.5 && Math.abs(x) < 8 && y < 15){

r = 0.12;
g = 0.12;
b = 0.12;

}


// azul restante

else{

r = 0.18;
g = 0.35;
b = 1;

}

colors.push(r,g,b);

}

geometry.setAttribute(
'color',
new THREE.Float32BufferAttribute(colors,3)
);

const material = new THREE.MeshStandardMaterial({

vertexColors:true,
roughness:0.8,
metalness:0.05

});

head = new THREE.Mesh(geometry,material);

head.scale.set(0.06,0.06,0.06);

eye.position.set(0,5,18.2);

head.add(eye);

scene.add(head);

});


// ======================
// MOUSE
// ======================

let mouseX=0;
let mouseY=0;

document.addEventListener("mousemove",(event)=>{

mouseX=(event.clientX/window.innerWidth)*2-1;
mouseY=(event.clientY/window.innerHeight)*2-1;

});


// ======================
// ANIMAÇÃO
// ======================

let time=0;

function animate(){

requestAnimationFrame(animate);

time+=0.03;

if(head){

head.rotation.y+=((mouseX*0.5)-head.rotation.y)*0.02;
head.rotation.x+=((mouseY*0.3)-head.rotation.x)*0.02;

}


// pulsação do olho

const pulse=1+Math.sin(time)*0.04;

eye.scale.set(pulse,pulse,pulse);


// partículas

particles.rotation.y+=0.002;

redLight.intensity=0.4+Math.sin(time)*0.2;

renderer.render(scene,camera);

}

animate();


// ======================
// RESPONSIVO
// ======================

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});