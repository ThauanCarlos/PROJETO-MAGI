// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Geometria do cubo
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Material sólido com iluminação
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff41,
    metalness: 0.6,
    roughness: 0.2
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Luz principal
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Movimento com mouse
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (event.clientY / window.innerHeight) * 2 - 1; // removido o sinal negativo

    cube.rotation.y = mouseX * Math.PI;
    cube.rotation.x = mouseY * Math.PI;
});

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Ajuste ao redimensionar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});