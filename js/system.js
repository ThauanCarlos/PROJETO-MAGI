const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector("#bg"),
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.z = 5;



// ======================
// CRIAR TEXTURA DA ÍRIS
// ======================

const canvas = document.createElement("canvas");
canvas.width = 2048;
canvas.height = 1024;

const ctx = canvas.getContext("2d");

// fundo vermelho (globo ocular)
ctx.fillStyle = "#ff0000";
ctx.fillRect(0,0,2048,1024);


// posição frontal da esfera
const centerX = canvas.width/2;
const centerY = canvas.height/2;


// anel externo
ctx.beginPath();
ctx.arc(centerX,centerY,220,0,Math.PI*2);
ctx.lineWidth = 25;
ctx.strokeStyle = "#880000";
ctx.stroke();


// anel médio
ctx.beginPath();
ctx.arc(centerX,centerY,160,0,Math.PI*2);
ctx.lineWidth = 18;
ctx.strokeStyle = "#aa0000";
ctx.stroke();


// anel interno
ctx.beginPath();
ctx.arc(centerX,centerY,110,0,Math.PI*2);
ctx.lineWidth = 14;
ctx.strokeStyle = "#660000";
ctx.stroke();


// pupila
ctx.beginPath();
ctx.arc(centerX,centerY,60,0,Math.PI*2);
ctx.fillStyle = "#000000";
ctx.fill();


const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;



// ======================
// ESFERA DO OLHO
// ======================

const eye = new THREE.Mesh(

new THREE.SphereGeometry(1.2,64,64),

new THREE.MeshStandardMaterial({
map:texture,
roughness:0.35,
metalness:0.2
})

);

scene.add(eye);



// ======================
// LUZES
// ======================

const light = new THREE.PointLight(0xffffff,2);
light.position.set(5,5,5);
scene.add(light);

scene.add(new THREE.AmbientLight(0x404040));



// ======================
// MOVIMENTO DO MOUSE
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

let time = 0;

function animate(){

requestAnimationFrame(animate);

time += 0.02;

// olho segue mouse
eye.rotation.y += ((mouseX*Math.PI)-eye.rotation.y)*0.05;
eye.rotation.x += ((mouseY*Math.PI)-eye.rotation.x)*0.05;


// pulsação leve
const pulse = 1 + Math.sin(time)*0.01;
eye.scale.set(pulse,pulse,pulse);


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