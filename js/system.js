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
// CRIAR TEXTURA DO OLHO
// ======================

const canvas = document.createElement("canvas");
canvas.width = 1024;
canvas.height = 1024;

const ctx = canvas.getContext("2d");



// fundo vermelho

ctx.fillStyle = "#ff0000";
ctx.fillRect(0,0,1024,1024);



// ======================
// ANEL EXTERNO
// ======================

ctx.beginPath();
ctx.arc(512,512,340,0,Math.PI*2);
ctx.lineWidth = 20;
ctx.strokeStyle = "#aa0000";
ctx.stroke();



// ======================
// ANEL INTERNO
// ======================

ctx.beginPath();
ctx.arc(512,512,220,0,Math.PI*2);
ctx.lineWidth = 15;
ctx.strokeStyle = "#660000";
ctx.stroke();



// ======================
// PUPILA (MENOR E REDONDA)
// ======================

ctx.beginPath();
ctx.arc(512,512,70,0,Math.PI*2);
ctx.fillStyle = "#000000";
ctx.fill();



// criar textura

const eyeTexture = new THREE.CanvasTexture(canvas);



// ======================
// ESFERA DO OLHO
// ======================

const eye = new THREE.Mesh(

new THREE.SphereGeometry(1.2,64,64),

new THREE.MeshStandardMaterial({
map:eyeTexture,
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


// olho segue o mouse

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